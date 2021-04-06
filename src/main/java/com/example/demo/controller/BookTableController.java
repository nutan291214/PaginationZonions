package com.example.demo.controller;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.BookTableEntity;
import com.example.demo.service.BookTableService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/zonions")
public class BookTableController implements Serializable{
	
	private static final long serialVersionUID = -8307709883912382363L;
	
	@Autowired
	  BookTableService bookTableService;

	  @PostMapping("/bookTable")
	  //@PreAuthorize("hasRole('USER')")
	  public BookTableEntity bookTable(@RequestBody BookTableEntity bookTable) {
		  System.out.println("Book Table Object controller=="+bookTable);
	    return bookTableService.bookTable(bookTable);
	  }


}
