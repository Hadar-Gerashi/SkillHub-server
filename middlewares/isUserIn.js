import jwt from 'jsonwebtoken'

let verify = jwt.verify
export function isUserIn(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({ title: "User Not Registered", message: "Please log in or sign up first" })
    let authorization = req.headers.authorization
    console.log("authorization" + authorization)

    try {
        let result = verify(authorization, process.env.SECRET_KEY)
        req.user = result

        return next()

    }
    catch (err) {
        return res.status(401).json({ title: "User Not Registered", message: "Please log in or sign up first. " + err.message })
    }
}


export function isManager(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({ title: "User Not Registered", message: "Please log in or sign up first" })
    let authorization = req.headers.authorization
    try {
        let result = verify(authorization, process.env.SECRET_KEY)
        req.user = result;
        if (result.role != "ADMIN")
            return res.status(403).json({ title: "Forbidden", message: "You are not an admin" + err.message });


        return next()

    }
    catch (err) {
        return res.status(401).json({ title: "User Not Registered", message: "Please log in or sign up first" })

    }
}




