import { parse } from 'papaparse'

export function mapData(confirmedCsv, deathsCsv, recoveredCsv) {
  const confirmed = parse(confirmedCsv, { header: true }).data
  const deaths = parse(deathsCsv, { header: true }).data
  const recovered = parse(recoveredCsv, { header: true }).data

  function numOfCases(row) {
    const keys = Object.keys(row)
    const last = keys[keys.length - 1]
    const count = parseInt(row[last], 10)
    return count || null
  }

  function matchingCases(dataset, country, state) {
    let cnt = 0
    dataset.forEach(row => {
      if (row['Country/Region'] === country && row['Province/State'] === state) {
        cnt = numOfCases(row)
        return
      }
    })
    return cnt
  }

  const properties = confirmed.map(row => {
    const country = row['Country/Region']
    const state = row['Province/State']
    const coord = [parseFloat(row.Long), parseFloat(row.Lat)]

    const confirmedCount = numOfCases(row)
    const deathsCount = matchingCases(deaths, country, state)
    const recoveredCount = matchingCases(recovered, country, state)
    const activeCount = confirmedCount - (deathsCount + recoveredCount)

    return {
      country,
      state,
      coord,
      confirmedCount,
      deathsCount,
      recoveredCount,
      activeCount
    }
  })

  return properties
}
