import {h, render} from "preact"
import SeatMapper from "view/SeatMapper"
import {defaultStructure, Structure} from "./models/Structure"
import {exportStructure, importStructure, Version, VersionedStructure} from "./api/api"
import { Language } from "./i18n"

export class SeatMapperChangeEvent extends Event {
  public readonly structure: Readonly<VersionedStructure>

  constructor(structure: VersionedStructure) {
    super("change")
    this.structure = Object.freeze({...structure})
  }
}

customElements.define("seat-mapper", class extends HTMLElement {
  private readonly shadow: ShadowRoot
  private currentElement: Element | undefined

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: "open"})
  }

  static get observedAttributes() {
    return ["initial-structure", "language"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    if (this.isConnected) {
      this.currentElement = render(h(SeatMapper, this.getProps()), this.shadow, this.currentElement)
    }
  }

  getProps() {
    const initialStructureAttribute = this.getAttribute("initial-structure")
    const initialVersionedStructure = initialStructureAttribute !== null ? JSON.parse(initialStructureAttribute) : undefined
    const initialStructure = initialVersionedStructure !== undefined ? importStructure(initialVersionedStructure) : undefined
    return {
      initialStructure: initialStructure,
      language: this.getAttribute("language") as Language || undefined,
      onChange: (structure: Structure) => {
        const version = this.getAttribute("version") as Version || undefined
        this.dispatchEvent(new SeatMapperChangeEvent(exportStructure(structure || defaultStructure, version)))
      }
    }
  }
})