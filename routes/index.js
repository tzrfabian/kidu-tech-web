const CategoryController = require('../controllers/CategoryController');
const CourseController = require('../controllers/CourseController');
const HomePageController = require('../controllers/HomePageController');
const ProfileController = require('../controllers/ProfileController');
const UserController = require('../controllers/UserController');
const course = require('../models/course');

const router = require('express').Router();

//Home page router
router.get('/', HomePageController.homePage);

// route register
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);

// route login
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin)

router.use(function (req, res, next) {
    if(!req.session.userId || !req.session.role) {
        res.redirect('/login?error=please login first!')
    } else {
        next();
    }
});

//router Category
router.get('/category', CategoryController.getAllCategory)

// router course
router.get('/course', CourseController.getAllCourse);
router.get('/course/add', CourseController.getAddCourse);

router.post('/course/add', CourseController.postAddCourse);
router.get('/course/edit/:id', CourseController.getEditCourse);
router.post('/course/edit/:id', CourseController.postEditCourse);
router.get('/course/delete/:id', CourseController.deleteCourse);

//router Profile
router.get('/profile', ProfileController.profile)

router.get('/logout', UserController.logout);

module.exports = router;
