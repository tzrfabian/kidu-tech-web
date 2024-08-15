const CategoryController = require('../controllers/CategoryController');
const HomePageController = require('../controllers/HomePageController');
const ProfileController = require('../controllers/ProfileController');
const UserController = require('../controllers/UserController');

const router = require('express').Router();

//Home page router
router.get('/', HomePageController.homePage);

// route register
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);

// route login
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin)

// router.use(function (req, res, next) {
//     console.log(req.session);
//     if(!req.session.userId) {
//         res.redirect('/login?error=please login first!')
//     } else {
//         next();
//     }

//     // console.log('Time', Date.now());
//     // next();
// });

//router Category
router.get('/category', CategoryController.getAllCategory)

//router Profile
router.get('/profile', ProfileController.profile)

module.exports = router;
