import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
    selector: 'kt-dialog',
    templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
  })
  export class DialogComponent implements OnInit {
     comp: string;
    ngOnInit(): void {
    }
}
