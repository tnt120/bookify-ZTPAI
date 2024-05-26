package com.bookify.backend.repository;

import com.bookify.backend.api.internal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findUserByRoleId(Integer roleId);
}
