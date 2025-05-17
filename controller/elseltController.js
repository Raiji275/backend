const Elselt = require('../models/elselt');

module.exports = {
  get: async (req, res) => {
    try {
      const elseltData = await Elselt.find().exec();
      res.json(elseltData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching elselt data' });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const elseltData = await Elselt.findById(id);
      if (!elseltData) return res.status(404).json({ message: 'Not found' });
      res.json(elseltData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  post: async (req, res) => {
    try {
      const newElselt = new Elselt(req.body);
      await newElselt.save();
      res.json({ message: "Амжилттай бүртгэгдлээ" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating record" });
    }
  },

  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const elseltData = await Elselt.findById(id);
      if (!elseltData) return res.status(404).send('Record not found');
      res.render('edit', { elselt: elseltData });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

delete: async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Elselt.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send('Record not found');
    res.redirect('/admin'); // or wherever your admin panel is
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
},

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await Elselt.findByIdAndUpdate(id, data);
      res.redirect('/admin');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
};