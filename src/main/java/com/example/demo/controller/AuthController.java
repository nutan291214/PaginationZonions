package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ERole;
import com.example.demo.entity.RegistrationEntity;
import com.example.demo.entity.RegistrationEntityDto;
import com.example.demo.entity.Role;
import com.example.demo.model.request.RegistrationRequestModel;
import com.example.demo.model.request.UserLoginRequestModel;
import com.example.demo.model.response.JwtResponse;
import com.example.demo.model.response.MessageResponse;
import com.example.demo.repository.RegistrationDtoRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.service.UserDetailsImpl;
import com.example.demo.service.UserDetailsServiceImpl;
import com.example.demo.shared.JwtUtils;




@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
     RegistrationRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	RegistrationDtoRepository dtoRepository;
	@Autowired
	UserDetailsServiceImpl service;
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginRequestModel loginRequest,HttpServletRequest request) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		RegistrationEntityDto findByUsername = dtoRepository.findByUsername(loginRequest.getUsername());
		List<String> role=new ArrayList<>();
		RegistrationEntityDto user=findByUsername;
	
			
			for(Role r:user.getRoles()) {
	            role.add(r.getName().name());
	            System.out.println("Getting role......"+r.getName().name());
	        	roles=role;
	        }
			
			@SuppressWarnings("unchecked")
		    List<String> usernames = (List<String>) request.getSession().getAttribute("SESSION_USER");
		    if (usernames == null) {
		      usernames = new ArrayList<>();

		      request.getSession().setAttribute("SESSION_USER", loginRequest.getUsername());
		      request.getSession().setMaxInactiveInterval(10 * 60);

		    }

		    usernames.add(loginRequest.getUsername());
		    request.getSession().setAttribute("SESSION_USER", usernames);

		    request.getSession().setMaxInactiveInterval(10 * 60);
		
		
		
		
       System.out.println(roles);
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequestModel signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		RegistrationEntity user = new RegistrationEntity(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));
		
		RegistrationEntityDto user1 = new RegistrationEntityDto(signUpRequest.getUsername(), 
				 signUpRequest.getEmail());
		
       
		Set<String> strRoles = signUpRequest.getRole();
		
		Set<Role> roles = new HashSet<>();
		
		Role userRole = roleRepository.findByName(ERole.ROLE_USER);
		roles.add(userRole);        
		user.setRoles(roles);
		user1.setRoles(roles);
		userRepository.save(user);
		dtoRepository.save(user1); 
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	
}
