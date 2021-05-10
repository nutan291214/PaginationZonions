import { DataSource } from '@angular/cdk/table';

import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RestaurantService } from '../_services/restaurant.service';
// tslint:disable-next-line: max-line-length
import { Restaurant, RestaurantResponse } from '/home/njadhav/Documents/OldPaginationCode/PaginationZonions/demo1/src/app/restaurant/_helpers/restaurant';

export class RestaurantDataSource implements DataSource<Restaurant> {

    private todoSubject = new BehaviorSubject<Restaurant[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private todoService: RestaurantService) { }

    connect(collectionViewer: CollectionViewer): Observable<Restaurant[]> {
        return this.todoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadRestaurant(pageNumber = 0, pageSize = 3): any {
        this.loadingSubject.next(true);
        this.todoService.getAll({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            // tslint:disable-next-line: deprecation
            .subscribe((result: RestaurantResponse) => {
                this.todoSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }

}
