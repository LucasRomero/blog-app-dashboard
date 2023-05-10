import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  constructor() {}

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOneData(id: string) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  uploadImage(selectedImage: any, postData: Post, id: string = '') {
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

          if (id) {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }

          // save post data
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
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateData(id: string, postData: Post) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data Updated Successfully');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {});
  }

  deleteImage(postImgPath: string, id: string) {
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      })
      .catch((err) => {});
  }

  deleteData(id: string) {
    this.afs
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        this.toastr.success('Data Deleted..!');
      })
      .catch((err) => {});
  }

  markFeatured(id: string, featuredData: Partial<Post>) {
    this.afs
      .doc(`posts/${id}`)
      .update(featuredData)
      .then(() => {
        this.toastr.info('Featured Status Updated');
      })
      .catch((err) => {});
  }
}
