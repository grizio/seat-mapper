import {h, render} from 'preact'
import MapCreator from 'view/MapCreator'
import {defaultStructure, Structure} from "./models/Structure"
import {exportStructure, importStructure, Version, VersionedStructure} from "./api/api"

export class TheaterMapperChangeEvent extends Event {
  public readonly structure: Readonly<VersionedStructure>

  constructor(structure: VersionedStructure) {
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
    const initialVersionedStructure = initialStructureAttribute !== null ? JSON.parse(initialStructureAttribute) : undefined
    const initialStructure = initialVersionedStructure !== undefined ? importStructure(initialVersionedStructure) : undefined
    return {
      initialStructure: initialStructure,
      onChange: (structure: Structure) => {
        const version = this.getAttribute("version") as Version || undefined
        this.dispatchEvent(new TheaterMapperChangeEvent(exportStructure(structure || defaultStructure, version)))
      }
    }
  }
})