import React from 'react'
import { MemoizedMap as Map } from './Map'

const dataUrls = {
  confirmed:
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',
  deaths:
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv',
  recovered:
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
}

export default function App() {
  return (
    <div>
      <div className="App">
        <h1>Novel Coronavirus (COVID-19) Map</h1>
        <h2>
          Based on time series data provided by{' '}
          <a href="https://github.com/CSSEGISandData/COVID-19">
            {' '}
            Johns Hopkins CSSE
          </a>{' '}
          uses{' '}
          <a href="https://l7.antv.vision/en">L7 Geospatial Visualization</a>
        </h2>
      </div>
      <button className="text-red-300">Do not click me</button>
      <div className="Map">
        <Map dataUrls={dataUrls} />
      </div>
    </div>
  )
}
