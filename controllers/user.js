import { userModel } from '../modules/user.js'
import { generetTooken } from '../utils/generateToken.js';
import { validateUser, validateLogInUser, validateUpdateUser } from '../modules/user.js'
import bcrypt from "bcryptjs";



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
    if (!body.password || !body.email || !body.name)
        return res.status(400).json({ title: "can't add new user", massege: "you are missing required fields" })
    let result = validateUser(req.body)
    if (result.error)
        return res.status(400).json({ title: result.error.details[0].message })

    try {

        let isExist = await userModel.findOne({ email: req.body.email }).select('-password').lean();
        if (isExist)
            return res.status(404).json({ title: "can't login", massege: "email already exist" })

        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword; // מחליפים את הסיסמה המקורית בגיבוב
        let newData = new userModel(body)
        let data = await newData.save()
        let token = generetTooken(data)
        let { password, ...other } = data.toObject();
        other.token = token;
        console.log(other)
        res.json(other)

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


    let result = validateUpdateUser(req.body)
    if (result.error)
        return res.status(400).json({ title: result.error.details[0].message })

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

    if (body.name || body.email || body.date || body.role)
        return res.status(400).json({ title: "can't update password", massege: "these fields cannot be updated" })

    if (!body.password)
        return res.status(400).json({ title: "can't update password", massege: "there is no password field to update" })

    if (body.password.length > 6)
        return res.status(409).json({ title: "password error", massege: "length of password smaller than 9" })

    try {

        const hashedPassword = bcrypt.hashSync(body.password, 10);

        // עדכון בסיס הנתונים עם הסיסמה המגובבת בלבד
        let data = await userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).select('-password');
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
    let { body } = req

    try {

        if (!req.body.password || !req.body.email)
            return res.status(400).json({ title: "can't login", massege: "missing email or password" })
        let result = validateLogInUser(req.body)
        if (result.error)
            return res.status(400).json({ title: result.error.details[0].message })
        let user = await userModel.findOne({ email: body.email }).lean();
        if (!user) {
            return res.status(404).json({ title: "No such email", message: "Email not found" });
        }
        console.log(user.password)

        // השוואת הסיסמה שהוזנה מול הגיבוב השמור
        console.log(body.password)
        const isPasswordMatch = bcrypt.compareSync(body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ title: "Login failed", message: "Incorrect password" });
        }

        let token = generetTooken(user)
        let { password, ...other } = user;
        other.token = token;
        console.log(other)
        res.json(other)



    }

    catch (err) {
        console.log(err)
        return res.status(400).json({ title: "can't login", massege: err.massege })

    }
}






