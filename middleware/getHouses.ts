export default async function ({store, error, redirect}) {
  if (process.client) return
  console.log("Server")
  await store.dispatch("getHouses", {error, redirect})
}
