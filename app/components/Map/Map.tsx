'use client'

import { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import Cookies from 'js-cookie'

const geoUrl =
  "https://gist.githubusercontent.com/jeremycflin/b43ab253f3ae02dced07/raw/8e7e38b28c247610939427008451ec18463d2b8e/world_countries.json"

export default function MapChart() {
  const [clickedIds, setClickedIds] = useState<string[]>([]);
  const [position, setPosition] = useState<{coordinates: [number,number]; zoom: number}>({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  useEffect(() => {
    const clickedIds = Cookies.get('clickedIds');
    if (clickedIds) {
      setClickedIds(JSON.parse(clickedIds));
    }
  }, [])

  const handleCountryClick = (geo: any) => {
    console.log(geo)
    let newClickedIds: string[] = [];

    if (clickedIds.includes(geo.id)) {
      newClickedIds = clickedIds.filter((id) => id !== geo.id);
      setClickedIds(newClickedIds);
    } else {
      newClickedIds = [...clickedIds, geo.id]
      setClickedIds(newClickedIds);
    }

    //set cookies
    Cookies.set('clickedIds', JSON.stringify(newClickedIds), { expires: 365 })
  }

  return (
    <>
    <ComposableMap className="h-full" viewBox="0 0 943 467">
      <rect x="0" y="0" width="943" height="468" fill="#0891b2" ></rect>
      <ZoomableGroup
        zoom={position.zoom}
        center={position.coordinates}
        translateExtent={[[0,0],[943,467]]}
      >
        <Geographies geography={geoUrl} transform="translate(70, -67.67)">
          {({ geographies }) =>
            geographies.map((geo) => {
              const isClicked = clickedIds.includes(geo.id);
              const fillColor = isClicked ? '#4d7c0f' : '#ecfccb';

              return (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo}   
                  fill={fillColor}
                  stroke="#000000"
                  strokeWidth="0.5"
                  className="hover:cursor-pointer"
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: `${isClicked == true ? '' : '#84cc16'}`},
                    pressed: { outline: 'none', fill: `${isClicked == true ? '#ecfccb' : '#4d7c0f'}`},
                  }}
                  onClick={() => handleCountryClick(geo)}
                >
                  <title>{geo.properties.name}</title>
                </Geography>
              )
          })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
    </>
    
  )
}

{/*
<ZoomableGroup
zoom={position.zoom}
center={position.coordinates}
>
  <Geographies>
    ...
  </Geographies>
</ZoomableGroup>
*/}