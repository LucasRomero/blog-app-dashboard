import { Injectable, inject } from '@angular/core';

import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

import { Category } from '../models/category';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private afs = inject(AngularFirestore);
  private toastr = inject(ToastrService);

  constructor() {}

  saveData(data: Category): void {
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

  loadData() {
    return this.afs
      .collection('categories')
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

  updateData(id: string, editData: any): void {
    this.afs
      .collection('categories')
      .doc(id)
      .update(editData)
      .then((fromDocRef) => {
        this.toastr.success('Data Updated Succesfully..!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
