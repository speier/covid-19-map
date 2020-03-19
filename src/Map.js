import * as React from 'react'
import { LayerEvent, MapboxScene, PointLayer, Popup } from '@antv/l7-react'
import { mapData } from './utils'

// consider deck.gl:
// https://raw.githubusercontent.com/uber/deck.gl/master/examples/website/map-tile/app.js

export function Map({ dataUrls }) {
  const [data, setData] = React.useState()
  const [popupInfo, setPopupInfo] = React.useState()

  React.useEffect(() => {
    const fetchData = async () => {
      const [confirmed, deaths, recovered] = await Promise.all([
        fetch(dataUrls.confirmed).then(d => d.text()),
        fetch(dataUrls.deaths).then(d => d.text()),
        fetch(dataUrls.recovered).then(d => d.text())
      ])
      setData(mapData(confirmed, deaths, recovered))
    }
    fetchData()
  }, [dataUrls])

  function showPopup(args) {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature
    })
  }

  return (
    <>
      <MapboxScene
        option={{
          logoVisible: false
        }}
        map={{
          center: [110.19382669582967, 50.258134],
          pitch: 0,
          style: 'dark',
          zoom: 1
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {popupInfo && (
          <Popup lnglat={popupInfo.lnglat}>
            {
              (popupInfo.feature.country && popupInfo.feature.state)
                ? (<div>{popupInfo.feature.country}, {popupInfo.feature.state}</div>)
                : (<div>{popupInfo.feature.country}</div>)
            }
            <ul style={{ margin: 0 }}>
              <li>Confirmed: {popupInfo.feature.confirmedCount}</li>
              <li>Deaths: {popupInfo.feature.deathsCount}</li>
              <li>Recovered: {popupInfo.feature.recoveredCount}</li>
              <li>Active: {popupInfo.feature.activeCount}</li>
            </ul>
          </Popup>
        )}
        {data && [
          <PointLayer
            key={'2'}
            options={{
              autoFit: true
            }}
            source={{
              data,
              parser: {
                type: 'json',
                coordinates: 'coord'
              }
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'log'
                }
              }
            }}
            color={{
              values: '#b10026'
            }}
            shape={{
              values: 'circle'
            }}
            active={{
              option: {
                color: '#0c2c84'
              }
            }}
            size={{
              field: 'confirmedCount',
              values: [5, 60]
            }}
            animate={{
              enable: true
            }}
            style={{
              opacity: 0.6
            }}
          >
            <LayerEvent type="click" handler={showPopup} />
          </PointLayer>
        ]}
      </MapboxScene>
    </>
  )
}

export const MemoizedMap = React.memo(Map)
