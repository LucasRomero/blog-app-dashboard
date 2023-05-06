import { Injectable, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(AngularFireStorage);
  private afs = inject(AngularFirestore);
  private toastr = inject(ToastrService);

  constructor() {}

  uploadImage(selectedImage: any, postData: Post) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    // save image
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded succesfully');

      // download image
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          // save post data
          this.saveData(postData);
        });
    });
  }

  saveData(postData: Post) {
    // save post with image path
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data Insert Successfuly');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
