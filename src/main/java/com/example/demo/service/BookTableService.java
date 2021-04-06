package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.BookTableEntity;
import com.example.demo.repository.BookTableRepository;

@Service
public class BookTableService {
	
	 @Autowired
	  BookTableRepository bookRepo;


	  public BookTableEntity bookTable(@RequestBody BookTableEntity bookTable) {
		  System.out.println("Book Table Object service=="+bookTable);
	    return bookRepo.save(bookTable);
	  }

}
