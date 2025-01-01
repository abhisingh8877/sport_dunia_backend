// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: Date,
  type: String,
  content: String,
});

module.exports = mongoose.model('Article', ArticleSchema);
