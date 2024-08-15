const upload = require('../mvp/multerConfig');
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
            // res.send(category);
            res.render('AddCourse', {category});
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async postAddCourse(req, res) {
        // console.log('Entered postAddCourse function');
        upload(req, res, async (err) => {
            try {
                // console.log('Upload callback started');
                let category = await Category.findAll();
    
                if (err) {
                    return res.redirect(`/course/add?error=${err}`)
                }
    
                if (!req.file) {
                    return res.render('AddCourse', {
                        msg: 'No file selected!', category
                    });
                }
    
                const { name, description, duration, CategoryId } = req.body;
                let courseImg = req.file.filename;
                // console.log('Request body:', req.body);
                let temp = courseImg;
                courseImg = '../uploads/' + temp;
    
                await Course.create({
                    name, description, courseImg, duration, CategoryId
                });
    
                console.log('Course created successfully');
                res.redirect('/course');
    
            } catch (err) {
                console.error('Error in postAddCourse:', err);
                res.send(err);
            }
        });
    }
}

module.exports = CourseController;