import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { DialogComponent } from '../dialog/dialog.component';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';


@Component({
  selector: 'kt-create-restaurant',
  templateUrl: './create-restaurant.component.html',
})
export class CreateRestaurantComponent implements OnInit {

  constructor(
    private restaurantService: RestaurantService,
    private router: Router, private modalService: NgbModal) {
  }
  get form(): any {
    return this.restaurantForm.controls;
  }
  restaurant: Restaurant = new Restaurant();
  isSubmitted = true;
  data: any;
  file: any;
  comp: string;
  confirm: boolean;
  restaurantId: any;
  restaurantData: any;
  dselect: any;
  // tslint:disable-next-line: variable-name
  open_time = '';
  // tslint:disable-next-line: variable-name
  close_time = '';
  time = { hour: 13, minute: 30 };
  restaurantForm = new FormGroup({
    restaurantName: new FormControl('', [Validators.required,
    Validators.pattern('^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$')]),
    address: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required, Validators.pattern('[7-9][0-9]{9}')]),
    open_time: new FormControl('', [Validators.required]),
    close_time: new FormControl('', [Validators.required])
  });

  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: variable-name
  restaurantName_validation_message = {
    restaurantName: [
      { type: 'required', message: 'Restaurant name is required' },
      {
        type: 'pattern',
        message: 'Restaurant Name must contain only numbers and letters',
      },
    ],
  };
  // tslint:disable-next-line: variable-name
  address_validation_message = {
    address: [{ type: 'required', message: 'Address is required' }],
  };
  // tslint:disable-next-line: variable-name
  phone_no_validation_message = {
    phone_no: [
      { type: 'required', message: 'phone number is required' },
      {
        type: 'pattern',
        message: 'phone should be start with 7/8/9 and should be 10 digit',
      },
    ],
  };


  // tslint:disable-next-line: variable-name
  open_time_validation_message = {
    open_time : [
      {type : 'required' , message: 'Open time is required'}
    ]

  };
  // tslint:disable-next-line: variable-name
  close_time_validation_message = {
    close_time : [
      {type : 'required' , message: 'Close time is required'}
    ]

  };
  ngOnInit(): void { }
  saveRestaurant(fvalue: any): void {
    console.log(this.restaurantForm.value);
    this.data = fvalue;
    console.log('console data object=', this.data);
    console.log('close time on data object=', this.data.close_time);
    this.close_time =
      this.data.close_time.hour + ':' + this.data.close_time.minute;
    this.data.close_time = this.close_time;
    this.open_time =
      this.data.open_time.hour + ':' + this.data.open_time.minute;
    this.data.open_time = this.open_time;
    this.isSubmitted = true;
    const timedate  = moment();
    this.data.updatedTime = timedate.format('HH:MM:SS');

    // tslint:disable-next-line: deprecation
    this.restaurantService.createRestaurant(this.restaurantForm.value).subscribe(
      (res) => {
        console.log('after adding resto', res);
        this.restaurantData = res;
        console.log('id from restaurant data', this.restaurantData.id);
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }
  uploadFile(): void {
    console.log('I am in upload' + this.file);
    this.restaurantService
      .pushFileToStorage(this.file, this.restaurantData.id, this.dselect.restaurantType)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          const ref = this.modalService.open(DialogComponent);
          this.comp = 'CreateRestaurantComponent';
          ref.componentInstance.comp = this.comp;
          this.backEvent();
          this.modalService.dismissAll();
        },
        error => {
          if (error.status === 500) {
            this.router.navigate(['error/500']);
          }
        }
      );
  }
  onFileChangeEvent(file: any): void {
    this.file = file;
    console.log('file change event=', this.file);
  }

  backEvent(): void {
    this.router.navigate(['restaurants', 'home']);
  }
  close() {
    this.modalService.dismissAll();
  }
}
