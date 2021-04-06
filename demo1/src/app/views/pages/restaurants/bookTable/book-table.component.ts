import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { BookTable } from '../_helpers/bookTable';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
    selector: 'kt-book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss']
  })
export class BookTableComponent implements OnInit {

  seats: any = [1, 2, 3, 4, 5, 6];
    bookingForm: FormGroup;
    noOfSeats = '';
    date: Date = null;
    email = '';
    restaurantName = '';
    IsAccepted = 0;
    // open_time = '';
    // tslint:disable-next-line: variable-name
    close_time = '';
    time = { hour: 13, minute: 30 };
    component: string;

    bookTable: BookTable;
    startDate = new Date(1990, 0, 1);
    constructor(private fb: FormBuilder, private restaurantService: RestaurantService,
                private router: Router, private modalService: NgbModal) {
    this.bookingForm = fb.group({
        restaurantName: new FormControl('', [Validators.required, Validators.maxLength(25),
            Validators.pattern('^[a-zA-Z ]*$')]),
            date: new FormControl(new Date()),
            time: new FormControl('', [Validators.required]),
            email : ['', Validators.compose([Validators.required, Validators.email])],
            noOfSeats: new FormControl('', [Validators.required])
            });
    }
        ngOnInit(): void {

        }

        onChange(event: any) {
          if (event.checked === true) {
            this.IsAccepted = 1;
          } else {
            this.IsAccepted = 0;
          }


        }
        onFormSubmit() {

          // tslint:disable-next-line: deprecation
          this.restaurantService.bookTable(this.bookingForm.value). subscribe (data => {
                console.log(data);
                const ref = this.modalService.open(DialogComponent);
                this.component = 'BookTableComponent';
                ref.componentInstance.comp = this.component;
          });
         // tslint:disable-next-line: align
         this.router.navigate(['restaurants', 'home']);

        }
}
