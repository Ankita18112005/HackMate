import opportunitiesData from '../data/opportunities.json'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getOpportunities() {
  await delay(350)
  return opportunitiesData
}
