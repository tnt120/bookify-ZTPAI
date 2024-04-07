package com.bookify.backend.api.internal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Entity
@Table(name = "ratings")
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int value;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
