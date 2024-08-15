const HomePageController = require('../controllers/HomePageController');
const UserController = require('../controllers/UserController');

const router = require('express').Router();


// route register
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);

// route login
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin)

router.use(function (req, res, next) {
    console.log(req.session);
    if(!req.session.userId) {
        res.redirect('/login?error=please login first!')
    } else {
        next();
    }

    // console.log('Time', Date.now());
    // next();
});

router.get('/', HomePageController.homePage)
module.exports = router;
