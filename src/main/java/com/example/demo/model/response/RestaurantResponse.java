package com.example.demo.model.response;

import javax.persistence.Column;
import javax.persistence.Lob;

import com.example.demo.model.View;
import com.fasterxml.jackson.annotation.JsonView;

public class RestaurantResponse {
	private int id;
	
	private String restaurantName;
	
	private String address;
	
	private String phone_no;
	
	private String open_time;
	
	private String close_time;
  
	private String status;

	private String updatedTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}

	public String getOpen_time() {
		return open_time;
	}

	public void setOpen_time(String open_time) {
		this.open_time = open_time;
	}

	public String getClose_time() {
		return close_time;
	}

	public void setClose_time(String close_time) {
		this.close_time = close_time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}

	public RestaurantResponse(int id, String restaurantName, String address, String phone_no, String open_time,
			String close_time, String status, String updatedTime) {
		super();
		this.id = id;
		this.restaurantName = restaurantName;
		this.address = address;
		this.phone_no = phone_no;
		this.open_time = open_time;
		this.close_time = close_time;
		this.status = status;
		this.updatedTime = updatedTime;
	}

	public RestaurantResponse() {
		super();
	}
	
   



}
