const { Category } = require("../models")
const bcrypt = require('bcryptjs');

class CategoryController {
    static async getAllCategory (req, res) {
        try {
            res.render('CategoryPage')
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = CategoryController;