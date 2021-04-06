export interface RestaurantResponse {
    content: Restaurant[];
    totalElements: number;
}
export class Restaurant {
    id = 0;
    restaurantName = '';
    address = '';
    // tslint:disable-next-line: variable-name
    phone_no = '';
    // tslint:disable-next-line: variable-name
    open_time = '';
    // tslint:disable-next-line: variable-name
    close_time = '';
    // tslint:disable-next-line: variable-name
    updated_date = '';
    name = '';
    status = '';
    updatedTime = '';

}
