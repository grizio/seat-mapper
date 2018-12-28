import {ComponentFactory, h, render} from "preact"

export function preactWrapper<Props>(component: ComponentFactory<Props>, observedAttributes: Array<string>, getProps: (htmlElement: HTMLElement) => Props) {
  return class extends HTMLElement {
    private readonly shadow: ShadowRoot
    private currentElement: Element | undefined

    constructor() {
      super()
      this.shadow = this.attachShadow({mode: "open"})
    }

    static get observedAttributes() {
      return observedAttributes
    }

    connectedCallback() {
      this.render()
    }

    attributeChangedCallback() {
      this.render()
    }

    render() {
      if (this.isConnected) {
        this.currentElement = render(h(component, getProps(this)), this.shadow, this.currentElement)
      }
    }
  }
}