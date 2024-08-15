const { Category } = require("../models")

class CategoryController {
    static async getAllCategory (req, res) {
        try {
            let data = await Category.findAll();
            // res.send(data);
            res.render('CategoryPage', {data});
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = CategoryController;