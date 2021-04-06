import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


import { BookTableComponent } from './bookTable/book-table.component';

import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantComponent } from './restaurants.component';


import { DialogComponent } from './dialog/dialog.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CoreModule } from '../core/core.module';
import { PartialsModule } from '../views/partials/partials.module';
import { MaterialPreviewModule } from '../views/partials/content/general/material-preview/material-preview.module';
import { BaseComponent } from '../views/theme/base/base.component';
import { AuthGuard } from '../core/auth';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { HeaderMobileComponent } from '../views/theme/header/header-mobile/header-mobile.component';
import { HeaderComponent } from '../views/theme/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

const routes: Routes = [
	{
		 path: '',
		component: RestaurantComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'restaurantDetail/:restaurantName',
				component: RestaurantDetailsComponent

			},

			{
				path: 'booktable',
				canActivate: [AuthGuard],
				children: [
					{
						path: 'booktable',
			        	component: BookTableComponent
					},
				]
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
		TranslateModule.forRoot(),
	],
	exports: [RouterModule],
	declarations: [
		RestaurantComponent,
		HomeComponent,
		RestaurantDetailsComponent,
		BookTableComponent,
		DialogComponent,
		BreadcrumbComponent,
		LanguageSelectorComponent,
		FooterComponent,

	],
	providers: [
		{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
	 ],
	entryComponents: [ DialogComponent] ,
})
export class RestaurantModule {
}
