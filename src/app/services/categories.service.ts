import { Injectable, inject } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private afs = inject(AngularFirestore);
  private toastr = inject(ToastrService);

  constructor() {}

  saveData(data: Category) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Data Insert Succesfully..!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
