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
  numberOfRows: number
  numberOfColumns: number
  columnSpacing: number
  rowSpacing: number
  shift: number
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
      shift: 0
    }
  }

  render(_: Props, state: State) {
    return (
      <Modal title="Add a grid of seats" onSubmit={this.onSubmit} onCancel={this.onCancel}>
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

        {this.renderPreview(state)}
      </Modal>
    )
  }

  renderPreview(state: State) {
    return <Preview seats={
      arrayFill(state.numberOfRows, (rowIndex) => {
        return arrayFill(state.numberOfColumns, (columnIndex) => {
          return {
            id: -1,
            name: "",
            x: (seatWidth + state.rowSpacing) * columnIndex + (rowIndex * (state.shift) % (seatWidth + state.rowSpacing)),
            y: (seatHeight + state.columnSpacing) * rowIndex
          }
        })
      }).flat()
    }/>
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

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}