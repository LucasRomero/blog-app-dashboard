import { Injectable, inject } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  private afs = inject(AngularFirestore);
  private toastr = inject(ToastrService);

  constructor() {}

  loadData() {
    return this.afs
      .collection('subscribers')
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

  deleteData(id: string): void {
    this.afs
      .doc(`subscribers/${id}`)
      .delete()
      .then((docRef) => {
        this.toastr.success('Data Deleted..!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
