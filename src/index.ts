import SeatMapper from "view/SeatMapper"
import {defaultStructure, Structure} from "./models/Structure"
import {exportStructure, importStructure, Version, VersionedStructure} from "./api/api"
import { Language } from "./i18n"
import {preactWrapper} from "./utils/preactWrapper"
import SeatMapperPreview from "./view/SeatMapperPreview"

export class SeatMapperChangeEvent extends Event {
  public readonly structure: Readonly<VersionedStructure>

  constructor(structure: VersionedStructure) {
    super("change")
    this.structure = Object.freeze({...structure})
  }
}

customElements.define("seat-mapper", preactWrapper(
  SeatMapper,
  ["initial-structure", "language"],
  htmlElement => {
    const initialStructureAttribute = htmlElement.getAttribute("initial-structure")
    const initialVersionedStructure = initialStructureAttribute !== null ? JSON.parse(initialStructureAttribute) : undefined
    const initialStructure = initialVersionedStructure !== undefined ? importStructure(initialVersionedStructure) : undefined
    return {
      initialStructure: initialStructure,
      language: htmlElement.getAttribute("language") as Language || undefined,
      onChange: (structure: Structure) => {
        const version = htmlElement.getAttribute("version") as Version || undefined
        htmlElement.dispatchEvent(new SeatMapperChangeEvent(exportStructure(structure || defaultStructure, version)))
      }
    }
  }
))

customElements.define("seat-mapper-preview", preactWrapper(
  SeatMapperPreview,
  ["structure"],
  htmlElement => {
    const structureAttribute = htmlElement.getAttribute("structure")
    const versionedStructure = structureAttribute !== null ? JSON.parse(structureAttribute) : undefined
    const structure = versionedStructure !== undefined ? importStructure(versionedStructure) : undefined
    return {
      structure: structure || defaultStructure()
    }
  }
))