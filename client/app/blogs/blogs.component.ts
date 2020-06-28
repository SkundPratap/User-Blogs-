import { Component, OnInit } from '@angular/core';

import { BlogService } from '../services/blog.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Blog } from '../shared/models/blog.model';
//import { Blog, Blog } from '../shared/models/blog.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

   blog = new Blog();
   blogs: Blog[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private blogService: BlogService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      data => this.blogs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(blog: Blog) {
    this.isEditing = true;
    this.blog = blog;
  }

  cancelEditing() {
    this.isEditing = false;
    this.blog = new Blog();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getBlogs();
  }

  editBlog(blog: Blog) {
    this.blogService.editBlog(blog).subscribe(
      () => {
        this.isEditing = false;
        this.blog = blog;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBlog(blog: Blog) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.blogService.deleteBlog(blog).subscribe(
        () => {
          this.blogs = this.blogs.filter(elem => elem._id !== blog._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
