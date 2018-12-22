# Seat mapper

Simple seat mapper

## Getting started

### Install package

```bash
npm install seat-mapper
```

### Import it into your project

```javascript
// index.js | index.ts
import "seat-mapper"
```

### Use it

#### Raw HTML

```html
<!-- Declare the node -->
<seat-mapper></seat-mapper>

<script>
  document.querySelector("seat-mapper")
  .addEventListener("change", (event) => {
    // Log the result of the visible map, normalized
    console.log(event.structure)
  })
</script>
```

#### Preact

```jsx harmony
import {h} from "preact"

export function MyTheater(props) {
  return (
    <seat-mapper
      initialStructure={JSON.stringify(props.initialStructure)}
      version={props.version}
      onChange={(event) => console.log(event.structure)}
    />
  )
}
```

#### React

Events in React are not correctly handled.
You will need to create your own wrapper (not available for now).

### API

#### Attributes

Attribute         | Description
---               | ---
initial-structure | (Optional) The default structure of the map, got with event `change`
version           | (Optional) The version of the structure model got with event `change`

The `version` changes only the model of the returning structure.
It does not change the way the web-component works.
The `initial-structure` will always be translated into internal model whatever its version is.

#### Events

Event  | Description
---    | ---
change | Triggered each time the map is updated with the structure of the map (usable in attribute `initial-structure`)

## Development environment

```bash
npm install
npm start
```

Go to http://localhost:8080/ for the test page.

## Icons

Feather, by Cole Bemis: https://www.iconfinder.com/iconsets/feather