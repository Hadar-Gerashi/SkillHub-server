import jwt from 'jsonwebtoken'

export function generetTooken(user) {
    const result = jwt.sign({ userId: user._id, role: user.role, userName: user.name }, process.env.SECRET_KEY, { expiresIn: "5m" })
    return result
}