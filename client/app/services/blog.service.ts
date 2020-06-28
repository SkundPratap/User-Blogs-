import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Blog } from '../shared/models/blog.model';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>('/api/blogs');
  }

  countBlogs(): Observable<number> {
    return this.http.get<number>('/api/blogs/count');
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('/api/cat', blog);
  }

  getBlog(blog: Blog): Observable<Blog> {
    return this.http.get<Blog>(`/api/blog/${blog._id}`);
  }

  editBlog(blog: Blog): Observable<any> {
    return this.http.put(`/api/blog/${blog._id}`, blog, { responseType: 'text' });
  }

  deleteBlog(blog: Blog): Observable<any> {
    return this.http.delete(`/api/blog/${blog._id}`, { responseType: 'text' });
  }

}
