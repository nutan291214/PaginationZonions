import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'kt-restaurant-details',
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantDetail = new Array<Restaurant>();
  restaurantList: any;
  url = '';
  finalurl = '';
  constructor(
    private restaurantService: RestaurantService, private router: Router,
    private route: ActivatedRoute , private translate: TranslateService) {
  }

  ngOnInit(): void {
    const restaurantName = this.route.snapshot.params.restaurantName;
    console.log(restaurantName);
    // tslint:disable-next-line: deprecation
    this.restaurantService.getRestaurantList().subscribe((data) => {
      console.log(data.length);
      this.restaurantDetail = data;
      console.log(this.restaurantDetail);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.length; i++) {
        let count = 0;
        if (data[i].restaurantName === restaurantName) {
          count++;
          console.log('counter ' + count);
          this.restaurantList = data[i];
        }
      }
      console.log(this.restaurantList);

      console.log(this.restaurantList.name);
      console.log(this.restaurantList.id);

      this.finalurl = 'http://localhost:8080/zonions/file';
      this.url = `${this.finalurl}/${this.restaurantList.name}/${this.restaurantList.id}`;

      console.log(this.url);
    },   error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      });
  }

}
