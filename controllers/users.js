const config = require('../config')
const jwt = require('../services/jwt');
const jwtDecode = require('jwt-simple')
const conexion = config.dbConnection();
const email = require('emailjs')
const session = require('express-session')
const moment = require('moment')
const bcrypt = require('bcrypt-nodejs')
const smtp = email.server.connect({
    user: "christianmota07@gmail.com",
    password: "458217821782",
    host: "smtp.gmail.com",
    ssl: true,
    port: 465
})

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    conexion.query("SELECT * FROM usuarios WHERE correo = ? AND activo = 1", [email], (err, rows) => {
        if (err) return res.status(500).json({ message: `error al intentar loguearte ${err}` })
        if (!rows) {
            return res.status(401).send({ message: 'Aceso Denegado' })
        } else {
            if (rows && rows.length > 0) {
                let user = rows[0];
                if (bcrypt.compareSync(password, user.password)) {
                    delete user.password;
                    return res.status(200).send({ user })
                } else {
                    return res.status(401).send({ message: 'Aceso Denegado' })
                }
            } else {
                return res.status(401).send({ message: 'verifica que todas tus credenciales esten bien o activa tu cuenta' })
            }
        }

    })
}


function createUser(req, res) {

    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if (err) return res.status(500).send({ message: `error al registrar ${err}` })
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(401).send({ message: 'tienes que enviar todos los campos correctamente' })
        }
        let userToken = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }
        conexion.query("INSERT INTO usuarios (nombre, correo, token, password) VALUES(?,?,?,?)", [req.body.name, req.body.email, jwt.createToken(req.body.email), hash], function(err, user, fields) {
            if (err) {
                return res.status(500).send({ message: `error al crear el usuario ${err}` });

            } else {
                smtp.send({
                    from: "christianmota07@gmail.com",
                    to: req.body.email,
                    subject: 'Link de Activacion',
                    text: 'activa tu cuenta para ser un super usuario',
                    attachment: [
                        { data: "<html><h1>Hola " + req.body.name + "!</h1><p>Has click <a href='http://localhost:3000/verify/" + jwt.createToken(req.body.email) + "'>Aqui</a> Para activar tu cuenta</p></html>", alternative: true }
                    ]
                })
                return res.status(200).send({ ok: true })
            }
        })

    })
}


function getUsers(req, res) {
    conexion.query('SELECT * FROM grupos', (err, users) => {
        if (err) return res.status(200).send({ message: `error al buscar los usuarios ${err}` })

        if (!users) return res.status(404).send({ message: `no se encontraron usuarios ${users}` })
        return res.status(200).send({ users })
    })
}

function verifyToken(req, res) {

    if (!req.params.token) {
        return res.status(403).send({ message: 'tienes que enviar el token' })
    }

    var token = req.params.token;


    try {
        var payload = jwtDecode.decode(token, config.secret)

        if (payload.exp <= moment().format("DD/MM/YYYY")) {
            return res.status(401).send({ message: 'el token ha expirado' })
        }

    } catch (ex) {
        console.log(ex);

    }

    conexion.query('UPDATE usuarios SET activo = 1 WHERE token = ?', [token], function(err, rows, fields) {
        if (err) return res.status(500).send({ message: `error al activar el usuario ${err}` })


        conexion.query('SELECT * FROM usuarios WHERE token = ?', [token], function(err, rows, fields) {
            if (err) return res.status(500).send({ message: `error al activar el usuario ${err}` })


            if (rows && rows.length > 0) {
                let user = rows[0];
                return res.status(200).send({ message: `gracias por verificar su cuenta ${user.nombre} ahora ya puede iniciar sesion con nosotros` })
            } else {
                return res.status(404).send({ message: 'token no valido' })
            }
        });
    });
}


function changePassword(req, res) {
    let userId = req.params.id;

}


module.exports = {
    createUser,
    getUsers,
    verifyToken,
    login,
    changePassword
}