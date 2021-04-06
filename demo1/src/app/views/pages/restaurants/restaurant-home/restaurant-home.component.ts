import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
// import { UserService } from '../_services/user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-home',
  templateUrl: './restaurant-home.component.html',
})
export class HomeComponent implements OnInit {
  restaurant = new Array<Restaurant>();
  public errorMessage = '';

  constructor(private restaurantService: RestaurantService, private router: Router ,
    // tslint:disable-next-line: align
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): any {
    return this.restaurantService.getRestaurantList().subscribe((data) => {
      console.log(data);
      console.log(data.length);
      this.restaurant = data;
    },   error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
    });
  }
}
