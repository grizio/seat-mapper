import {Component, h} from "preact"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {Direction, generateSeatGrid, Order} from "utils/generators"
import RadioField from "../form/RadioField"
import NumberField from "../form/NumberField"
import StringField from "../form/StringField"
import {Type} from "../../models/Type"
import {defaultSeatHeight, defaultSeatWidth} from "../../models/Seat"
import i18n, { Language } from "../../i18n"

interface Props {
  language: Language | undefined
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
  seatWidth: number
  seatHeight: number
}

export default function addGridModal(types: Array<Type>, language: Language | undefined): Promise<State> {
  return promisedModal(AddGridModal, {types, language})
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
      type: props.types[0].id,
      seatWidth: defaultSeatWidth,
      seatHeight: defaultSeatHeight
    }
  }

  render(props: Props, state: State) {
    return (
      <Modal title={i18n("addGridModal.title", props.language)} onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="row">
          <div class="col">
            <NumberField name="add-grid-number-of-rows"
                         label={i18n("addGridModal.numberOfRows", props.language)}
                         min={1}
                         value={state.numberOfRows}
                         onChange={this.updateNumberOfRows}/>

            <NumberField name="add-grid-number-of-columns"
                         label={i18n("addGridModal.numberOfColumns", props.language)}
                         min={1}
                         value={state.numberOfColumns}
                         onChange={this.updateNumberOfColumns}/>

            <NumberField name="add-grid-column-spacing"
                         label={i18n("addGridModal.columnSpacing", props.language)}
                         min={0}
                         value={state.columnSpacing}
                         onChange={this.updateColumnSpacing}/>

            <NumberField name="add-grid-row-spacing"
                         label={i18n("addGridModal.rowSpacing", props.language)}
                         min={0}
                         value={state.rowSpacing}
                         onChange={this.updateRowSpacing}/>

            <NumberField name="add-grid-shift"
                         label={i18n("addGridModal.shift", props.language)}
                         min={0}
                         value={state.shift}
                         onChange={this.updateShift}/>

            <StringField name="add-grid-first-letter"
                         label={i18n("addGridModal.firstLetter", props.language)}
                         value={state.firstLetter}
                         onChange={this.updateFirstLetter}/>

            <NumberField name="add-grid-first-number"
                         label={i18n("addGridModal.firstNumber", props.language)}
                         min={0}
                         value={state.firstNumber}
                         onChange={this.updateFirstNumber}/>

            <RadioField name="add-grid-letter-direction"
                        label={i18n("addGridModal.letterDirection", props.language)}
                        options={[
                          {label: i18n("addGridModal.letterDirection.horizontal", props.language), value: "horizontal"},
                          {label: i18n("addGridModal.letterDirection.vertical", props.language), value: "vertical"}
                        ]}
                        value={state.letterDirection}
                        onChange={this.updateLetterDirection}/>

            <RadioField name="add-grid-letter-order"
                        label={i18n("addGridModal.letterOrder", props.language)}
                        options={[
                          {label: i18n("addGridModal.letterOrder.ascending", props.language), value: "ascending"},
                          {label: i18n("addGridModal.letterOrder.descending", props.language), value: "descending"}
                        ]}
                        value={state.letterOrder}
                        onChange={this.updateLetterOrder}/>

            <RadioField name="add-grid-number-order"
                        label={i18n("addGridModal.numberOrder", props.language)}
                        options={[
                          {label: i18n("addGridModal.numberOrder.ascending", props.language), value: "ascending"},
                          {label: i18n("addGridModal.numberOrder.descending", props.language), value: "descending"}
                        ]}
                        value={state.numberOrder}
                        onChange={this.updateNumberOrder}/>

            <RadioField name="add-grid-type"
                        label={i18n("addGridModal.type", props.language)}
                        options={
                          props.types.map(type => ({
                            label: type.name,
                            value: type.id.toString()
                          }))
                        }
                        value={state.type.toString()}
                        onChange={this.updateType}/>

            <NumberField name="add-grid-seat-width"
                         label={i18n("addGridModal.seatWidth", props.language)}
                         min={0}
                         value={state.seatWidth}
                         onChange={this.updateSeatWidth}/>

            <NumberField name="add-grid-seat-height"
                         label={i18n("addGridModal.seatHeight", props.language)}
                         min={0}
                         value={state.seatHeight}
                         onChange={this.updateSeatHeight}/>
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

  updateSeatWidth = (seatWidth: number) => this.setState({seatWidth})

  updateSeatHeight = (seatHeight: number) => this.setState({seatHeight})

  updateType = (type: string) => this.setState({type: parseInt(type, 10)})

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}