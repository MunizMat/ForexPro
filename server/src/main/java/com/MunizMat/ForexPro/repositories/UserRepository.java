package com.MunizMat.ForexPro.repositories;
import com.MunizMat.ForexPro.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, java.lang.Long> {
    Optional<User> findByEmail(String email);
}