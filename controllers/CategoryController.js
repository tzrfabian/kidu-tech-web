const { Category, sequelize, Course } = require("../models")

class CategoryController {
    static async getAllCategory (req, res) {
        try {
            let data = await Category.getAllCategoriesandCount();
            // res.send(data);
            res.render('CategoryPage', {data});
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = CategoryController;