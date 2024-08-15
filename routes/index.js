const HomePageController = require('../controllers/HomePageController');
const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.get('/', HomePageController.homePage)
// route register
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);

// route login
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin)

router.use(function (req, res, next) {
    console.log('Time', Date.now());
    next();
});

module.exports = router;
