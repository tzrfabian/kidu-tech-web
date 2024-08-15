const upload = require('../mvp/multerConfig');
const { Course, Category } = require("../models")

class CourseController {
    static async getAllCourse(req, res) {
        let {msg} = req.query;
        try {
            let data = await Course.findAll();
            // res.send(data);
            res.render('CoursePage', {data, msg});
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getAddCourse(req, res) {
        let {errors} = req.query;
        try {
            if(errors) errors = errors.split(',').map(err => decodeURIComponent(err));;
            console.log(errors);
            let category = await Category.findAll();
            // res.send(category);
            res.render('AddCourse', {category, errors});
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
                if (err) {
                    return res.redirect(`/course/add?errors=${encodeURIComponent(err.message || err)}`)
                }
    
                if (!req.file) {
                    return res.redirect(`/course/add?errors=${encodeURIComponent('No file selected!')}`)
                }
    
                let { name, description, duration, CategoryId } = req.body;
                let courseImg = req.file.filename;
                // console.log('Request body:', req.body);
                courseImg = '../uploads/' + courseImg;
    
                await Course.create({
                    name, description, courseImg, duration, CategoryId
                });
                res.redirect('/course');
    
            } catch (err) {
                if(err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => encodeURIComponent(el.message));
                    return res.redirect(`/course/add/?errors=${errors}`)
                }
                console.error(err);
                res.send(err);
            }
        });
    }

    static async getEditCourse(req, res) {
        let { id } = req.params;
        let {errors} = req.query;
        try {
            let data = await Course.findByPk(id, {
                include: [
                    {
                        model: Category,
                    }
                ]
            });
            // res.send(data);
            if(errors) errors = errors.split(',').map(err => decodeURIComponent(err));;
            console.log(errors);
            // res.send(data);
            res.render('EditCourse', {data, errors})
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async postEditCourse(req, res) {
        // console.log('Entered postAddCourse function');
        upload(req, res, async (err) => {
            let {id} = req.params;
            try {
                // console.log('Upload callback started');
                if (err) {
                    return res.redirect(`/course/edit/${id}?errors=${encodeURIComponent(err.message || err)}`)
                }
    
                if (!req.file) {
                    return res.redirect(`/course/edit/${id}?errors=${encodeURIComponent('No file selected!')}`)
                }
    
                let { name, description, duration, CategoryId } = req.body;
                let courseImg = req.file.filename;
                // console.log('Request body:', req.body);
                courseImg = '../uploads/' + courseImg;
    
                await Course.update({
                    name, description, courseImg, duration, CategoryId
                }, {where: {id: id}});
                res.redirect('/course');
    
            } catch (err) {
                if(err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => encodeURIComponent(el.message));
                    return res.redirect(`/course/edit/${id}?errors=${errors}`)
                }
                console.error(err);
                res.send(err);
            }
        });
    }
    static async deleteCourse(req, res) {
        let {id} = req.params;
        try {
            await Course.destroy({where: {id}});
            res.redirect('/course?msg=course telah terhapus');
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = CourseController;