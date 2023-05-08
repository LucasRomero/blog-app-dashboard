import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  private categoryService = inject(CategoriesService);
  private fb = inject(FormBuilder);
  private postService = inject(PostsService);
  private route = inject(ActivatedRoute);

  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;

  categories: Array<any> = [];

  postForm: FormGroup;

  post: any;
  idPost: string = '';

  formStatus: string = 'Add New';

  constructor() {
    this.route.queryParams.subscribe((val) => {
      this.idPost = val['id'];
    });

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });

    this.inicializar();
  }

  inicializar(): void {
    if (this.idPost) {
      this.postService.loadOneData(this.idPost).subscribe((post) => {
        console.log(post);
        this.post = post;

        this.postForm.setValue({
          title: this.post.title,
          permalink: this.post.permalink,
          excerpt: this.post.excerpt,
          category: `${this.post.category.categoryId}-${this.post.category.category}`,
          postImg: '',
          content: this.post.content,
        });

        this.imgSrc = this.post.postImgPath;
        this.formStatus = 'Edit';
      });
    }
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged(event: any): void {
    const title = event.target.value;
    this.postForm.controls['permalink'].setValue(title.replace(/\s/g, '-'));
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }

  onSubmit() {
    console.log(this.postForm.value);

    // split the value of select
    let [id, name] = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: id,
        category: name,
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date(),
    };

    console.log(postData);

    this.postService.uploadImage(this.selectedImg, postData, this.idPost);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
