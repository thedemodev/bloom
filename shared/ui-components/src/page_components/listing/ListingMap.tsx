import * as React from "react"
import ReactMapGL, { Marker } from "react-map-gl"
import { Address } from "@bloom-housing/core"
import "./ListingMap.scss"
import { MultiLineAddress } from "../../helpers/address"
import { Listing } from "@bloom-housing/core"
export interface ListingMapProps {
  address: Address
  listing: Listing
}

export interface Viewport {
  width: string | number
  height: string | number
  latitude: number
  longitude: number
  zoom: number
}

const ListingMap = (props: ListingMapProps) => {
  const address = props.address
  const [viewport, setViewPort] = React.useState({
    latitude: address.latitude,
    longitude: address.longitude,
    zoom: 8,
  } as Viewport)
  const _onViewportChange = (viewport: Viewport) => {
    // width and height need to be set here to work properly with
    // the responsive wrappers
    viewport.width = "100%"
    viewport.height = 400
    setViewPort({ ...viewport })
  }

  return (
    <>
      <div className="addressPopup">
        <h3 className="text-caps-tiny">{props.listing.name}</h3>
        <MultiLineAddress address={address} />
      </div>
      <ReactMapGL
        mapboxApiAccessToken={process.env.mapBoxToken || process.env.MAPBOX_TOKEN}
        onViewportChange={_onViewportChange}
        {...viewport}
      >
        <Marker
          latitude={props.address.latitude}
          longitude={props.address.longitude}
          offsetTop={-20}
        >
          <div className="pin"></div>
        </Marker>
      </ReactMapGL>
    </>
  )
}
export { ListingMap as default, ListingMap }
