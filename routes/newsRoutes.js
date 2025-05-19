const express = require('express');
const router  = express.Router();
const ctrl    = require('../controller/newsController');
const multer  = require('multer');
const path    = require('path');

// (reuse the same storage config or import it)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// Admin
router.get('/admin', ctrl.adminView);
router.get('/admin/create', ctrl.createView);
router.post('/admin/create', upload.single('image'), ctrl.create);
router.get('/admin/edit/:id', ctrl.editView);
router.post('/admin/edit/:id', upload.single('image'), ctrl.update);
router.get('/admin/delete/:id', ctrl.remove);


// Public pages & API
router.get('/', ctrl.index);
router.get('/search', ctrl.listView);


// ✅ This must come BEFORE ":id"
router.get('/api', ctrl.listJSON);

// This must be LAST
router.get('/:id', ctrl.showView);

module.exports = router;