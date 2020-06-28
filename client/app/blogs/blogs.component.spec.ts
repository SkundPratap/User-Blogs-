import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { BlogService } from '../services/blog.service';
import { BlogsComponent } from './blogs.component';
import { of } from 'rxjs';

class BlogServiceMock {
  mockBlogs = [
    { title: 'Test title 1', description: 'This is the test description', imageURL: 'https://www.github.com' },
    { name: 'Test title 2', description: 'This is the test description 2', imageURL: 'https://www.bing.com' },
  ];
  getBlogs() {
    return of(this.mockBlogs);
  }
}

describe('Component: Blogs', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ BlogsComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: BlogService, useClass: BlogServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Current cats (2)');
  });

  it('should display the text for no blogs', () => {
    component.blogs = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('Current blogs (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('There are no blogs in the DB. Add a new blog below.');
  });

  it('should display current blogs', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('Test title 1 ');
    expect(tds[1].nativeElement.textContent).toContain('Test description 1');
    expect(tds[2].nativeElement.textContent).toContain('https://www.linkedin.com');
    expect(tds[4].nativeElement.textContent).toContain('Test title 2');
    expect(tds[5].nativeElement.textContent).toContain('Test description 2');
    expect(tds[6].nativeElement.textContent).toContain('https://www.github.com');
  });

  it('should display the edit and delete buttons', () => {
    const [btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

  it('should display the edit form', async () => {
    component.isEditing = true;
    component.blog = { title: 'test blog', description: 'This is the test description', imageURL: 'https://www.google.com' };
    fixture.detectChanges();
    await fixture.whenStable();
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(1);
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputAge, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement.value).toContain('Cat 1');
    expect(inputAge.nativeElement.value).toContain('1');
    expect(inputWeight.nativeElement.value).toContain('2');
    const [btnSave, btnCancel] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSave.nativeElement).toBeTruthy();
    expect(btnSave.nativeElement.textContent).toContain('Save');
    expect(btnCancel.nativeElement).toBeTruthy();
    expect(btnCancel.nativeElement.textContent).toContain('Cancel');
  });

});
