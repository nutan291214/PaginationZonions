package com.example.demo.error;

public class NoDataFoundException extends RuntimeException {

	public NoDataFoundException() {

		super("No data found");
	}
}
