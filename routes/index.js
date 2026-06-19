const express = require('express');
const router = express.Router();
const authorRoutes = require('./authorRoutes');
const postRoutes = require('./postRoutes');

router.use('/authors', authorRoutes);
router.use('/posts', postRoutes);

module.exports = router;
