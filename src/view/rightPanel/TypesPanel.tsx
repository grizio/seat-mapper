import i18n from 'i18n'
import {h} from "preact"
import IconButton from "view/buttons/IconButton"
import {AddIcon, TrashIcon} from "view/icons"
import {Type} from "models/Type"
import StringField from "view/form/StringField"
import RadioField from "view/form/RadioField"
import ColorField from "view/form/ColorField"
import NumberField from "view/form/NumberField"
import {State} from "store/State"

interface Props {
  state: State
  addType: () => void
  updateType: (type: Type) => void
  removeType: (id: number) => void
}

export default function TypesPanel(props: Props) {
  return (
    <div className="right-panel">
      <h3>{i18n("rightPanel.typesOfSeats", props.state.language)}</h3>
      {props.state.structure.types.map(_ => TypeDetails(_, props))}
      <section>
        <IconButton label={i18n("rightPanel.newType", props.state.language)} onClick={props.addType}>
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
                   label={i18n("rightPanel.typeName", props.state.language)}
                   value={type.name}
                   onChange={name => props.updateType({...type, name})}/>

      <RadioField name={`right-panel-type-${type.id}-figure`}
                  label={i18n("rightPanel.figure", props.state.language)}
                  options={[
                    {label: i18n("rightPanel.figure.rectangle", props.state.language), value: "rectangle"},
                    {label: i18n("rightPanel.figure.circle", props.state.language), value: "circle"}
                  ]}
                  value={type.figure}
                  onChange={figure => props.updateType({...type, figure})}/>

      <ColorField name={`right-panel-type-${type.id}-border-color`}
                  label={i18n("rightPanel.borderColor", props.state.language)}
                  value={type.borderColor}
                  onChange={borderColor => props.updateType({...type, borderColor})}/>

      <NumberField name={`right-panel-type-${type.id}-border-width`}
                   label={i18n("rightPanel.borderWidth", props.state.language)}
                   value={type.borderWidth}
                   onChange={borderWidth => props.updateType({...type, borderWidth})}/>

      <RadioField name={`right-panel-type-${type.id}-bookable`}
                  label={i18n("rightPanel.bookable", props.state.language)}
                  options={[
                    {label: i18n("rightPanel.bookable.true", props.state.language), value: "true"},
                    {label: i18n("rightPanel.bookable.false", props.state.language), value: "false"}
                  ]}
                  value={type.bookable.toString()}
                  onChange={bookable => props.updateType({...type, bookable: bookable === "true"})}/>

    </details>
  )
}