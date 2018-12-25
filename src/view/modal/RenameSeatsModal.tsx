import {Component, h} from "preact"
import {Modal, promisedModal} from "./Modal"
import {Seat} from "../../models/Seat"
import StringField from "../form/StringField"
import i18n, { Language } from "../../i18n"

interface Props {
  language: Language | undefined
  seats: Array<Seat>
  onSubmit: (state: State) => void
  onCancel: () => void
}

interface State {
  seats: Array<RenamingSeat>
}

interface RenamingSeat {
  id: number
  initialName: string
  name: string
}

export default function renameSeatsModal(seats: Array<Seat>, language: Language | undefined): Promise<State> {
  return promisedModal(RenameSeatsModal, {seats, language})
}

class RenameSeatsModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      seats: props.seats.map(seat => ({
        id: seat.id,
        name: seat.name,
        initialName: seat.name
      }))
    }
  }

  render(props: Props, state: State) {
    return (
      <Modal title={i18n("renameSeatsModal.title", props.language)} onSubmit={this.onSubmit} onCancel={this.onCancel}>
        {
          state.seats.map(seat => (
            <StringField name={`rename-seat-${seat.id}`}
                         label={seat.initialName}
                         value={seat.name}
                         onChange={value => this.updateSeatName(seat.id, value)}/>
          ))
        }
      </Modal>
    )
  }

  updateSeatName = (id: number, name: string) => {
    this.setState({
      seats: this.state.seats.map(seat => {
        if (seat.id === id) {
          return {...seat, name}
        } else {
          return seat
        }
      })
    })
  }

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}