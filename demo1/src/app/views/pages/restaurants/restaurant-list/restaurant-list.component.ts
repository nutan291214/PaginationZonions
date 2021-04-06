import { Component, OnInit, ViewChild } from '@angular/core';

// RXJS
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';
import { RestaurantService } from '../_services/restaurant.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantDeleteComponent } from '../delete-restaurant/delete-restaurant.component';
import { UpdateRestaurantComponent } from '../update-restaurant/update-restaurant.component';
import { DialogComponent } from '../dialog/dialog.component';
import { CreateRestaurantComponent } from '../create-restaurant/create-restaurant.component';
import moment from 'moment';
// tslint:disable-next-line: max-line-length
import { RestaurantListDataSource } from '/home/njadhav/Documents/zonionsRestaurant/zonionsResto/demo1/src/app/views/pages/restaurants/_helpers/restaurantlistdatasource';


@Component({
  selector: 'kt-restaurant-list',
  templateUrl: './restaurant-list.component.html',
})
export class RestaurantListComponent implements OnInit {
  dataSource: RestaurantListDataSource ;
  restaurants: any;
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

  currentTutorial = null;
  currentIndex = 1;
  restaurantName = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private activatedRoute: ActivatedRoute, private modalService: NgbModal) {

  }
  listData: MatTableDataSource<any>;
  ngOnInit(): void {
    this.dataSource = new RestaurantListDataSource(this.restaurantService);
    this.dataSource.loadTodos();
    console.log(this.dataSource.loadTodos());
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      // tslint:disable-next-line: deprecation
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadTodos())
      )
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  loadTodos() {
    this.dataSource.loadTodos(this.paginator.pageIndex, this.paginator.pageSize);
  }


  // getRequestParams(searchTitle, page, pageSize) {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   if (searchTitle) {
  //     params[`restaurantName`] = searchTitle;
  //   }

  //   if (page) {
  //     params[`page`] = page - 1;
  //   }

  //   if (pageSize) {
  //     params[`size`] = pageSize;
  //   }

  //   return params;
  // }

  // retrieveTutorials() {
  //   const params = this.getRequestParams(this.restaurantName, this.page, this.pageSize);

  //   this.restaurantService.getAll(params)
  //     // tslint:disable-next-line: deprecation
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.restaurants = response.restaurants;
  //         this.count = response.totalItems;
  //         console.log(response);
  //         console.log(this.restaurants);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // handlePageChange(event) {
  //   this.page = event;
  //   this.retrieveTutorials();
  // }

  // handlePageSizeChange(event) {
  //   this.pageSize = event.target.value;
  //   this.page = 0;
  //   this.retrieveTutorials();
  // }




  // reload(): void {
  //   // tslint:disable-next-line: deprecation
  //   this.restaurantService.getRestaurantList().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.restaurants = data;
  //      // this.restaurant.updatedTime = moment().format('YYYY-MM-DD');
  //       console.log(this.restaurant);
  //       this.listData = new MatTableDataSource(this.restaurants);
  //       this.listData.sort = this.sort;
  //       this.listData.paginator = this.paginator;
  //       // tslint:disable-next-line: no-shadowed-variable
  //       this.listData.filterPredicate = (data, filter) => {
  //         return this.displayedColumns.some(element => {
  //           return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

  //         });
  //       };
  //     }, error => {
  //       if (error.status === 500) {
  //         this.router.navigate(['error/500']);
  //       }
  //     }
  //   );
  // }

  // deleteRestaurant(restaurant: Restaurant): void {
  //   const ref = this.modalService.open(RestaurantDeleteComponent, { centered: true });
  //   ref.componentInstance.id = restaurant.id;
  // }

  // // edit(id: number): void {
  // //   this.router.navigate(['restaurants', 'update', id]);
  // // }

  // edit(restaurant: Restaurant): void {
  //   // this.router.navigate(['restaurants', 'update', id]);
  //   const ref = this.modalService.open(UpdateRestaurantComponent, { centered: true });
  //   ref.componentInstance.restaurant = restaurant;
  //   ref.componentInstance.id = restaurant.id;
  //   ref.result.then((yes) => {
  //     console.log('Yes Click');

  //   },
  //     (cancel) => {
  //       console.log('Cancel Click');

  //     });
  // }
  // back(): void {
  //   this.router.navigate(['restaurants', 'home']);
  // }

  // changeStatus(id: number): void {
  //   console.log('id in change status=', id);
  //   // tslint:disable-next-line: deprecation
  //   this.restaurantService.getRestoId(id).subscribe((resp) => {
  //     console.log(resp);
  //     this.restaurantObject = resp;
  //     console.log(this.restaurantObject);
  //     // tslint:disable-next-line: deprecation
  //     this.restaurantService.changeStatus(id, this.restaurantObject).subscribe(
  //       (data) => {
  //         console.log(data);
  //         const ref = this.modalService.open(DialogComponent);
  //         this.comp = 'RestaurantListComponent';
  //         ref.componentInstance.comp = this.comp;
  //         this.reload();
  //       }, error => {
  //         if (error.status === 500) {
  //           this.router.navigate(['error/500']);
  //         }
  //       }
  //     );
  //   });
  // }

  // onSearchClear() {
  //   this.searchKey = '';
  //   this.applyFilter();
  // }

  // applyFilter() {
  //   this.listData.filter = this.searchKey.trim().toLowerCase();
  // }

  // open(): void {


  //   const ref = this.modalService.open(CreateRestaurantComponent, { centered: true });
  //   // this.modalService.dismissAll();

  //   // const ref = this.modalService.open(DialogComponent);
  //   // this.comp = 'CreateRestaurantComponent';
  //   // ref.componentInstance.comp = this.comp;
  //   // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', size: 'lg' });
  // }
}
