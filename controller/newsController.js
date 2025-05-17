const News = require('../models/news');

// Render list + optional search (for public view)
exports.listView = async (req, res) => {
  const q = req.query.q;
  const filter = q
    ? { $text: { $search: q } }
    : {};
  const news = await News.find(filter).sort({ date: -1 });
  res.render('news/index', { news, search: q || '' });
};

// API: return JSON list (for fetch from SPA)
exports.listJSON = async (req, res) => {
  try {
    const q = req.query.q;
    let query = {};
    if (q) {
      query = { title: new RegExp(q, 'i') };
    }

    const news = await News.find(query).sort({ date: -1 });

    const response = news.map(n => ({
      _id: n._id,
      title: n.title,
      excerpt: n.excerpt,
      date: n.date,
      imageUrl: n.image ? `/uploads/${n.image}` : null, // ✅ set proper path
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};



exports.showView = async (req, res) => {
  const item = await News.findById(req.params.id);
  if (!item) return res.status(404).send('Not found');
  res.render('news/show', { item });
};

exports.createView = (req, res) => {
  res.render('news/create');
};

// Handle form submit
exports.create = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    // store the public URL
    data.imageUrl = '/uploads/' + req.file.filename;
  }
  await News.create(data);
  res.redirect('/news/admin');
};

exports.update = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.imageUrl = '/uploads/' + req.file.filename;
  }
  await News.findByIdAndUpdate(req.params.id, data);
  res.redirect('/news/admin');
};

exports.editView = async (req, res) => {
  const item = await News.findById(req.params.id);
  if (!item) return res.status(404).send('Not found');
  res.render('news/edit', { item });
};

exports.remove = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.redirect('/news/admin');
};

exports.adminView = async (req, res) => {
  const all = await News.find().sort({ date: -1 });
  res.render('news/admin', { all });
};