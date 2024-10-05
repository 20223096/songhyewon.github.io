const express = require('express');
const router = express.Router();
const {addLike, removeLike} = require('../controller/LikesController')
router.use(express.json());

router.post('/:id', addLike)

router.delete('/:id', removeLike)

module.exports = router;