package com.example.demo.error;

public class RestaurantNotFoundException extends RuntimeException{
	public RestaurantNotFoundException(int id) {
		super("Restaurant not found : " + id);
	}

}
