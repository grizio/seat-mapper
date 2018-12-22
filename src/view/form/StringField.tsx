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
        <label for={props.name} class="field-label">{props.label}</label>

        <p class="field-input">
          <input type="text" name={props.name} id={props.name}
                 value={props.value}
                 onInput={this.onInput}
                 onKeyPress={this.onKeyPress}/>
        </p>
      </div>
    )
  }

  onInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    this.props.onChange(input.value)
  }

  onKeyPress = (event: Event) => event.stopPropagation()
}