import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { PartialsModule } from '../../partials/partials.module';
import { BookTableComponent } from './bookTable/book-table.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { AdminDashboardComponent } from './Dashboard/admin-dashboard.component';
import { RestaurantDeleteComponent } from './delete-restaurant/delete-restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantsComponent } from './restaurants.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DialogComponent } from './dialog/dialog.component';
import { UserDeleteComponent} from './delete-user/user-delete.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimeConversion } from './_helpers/timeConversion.pipe';

const routes: Routes = [
	{
		path: '',
		component: RestaurantsComponent,
		data : {breadcrumb : 'Restaurants'},
		children: [
			{
				path: 'home',
				component: HomeComponent,
				data : {breadcrumb : 'Home'}
			},
			{
				path: 'create',
				component: CreateRestaurantComponent,
				data : {breadcrumb : 'Create Restaurant'}

            },
            {
                path: 'list',
                component: RestaurantListComponent,
				data : {breadcrumb : 'Restaurant List'}

			},
			{
				path: 'update/:id',
				component: UpdateRestaurantComponent,
				data : {breadcrumb : ''}

			},
			{
				path: 'restaurantDetail/:restaurantName',
				component: RestaurantDetailsComponent,
				data : {breadcrumb : 'Restaurant Detail'}

			},
			{
				path: 'users',
				component: UserDetailComponent,
				data : {breadcrumb : 'Users List'}

			},
			{
				path: 'booktable',
				component: BookTableComponent
			}

		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		NgbModule,
		CoreModule,
		NgxPaginationModule,
		MaterialPreviewModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		PerfectScrollbarModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatToolbarModule,
		MatSlideToggleModule,
		TranslateModule.forChild(),

	],
	exports: [RouterModule],
	declarations: [
		RestaurantsComponent,
		HomeComponent,
        CreateRestaurantComponent,
		RestaurantListComponent,
		UpdateRestaurantComponent,
		RestaurantDetailsComponent,
		UserDetailComponent,
		AdminDashboardComponent,
		RestaurantDeleteComponent,
		BookTableComponent,
		DialogComponent,
		UserDeleteComponent,
		BreadcrumbComponent,
		TimeConversion
	],
	providers: [
		{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
	 ],
	entryComponents: [CreateRestaurantComponent, RestaurantDeleteComponent, DialogComponent,UserDeleteComponent] ,
})
export class RestaurantsModule {
}
