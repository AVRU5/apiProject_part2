const express = require('express');
const router = express.Router();
const db = require('../db/models');
const utils = require('../utils')
const { Tweet } = db;
const { asyncHandler, handleValidationErrors } = utils
const { check } = require('express-validator');

const tweetValidator = [
    check('message')
        .exists({ checkFalsy: true })
        .isLength({ max: 280 })
];

const tweetNotFoundError = (tweetId) => {
    const err = new Error(`Tweet with tweet ID of ${tweetId} not found`);
    err.title = 'Tweet not Found'
    err.status = 404;
    return err;
}

router.get('/', asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json({ tweets });
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByPk(tweetId);
    if(!tweet) {
        next(tweetNotFoundError(tweetId))
    } else {
        res.json({ tweet })
    }
}));

router.post('/', tweetValidator, handleValidationErrors ,asyncHandler(async(req, res) => {
    const { message } = req.body;
    const tweet = await Tweet.create({ message });
    res.json({ tweet });
}))
module.exports = router;
