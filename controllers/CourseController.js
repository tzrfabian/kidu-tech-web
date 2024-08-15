
const { Course, Category } = require("../models")

class CourseController {
    static async getAllCourse(req, res) {
        try {
            let data = await Course.findAll();
            // res.send(data);
            res.render('CoursePage', {data});
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getAddCourse(req, res) {
        try {
            let category = await Category.findAll();
            res.send(category);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = CourseController;