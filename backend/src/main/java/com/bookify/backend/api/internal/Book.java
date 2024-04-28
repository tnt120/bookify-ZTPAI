package com.bookify.backend.api.internal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "books")
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String coverUrl;
    private Integer pages;
    private LocalDate releaseDate;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;
}
