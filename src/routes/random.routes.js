const {Router} = require('express') 
const router = Router();


const {renderRandom} = require('../Controllers/random.controller')

router.get ('/random', renderRandom);






module.exports = router;