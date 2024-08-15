class HomePageController {
    static async homePage(req, res) {
        try {
            res.render('Home-Page') 
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = HomePageController;