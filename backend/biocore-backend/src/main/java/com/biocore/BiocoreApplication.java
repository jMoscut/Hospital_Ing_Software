package com.biocore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BiocoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(BiocoreApplication.class, args);
    }
}
