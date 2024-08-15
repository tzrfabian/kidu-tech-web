const HomePageController = require('../controllers/HomePageController');
const UserController = require('../controllers/UserController');

const router = require('express').Router();

//router Home Page
router.get('/', HomePageController.homePage)

router.get('/register');


module.exports = router


