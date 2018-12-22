import {Component, h} from "preact"

interface Props<A extends string> {
  name: string
  label: string
  options: Array<{
    label: string
    value: A
  }>
  value: string
  onChange: (value: A) => void
}

interface State {

}

export default class RadioField<A extends string> extends Component<Props<A>, State> {
  constructor(props: Props<A>) {
    super(props)
  }

  render(props: Props<A>) {
    return (
      <div class="field">
        <p class="field-label">{props.label}</p>

        <p class="field-input radio">
          {
            props.options.map(option => (
              <label>
                <input type="radio" name={props.name} value={option.value}
                       checked={props.value === option.value}
                       onChange={this.onChange}/>
                {option.label}
              </label>
            ))
          }
        </p>
      </div>
    )
  }

  onChange = (event: Event) => {
    this.props.onChange((event.target as HTMLInputElement).value as A)
  }
}