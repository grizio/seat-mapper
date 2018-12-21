import {h, render} from 'preact'
import MapCreator from 'view/MapCreator'
import {defaultStructure, Structure} from "./models/Structure"

export class TheaterMapperChangeEvent extends Event {
  public readonly structure: Readonly<Structure>

  constructor(structure: Structure) {
    super("change")
    this.structure = Object.freeze({...structure})
  }
}

customElements.define("theater-mapper", class extends HTMLElement {
  private readonly shadow: ShadowRoot
  private currentElement: Element | undefined

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return ["initial-structure"]
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
    const initialStructureAttribute = this.getAttribute("initial-structure")
    const initialStructure = initialStructureAttribute !== null ? JSON.parse(initialStructureAttribute) : undefined
    return {
      initialStructure: initialStructure,
      onChange: (structure: Structure) => {
        this.dispatchEvent(new TheaterMapperChangeEvent(structure || defaultStructure))
      }
    }
  }
})