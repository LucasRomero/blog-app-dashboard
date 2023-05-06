import { Component, OnInit, inject } from '@angular/core';

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
}
