import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
// import { UserService } from '../_services/user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurant = new Array<Restaurant>();
  restaurants: Observable<Restaurant[]>;
  restaurantName: string;
  public errorMessage = '';
  id: number;
  openCloseStatus = true;
  currentTime = new Date();
  url = '';
  finalurl = '';
  restaurantList: any;
  restaurantDetail = new Array<Restaurant>();
  constructor(private restaurantService: RestaurantService, private translate: TranslateService,
              private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getRestaurants();
      }

  getRestaurants() {
     this.restaurants = this.restaurantService.getRestaurantList();
     // tslint:disable-next-line: deprecation
     this.restaurants.subscribe(data => {
            this.restaurantList = data;
            this.restaurant = data;
            this.restaurantName = this.restaurantList.restaurantName;
            this.id = this.restaurantList.id;
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.restaurant.length ; i++) {
              let hour : any = (this.restaurant[i].close_time.split(':'))[0];
              let min: any = (this.restaurant[i].close_time.split(':'))[1];
              if (hour >= this.currentTime.getHours()) {
                this.openCloseStatus = false;
            }
            }
     }
      );
     this.finalurl = 'http://localhost:8080/zonions/file';
     this.url = `${this.finalurl}/${this.restaurantList.name}/${this.restaurantList.id}`;
  }
  getImage() {
    // const restaurantName = this.route.snapshot.params.restaurantName;
    // console.log(restaurantName);
    // tslint:disable-next-line: deprecation
    this.restaurantService.getRestaurantList().subscribe((data) => {
      console.log(data.length);
      this.restaurantDetail = data;
      console.log(this.restaurantDetail);
    },   error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      });

  }
}

