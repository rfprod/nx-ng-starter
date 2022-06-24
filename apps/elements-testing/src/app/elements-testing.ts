import './elements-testing.scss';

import { sanitize } from 'dompurify';

export class AppElementsTesting extends HTMLElement {
  public connectedCallback() {
    const title = 'elements-testing';
    // eslint-disable-next-line no-unsanitized/property -- the value is sanitized
    this.innerHTML = sanitize(
      `
<h1>${title}</h1>
<pre>
# To test elements serve the elements app first

ng serve elements

# Then serve the elements-testing app (this one is no-framework, plain web)

ng serve elements-testing

# Verify that index.html has stylesheet link and script references

- < link rel="stylesheet" type="text/css" href="http://localhost:4200/styles.css"></link>
- < script defer="true" type="text/javascript" src="http://localhost:4200/runtime.js"></script>
- < script defer="true" type="text/javascript" src="http://localhost:4200/vendor.js"></script>
- < script defer="true" type="text/javascript" src="http://localhost:4200/polyfills.js"></script>
- < script defer="true" type="text/javascript" src="http://localhost:4200/main.js"></script>

# Add any of the supported custom html element tags below for testing

- < app-chatbot-root></app-chatbot-root>
</pre>

<app-chatbot-root></app-chatbot-root>
    `,
    );
  }
}
customElements.define('elements-testing', AppElementsTesting);
