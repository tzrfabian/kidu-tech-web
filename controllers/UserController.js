const { User } = require("../models");
const bcrypt = require('bcryptjs');

class UserController {
    static async registerForm(req, res) {
        try {
            res.render('RegisterPage');
        } catch (err) {
            res.send(err);
        }
    }

    static async postRegister(req, res) {
        let {name, email, password, role, gender} = req.body;
        try {
            await User.create({
                name, email, password, role, gender
            });
            res.redirect('/login');
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async loginForm(req, res) {
        let {error} = req.query;
        try {
            res.render('LoginPage', {error});
        } catch (err) {
            res.send(err);
        }
    }

    static async postLogin(req, res) {
        let {email, password} = req.body;
        try {
            let user = await User.findOne({
                where: {email}
            });
            if(user) {
                const isValidPass = bcrypt.compareSync(password, user.password)
                if(isValidPass) {
                    return res.redirect('');
                } else {
                    return res.redirect(`/login?error=invalid email/password`);
                }
            } else {
                return res.redirect(`/login?error=user not found`)
            }
        } catch (err) {
            res.send(err);
        }
    }

}

module.exports = UserController;