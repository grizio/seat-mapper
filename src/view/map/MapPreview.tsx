import {h} from "preact"
import {Structure} from "models/Structure"
import {defaultSeatType} from "models/Type"
import {containingZone} from "models/geometry"
import {seatToZone, zoneToRect} from "models/adapters"
import {SeatRender} from "./SeatRender"

export interface Props {
  structure: Structure
  width?: number
  height?: number
  preserveAspectRatio?: string
}

export default function MapPreview({structure, width, height, preserveAspectRatio}: Props) {
  const zone = containingZone(structure.seats.map(seat => seatToZone(seat, structure.types.find(_ => _.id === seat.type))))
  const rect = zoneToRect(zone)

  return <svg class="map preview"
              viewBox={`${rect.x} ${rect.y} ${rect.width} ${rect.height}`}
              width={width} height={height} preserveAspectRatio={preserveAspectRatio || "xMidYMid meet"}>
    <g>
      {
        structure.seats.map(seat => (
          <SeatRender
            seat={seat}
            type={structure.types.find(_ => _.id === seat.type) || defaultSeatType()}
          />
        ))
      }
    </g>
  </svg>
}