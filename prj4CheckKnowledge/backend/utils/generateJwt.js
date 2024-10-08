import jwt from 'jsonwebtoken'

export const generateJWT = async (payload) => {
  try {
    const token = await jwt.sign(payload, 'asdfASD#$%@#234DFGVBas$%', {
      expiresIn: '3h',
    })
    return token
  } catch (error) {
    console.log(error)
  }
}
