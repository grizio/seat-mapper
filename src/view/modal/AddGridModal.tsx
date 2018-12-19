import {Component, h} from "preact"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {Direction, generateSeatGrid, Order} from "utils/generators"

interface Props {
  onSubmit: (state: State) => void
  onCancel: () => void
}

interface State {
  numberOfRows: number
  numberOfColumns: number
  columnSpacing: number
  rowSpacing: number
  shift: number
  firstLetter: string
  firstNumber: number
  letterDirection: Direction
  letterOrder: Order
  numberOrder: Order
}

export default function addGridModal(): Promise<State> {
  return promisedModal(AddGridModal)
}

class AddGridModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      numberOfRows: 1,
      numberOfColumns: 1,
      columnSpacing: 0,
      rowSpacing: 0,
      shift: 0,
      firstLetter: "A",
      firstNumber: 1,
      letterDirection: "horizontal",
      letterOrder: "ascending",
      numberOrder: "ascending"
    }
  }

  render(_: Props, state: State) {
    return (
      <Modal title="Add a grid of seats" onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="row">
          <div class="col">
            <div class="field">
              <p class="field-label">
                <label for="add-grid-number-of-rows">Number of rows</label>
              </p>

              <p>
                <input type="number" name="add-grid-number-of-rows" id="add-line-number-of-rows" min="1"
                       value={state.numberOfRows.toString()}
                       onInput={this.updateNumberOfRows}/>
              </p>
            </div>

            <div class="field">
              <p class="field-label">
                <label for="add-grid-number-of-columns">Number of seats per row</label>
              </p>

              <p>
                <input type="number" name="add-grid-number-of-columns" id="add-grid-number-of-columns" min="1"
                       value={state.numberOfColumns.toString()}
                       onInput={this.updateNumberOfColumns}/>
              </p>
            </div>

            <div class="field">
              <p class="field-label">
                <label for="add-grid-column-spacing">Spacing between two rows</label>
              </p>

              <p>
                <input type="number" name="add-grid-column-spacing" id="add-grid-column-spacing" min="0"
                       value={state.columnSpacing.toString()}
                       onInput={this.updateColumnSpacing}/>
              </p>
            </div>

            <div class="field">
              <p class="field-label">
                <label for="add-grid-row-spacing">Spacing between two seats in a row</label>
              </p>

              <p>
                <input type="number" name="add-grid-row-spacing" id="add-grid-row-spacing" min="0"
                       value={state.rowSpacing.toString()}
                       onInput={this.updateRowSpacing}/>
              </p>
            </div>

            <div class="field">
              <p class="field-label">
                <label for="add-grid-shift">Shift between two rows</label>
              </p>

              <p>
                <input type="number" name="add-grid-shift" id="add-grid-shift" min="0"
                       value={state.shift.toString()}
                       onInput={this.updateShift}/>
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
              <p class="field-label">Letter direction</p>
              <label>
                <input type="radio" name="add-line-letter-direction" value="horizontal"
                       checked={state.letterDirection === "horizontal"}
                       onChange={this.updateLetterDirection}/>
                Horizontal
              </label>
              <label>
                <input type="radio" name="add-line-letter-direction" value="vertical"
                       checked={state.letterDirection === "vertical"}
                       onChange={this.updateLetterDirection}/>
                Vertical
              </label>
            </div>

            <div class="field">
              <p class="field-label">Letter order</p>
              <label>
                <input type="radio" name="add-line-letter-order" value="ascending"
                       checked={state.letterOrder === "ascending"}
                       onChange={this.updateLetterOrder}/>
                Ascending
              </label>
              <label>
                <input type="radio" name="add-line-letter-order" value="descending"
                       checked={state.letterOrder === "descending"}
                       onChange={this.updateLetterOrder}/>
                Descending
              </label>
            </div>

            <div class="field">
              <p class="field-label">Number order</p>
              <label>
                <input type="radio" name="add-line-number-order" value="ascending"
                       checked={state.numberOrder === "ascending"}
                       onChange={this.updateNumberOrder}/>
                Ascending
              </label>
              <label>
                <input type="radio" name="add-line-number-order" value="descending"
                       checked={state.numberOrder === "descending"}
                       onChange={this.updateNumberOrder}/>
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
    return <Preview seats={generateSeatGrid(state)}/>
  }

  updateNumberOfRows = (event: Event) => {
    this.setState({numberOfRows: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateNumberOfColumns = (event: Event) => {
    this.setState({numberOfColumns: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateColumnSpacing = (event: Event) => {
    this.setState({columnSpacing: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateRowSpacing = (event: Event) => {
    this.setState({rowSpacing: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateShift = (event: Event) => {
    this.setState({shift: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateFirstLetter = (event: Event) => {
    this.setState({firstLetter: (event.target as HTMLInputElement).value})
  }

  updateFirstNumber = (event: Event) => {
    this.setState({firstNumber: parseInt((event.target as HTMLInputElement).value, 10)})
  }

  updateLetterDirection = (event: Event) => {
    this.setState({letterDirection: (event.target as HTMLInputElement).value as Direction})
  }

  updateLetterOrder = (event: Event) => {
    this.setState({letterOrder: (event.target as HTMLInputElement).value as Order})
  }

  updateNumberOrder = (event: Event) => {
    this.setState({numberOrder: (event.target as HTMLInputElement).value as Order})
  }

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}