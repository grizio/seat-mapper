import i18n, { Language } from 'i18n'
import {h} from "preact"
import IconButton from "./buttons/IconButton"
import {AddGridIcon, AddLineIcon, AddSeatIcon, CrossIcon, EditIcon, TrashIcon} from "view/icons"

interface Props {
  language?: Language
  add: () => void
  startAddLine: () => void
  startAddGrid: () => void
  renameSelectedSeat: () => void
  removeSeat: () => void
  cancelAction: () => void
}

export function Toolbar({language, add, startAddLine, startAddGrid, renameSelectedSeat, removeSeat, cancelAction}: Props) {
  return <div class="toolbar">
    <IconButton label={i18n("toolbar.addSeat", language)} onClick={add}><AddSeatIcon /></IconButton>
    <IconButton label={i18n("toolbar.addLine", language)} onClick={startAddLine}><AddLineIcon /></IconButton>
    <IconButton label={i18n("toolbar.addGrid", language)} onClick={startAddGrid}><AddGridIcon /></IconButton>
    <IconButton label={i18n("toolbar.rename", language)} onClick={renameSelectedSeat}><EditIcon /></IconButton>
    <IconButton label={i18n("toolbar.removeSeat", language)} onClick={removeSeat}><TrashIcon /></IconButton>
    <IconButton label={i18n("toolbar.cancel", language)} onClick={cancelAction}><CrossIcon /></IconButton>
  </div>
}