import {Component, ComponentChildren, ComponentFactory, h, render} from "preact"
import {renderStyles} from "utils/styles"
import {formStyles} from "../form/formStyles"

interface ComponentFactoryLifecycle<Output> {
  onSubmit: (output: Output) => void
  onCancel: () => void
}

export function promisedModal<Input, Output>(componentFactory: ComponentFactory<ComponentFactoryLifecycle<Output> & Input>, input: Input): Promise<Output> {
  return new Promise<Output>(((resolve, reject) => {
    const modalContainerNode = document.createElement("div")
    const shadow = modalContainerNode.attachShadow({mode: "open"})
    document.body.appendChild(modalContainerNode)

    const close = () => document.body.removeChild(modalContainerNode)
    const onSubmit = (output: Output) => {
      close()
      resolve(output)
    }
    const onCancel = () => {
      close()
      reject()
    }

    const modal = (
      h(
        "div",
        {},
        h('style', {}, renderStyles({
          ".modal": {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          },

          ".container": {
            backgroundColor: "white"
          },

          ".title": {
            margin: 0,
            padding: "15px",
            borderBottom: "1px solid #ccc"
          },

          ".body": {
            margin: 0,
            padding: "15px"
          },

          ".footer": {
            margin: 0,
            padding: "15px",
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #ccc"
          },

          ".row": {
            display: "flex"
          },

          ".col": {
            maxHeight: "510px",
            overflow: "auto"
          },

          ...formStyles
        })),
        h(componentFactory, Object.assign({}, {onSubmit, onCancel}, input))
      )
    )
    render(modal, shadow)
  }))
}

interface Props {
  title: string
  children: ComponentChildren
  onSubmit: () => void
  onCancel: () => void
}

interface State {

}

export class Modal extends Component<Props, State> {
  componentDidMount() {
    if (this.base) {
      // To activate onKeyPress and escape key
      (this.base as HTMLDivElement).focus()
    }
  }

  render(props: Props) {
    return (
      <div class="modal" onClick={props.onCancel} tabIndex={-1} onKeyPress={this.onKeyPress}>
        <div class="container" onClick={this.stopPropagation}>
          <h4 class="title">{props.title}</h4>

          <div class="body">
            {props.children}
          </div>

          <div class="footer">
            <button type="submit" onClick={props.onSubmit}>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  stopPropagation = (event: Event) => event.stopPropagation()

  onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.props.onCancel()
    }
  }
}