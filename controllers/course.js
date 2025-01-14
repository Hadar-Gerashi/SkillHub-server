import { courseModel } from '../modules/course.js'


// קבלת כל הקורסים
export async function getAllCourses(req, res) {
    try {
        let data = await courseModel.find()
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't get all courses", massege: err.massege })
    }
}



//קבלת קורס עפי המזהה שלו
export async function getCourseById(req, res) {
    let { id } = req.params
    try {
        let data = await courseModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "No such id found", massege: err.massege })

        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't get this course", massege: err.massege })
    }
}



//מחיקת קורס לפי המזהה שלו
export async function deleteCourseById(req, res) {
    let { id } = req.params
    try {
        let data = await courseModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({ title: "No such id found", massege: err.massege })

        res.json(data)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't delete this course", massege: err.massege })
    }
}




//הוספת קורס נוסף
export async function addCourse(req, res) {
    let { body } = req

    if (!body.name || !body.describe || !body.openingDate || !body.long || !body.price || !body.locations)
        return res.status(400).json({ title: "can't add new course", massege: "you are missing required fields" })

    if (body.name.length < 2)
        return res.status(409).json({ title: "name error", massege: "length of name smaller than 2" })

    if (new Date(body.openingDate) <= new Date() || new Date(body.openingDate).getFullYear() > new Date().getFullYear())
        return res.status(409).json({ title: "opening date error", massege: "opening date too small or too large" })

    if (body.long < 3)
        return res.status(409).json({ title: "long course error", massege: "long course too small" })

    if (body.price <= 50)
        return res.status(409).json({ title: "price error", massege: "price too low" })

    try {
        let newData = new courseModel(body)
        let data = await newData.save()
        res.json(data)
    }

    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't add new course", massege: err.massege })
    }
}



//עדכון קורס לפי המזהה שלו
export async function updateCourse(req, res) {
    let { id } = req.params
    let { body } = req

    if (!body.describe)
        return res.status(400).json({ title: "can't update this course", massege: "You must change the describe field" })

    if (body.name.length < 2)
        return res.status(409).json({ title: "name error", massege: "length of name smaller than 2" })


    try {
        let data = await courseModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!data)
            return res.status(404).json({ title: "No such id found", massege: "not have such id" })
        res.json(data)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "can't update this course", massege: err.massege })
    }
}

