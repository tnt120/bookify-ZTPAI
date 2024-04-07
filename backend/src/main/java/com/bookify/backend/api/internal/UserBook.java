package com.bookify.backend.api.internal;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Entity
@Table(name = "userBooks")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "bookcaseType_id")
    private BookcaseType bookcaseType;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    private Integer currentPage;
}
