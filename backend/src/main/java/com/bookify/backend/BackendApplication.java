package com.bookify.backend;

import com.bookify.backend.repository.AuthorRepository;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.repository.GenreRepository;
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
			final RoleRepository roleRepository,
			final GenreRepository genreRepository,
			final BookRepository bookRepository
			) {
		return args -> {
//			var author = authorRepository.save(new Author().setFirstName("Artur").setLastName("Kowalski"));
//		    roleRepository.save(new Role().setName("USER"));
//			roleRepository.save(new Role().setName("ADMIN"));
//			var genre = genreRepository.save(new Genre().setName("Fantasy"));
//			bookRepository.save(new Book().setTitle("Harry Potter").setAuthor(author).setGenre(genre).setCoverUrl("cover.jpg"));
        };
    }
}
