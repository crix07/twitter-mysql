const app = require('./app');
config = require('./config');

conexion = config.dbConnection();

conexion.connect((err) => {
    if (err) {
        console.log(`error al conectar a la base de datos ${err.stack}`);
        return;
    }

    if (!err) {
        console.log('conexion establecida exitosamente');
        app.listen(config.port, () => {
            console.log(`server is listening on port ${config.port}`);
        })
    }
});