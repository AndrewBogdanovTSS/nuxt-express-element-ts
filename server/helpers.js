String.prototype.noSpaces = function () {
  return this.replace(new RegExp(' ', 'g'), '%20')
}

function mapObj(arr, query) {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    let filter = arr[i]
    if (query[filter]) {
      obj[filter] = query[filter]
    }
  }
  return obj
}

export default {mapObj}
