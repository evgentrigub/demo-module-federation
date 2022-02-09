class GreatComponent extends HTMLElement {
  constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `<strong>I am content inside the web-component from app2!</strong>`;
    }
}

window.customElements.define('app2-tag-name', GreatComponent);

export default 'I am data from app2!'