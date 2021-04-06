import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteComponent } from '../delete-user/user-delete.component';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../_helpers/user';

import { UserService } from '../_services/user.service';
@Component({
  selector: 'kt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  users = new Array<User>();

  role: any[];
  user = new User();
  comp: string;
  searchKey: string;
  listData: MatTableDataSource<any>;
  displayedColumns = ['Username', 'email', 'roles', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router: Router, private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reloadUser();
  }

  reloadUser() {

    // tslint:disable-next-line: deprecation
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.users = data;
      // console.log(this.restaurant);
      this.listData = new MatTableDataSource(this.users);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      // tslint:disable-next-line: no-shadowed-variable
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;

        });
      };
    }, error => console.log(error));

  }
  deleteUser(user: User): void {
    const ref = this.modalService.open(UserDeleteComponent, { centered: true });
    ref.componentInstance.id = user.id;
  }
  changeRole(id: number) {
    console.log('id in change status=', id);
    // tslint:disable-next-line: deprecation
    this.userService.getUserById(id).subscribe((resp) => {
      console.log(resp);
      this.user = resp;
      console.log(this.user);
      // tslint:disable-next-line: deprecation
      this.userService.changeUserRole(id, this.user).subscribe(
        (data) => {
          console.log(data);
          const ref = this.modalService.open(DialogComponent);
          this.comp = 'UserDetailComponent';
          ref.componentInstance.comp = this.comp;
          window.location.reload();
        },
        (error) => console.log(error)
      );
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
