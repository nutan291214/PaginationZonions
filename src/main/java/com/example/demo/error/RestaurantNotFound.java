package com.example.demo.error;

public class RestaurantNotFound extends RuntimeException{

	public RestaurantNotFound(Integer id) {
		super(String.format("Restaurant with Id %d not found", id));
	}
}
