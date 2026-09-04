const db = require('../config/db');

exports.getResources = async (req, res, next) => {
  try {
    const { branch, semester, subject, topic, year, search, type } = req.query;

    const resources = await db.findResources({
      branch,
      semester,
      subject,
      topic,
      year,
      search,
      type
    });

    return res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (err) {
    next(err);
  }
};

exports.getResourceById = async (req, res, next) => {
  try {
    const resource = await db.findResourceById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    return res.status(200).json({
      success: true,
      data: resource
    });
  } catch (err) {
    next(err);
  }
};
