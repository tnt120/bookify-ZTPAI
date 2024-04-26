package com.bookify.backend;

import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.Role;
import com.bookify.backend.repository.AuthorRepository;
import com.bookify.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(
			final AuthorRepository authorRepository,
			final RoleRepository roleRepository
			) {
		return args -> {
			authorRepository.save(new Author().setFirstName("Artur").setLastName("Kowalski"));
		    roleRepository.save(new Role().setName("USER"));
			roleRepository.save(new Role().setName("ADMIN"));
        };
    }
}
