import {export_0_1_0, import_0_1_0, Structure_0_1_0} from "./0_1_0"
import {Structure} from "../models/Structure"

export * from "./0_1_0"

export type VersionedStructure = Structure_0_1_0
export type Version = "0.1.0"

export function importStructure(structure: VersionedStructure): Structure {
  switch (structure.version || "") {
    case "0.1.0":
      return import_0_1_0(structure)
    default:
      return import_0_1_0(structure as Structure_0_1_0)
  }
}

export function exportStructure(structure: Structure, version?: Version): VersionedStructure {
  switch (version || "") {
    case "0.1.0":
      return export_0_1_0(structure)
    default:
      return export_0_1_0(structure)
  }
}