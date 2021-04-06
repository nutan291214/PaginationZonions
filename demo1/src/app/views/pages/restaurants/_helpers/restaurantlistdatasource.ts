import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RestaurantService } from '../_services/restaurant.service';
// tslint:disable-next-line: max-line-length
import { Restaurant , RestaurantResponse} from '../../../../../../../../../zonionsRestaurant/zonionsResto/demo1/src/app/views/pages/restaurants/_helpers/restaurant';

export class RestaurantListDataSource implements DataSource<Restaurant> {

    private todoSubject = new BehaviorSubject<Restaurant[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private restaurantService: RestaurantService) { }

    connect(collectionViewer: CollectionViewer): Observable<Restaurant[]> {
        return this.todoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadTodos(pageNumber = 0, pageSize = 10) {
        this.loadingSubject.next(true);
        this.restaurantService.listRestaurant({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            // tslint:disable-next-line: deprecation
            .subscribe((result: RestaurantResponse ) => {
                this.todoSubject.next(result.content);
                this.countSubject.next(result.totalElements);
            }
            );
    }

}
