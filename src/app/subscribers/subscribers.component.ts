import { Component, OnInit, inject } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  private subService = inject(SubscribersService);
  private modalService = inject(NgbModal);

  modalReference!: NgbModalRef;
  id = '';

  subscribersArray: any[] = [];

  ngOnInit(): void {
    this.subService.loadData().subscribe((resp) => {
      this.subscribersArray = resp;
    });
  }

  onDelete() {
    if (this.id) {
      this.subService.deleteData(this.id);
    }
    this.modalReference.close();
    this.id = '';
  }

  openModal(content: any, id: string) {
    this.id = id;
    this.modalReference = this.modalService.open(content);
  }
}
