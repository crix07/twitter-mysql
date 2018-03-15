const express = require('express')
const router = express.Router()

const publiControllers = require('../controllers/publications')


router.post('/create-post', publiControllers.createPublic);

router.get('/get-posts', publiControllers.getPublics);

router.put('/update-post/:id', publiControllers.updatePublic)

router.delete('/destroy-post/:id', publiControllers.deletePublic)


module.exports = router;