const { Op } = require("sequelize");
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
            let checked = await User.findOne({
                where: {
                    email: {
                        [Op.iLike]: `${email}`
                    }
                }
            });
            if(checked) {
                res.redirect('/register?error=email sudah terpakai')
            } else {
            let newUser = await User.create({
                    name, email, password, role, gender
                });
                if(newUser) {
                    req.session.userId = newUser.id;
                    req.session.role = newUser.role;
                    res.redirect('/login');
                } else {
                    res.redirect('/register?error=registrasi gagal');
                }
            }
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
            req.session.userId = user.id;
            if(user) {
                const isValidPass = bcrypt.compareSync(password, user.password)
                if(isValidPass) {
                    return res.redirect('/');
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

    static async logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
                res.send(err);
            }else{
                res.redirect('/login')
            }
        })
    }

}

module.exports = UserController;