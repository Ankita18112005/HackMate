import roadmapData from '../data/roadmap.json'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getRoadmap() {
  await delay(350)
  return roadmapData
}
