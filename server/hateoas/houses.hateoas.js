function linkHouse(req, house) {
  const protocol = req.secure ? 'https' : 'http'
  house.link = {
    housesLink: `${protocol}://${req.headers.host}/api/houses`,
    isRentLink: `${protocol}://${req.headers.host}/api/houses?isRent=${house.isRent}`.noSpaces(),
    isSellLink: `${protocol}://${req.headers.host}/api/houses?isSell=${house.isSell}`.noSpaces(),
    sellPrice: `${protocol}://${req.headers.host}/api/houses?sellPrice=${house.sellPrice}`
  }
}

function linkHouses(req, house) {
  const protocol = req.secure ? 'https' : 'http'
  house.link = {
    selfLink: `${protocol}://${req.headers.host}/api/house/${house._id}`,
    isRentLink: `${protocol}://${req.headers.host}/api/houses?isRent=${house.isRent}`,
    isSellLink: `${protocol}://${req.headers.host}/api/houses?isSell=${house.isSell}`
  }
}

export default {linkHouse, linkHouses}
