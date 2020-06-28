//import Cat from '../models/blog';
import BaseCtrl from './base';
import Blog from '../models/blog';

class BlogCtrl extends BaseCtrl {
  model = Blog;
}

export default BlogCtrl;
