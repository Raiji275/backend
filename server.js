require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ProfessionsRouter = require('./routes/Professions.js');
const elseltRouter = require('./routes/elselt.js');
const authRoutes = require('./routes/AuthRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const Elselt = require('./models/elselt.js');
const descProfessionRoutes = require('./routes/desc-professionRoutes');
const newsRoutes = require('./routes/newsRoutes');

// server/server.js (near your other requires)
const multer  = require('multer');
const path    = require('path');

// where to store uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    // keep original extension
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  }
});




const app = express();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const upload = multer({ storage });

// CORS setup (uncomment if you want to restrict origin)
// app.use(cors({
//   origin: (origin, callback) => {
//     const allowedOrigins = ['http://localhost:5173'];
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

app.use(cors()); // Allow all origins for now

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// View engine setup
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to Database'))
  .catch((error) => {
    console.error('Error connecting to Database:', error.message);
    process.exit(1);
  });

// Routes from other files
app.use('/api/v1/Professions', ProfessionsRouter);
app.use('/api/v1/elselt', elseltRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/desc-profession', descProfessionRoutes); // ✅ This line is key
 // mount for public + admin pages
app.use('/news', newsRoutes);
 // keep JSON API at /api/v1/news
app.use('/api/v1/news', newsRoutes);




// Manual routes for edit and update (for rendering EJS views)
app.get('/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const content = await Elselt.findById(id);
    if (!content) return res.status(404).send('Record not found');
    res.render('edit', { elselt: content });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading edit page');
  }
});

app.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await Elselt.findByIdAndUpdate(id, data, { new: true });
    res.redirect('/admin'); // Make sure you have this route or change it accordingly
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating elselt', error: err.message });
  }
});

app.get('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Elselt.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send('Record not found');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/admin', async (req, res) => {
  try {
    const elseltList = await Elselt.find();
    res.render('admin', { elseltList });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin page');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});