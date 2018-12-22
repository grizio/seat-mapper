import {h} from "preact"
import IconButton from "view/buttons/IconButton"
import {AddIcon, TrashIcon} from "icons"
import {Type} from "models/Type"
import StringField from "view/form/StringField"
import RadioField from "view/form/RadioField"
import ColorField from "view/form/ColorField"
import NumberField from "view/form/NumberField"
import {State} from "../../store/State"

interface Props {
  state: State
  addType: () => void
  updateType: (type: Type) => void
  removeType: (id: number) => void
}

export default function TypesPanel(props: Props) {
  return (
    <div className="right-panel">
      <h3>Types of seats</h3>
      {props.state.structure.types.map(_ => TypeDetails(_, props))}
      <section>
        <IconButton label="New type" onClick={props.addType}>
          <AddIcon/>
        </IconButton>
      </section>
    </div>
  )
}

function TypeDetails(type: Type, props: Props) {
  return (
    <details key={`type-${type.id.toString()}`}>
      <summary>
        {props.state.structure.types.length > 1
          ? (
            <IconButton label="Remove" onClick={() => props.removeType(type.id)}>
              <TrashIcon size="small"/>
            </IconButton>
          )
          : undefined}

        {type.name}
      </summary>

      <StringField name={`right-panel-type-${type.id}-name`}
                   label="Type name"
                   value={type.name}
                   onChange={name => props.updateType({...type, name})}/>

      <RadioField name={`right-panel-type-${type.id}-figure`}
                  label="Figure"
                  options={[
                    {label: "Rectangle", value: "rectangle"},
                    {label: "Circle", value: "circle"}
                  ]}
                  value={type.figure}
                  onChange={figure => props.updateType({...type, figure})}/>

      <ColorField name={`right-panel-type-${type.id}-border-color`}
                  label="Border color"
                  value={type.borderColor}
                  onChange={borderColor => props.updateType({...type, borderColor})}/>

      <NumberField name={`right-panel-type-${type.id}-border-width`}
                   label="Border width"
                   value={type.borderWidth}
                   onChange={borderWidth => props.updateType({...type, borderWidth})}/>

      <RadioField name={`right-panel-type-${type.id}-bookable`}
                  label="Bookable"
                  options={[
                    {label: "Yes", value: "true"},
                    {label: "No", value: "false"}
                  ]}
                  value={type.bookable.toString()}
                  onChange={bookable => props.updateType({...type, bookable: bookable === "true"})}/>


    </details>
  )
}