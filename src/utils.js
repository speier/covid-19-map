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

  const properties = confirmed.map(row => {
    const confirmedCount = numOfCases(row)
    const deathsCount = 0
    const recoveredCount = 0

    const country = row['Country/Region']
    return {
      country: country,
      region: row['Province/State'] || country,
      coord: [parseFloat(row.Long), parseFloat(row.Lat)],
      confirmedCount: confirmedCount,
      deathsCount: deathsCount,
      recoveredCount: recoveredCount,
      activeCount: confirmedCount - (deathsCount + recoveredCount)
    }
  })

  return properties
}
