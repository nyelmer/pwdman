const router = require('express').Router();
const auth = require("../middlewares/verifyToken");


router.get('/', auth, (req, res) => {
    res.send('Hello world. The test is successful')
})

module.exports = router;