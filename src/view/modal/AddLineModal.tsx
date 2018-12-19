import {Component, h} from "preact"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {Changing, Direction, generateSeatLine, Order} from "../../utils/generators"

interface Props {
  onSubmit: (state: State) => void
  onCancel: () => void
}

interface State {
  direction: Direction
  numberOfSeats: number
  spacing: number
  firstLetter: string
  firstNumber: number
  changing: Changing
  order: Order
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
      spacing: 0,
      firstLetter: "A",
      firstNumber: 1,
      changing: "number",
      order: "ascending"
    }
  }

  render(_: Props, state: State) {
    return (
      <Modal title="Add a line of seats" onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="row">
          <div class="col">
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

            <div class="field">
              <p class="field-label">
                <label for="add-line-first-letter">First letter</label>
              </p>

              <p>
                <input type="text" name="add-line-first-letter" id="add-line-first-letter"
                       value={state.firstLetter}
                       onInput={this.updateFirstLetter}/>
              </p>
            </div>

            <div class="field">
              <p class="field-label">
                <label for="add-line-first-number">First number</label>
              </p>

              <p>
                <input type="number" name="add-line-first-number" id="add-line-first-number" min="0"
                       value={state.firstNumber.toString()}
                       onInput={this.updateFirstNumber}/>
              </p>
            </div>

            <div class="field">
              <p class="field-label">Changing</p>
              <label>
                <input type="radio" name="add-line-changing" value="letter"
                       checked={state.changing === "letter"}
                       onChange={this.updateChanging}/>
                Letter
              </label>
              <label>
                <input type="radio" name="add-line-changing" value="number"
                       checked={state.changing === "number"}
                       onChange={this.updateChanging}/>
                Number
              </label>
            </div>

            <div class="field">
              <p class="field-label">Order</p>
              <label>
                <input type="radio" name="add-line-order" value="ascending"
                       checked={state.order === "ascending"}
                       onChange={this.updateOrder}/>
                Ascending
              </label>
              <label>
                <input type="radio" name="add-line-order" value="descending"
                       checked={state.order === "descending"}
                       onChange={this.updateOrder}/>
                Descending
              </label>
            </div>
          </div>

          <div class="col">
            {this.renderPreview(state)}
          </div>
        </div>
      </Modal>
    )
  }

  renderPreview(state: State) {
    return <Preview seats={generateSeatLine(state)}/>
  }

  updateDirection = (event: Event) => {
    this.setState({direction: (event.target as HTMLInputElement).value as Direction})
  }

  updateNumberOfSeats = (event: Event) => {
    this.setState({numberOfSeats: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateSpacing = (event: Event) => {
    this.setState({spacing: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateFirstLetter = (event: Event) => {
    this.setState({firstLetter: (event.target as HTMLInputElement).value})
  }

  updateFirstNumber = (event: Event) => {
    this.setState({firstNumber: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateChanging = (event: Event) => {
    this.setState({changing: (event.target as HTMLInputElement).value as Changing})
  }

  updateOrder = (event: Event) => {
    this.setState({order: (event.target as HTMLInputElement).value as Order})
  }

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}