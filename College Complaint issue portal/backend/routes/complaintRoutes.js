const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const complaintController = require('../controllers/complaintController');
const complaintModel = require('../models/complaintModel');

const router = require('express').Router();

router.get('/categories', complaintController.getCategories);
router.get('/statuses', complaintController.getStatuses);

router.use(authMiddleware);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(complaintModel.CATEGORIES)
      .withMessage('Invalid category'),
  ],
  validate,
  complaintController.createComplaint
);

router.get('/my', complaintController.getMyComplaints);

router.get(
  '/stats',
  adminMiddleware,
  complaintController.getDashboardStats
);

router.get(
  '/',
  adminMiddleware,
  complaintController.getAllComplaints
);

router.get(
  '/:id',
  [param('id').isInt().withMessage('Invalid complaint ID')],
  validate,
  complaintController.getComplaintById
);

router.patch(
  '/:id/status',
  adminMiddleware,
  [
    param('id').isInt().withMessage('Invalid complaint ID'),
    body('status')
      .isIn(complaintModel.STATUSES)
      .withMessage('Invalid status'),
  ],
  validate,
  complaintController.updateComplaintStatus
);

module.exports = router;
