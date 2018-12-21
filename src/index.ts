import {h, render} from 'preact'
import MapCreator from 'view/MapCreator'
import {Seat} from "./models/Seat"

export class TheaterMapperChangeEvent extends Event {
  public readonly seats: ReadonlyArray<Readonly<Seat>>

  constructor(seats: Array<Seat>) {
    super("change")
    this.seats = Object.freeze([...seats.map(seat => ({...seat}))])
  }
}

customElements.define("theater-mapper", class extends HTMLElement {
  private readonly shadow: ShadowRoot
  private currentElement: Element | undefined

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return ["initial-seats"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    if (this.isConnected) {
      this.currentElement = render(h(MapCreator, this.getProps()), this.shadow, this.currentElement)
    }
  }

  getProps() {
    const initialSeatsAttribute = this.getAttribute("initial-seats")
    const initialSeats = initialSeatsAttribute !== null ? JSON.parse(initialSeatsAttribute) : undefined
    return {
      initialSeats: initialSeats,
      onChange: (seats: Array<Seat>) => {
        this.dispatchEvent(new TheaterMapperChangeEvent(seats || []))
      }
    }
  }
})