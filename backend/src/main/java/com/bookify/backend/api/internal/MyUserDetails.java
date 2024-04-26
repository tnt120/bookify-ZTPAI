package com.bookify.backend.api.internal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Entity
@Table(name = "userDetails")
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Builder
public class MyUserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
