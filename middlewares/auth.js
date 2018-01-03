module.exports = async (req, res, next) => {
  const { User } = req.models

  let { authorization = '' } = req.headers
  authorization = authorization.replace('Basic ', '')
  authorization = Buffer.from(authorization, 'base64')
  authorization = authorization.toString('ascii')

  const [ email, password ] = authorization.split(':')

  try {
    const user = await User.findOne({ where: { email } })

    if (!user || user.password !== password) {
      res.status(403).json({})
    }

    req.user = user
    req.applySchema(user.dedicatedSchema)

    next()
  } catch (err) {
    next(err)
  }
}
