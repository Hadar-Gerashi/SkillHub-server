import { userModel } from '../modules/user.js'
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


//קבלת כל המשתמשים
export async function getAllUser(req, res) {
    try {
        let data = await userModel.find().select('-password')
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't get all users", massege: err.massege })
    }
}


//קבלת משתמש לפי המזהה שלו
export async function getUserById(req, res) {
    let { id } = req.params
    try {
        let data = await userModel.findById(id).select('-password')
        if (!data)
            return res.status(404).json({ title: "can't get this user", massege: "No such id found" })

        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't get this user", massege: err.massege })
    }
}



//הוספת משתמש חדש
export async function addUser(req, res) {
    let { body } = req

    if (!body.password || !body.tz || !body.email || !body.name)
        return res.status(400).json({ title: "can't add new user", massege: "you are missing required fields" })

    if (body.date)
        return res.status(400).json({ title: "date error", massege: "you tried to initialize a date field" })

    if (body.role)
        return res.status(400).json({ title: "role error", massege: "you tried to initialize a date field" })

    if (body.password.length < 9)
        return res.status(409).json({ title: "password error", massege: "length of password smaller than 9" })


    if (body.tz.length < 9)
        return res.status(409).json({ title: "tz error", massege: "incorrect tz" })

    
    if (!emailRegex.test(body.email))
        return res.status(409).json({ title: "email error", massege: "wrong email" })

    if (body.name.length < 2)
        return res.status(409).json({ title: "name error", massege: "length of name smaller than 2" })

    try {
        let newData = new userModel(body)
        newData.role = "USER"
        let data = await newData.save()

        res.json(data)
    }

    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't add new user", massege: err.massege })
    }
}



//עדכון משתמש ללא הסיסמא
export async function updateUser(req, res) {
    let { id } = req.params
    let { body } = req

    if (body.password || body.date || body.role)
        return res.status(400).json({ title: "can't update user", massege: "these fields cannot be updated" })


    if (body.tz && body.tz.length < 9)
        return res.status(409).json({ title: "tz error", massege: "incorrect tz" })

  
    if (body.email && !emailRegex.test(body.email))
        return res.status(409).json({ title: "email error", massege: "wrong email" })

    if (body.name && body.name.length < 2)
        return res.status(409).json({ title: "name error", massege: "length of name smaller than 2" })



    try {
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        if (!data)
            return res.status(404).json({ title: "can't update by id", massege: "No such id found" })
        res.json(data)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't update by id", massege: err.massege })
    }
}


//עדכון סיסמת משתמש בלבד
export async function updatePassword(req, res) {
    let { id } = req.params
    let { body } = req

    if (body.name || body.email || body.tz || body.date || body.role)
        return res.status(400).json({ title: "can't update password", massege: "these fields cannot be updated" })

    if (!body.password)
        return res.status(400).json({ title: "can't update password", massege: "there is no password field to update" })

    if (body.password.length < 9)
        return res.status(409).json({ title: "password error", massege: "length of password smaller than 9" })

    try {
        let data = await userModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data)
            return res.status(404).json({ title: "can't update password", massege: "No such id found" })
        res.json(data)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't update password", massege: err.massege })
    }
}


//כניסה של משתמש קיים לפי שם וסיסמא
export async function logIn(req, res) {
    try {
        let data = await userModel.findOne({ password: req.body.password, name: req.body.name }).select('-password');
        if (!data)
            return res.status(404).json({ title: "can't login", massege: "No such user found" })

        res.json(data)

    }

    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't login", massege: err.massege })

    }
}







