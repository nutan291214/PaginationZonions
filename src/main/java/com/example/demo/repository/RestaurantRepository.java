package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;


import com.example.demo.model.RestaurantModel;
@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantModel, Integer> {
	
	public RestaurantModel findByStatus(String status);
	public Optional<RestaurantModel> findByNameAndId(String name,int id);
	Page<RestaurantModel> findByRestaurantNameContaining(String restaurantName, Pageable pageable);

}
