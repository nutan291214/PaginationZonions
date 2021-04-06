import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-restaurants',
	templateUrl: './restaurants.component.html',
	styleUrls: ['./restaurants.component.scss']
})
export class RestaurantComponent implements OnInit {

	constructor(private translate: TranslateService) {
	}

	ngOnInit() {
	}
}
