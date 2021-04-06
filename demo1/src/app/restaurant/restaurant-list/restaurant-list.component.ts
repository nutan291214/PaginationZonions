import { Component, OnInit, ViewChild } from '@angular/core';

// RXJS
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'kt-restaurant-list',
  templateUrl: './restaurant-list.component.html',
})
export class RestaurantListComponent implements OnInit {
  // dataSource: RestaurantListDataSource ;
  restaurants = new Array<Restaurant>();
  restaurantList = new Array<Restaurant>();
  restList: Restaurant[];
  restaurant: Restaurant = new Restaurant();
  displayedColumns = ['restaurantName', 'address', 'phoneNo', 'openTime', 'closeTime', 'updatedTime', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  id = 0;
  restaurantObject = new Array<Restaurant>();
  searchKey: string;
  comp: string;
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private activatedRoute: ActivatedRoute, private modalService: NgbModal) {

  }
  listData: MatTableDataSource<any>;
  ngOnInit(): void {
    this.reload();
  }


  reload(): void {
    // tslint:disable-next-line: deprecation
    this.restaurantService.getRestaurantList().subscribe(
      (data) => {
        console.log(data);
        this.restaurants = data;
        console.log(this.restaurant);
        this.listData = new MatTableDataSource(this.restaurants);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        // tslint:disable-next-line: no-shadowed-variable
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(element => {
            return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

          });
        };
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
