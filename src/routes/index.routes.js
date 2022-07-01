const {Router} = require('express') 
const router = Router();

const {renderIndex, renderAbout, renderInfo, info} = require('../Controllers/index.controller')

router.get ('/', renderIndex);


router.get ('/about',  renderAbout);

router.get ('/info',  renderInfo);



module.exports = router;