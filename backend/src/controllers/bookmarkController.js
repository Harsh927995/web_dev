const db = require('../config/db');

exports.getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookmarks = await db.getBookmarksByUser(userId);

    return res.status(200).json({
      success: true,
      bookmarks
    });
  } catch (err) {
    next(err);
  }
};

exports.toggleBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { resourceId } = req.params;

    if (!resourceId) {
      return res.status(400).json({ success: false, message: 'Resource ID is required' });
    }

    const result = await db.toggleBookmark(userId, resourceId);

    return res.status(200).json({
      success: true,
      isBookmarked: result.isBookmarked,
      bookmarks: result.bookmarks
    });
  } catch (err) {
    next(err);
  }
};
