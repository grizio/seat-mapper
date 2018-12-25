import {Component, h} from "preact"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {Changing, Direction, generateSeatLine, Order} from "../../utils/generators"
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
  direction: Direction
  numberOfSeats: number
  spacing: number
  firstLetter: string
  firstNumber: number
  changing: Changing
  order: Order
  type: number
  seatWidth: number
  seatHeight: number
}

export default function addLineModal(types: Array<Type>, language: Language | undefined): Promise<State> {
  return promisedModal(AddLineModal, {types, language})
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
      order: "ascending",
      type: props.types[0].id,
      seatWidth: defaultSeatWidth,
      seatHeight: defaultSeatHeight
    }
  }

  render(props: Props, state: State) {
    return (
      <Modal title={i18n("addLineModal.title", props.language)} onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="row">
          <div class="col">
            <RadioField name="add-line-direction"
                        label={i18n("addLineModal.direction", props.language)}
                        options={[
                          {label: i18n("addLineModal.direction.horizontal", props.language), value: "horizontal"},
                          {label: i18n("addLineModal.direction.vertical", props.language), value: "vertical"}
                        ]}
                        value={state.direction}
                        onChange={this.updateDirection}/>

            <NumberField name="add-line-number-of-seats"
                         label={i18n("addLineModal.numberOfSeats", props.language)}
                         min={1}
                         value={state.numberOfSeats}
                         onChange={this.updateNumberOfSeats}/>

            <NumberField name="add-line-spacing"
                         label={i18n("addLineModal.spacing", props.language)}
                         min={0}
                         value={state.spacing}
                         onChange={this.updateSpacing}/>

            <StringField name="add-line-first-letter"
                         label={i18n("addLineModal.firstLetter", props.language)}
                         value={state.firstLetter}
                         onChange={this.updateFirstLetter}/>

            <NumberField name="add-line-first-number"
                         label={i18n("addLineModal.firstNumber", props.language)}
                         min={0}
                         value={state.firstNumber}
                         onChange={this.updateFirstNumber}/>
            
            <RadioField name="add-line-changing"
                        label={i18n("addLineModal.changing", props.language)}
                        options={[
                          {label: i18n("addLineModal.changing.letter", props.language), value: "letter"},
                          {label: i18n("addLineModal.changing.number", props.language), value: "number"}
                        ]}
                        value={state.changing}
                        onChange={this.updateChanging}/>

            <RadioField name="add-line-order"
                        label={i18n("addLineModal.order", props.language)}
                        options={[
                          {label: i18n("addLineModal.order.ascending", props.language), value: "ascending"},
                          {label: i18n("addLineModal.order.descending", props.language), value: "descending"}
                        ]}
                        value={state.order}
                        onChange={this.updateOrder}/>

            <RadioField name="add-line-type"
                        label={i18n("addLineModal.type", props.language)}
                        options={
                          props.types.map(type => ({
                            label: type.name,
                            value: type.id.toString()
                          }))
                        }
                        value={state.type.toString()}
                        onChange={this.updateType}/>

            <NumberField name="add-line-seat-width"
                         label={i18n("addLineModal.seatWidth", props.language)}
                         min={0}
                         value={state.seatWidth}
                         onChange={this.updateSeatWidth}/>

            <NumberField name="add-line-seat-height"
                         label={i18n("addLineModal.seatHeight", props.language)}
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
    return <Preview seats={generateSeatLine(state)} types={props.types} />
  }

  updateDirection = (direction: Direction) => this.setState({direction})

  updateNumberOfSeats = (numberOfSeats: number) => this.setState({numberOfSeats})

  updateSpacing = (spacing: number) => this.setState({spacing})

  updateFirstLetter = (firstLetter: string) => this.setState({firstLetter})

  updateFirstNumber = (firstNumber: number) => this.setState({firstNumber})

  updateChanging = (changing: Changing) => this.setState({changing})

  updateOrder = (order: Order) => this.setState({order})

  updateType = (type: string) => this.setState({type: parseInt(type, 10)})

  updateSeatWidth = (seatWidth: number) => this.setState({seatWidth})

  updateSeatHeight = (seatHeight: number) => this.setState({seatHeight})

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}