import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private afs = inject(AngularFirestore);

  constructor() {}

  saveData(data: Category) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
