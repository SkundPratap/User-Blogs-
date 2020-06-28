import * as mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
