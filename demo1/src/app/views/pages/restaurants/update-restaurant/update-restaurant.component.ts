import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { DialogComponent } from '../dialog/dialog.component';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-update-restaurant',
  templateUrl: './update-restaurant.component.html',
})
export class UpdateRestaurantComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  isSubmitted = true;
  data: any;
  file: any;
  comp: string;
  confirm: boolean;
  restaurantId: any;
  restaurantData: any;
  // tslint:disable-next-line: variable-name
  //open_time = '';
  // tslint:disable-next-line: variable-name
  //close_time = '';
  time = { hour: 13, minute: 30 };

  id = 0;
  imagename = '';
  url = '';
  finalurl = '';
  t = 0;
  q = 0;
  updatedTime: string;
  // tslint:disable-next-line: variable-name
  open_time = {
    hour: 10,
    minute: 30
  };
  // tslint:disable-next-line: variable-name
  close_time = {
    hour: 21,
    minute: 30
  };
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
              private router: Router , private modalService: NgbModal) {
    this.restaurant = new Restaurant();
  }
  restaurantForm = new FormGroup({
    restaurantName: new FormControl('', [Validators.required,
    Validators.pattern('^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$')]),
    address: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required, Validators.pattern('[7-9][0-9]{9}')]),
    open_time: new FormControl('', [Validators.required]),
    //close_time: new FormControl('', [Validators.required])
  });
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
  get form(): any {
    return this.restaurantForm.controls;
  }
  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.restaurantService.getRestoId(this.id).subscribe(data => {
      this.restaurant = data ;
      // tslint:disable-next-line: radix
      this.t = parseInt(this.restaurant.open_time.slice(0, 2));
      // tslint:disable-next-line: radix
      this.q = parseInt(this.restaurant.open_time.slice(3, 5));
      this.open_time = { hour: this.t, minute: this.q };
      // tslint:disable-next-line: radix
      const ch: number = parseInt(this.restaurant.close_time.slice(0, 2));
      // tslint:disable-next-line: radix
      const cm: number = parseInt(this.restaurant.close_time.slice(3, 5));
      this.close_time = { hour: ch, minute: cm };
      this.finalurl = 'http://localhost:8080/zonions/file';
      this.url = `${this.finalurl}/${this.restaurant.name}/${this.id}`;
    }, error => {
      if (error.status === 500) {
        this.router.navigate(['error/500']);
      }
    });
  }
  updateResto(): void {
    const timedate  = moment();
    this.restaurant.updatedTime = timedate.format('HH:MM:SS');
    this.restaurantService.update(this.id, this.restaurant).subscribe(data => {
      console.log(data);

      const ref = this.modalService.open(DialogComponent);
      this.comp = 'UpdateRestaurantComponent';
      ref.componentInstance.comp = this.comp;
      console.log('openTime==', this.open_time);
      //this.restaurant = new Restaurant();

      this.backEvent();
    }, error => console.log(error));
  }
  onSubmit(): void {
    this.restaurant.open_time = this.open_time.hour + ':' + this.open_time.minute;
    this.restaurant.close_time = this.close_time.hour + ':' + this.close_time.minute;
    this.updateResto();
    this.modalService.dismissAll();

    this.backEvent();
  }

  saveRestaurant(fvalue: any): void {
    console.log(this.restaurantForm.value);
    this.data = fvalue;
    console.log('console data object=', this.data);
    console.log('close time on data object=', this.data.close_time);
    this.data.open_time = this.open_time.hour + ':' + this.open_time.minute;
    this.data.close_time = this.close_time.hour + ':' + this.close_time.minute;
    //this.data.open_time = this.open_time;
    this.isSubmitted = true;
    const timedate  = moment();
    this.data.updatedTime = timedate.format('HH:MM:SS');

    // tslint:disable-next-line: deprecation
    this.restaurantService.update(this.id,this.restaurant).subscribe(
      (res) => {
        console.log('after adding resto', res);
        this.restaurantData = res;
        console.log('id from restaurant data', this.restaurantData.id);
        this.modalService.dismissAll();

        this.backEvent();
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }


  onChange(file: any): void {
    this.file = file;

  }
  updateImage(): void {
    console.log('I am in upload' + this.file);
    this.restaurantService.pushFileToStorage(this.file, this.id , '').subscribe((resp: any) => {
      console.log(resp);

    }, error => {
      if (error.status === 500) {
        this.router.navigate(['error/500']);
      }
    });
  }

  backEvent(): void {
    this.router.navigate(['restaurants', 'home']);

  }
  close() {
    this.modalService.dismissAll();
  }

}
