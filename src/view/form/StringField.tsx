import {Component, h} from "preact"

interface Props {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
}

interface State {

}

export default class StringField extends Component<Props, State> {
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
          <input type="text" name={props.name} id={props.label}
                 value={props.value}
                 onInput={this.onInput}/>
        </p>
      </div>
    )
  }

  onInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    this.props.onChange(input.value)
  }
}