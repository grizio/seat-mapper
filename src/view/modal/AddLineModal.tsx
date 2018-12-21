import {Component, h} from "preact"
import Preview from "./Preview"
import {Modal, promisedModal} from "./Modal"
import {Changing, Direction, generateSeatLine, Order} from "../../utils/generators"
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
  direction: Direction
  numberOfSeats: number
  spacing: number
  firstLetter: string
  firstNumber: number
  changing: Changing
  order: Order
  type: number
}

export default function addLineModal(types: Array<Type>): Promise<State> {
  return promisedModal(AddLineModal, {types})
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
      type: props.types[0].id
    }
  }

  render(props: Props, state: State) {
    return (
      <Modal title="Add a line of seats" onSubmit={this.onSubmit} onCancel={this.onCancel}>
        <div class="row">
          <div class="col">
            <RadioField name="add-line-direction"
                        label="Direction"
                        options={[
                          {label: "Horizontal", value: "horizontal"},
                          {label: "Vertical", value: "vertical"}
                        ]}
                        value={state.direction}
                        onChange={this.updateDirection}/>

            <NumberField name="add-line-number-of-seats"
                         label="Number of seats"
                         min={1}
                         value={state.numberOfSeats}
                         onChange={this.updateNumberOfSeats}/>

            <NumberField name="add-line-spacing"
                         label="Spacing between seats"
                         min={0}
                         value={state.spacing}
                         onChange={this.updateSpacing}/>

            <StringField name="add-line-first-letter"
                         label="First letter"
                         value={state.firstLetter}
                         onChange={this.updateFirstLetter}/>

            <NumberField name="add-line-first-number"
                         label="First number"
                         min={0}
                         value={state.firstNumber}
                         onChange={this.updateFirstNumber}/>
            
            <RadioField name="add-line-changing"
                        label="Changing"
                        options={[
                          {label: "Letter", value: "letter"},
                          {label: "Number", value: "number"}
                        ]}
                        value={state.changing}
                        onChange={this.updateChanging}/>

            <RadioField name="add-line-order"
                        label="Order"
                        options={[
                          {label: "Ascending", value: "ascending"},
                          {label: "Descending", value: "descending"}
                        ]}
                        value={state.order}
                        onChange={this.updateOrder}/>

            <RadioField name="add-line-type"
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

  onSubmit = () => this.props.onSubmit(this.state)

  onCancel = () => this.props.onCancel()
}