package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class BookTableEntity {

	
	 @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;

	  @Column
	  private int noOfSeats;

	  @Column
	  private String date;

	  @Column
	  private String email;

	  @Column
	  private String restaurantName;
      
	  
	public BookTableEntity() {
		super();
	}
	


	public BookTableEntity(int noOfSeats, String date, String email, String restaurantName) {
		super();
		this.noOfSeats = noOfSeats;
		this.date = date;
		this.email = email;
		this.restaurantName = restaurantName;
	}



	@Override
	public String toString() {
		return "BookTableEntity [id=" + id + ", noOfSeats=" + noOfSeats + ", date=" + date + ", email=" + email
				+ ", restaurantName=" + restaurantName + "]";
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public int getNoOfSeats() {
		return noOfSeats;
	}


	public void setNoOfSeats(int noOfSeats) {
		this.noOfSeats = noOfSeats;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getRestaurantName() {
		return restaurantName;
	}


	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}
	  

}
