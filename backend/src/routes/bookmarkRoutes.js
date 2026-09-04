const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, bookmarkController.getBookmarks);
router.post('/:resourceId', requireAuth, bookmarkController.toggleBookmark);

module.exports = router;
