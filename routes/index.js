const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    const msg = { message: 'test root index'};
    res.json(msg);
})




module.exports = router;
