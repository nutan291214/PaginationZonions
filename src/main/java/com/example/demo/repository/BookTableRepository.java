package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BookTableEntity;
@Repository
public interface BookTableRepository extends CrudRepository<BookTableEntity, Long>{

}
