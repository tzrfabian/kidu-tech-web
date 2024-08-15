class ProfileController {
    static async profile(req, res) {
        try {
            res.render('ProfilePage')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = ProfileController