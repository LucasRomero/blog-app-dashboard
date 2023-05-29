import { Component, OnInit, inject } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  private subService = inject(SubscribersService);

  subscribersArray: any[] = [];

  ngOnInit(): void {
    this.subService.loadData().subscribe((resp) => {
      this.subscribersArray = resp;
    });
  }

  onDelete(id: string) {
    this.subService.deleteData(id);
  }
}
