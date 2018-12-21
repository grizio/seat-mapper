import {Component, h} from "preact"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {Direction, generateSeatGrid, Order} from "utils/generators"
import RadioField from "../form/RadioField"
import NumberField from "../form/NumberField"
import StringField from "../form/StringField"
import {Type} from "../../models/Type"

interface Props {
  types: Array<Type>
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
  type: number
}

export default function addGridModal(types: Array<Type>): Promise<State> {
  return promisedModal(AddGridModal, {types})
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
      numberOrder: "ascending",
      type: props.types[0].id
    }
  }

  render(props: Props, state: State) {
    return (
      <Modal title="Add a grid of seats" onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="row">
          <div class="col">
            <NumberField name="add-grid-number-of-rows"
                         label="Number of rows"
                         min={1}
                         value={state.numberOfRows}
                         onChange={this.updateNumberOfRows}/>

            <NumberField name="add-grid-number-of-columns"
                         label="Number of seats per row"
                         min={1}
                         value={state.numberOfColumns}
                         onChange={this.updateNumberOfColumns}/>

            <NumberField name="add-grid-column-spacing"
                         label="Spacing between two rows"
                         min={0}
                         value={state.columnSpacing}
                         onChange={this.updateColumnSpacing}/>

            <NumberField name="add-grid-row-spacing"
                         label="Spacing between two seats in a row"
                         min={0}
                         value={state.rowSpacing}
                         onChange={this.updateRowSpacing}/>

            <NumberField name="add-grid-shift"
                         label="Shift between two rows"
                         min={0}
                         value={state.shift}
                         onChange={this.updateShift}/>

            <StringField name="add-grid-first-letter"
                         label="First letter"
                         value={state.firstLetter}
                         onChange={this.updateFirstLetter}/>

            <NumberField name="add-grid-first-number"
                         label="First number"
                         min={0}
                         value={state.firstNumber}
                         onChange={this.updateFirstNumber}/>

            <RadioField name="add-grid-letter-direction"
                        label="Letter direction"
                        options={[
                          {label: "Horizontal", value: "horizontal"},
                          {label: "Vertical", value: "vertical"}
                        ]}
                        value={state.letterDirection}
                        onChange={this.updateLetterDirection}/>

            <RadioField name="add-grid-letter-order"
                        label="Letter order"
                        options={[
                          {label: "Ascending", value: "ascending"},
                          {label: "Descending", value: "descending"}
                        ]}
                        value={state.letterOrder}
                        onChange={this.updateLetterOrder}/>

            <RadioField name="add-grid-number-order"
                        label="Number order"
                        options={[
                          {label: "Ascending", value: "ascending"},
                          {label: "Descending", value: "descending"}
                        ]}
                        value={state.numberOrder}
                        onChange={this.updateNumberOrder}/>

            <RadioField name="add-grid-type"
                        label="Type"
                        options={
                          props.types.map(type => ({
                            label: type.name,
                            value: type.id.toString()
                          }))
                        }
                        value={state.type.toString()}
                        onChange={this.updateType}/>
          </div>

          <div class="col">
            {this.renderPreview(props, state)}
          </div>
        </div>
      </Modal>
    )
  }

  renderPreview(props: Props, state: State) {
    return <Preview seats={generateSeatGrid(state)} types={props.types}/>
  }

  updateNumberOfRows = (numberOfRows: number) => this.setState({numberOfRows})

  updateNumberOfColumns = (numberOfColumns: number) => this.setState({numberOfColumns})

  updateColumnSpacing = (columnSpacing: number) => this.setState({columnSpacing})

  updateRowSpacing = (rowSpacing: number) => this.setState({rowSpacing})

  updateShift = (shift: number) => this.setState({shift})

  updateFirstLetter = (firstLetter: string) => this.setState({firstLetter})

  updateFirstNumber = (firstNumber: number) => this.setState({firstNumber})

  updateLetterDirection = (letterDirection: Direction) => this.setState({letterDirection})

  updateLetterOrder = (letterOrder: Order) => this.setState({letterOrder})

  updateNumberOrder = (numberOrder: Order) => this.setState({numberOrder})

  updateType = (type: string) => this.setState({type: parseInt(type, 10)})

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}