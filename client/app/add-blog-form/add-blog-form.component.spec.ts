import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { BlogService } from '../services/blog.service';
import { AddBlogFormComponent } from './add-blog-form.component';

class BlogServiceMock { }

describe('Component: AddCatForm', () => {
  let component: AddBlogFormComponent;
  let fixture: ComponentFixture<AddBlogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddBlogFormComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: BlogService, useClass: BlogServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Add new blog');
  });

  it('should display the add form', () => {
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputAge, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement).toBeTruthy();
    expect(inputAge.nativeElement).toBeTruthy();
    expect(inputWeight.nativeElement).toBeTruthy();
    expect(inputName.nativeElement.value).toBeFalsy();
    expect(inputAge.nativeElement.value).toBeFalsy();
    expect(inputWeight.nativeElement.value).toBeFalsy();
    const btnAdd = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btnAdd).toBeTruthy();
  });

});
