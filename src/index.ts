import {h, render} from 'preact'
import MapCreator from 'view/MapCreator'

customElements.define("theater-mapper", class extends HTMLElement {
  private readonly shadow: ShadowRoot
  private currentElement: Element | undefined

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return Object.keys({})
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    if (this.isConnected) {
      this.currentElement = render(h(MapCreator, this.getProps()), this.shadow, this.currentElement)
    }
  }

  getProps() {
    return {}
  }
})