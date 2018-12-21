import {Component, h} from "preact"

interface Props {
  name: string
  label: string
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
}

interface State {

}

export default class NumberField extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render(props: Props) {
    return (
      <div class="field">
        <p class="field-label">
          <label for={props.name}>{props.label}</label>
        </p>

        <p>
          <input type="number" name={props.name} id={props.name} min={props.min} max={props.max}
                 value={props.value.toString()}
                 onInput={this.onInput}/>
        </p>
      </div>
    )
  }

  onInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    const value = parseInt(input.value, 10)
    this.props.onChange(value)
  }
}