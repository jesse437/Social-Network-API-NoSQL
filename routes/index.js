const router = require('express').Router();
const apiRoutes = require('./api');


//any routes defined in apiRoutes will be prefixed with /api
router.use('/api', apiRoutes);


router.use((req, res) => {
  return res.send('Wrong route!');
});


module.exports = router;