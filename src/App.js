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
    <div className="h-screen">
      <div className="bg-gray-800 px-4 py-4">
        <div className="text-gray-300">
          Novel Coronavirus (COVID-19) map based on time series data provided by <a className="text-gray-500" href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a> uses <a className="text-gray-500" href="https://l7.antv.vision/en">L7 Geospatial Visualization</a>
        </div>
      </div>
      <div className="relative h-full">
        <Map dataUrls={dataUrls} />
      </div>
    </div>
  )
}
