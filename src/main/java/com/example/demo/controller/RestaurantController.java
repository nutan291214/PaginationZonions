package com.example.demo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.RestaurantModel;
import com.example.demo.repository.RestaurantRepository;
import com.example.demo.service.RestaurantService;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/zonions")
public class RestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private RestaurantRepository restaurantRepository;
	private static Logger log= LoggerFactory.getLogger(RestaurantController.class);
	//To add restaurant object
	@PostMapping("/restaurant")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<RestaurantModel> save(@RequestBody RestaurantModel restaurant){
		return restaurantService.createRestaurant(restaurant);
	}
	
	
	//To add Image
	@PutMapping("/restaurantImage/{id}")
	public String imageUpload(@RequestParam MultipartFile file, @PathVariable int id) throws IOException {
		log.info("Original Image Byte Size - " + file.getBytes().length);
		return restaurantService.uploadImage(file,id);
	}
	
	
	private static final String RESTAURANT_SERVICE = "restaurantService";

	  public ResponseEntity<String> rateLimiterFallback(Exception e) {
	    return new ResponseEntity<>(
	        "Too many requests - restaurant service does not permit further calls. Please retry after sometime",
	        HttpStatus.TOO_MANY_REQUESTS);

	  }
	  
	//To get All restaurant
		@GetMapping("/restaurant")
		//@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
		@RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
		public ResponseEntity<List<RestaurantModel>> getRestaurant(){
			List<RestaurantModel> restList=restaurantService.getAllRestaurant();
			return ResponseEntity.of(Optional.of(restList));
		}

	//To get All restaurant
	@GetMapping("/restaurant/pagination")
	//@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	//@RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
	public Page<RestaurantModel> getRestaurant(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "3") int size){
		 PageRequest pageRequest = PageRequest.of(page, size);
		 Page<RestaurantModel> pageResult = restaurantRepository.findAll(pageRequest);
		 List<RestaurantModel> todos = new ArrayList<RestaurantModel>();
		 for(RestaurantModel rest: pageResult)
		 {
			 todos.add(rest);
		 }
		 return new PageImpl<>(todos, pageRequest, pageResult.getTotalElements());
	}
	
//	@GetMapping("/restaurant")
//	  //@RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
//	  public ResponseEntity<Map<String, Object>> getActiveRestaurants(
//	      @RequestParam(required = false) String restaurantName,
//	      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
//
//	    List<RestaurantModel> restaurants = new ArrayList<RestaurantModel>();
//	    Pageable pagingSort = PageRequest.of(page, size);
//
//	    Page<RestaurantModel> pages;
//	    if (restaurantName == null)
//	      pages = restaurantRepository.findAll(pagingSort);
//	    else
//	      pages = restaurantRepository.findByRestaurantNameContaining(restaurantName, pagingSort);
//
//	    restaurants = pages.getContent();
//
//	    Map<String, Object> response = new HashMap<>();
//	    response.put("restaurants", restaurants);
//	    response.put("currentPage", pages.getNumber());
//	    response.put("totalItems", pages.getTotalElements());
//	    response.put("totalPages", pages.getTotalPages());
//
//	    List<RestaurantModel> list = restaurantService.getAllRestaurant();
//	    return new ResponseEntity<>(response, HttpStatus.OK);
//	  }
	
	//To get restaurants By id
	@GetMapping("/restaurant/{id}")
	//@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
	public ResponseEntity<RestaurantModel> getById(@PathVariable int id){
		return restaurantService.getRestaurantById(id);
	}
	
	//To get Restaurant by status
	@GetMapping("/restaurants/{status}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public RestaurantModel getByStatus(@PathVariable String status) {
		return restaurantService.getRestaurantByStatus(status);
	}
	
	//To delete restaurant By Id
	@DeleteMapping("/restaurant/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteByRestaurantId(@PathVariable int id){
		return restaurantService.deleteById(id);
	}
	
	//To update Restaurant 
	@PutMapping("/restaurant/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<RestaurantModel> updateRestaurant(@PathVariable int id, @RequestBody RestaurantModel rm){
		System.out.println("Inside update controller");
		return restaurantService.updateRestaurant(id, rm);
	}
	
	//To get Image By name and restaurant Id
	@GetMapping("/file/{name}/{id}")
    
	//@GetMapping("/file/{name}")
	  public ResponseEntity<byte[]> getFileByName(@PathVariable String name,@PathVariable int id) {
		  System.out.println("name="+name+"Id="+id);
		    Optional<RestaurantModel> fileOptional = restaurantRepository.findByNameAndId(name,id);
		    if(fileOptional.isPresent()) {
		      RestaurantModel file = fileOptional.get();
		      return ResponseEntity.ok()
		          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
		          .body(file.getPic());  
		    }
		    
		    return ResponseEntity.status(404).body(null);
		  }
	                 
      //To change restaurant status active/deactive	  
	  @PutMapping("/changestatus/{id}")
	  @PreAuthorize("hasRole('ADMIN')")
		public RestaurantModel statusChange(@PathVariable int id, @RequestBody RestaurantModel rm){
		  System.out.println("In change status of put....");
			return restaurantService.changeStatus(id, rm);
		}

}
