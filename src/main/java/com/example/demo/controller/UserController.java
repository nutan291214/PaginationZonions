package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RegistrationEntity;
import com.example.demo.entity.RegistrationEntityDto;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.service.UserDetailsServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class UserController {
	
	@Autowired
	UserDetailsServiceImpl service;
	
	@Autowired
    RegistrationRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	@GetMapping("/users")
	public List<RegistrationEntityDto> getAll(){
		System.out.println(service.getAllUsers());
		return service.getAllUsers();
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<RegistrationEntityDto> getUserById(@PathVariable long id){
		return service.getUsertById(id);
	}

	@PutMapping("/users/{id}")
	public RegistrationEntityDto changeRole(@PathVariable long id,@RequestBody RegistrationEntity regi ) {
		return service.changeRole(id, regi);
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<HttpStatus> deleteByUsername(@PathVariable long id){
		
		return service.deleteByUsername(id);
		
	}

	

}
