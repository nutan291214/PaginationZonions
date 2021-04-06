import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { constant } from 'lodash';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'kt-user-delete',
  templateUrl: './user-delete.component.html',
})
export class UserDeleteComponent implements OnInit {
  id: number;
  confirm = false;
  comp: string;
  constructor(private userServiec: UserService, private router: Router, private modalService: NgbModal) {
  }
  ngOnInit(): void {
    // this.deleteRestaurant();
  }
  deleteUser(): void {
    // tslint:disable-next-line: deprecation
    this.userServiec.deleteUser(this.id).subscribe(
      (data) => {
        console.log(data);
        this.confirm = true;
        this.modalService.dismissAll();
        const ref = this.modalService.open(DialogComponent);
        this.comp = 'UserDeleteComponent';
        ref.componentInstance.comp = this.comp;

        window.location.reload();
      }, error => {
        if (error.status === 500) {
          this.router.navigate(['error/500']);
        }
      }
    );
  }

  close() {
    this.modalService.dismissAll();
    this.confirm = false;
  }
}
