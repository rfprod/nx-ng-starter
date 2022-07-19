/**
 * elizabot.js v.1.1 - ELIZA JS library (N.Landsteiner 2005)
 * Eliza is a mock Rogerian psychotherapist.
 * Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
 * cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language Communication Between Man and Machine"
 * in: Communications of the ACM; Volume 9 , Issue 1 (January 1966): p 36-45.
 * JavaScript implementation by Norbert Landsteiner 2005; <http://www.masserk.at>
 *
 * `ElizaBot' is also a general chatbot engine that can be supplied with any rule set.
 * (for required data structures cf. "elizadata.js" and/or see the documentation.)
 * data is parsed and transformed for internal use at the creation time of the first instance of the `ElizaBot' constructor.
 *
 * JavaScript source: https://github.com/natelewis/eliza-as-promised
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ELIZA_DATA } from '../../config/data.config';
import { elizaInitialConfig } from '../../config/eliza.config';
import { elizaFinalDefault } from '../../config/finals.config';
import { elizaInitialDefault } from '../../config/initials.config';
import { IChatMessage } from '../../interfaces/chat.interface';
import { IElizaConfig, IElizaData, IElizaKeyword, IElizaResponse } from '../../interfaces/eliza.interface';

@Injectable({
  providedIn: 'root',
})
export class AppElizaService {
  /**
   * Eliza configuration.
   */
  private readonly configSubject = new BehaviorSubject<IElizaConfig>({ ...elizaInitialConfig });

  /**
   * Publicly readable Eliza configuration.
   */
  public readonly config$ = this.configSubject.asObservable();

  private data?: IElizaData;

  private mem: string[] = [];

  private lastChoice: number[][] = [];

  private postExp = new RegExp('');

  private preExp = new RegExp('');

  private pres: Record<string, string> = {};

  private posts: Record<string, string> = {};

  /**
   * Conversation messages.
   */
  private readonly messagesSubject = new BehaviorSubject<IChatMessage[]>([]);

  /**
   * Publicly readable conversation messages.
   */
  public readonly messages$ = this.messagesSubject.asObservable();

  constructor(@Inject(ELIZA_DATA) public readonly elizaData: IElizaData) {
    this.setup(elizaData);
  }

  /**
   * Adds next chat message.
   * @param message chat message
   */
  public nextMessage(message: IChatMessage): void {
    this.messagesSubject.next([...this.messagesSubject.value, message]);
  }

  /**
   * Modifies Eliza configuration.
   * @param config Eliza config
   */
  public nextConfig(config: Partial<IElizaConfig>): void {
    this.configSubject.next({ ...this.configSubject.value, ...config });
  }

  /**
   * Sets up Eliza.
   * @param data Eliza data
   * @param reinitialize indicates that Eliza should be initialized again, even if it's data has already been initialized
   */
  public setup(data: IElizaData, reinitialize = false): void {
    if (typeof this.data === 'undefined' || reinitialize) {
      this.init(data);
    }
    this.reset();
  }

  /**
   * Resets Eliza.
   */
  public reset(): void {
    const data = this.data;
    if (typeof data === 'undefined') {
      throw new Error('Initialize Eliza first.');
    }
    this.mem = [];
    this.lastChoice = [];
    for (let k = 0; k < data.keywords.length; k += 1) {
      this.lastChoice[k] = [];
      const rules = data.keywords[k].rules;
      for (let i = 0; i < rules.length; i += 1) {
        this.lastChoice[k][i] = -1;
      }
    }
    this.messagesSubject.next([{ bot: true, text: this.getInitial(data) }]);
  }

  // eslint-disable-next-line max-lines-per-function, complexity -- TODO refactor
  private init(data: IElizaData): void {
    this.data = { ...data };
    // Parse data and convert it from canonical form to internal use.
    // Produce a list of synonyms.
    const synPatterns: Record<string, string> = {};
    for (const item in this.data.synonyms) {
      if (item) {
        synPatterns[item] = `(${item}|${this.data.synonyms[item].join('|')})`;
      }
    }
    // Check keywords.
    if (data.keywords.length === 0) {
      throw Error('Eliza does not have any configured keywords.');
    }
    // First, convert rules to regexps.
    // Expand synonyms and insert asterisk expressions for backtracking.
    const sre = /@(\S+)/;
    const are = /(\S)\s*\*\s*(\S)/;
    const are1 = /^\s*\*\s*(\S)/;
    const are2 = /(\S)\s*\*\s*$/;
    const are3 = /^\s*\*\s*$/;
    const wsre = /\s+/g;
    for (let i = 0; i < this.data.keywords.length; i += 1) {
      const rules = this.data.keywords[i].rules;
      for (let j = 0; j < rules.length; j += 1) {
        const rule = rules[j];
        // Check mem flag and store it as decomp's element 2.
        if (rule.pattern.charAt(0) === '$') {
          let ofs = 1;
          while (rule.pattern.charAt[ofs] === ' ') {
            ofs += 1;
          }
          rule.pattern = rule.pattern.substring(ofs);
          rule.memory = true;
        } else {
          rule.memory = false;
        }
        let match = rule.pattern.match(sre);
        while (match !== null) {
          const sp = synPatterns[match[1]] ? synPatterns[match[1]] : match[1];
          rule.pattern = rule.pattern.substring(0, match.index ?? 0) + sp + rule.pattern.substring((match.index ?? 0) + match[0].length);
          match = rule.pattern.match(sre);
        }
        // Expand asterisk expressions.
        if (are3.test(rule.pattern)) {
          rule.pattern = '\\s*(.*)\\s*';
        } else {
          match = rule.pattern.match(are);
          if (match !== null) {
            let leftPart = '';
            let rightPart = rule.pattern;
            while (match !== null) {
              leftPart += rightPart.substring(0, (match.index ?? 0) + 1);
              if (match[1] !== ')') {
                leftPart += '\\b';
              }
              leftPart += '\\s*(.*)\\s*';
              if (match[2] !== '(' && match[2] !== '\\') {
                leftPart += '\\b';
              }
              leftPart += match[2];
              rightPart = rightPart.substring((match.index ?? 0) + match[0].length);
              match = rightPart.match(are);
            }
            rule.pattern = leftPart + rightPart;
          }
          match = rule.pattern.match(are1);
          if (match !== null) {
            let leftPart = '\\s*(.*)\\s*';
            if (match[1] !== ')' && match[1] !== '\\') {
              leftPart += '\\b';
            }
            rule.pattern = leftPart + rule.pattern.substring((match.index ?? 0) - 1 + match[0].length);
          }
          match = rule.pattern.match(are2);
          if (match !== null) {
            let leftPart = rule.pattern.substring(0, (match.index ?? 0) + 1);
            if (match[1] !== '(') {
              leftPart += '\\b';
            }
            rule.pattern = leftPart + '\\s*(.*)\\s*';
          }
        }
        // Expand whitespaces.
        rule.pattern = rule.pattern.replace(wsre, '\\s+');
        wsre.lastIndex = 0;
      }
    }
    // Sort keywords by rank (highest first).
    this.data.keywords.sort(this.sortKeywords);
    // Compose regexps and refs for pres and posts.
    this.composeRegExpsAndPresAndPosts(this.data);
  }

  /**
   * Composes regexps and refs for pres and posts.
   * @param data Eliza data
   */
  private composeRegExpsAndPresAndPosts(data: IElizaData): void {
    this.pres = {};
    this.posts = {};
    if (data.pres.length === 0) {
      throw Error('Eliza does not have any configured pre expressions.');
    } else {
      const a = [];
      for (let i = 0; i < data.pres.length; i += 2) {
        a.push(data.pres[i]);
        this.pres[data.pres[i]] = data.pres[i + 1];
      }
      this.preExp = new RegExp('\\b(' + a.join('|') + ')\\b');
    }
    if (data.posts.length === 0) {
      throw Error('Eliza does not have any configured post expressions.');
    } else {
      const a = [];
      for (let i = 0; i < data.posts.length; i += 2) {
        a.push(data.posts[i]);
        this.posts[data.posts[i]] = data.posts[i + 1];
      }
      this.postExp = new RegExp('\\b(' + a.join('|') + ')\\b');
    }
  }

  // eslint-disable-next-line max-lines-per-function, complexity -- TODO refactor
  private execRule(data: IElizaData, k: number, sentence: string): string {
    const config = this.configSubject.value;
    const rules = data.keywords[k].rules;
    const paramRegExp = /\(([0-9]+)\)/;
    for (let i = 0; i < rules.length; i += 1) {
      const match = sentence.match(rules[i].pattern);
      if (match !== null) {
        const options = rules[i].options;
        const memory = rules[i].memory;
        let optionIndex = config.noRandom ? 0 : Math.floor(Math.random() * options.length);
        if ((config.noRandom && this.lastChoice[k][i] > optionIndex) || this.lastChoice[k][i] === optionIndex) {
          this.lastChoice[k][i] += 1;
          optionIndex = this.lastChoice[k][i];
          if (optionIndex >= options.length) {
            optionIndex = 0;
            this.lastChoice[k][i] = -1;
          }
        } else {
          this.lastChoice[k][i] = optionIndex;
        }
        let reply = options[optionIndex];
        if (config.debug) {
          const debugLog = `match:\nkey: ${data.keywords[k].key}\nrank: ${data.keywords[k].rank}\ndecomp: ${rules[i].pattern}\nreasmb: ${reply}\nmemory: ${memory}`;
          // eslint-disable-next-line no-console -- debug output
          console.warn('debugLog', debugLog);
        }
        if (reply.search('^goto ') === 0) {
          const key = reply.substring(5);
          const ki = this.getRuleIndexByKey(data, key);
          if (ki >= 0) {
            return this.execRule(data, ki, sentence);
          }
        }
        // Substitute positional params.
        let paramRegExpMatch = reply.match(paramRegExp);
        if (paramRegExpMatch) {
          let leftPart = '';
          let rightPart = reply;
          while (paramRegExpMatch !== null) {
            let param = match[parseInt(paramRegExpMatch[1], 10)];
            // Postprocess param.
            let postExpMatch = param.match(this.postExp);
            if (postExpMatch !== null) {
              let leftPart2 = '';
              let rightPart2 = param;
              while (postExpMatch !== null) {
                leftPart2 += rightPart2.substring(0, postExpMatch.index ?? 0) + this.posts[postExpMatch[1]];
                rightPart2 = rightPart2.substring((postExpMatch.index ?? 0) + postExpMatch[0].length);
                postExpMatch = rightPart2.match(this.postExp);
              }
              param = leftPart2 + rightPart2;
            }
            leftPart += rightPart.substring(0, paramRegExpMatch.index) + param;
            rightPart = rightPart.substring((paramRegExpMatch.index ?? 0) + paramRegExpMatch[0].length);
            paramRegExpMatch = rightPart.match(paramRegExp);
          }
          reply = leftPart + rightPart;
        }
        const transformedReply = this.postTransform(data, reply);
        if (memory) {
          this.memSave(transformedReply);
        } else {
          return transformedReply;
        }
      }
    }
    return '';
  }

  // eslint-disable-next-line complexity -- TODO refactor
  private transformUserQuery(data: IElizaData, input: string): IElizaResponse {
    let reply = '';
    // Unify text string and split text in part sentences and loop through them.
    const parts = this.splitUserQueryIntoParts(input);
    for (let i = 0; i < parts.length; i += 1) {
      let part = parts[i];
      if (part !== '') {
        // Check for quit expressions.
        for (let q = 0; q < data.quits.length; q += 1) {
          if (data.quits[q] === part) {
            return { reply: this.getFinal(data), final: true };
          }
        }
        let match = part.match(this.preExp);
        if (match !== null) {
          let leftPart = '';
          let rightPart = part;
          while (match !== null) {
            leftPart += rightPart.substring(0, match.index ?? 0) + this.pres[match[1]];
            rightPart = rightPart.substring((match.index ?? 0) + match[0].length);
            match = rightPart.match(this.preExp);
          }
          part = leftPart + rightPart;
        }
        // Loop trough keywords.
        for (let k = 0; k < data.keywords.length; k += 1) {
          if (part.search(new RegExp('\\b' + data.keywords[k].key + '\\b', 'i')) >= 0) {
            reply = this.execRule(data, k, part);
          }
          if (reply !== '') {
            return { reply, final: false };
          }
        }
      }
    }
    // Nothing matched, try mem.
    reply = this.memGet();
    // If nothing in mem, try xnone.
    if (reply === '') {
      const k = this.getRuleIndexByKey(data, 'xnone');
      reply = k >= 0 ? this.execRule(data, k, ' ') : reply;
    }
    return { reply: reply !== '' ? reply : 'I am at a loss for words.', final: false };
  }

  /**
   * Unify text string, split text into partial sentences to be able to loop through them.
   * @param input user query
   * @returns split user query
   */
  private splitUserQueryIntoParts(input: string): string[] {
    const parts = input
      .toLowerCase()
      .replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ')
      .replace(/\s+-+\s+/g, '.')
      .replace(/\s*[,.?!;]+\s*/g, '.')
      .replace(/\s*\bbut\b\s*/g, '.')
      .replace(/\s{2,}/g, ' ')
      .split('.');
    return parts;
  }

  private sortKeywords(a: IElizaKeyword, b: IElizaKeyword) {
    if (a.rank > b.rank) {
      return -1;
    } else if (a.rank < b.rank) {
      return 1;
    } else if (a.index > b.index) {
      return 1;
    } else if (a.index < b.index) {
      return -1;
    }
    return 0;
  }

  private postTransform(data: IElizaData, input: string): string {
    // final cleanings
    let result = input.replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.');
    if (data.postTransforms.length > 0) {
      for (let i = 0; i < data.postTransforms.length; i += 1) {
        const postTransform = data.postTransforms[i];
        result = result.replace(postTransform.searchValue, postTransform.replaceValue);
        data.postTransforms[i].searchValue.lastIndex = 0;
      }
    }
    if (this.configSubject.value.capitalizeFirstLetter) {
      const match = result.match(/^([a-z])/);
      if (match) {
        result = match[0].toUpperCase() + result.substring(1);
      }
    }
    return result;
  }

  private getRuleIndexByKey(data: IElizaData, key: string): number {
    for (let k = 0; k < data.keywords.length; k += 1) {
      if (data.keywords[k].key === key) {
        return k;
      }
    }
    return -1;
  }

  private memSave(input: string): void {
    this.mem.push(input);
    if (this.mem.length > this.configSubject.value.memSize) {
      this.mem.shift();
    }
  }

  private memGet(): string {
    if (this.mem.length > 0) {
      if (this.configSubject.value.noRandom) {
        return this.mem.shift() ?? '';
      }
      const n = Math.floor(Math.random() * this.mem.length);
      const reply = this.mem[n];
      for (let i = n + 1; i < this.mem.length; i += 1) {
        this.mem[i - 1] = this.mem[i];
      }
      this.mem.length -= 1;
      return reply;
    }
    return '';
  }

  private getFinal(data: IElizaData): string {
    return data.finals.length === 0 ? elizaFinalDefault : data.finals[Math.floor(Math.random() * data.finals.length)];
  }

  private getInitial(data: IElizaData): string {
    return data.initials.length === 0 ? elizaInitialDefault : data.initials[Math.floor(Math.random() * data.initials.length)];
  }

  public getResponse(statement: string): Promise<IElizaResponse> {
    const data = this.data;
    if (typeof data === 'undefined') {
      throw new Error('Initialize Eliza first.');
    }
    return new Promise<IElizaResponse>(resolve => {
      const elizaReply = this.transformUserQuery(data, statement);
      resolve(elizaReply);
    });
  }
}
