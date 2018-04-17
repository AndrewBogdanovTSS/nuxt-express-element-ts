function linkUser(req, user) {
  const protocol = req.secure ? 'https' : 'http'
  user.link = {
    usersLink: `${protocol}://${req.headers.host}/api/users`
  }
}

function linkUsers(req, user) {
  const protocol = req.secure ? 'https' : 'http'
  user.link = {
    selfLink: `${protocol}://${req.headers.host}/api/users/${user._id}`
  }
}

export default {linkUser, linkUsers}

