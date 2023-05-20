import { Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  private postService = inject(PostsService);

  postArray: Array<any> = [];

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      this.postArray = val;
      console.log(val);
    });
  }

  onDelete(postImgPath: string, id: string) {
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id: string, featured: boolean) {
    const featuredData = {
      isFeatured: featured,
    };

    this.postService.markFeatured(id, featuredData);
  }
}
