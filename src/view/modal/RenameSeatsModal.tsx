import {Component, h} from "preact"
import {Modal, promisedModal} from "./Modal"
import {Seat} from "../../models/Seat"

interface Props {
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

export default function renameSeatsModal(seats: Array<Seat>): Promise<State> {
  return promisedModal(RenameSeatsModal, {seats})
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

  render(_: Props, state: State) {
    return (
      <Modal title="Update seat names" onSubmit={this.onSubmit} onCancel={this.onCancel}>
        {
          state.seats.map(seat => (
            <div class="field">
              <p class="field-label">
                <label for={`rename-seat-${seat.id}`}>{seat.initialName}</label>
              </p>

              <p>
                <input type="string" name={`rename-seat-${seat.id}`} id={`rename-seat-${seat.id}`}
                       value={seat.name} data-seat-id={seat.id}
                       onInput={this.updateSeatName}/>
              </p>
            </div>
          ))
        }
      </Modal>
    )
  }

  updateSeatName = (event: Event) => {
    const input = event.target as HTMLInputElement
    const dataSeatId = input.getAttribute("data-seat-id")
    const id = dataSeatId !== null ? parseInt(dataSeatId, 10) : undefined
    if (id) {
      this.setState({
        seats: this.state.seats.map(seat => {
          if (seat.id === id) {
            return {...seat, name: input.value}
          } else {
            return seat
          }
        })
      })
    }
  }

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}