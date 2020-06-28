import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Blog } from '../shared/models/blog.model';

@Component({
  selector: 'app-add-blog-form',
  templateUrl: './add-blog-form.component.html',
  styleUrls: ['./add-blog-form.component.scss']
})

export class AddBlogFormComponent implements OnInit {
  @Input() blogs: Blog[];

  addBlogForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private blogService: BlogService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addBlogForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  addBlog() {
    this.blogService.addBlog(this.addBlogForm.value).subscribe(
      res => {
        this.blogs.push(res);
        this.addBlogForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

}
