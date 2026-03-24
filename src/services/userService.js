import usersData from '../data/users.json'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getSuggestedPeers() {
  await delay(350)
  return usersData.peers
}

export async function getCurrentUser() {
  await delay(250)
  return usersData.currentUser
}
