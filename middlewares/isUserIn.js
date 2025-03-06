import jwt from 'jsonwebtoken'

let verify = jwt.verify;
export function isUserIn(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({ title: "משתמש לא רשום", message: "קודם בצע כניסה או הרשמה" })
    let authorization = req.headers.authorization;
    console.log("authorization"+authorization)

    try {
        let result = verify(authorization, process.env.SECRET_KEY)
        req.user = result;

        return next();

    }
    catch (err) {
        return res.status(401).json({ title: "משתמש לא רשום", message: "קודם בצע כניסה או הרשמה" + err.message })
    }
}


export function isManager(req, res, next) {
    if (!req.header.authorization)
        return res.status(401).json({ title: "משתמש לא רשום", message: "קודם בצע כניסה או הרשמה" })
    let authorization = req.headers.authorization;

    try {
        let result = verify(authorization, process.env.SECRET_KEY)
        req.user = result;
        if(result.role!="ADMIN")
        return res.status(403).json({ title: " אין רשות", message: "אתה לא מנהלל!!!" + err.message })

        return next();

    }
    catch (err) {
        return res.status(401).json({ title: "משתמש לא רשום", message: "קודם בצע כניסה או הרשמה" + err.message })
    }
}




