import { IElizaKeyword } from '../interfaces/eliza.interface';

/**
 * Keywords, basic set of rules.
 *
 * Entries prestructured as layed out in Weizenbaum's description
 * [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
 * Links:
 * - https://cacm.acm.org/
 * - https://dl.acm.org/doi/10.1145/365153.365168
 */
export const elizaKeywords: IElizaKeyword[] = [
  {
    index: 0,
    key: 'xnone',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: [
          "I'm not sure I understand you fully.",
          'Please go on.',
          'What does that suggest to you ?',
          'Do you feel strongly about discussing such things ?',
          'That is interesting.  Please continue.',
          'Tell me more about that.',
          'Does talking about this bother you ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 1,
    key: 'sorry',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: [
          "Please don't apologise.",
          'Apologies are not necessary.',
          "I've told you that apologies are not required.",
          'It did not bother me.  Please continue.',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 2,
    key: 'apologise',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['goto sorry'],
        memory: false,
      },
    ],
  },
  {
    index: 3,
    key: 'remember',
    rank: 5,
    rules: [
      {
        pattern: '* i remember *',
        options: [
          'Do you often think of (2) ?',
          'Does thinking of (2) bring anything else to mind ?',
          'What else do you recollect ?',
          'Why do you remember (2) just now ?',
          'What in the present situation reminds you of (2) ?',
          'What is the connection between me and (2) ?',
          'What else does (2) remind you of ?',
        ],
        memory: false,
      },
      {
        pattern: '* do you remember *',
        options: [
          'Did you think I would forget (2) ?',
          'Why do you think I should recall (2) now ?',
          'What about (2) ?',
          'goto what',
          'You mentioned (2) ?',
        ],
        memory: false,
      },
      {
        pattern: '* you remember *',
        options: ['How could I forget (2) ?', 'What about (2) should I remember ?', 'goto you'],
        memory: false,
      },
    ],
  },
  {
    index: 4,
    key: 'forget',
    rank: 5,
    rules: [
      {
        pattern: '* i forget *',
        options: [
          'Can you think of why you might forget (2) ?',
          "Why can't you remember (2) ?",
          'How often do you think of (2) ?',
          'Does it bother you to forget that ?',
          'Could it be a mental block ?',
          'Are you generally forgetful ?',
          'Do you think you are suppressing (2) ?',
        ],
        memory: false,
      },
      {
        pattern: '* did you forget *',
        options: [
          'Why do you ask ?',
          'Are you sure you told me ?',
          'Would it bother you if I forgot (2) ?',
          'Why should I recall (2) just now ?',
          'goto what',
          'Tell me more about (2).',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 5,
    key: 'if',
    rank: 3,
    rules: [
      {
        pattern: '* if *',
        options: [
          "Do you think it's likely that (2) ?",
          'Do you wish that (2) ?',
          'What do you know about (2) ?',
          'Really, if (2) ?',
          'What would you do if (2) ?',
          'But what are the chances that (2) ?',
          'What does this speculation lead to ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 6,
    key: 'dreamed',
    rank: 4,
    rules: [
      {
        pattern: '* i dreamed *',
        options: [
          'Really, (2) ?',
          'Have you ever fantasized (2) while you were awake ?',
          'Have you ever dreamed (2) before ?',
          'goto dream',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 7,
    key: 'dream',
    rank: 3,
    rules: [
      {
        pattern: '*',
        options: [
          'What does that dream suggest to you ?',
          'Do you dream often ?',
          'What persons appear in your dreams ?',
          'Do you believe that dreams have something to do with your problem ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 8,
    key: 'perhaps',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: [
          "You don't seem quite certain.",
          'Why the uncertain tone ?',
          "Can't you be more positive ?",
          "You aren't sure ?",
          "Don't you know ?",
          'How likely, would you estimate ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 9,
    key: 'name',
    rank: 15,
    rules: [
      {
        pattern: '*',
        options: ['I am not interested in names.', "I've told you before, I don't care about names -- please continue."],
        memory: false,
      },
    ],
  },
  {
    index: 10,
    key: 'deutsch',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['goto xforeign', "I told you before, I don't understand German."],
        memory: false,
      },
    ],
  },
  {
    index: 11,
    key: 'francais',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['goto xforeign', "I told you before, I don't understand French."],
        memory: false,
      },
    ],
  },
  {
    index: 12,
    key: 'italiano',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['goto xforeign', "I told you before, I don't understand Italian."],
        memory: false,
      },
    ],
  },
  {
    index: 13,
    key: 'espanol',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['goto xforeign', "I told you before, I don't understand Spanish."],
        memory: false,
      },
    ],
  },
  {
    index: 14,
    key: 'xforeign',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['I speak only English.'],
        memory: false,
      },
    ],
  },
  {
    index: 15,
    key: 'hello',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['How do you do.  Please state your problem.', 'Hi.  What seems to be your problem ?'],
        memory: false,
      },
    ],
  },
  {
    index: 16,
    key: 'computer',
    rank: 50,
    rules: [
      {
        pattern: '*',
        options: [
          'Do computers worry you ?',
          'Why do you mention computers ?',
          'What do you think machines have to do with your problem ?',
          "Don't you think computers can help people ?",
          'What about machines worries you ?',
          'What do you think about machines ?',
          "You don't think I am a computer program, do you ?",
        ],
        memory: false,
      },
    ],
  },
  {
    index: 17,
    key: 'am',
    rank: 0,
    rules: [
      {
        pattern: '* am i *',
        options: [
          'Do you believe you are (2) ?',
          'Would you want to be (2) ?',
          'Do you wish I would tell you you are (2) ?',
          'What would it mean if you were (2) ?',
          'goto what',
        ],
        memory: false,
      },
      {
        pattern: '* i am *',
        options: ['goto i'],
        memory: false,
      },
      {
        pattern: '*',
        options: ["Why do you say 'am' ?", "I don't understand that."],
        memory: false,
      },
    ],
  },
  {
    index: 18,
    key: 'are',
    rank: 0,
    rules: [
      {
        pattern: '* are you *',
        options: [
          'Why are you interested in whether I am (2) or not ?',
          "Would you prefer if I weren't (2) ?",
          'Perhaps I am (2) in your fantasies.',
          'Do you sometimes think I am (2) ?',
          'goto what',
          'Would it matter to you ?',
          'What if I were (2) ?',
        ],
        memory: false,
      },
      {
        pattern: '* you are *',
        options: ['goto you'],
        memory: false,
      },
      {
        pattern: '* are *',
        options: [
          'Did you think they might not be (2) ?',
          'Would you like it if they were not (2) ?',
          'What if they were not (2) ?',
          'Are they always (2) ?',
          'Possibly they are (2).',
          'Are you positive they are (2) ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 19,
    key: 'your',
    rank: 0,
    rules: [
      {
        pattern: '* your *',
        options: [
          'Why are you concerned over my (2) ?',
          'What about your own (2) ?',
          "Are you worried about someone else's (2) ?",
          'Really, my (2) ?',
          'What makes you think of my (2) ?',
          'Do you want my (2) ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 20,
    key: 'was',
    rank: 2,
    rules: [
      {
        pattern: '* was i *',
        options: [
          'What if you were (2) ?',
          'Do you think you were (2) ?',
          'Were you (2) ?',
          'What would it mean if you were (2) ?',
          "What does ' (2) ' suggest to you ?",
          'goto what',
        ],
        memory: false,
      },
      {
        pattern: '* i was *',
        options: ['Were you really ?', 'Why do you tell me you were (2) now ?', 'Perhaps I already know you were (2).'],
        memory: false,
      },
      {
        pattern: '* was you *',
        options: [
          'Would you like to believe I was (2) ?',
          'What suggests that I was (2) ?',
          'What do you think ?',
          'Perhaps I was (2).',
          'What if I had been (2) ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 21,
    key: 'i',
    rank: 0,
    rules: [
      {
        pattern: '* i @desire *',
        options: [
          'What would it mean to you if you got (3) ?',
          'Why do you want (3) ?',
          'Suppose you got (3) soon.',
          'What if you never got (3) ?',
          'What would getting (3) mean to you ?',
          'What does wanting (3) have to do with this discussion ?',
        ],
        memory: false,
      },
      {
        pattern: '* i am* @sad *',
        options: [
          'I am sorry to hear that you are (3).',
          'Do you think coming here will help you not to be (3) ?',
          "I'm sure it's not pleasant to be (3).",
          'Can you explain what made you (3) ?',
        ],
        memory: false,
      },
      {
        pattern: '* i am* @happy *',
        options: [
          'How have I helped you to be (3) ?',
          'Has your treatment made you (3) ?',
          'What makes you (3) just now ?',
          'Can you explain why you are suddenly (3) ?',
        ],
        memory: false,
      },
      {
        pattern: '* i was *',
        options: ['goto was'],
        memory: false,
      },
      {
        pattern: '* i @belief i *',
        options: ['Do you really think so ?', 'But you are not sure you (3).', 'Do you really doubt you (3) ?'],
        memory: false,
      },
      {
        pattern: '* i* @belief *you *',
        options: ['goto you'],
        memory: false,
      },
      {
        pattern: '* i am *',
        options: [
          'Is it because you are (2) that you came to me ?',
          'How long have you been (2) ?',
          'Do you believe it is normal to be (2) ?',
          'Do you enjoy being (2) ?',
          'Do you know anyone else who is (2) ?',
        ],
        memory: false,
      },
      {
        pattern: '* i @cannot *',
        options: [
          "How do you know that you can't (3) ?",
          'Have you tried ?',
          'Perhaps you could (3) now.',
          'Do you really want to be able to (3) ?',
          'What if you could (3) ?',
        ],
        memory: false,
      },
      {
        pattern: "* i don't *",
        options: ["Don't you really (2) ?", "Why don't you (2) ?", 'Do you wish to be able to (2) ?', 'Does that trouble you ?'],
        memory: false,
      },
      {
        pattern: '* i feel *',
        options: [
          'Tell me more about such feelings.',
          'Do you often feel (2) ?',
          'Do you enjoy feeling (2) ?',
          'Of what does feeling (2) remind you ?',
        ],
        memory: false,
      },
      {
        pattern: '* i * you *',
        options: [
          'Perhaps in your fantasies we (2) each other.',
          'Do you wish to (2) me ?',
          'You seem to need to (2) me.',
          'Do you (2) anyone else ?',
        ],
        memory: false,
      },
      {
        pattern: '*',
        options: ['You say (1) ?', 'Can you elaborate on that ?', 'Do you say (1) for some special reason ?', "That's quite interesting."],
        memory: false,
      },
    ],
  },
  {
    index: 22,
    key: 'you',
    rank: 0,
    rules: [
      {
        pattern: '* you remind me of *',
        options: ['goto alike'],
        memory: false,
      },
      {
        pattern: '* you are *',
        options: [
          'What makes you think I am (2) ?',
          'Does it please you to believe I am (2) ?',
          'Do you sometimes wish you were (2) ?',
          'Perhaps you would like to be (2).',
        ],
        memory: false,
      },
      {
        pattern: '* you* me *',
        options: [
          'Why do you think I (2) you ?',
          "You like to think I (2) you -- don't you ?",
          'What makes you think I (2) you ?',
          'Really, I (2) you ?',
          'Do you wish to believe I (2) you ?',
          'Suppose I did (2) you -- what would that mean ?',
          'Does someone else believe I (2) you ?',
        ],
        memory: false,
      },
      {
        pattern: '* you *',
        options: [
          'We were discussing you -- not me.',
          'Oh, I (2) ?',
          "You're not really talking about me -- are you ?",
          'What are your feelings now ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 23,
    key: 'yes',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: ['You seem to be quite positive.', 'You are sure.', 'I see.', 'I understand.'],
        memory: false,
      },
    ],
  },
  {
    index: 24,
    key: 'no',
    rank: 0,
    rules: [
      {
        pattern: '* no one *',
        options: [
          'Are you sure, no one (2) ?',
          'Surely someone (2) .',
          'Can you think of anyone at all ?',
          'Are you thinking of a very special person ?',
          'Who, may I ask ?',
          "You have a particular person in mind, don't you ?",
          'Who do you think you are talking about ?',
        ],
        memory: false,
      },
      {
        pattern: '*',
        options: ['Are you saying no just to be negative?', 'You are being a bit negative.', 'Why not ?', "Why 'no' ?"],
        memory: false,
      },
    ],
  },
  {
    index: 25,
    key: 'my',
    rank: 2,
    rules: [
      {
        pattern: '$ * my *',
        options: [
          'Does that have anything to do with the fact that your (2) ?',
          'Lets discuss further why your (2).',
          'Earlier you said your (2).',
          'But your (2).',
        ],
        memory: false,
      },
      {
        pattern: '* my* @family *',
        options: [
          'Tell me more about your family.',
          'Who else in your family (4) ?',
          'Your (3) ?',
          'What else comes to your mind when you think of your (3) ?',
        ],
        memory: false,
      },
      {
        pattern: '* my *',
        options: [
          'Your (2) ?',
          'Why do you say your (2) ?',
          'Does that suggest anything else which belongs to you ?',
          'Is it important to you that your (2) ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 26,
    key: 'can',
    rank: 0,
    rules: [
      {
        pattern: '* can you *',
        options: [
          "You believe I can (2) don't you ?",
          'goto what',
          'You want me to be able to (2).',
          'Perhaps you would like to be able to (2) yourself.',
        ],
        memory: false,
      },
      {
        pattern: '* can i *',
        options: [
          'Whether or not you can (2) depends on you more than on me.',
          'Do you want to be able to (2) ?',
          "Perhaps you don't want to (2).",
          'goto what',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 27,
    key: 'what',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: [
          'Why do you ask ?',
          'Does that question interest you ?',
          'What is it you really want to know ?',
          'Are such questions much on your mind ?',
          'What answer would please you most ?',
          'What do you think ?',
          'What comes to mind when you ask that ?',
          'Have you asked such questions before ?',
          'Have you asked anyone else ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 28,
    key: 'who',
    rank: 0,
    rules: [
      {
        pattern: 'who *',
        options: ['goto what'],
        memory: false,
      },
    ],
  },
  {
    index: 29,
    key: 'when',
    rank: 0,
    rules: [
      {
        pattern: 'when *',
        options: ['goto what'],
        memory: false,
      },
    ],
  },
  {
    index: 30,
    key: 'where',
    rank: 0,
    rules: [
      {
        pattern: 'where *',
        options: ['goto what'],
        memory: false,
      },
    ],
  },
  {
    index: 31,
    key: 'how',
    rank: 0,
    rules: [
      {
        pattern: 'how *',
        options: ['goto what'],
        memory: false,
      },
    ],
  },
  {
    index: 32,
    key: 'because',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: [
          'Is that the real reason ?',
          "Don't any other reasons come to mind ?",
          'Does that reason seem to explain anything else ?',
          'What other reasons might there be ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 33,
    key: 'why',
    rank: 0,
    rules: [
      {
        pattern: "* why don't you *",
        options: [
          "Do you believe I don't (2) ?",
          'Perhaps I will (2) in good time.',
          'Should you (2) yourself ?',
          'You want me to (2) ?',
          'goto what',
        ],
        memory: false,
      },
      {
        pattern: "* why can't i *",
        options: [
          'Do you think you should be able to (2) ?',
          'Do you want to be able to (2) ?',
          'Do you believe this will help you to (2) ?',
          "Have you any idea why you can't (2) ?",
          'goto what',
        ],
        memory: false,
      },
      {
        pattern: '*',
        options: ['goto what'],
        memory: false,
      },
    ],
  },
  {
    index: 34,
    key: 'everyone',
    rank: 2,
    rules: [
      {
        pattern: '* @everyone *',
        options: [
          'Really, (2) ?',
          'Surely not (2).',
          'Can you think of anyone in particular ?',
          'Who, for example?',
          'Are you thinking of a very special person ?',
          'Who, may I ask ?',
          'Someone special perhaps ?',
          "You have a particular person in mind, don't you ?",
          "Who do you think you're talking about ?",
        ],
        memory: false,
      },
    ],
  },
  {
    index: 35,
    key: 'everybody',
    rank: 2,
    rules: [
      {
        pattern: '*',
        options: ['goto everyone'],
        memory: false,
      },
    ],
  },
  {
    index: 36,
    key: 'nobody',
    rank: 2,
    rules: [
      {
        pattern: '*',
        options: ['goto everyone'],
        memory: false,
      },
    ],
  },
  {
    index: 37,
    key: 'noone',
    rank: 2,
    rules: [
      {
        pattern: '*',
        options: ['goto everyone'],
        memory: false,
      },
    ],
  },
  {
    index: 38,
    key: 'always',
    rank: 1,
    rules: [
      {
        pattern: '*',
        options: ['Can you think of a specific example ?', 'When ?', 'What incident are you thinking of ?', 'Really, always ?'],
        memory: false,
      },
    ],
  },
  {
    index: 39,
    key: 'alike',
    rank: 10,
    rules: [
      {
        pattern: '*',
        options: [
          'In what way ?',
          'What resemblence do you see ?',
          'What does that similarity suggest to you ?',
          'What other connections do you see ?',
          'What do you suppose that resemblence means ?',
          'What is the connection, do you suppose ?',
          'Could there really be some connection ?',
          'How ?',
        ],
        memory: false,
      },
    ],
  },
  {
    index: 40,
    key: 'like',
    rank: 10,
    rules: [
      {
        pattern: '* @be *like *',
        options: ['goto alike'],
        memory: false,
      },
    ],
  },
  {
    index: 41,
    key: 'different',
    rank: 0,
    rules: [
      {
        pattern: '*',
        options: [
          'How is it different ?',
          'What differences do you see ?',
          'What does that difference suggest to you ?',
          'What other distinctions do you see ?',
          'What do you suppose that disparity means ?',
          'Could there be some connection, do you suppose ?',
          'How ?',
        ],
        memory: false,
      },
    ],
  },
];
