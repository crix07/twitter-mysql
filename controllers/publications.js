const config = require('../config')

const conexion = config.dbConnection()



function getPublics(req, res) {

    conexion.query("SELECT * FROM posts", (err, posts) => {
        if (err) return res.status(500).send({ message: `ocurrio un error ${err}` });
        let userId = posts[0].idUser;
        conexion.query("SELECT * FROM usuarios WHERE id = ?", [userId], (err, user) => {
            if (err) return res.status(500).send({ message: `ocurrio un error ${err}` });

            return res.status(200).send({
                user,
                posts
            });
        })
    })
}

function deletePublic(req, res) {
    let publicId = req.params.id;

}


function updatePublic(req, res) {




}


function createPublic(req, res) {
    conexion.query("INSERT INTO posts (idUser, post) VALUES(?,?)", [req.body.user, req.body.text], function(err, rows, fields) {
        if (err) return res.status(500).send({ message: `error al publicar ${err}` });

        if (rows) {
            return res.status(200).send({ ok: true });
        } else {
            return res.status(404).send({ message: 'no se guardo la publicacion' })
        }
    })

}

module.exports = {
    createPublic,
    getPublics,
    deletePublic,
    updatePublic
}