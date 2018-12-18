import {Component, h} from "preact"
import {seatHeight, seatWidth} from "models/Seat"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {arrayFill} from "../../utils/array"

interface Props {
  onSubmit: (state: State) => void
  onCancel: () => void
}

interface State {
  direction: string
  numberOfSeats: number
  spacing: number
}

export default function addLineModal(): Promise<State> {
  return promisedModal(AddLineModal)
}

class AddLineModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      direction: "horizontal",
      numberOfSeats: 1,
      spacing: 0
    }
  }

  render(_: Props, state: State) {
    return (
      <Modal title="Add a line of seats" onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="field">
          <p class="field-label">Direction</p>
          <label>
            <input type="radio" name="add-line-direction" value="horizontal"
                   checked={state.direction === "horizontal"}
                   onChange={this.updateDirection}/>
            Horizontal
          </label>
          <label>
            <input type="radio" name="add-line-direction" value="vertical"
                   checked={state.direction === "vertical"}
                   onChange={this.updateDirection}/>
            Vertical
          </label>
        </div>

        <div class="field">
          <p class="field-label">
            <label for="add-line-number-of-seats">Number of seats</label>
          </p>

          <p>
            <input type="number" name="add-line-number-of-seats" id="add-line-number-of-seats" min="1"
                   value={state.numberOfSeats.toString()}
                   onInput={this.updateNumberOfSeats}/>
          </p>
        </div>

        <div class="field">
          <p class="field-label">
            <label for="add-line-spacing">Spacing between seats</label>
          </p>

          <p>
            <input type="number" name="add-line-spacing" id="add-line-spacing" min="0"
                   value={state.spacing.toString()}
                   onInput={this.updateSpacing}/>
          </p>
        </div>

        {this.renderPreview(state)}
      </Modal>
    )
  }

  renderPreview(state: State) {
    const seats = state.direction === "horizontal"
      ? arrayFill(state.numberOfSeats, index => ({
        id: -1,
        name: "",
        x: (seatWidth + state.spacing) * index,
        y: 0
      }))
      : arrayFill(state.numberOfSeats, index => ({
        id: -1,
        name: "",
        x: 0,
        y: (seatHeight + state.spacing) * index
      }))

    return <Preview seats={seats}/>
  }

  updateDirection = (event: Event) => {
    this.setState({direction: (event.target as HTMLInputElement).value})
  }

  updateNumberOfSeats = (event: Event) => {
    this.setState({numberOfSeats: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateSpacing = (event: Event) => {
    this.setState({spacing: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}