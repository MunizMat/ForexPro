package com.MunizMat.ForexPro.repositories;
import com.MunizMat.ForexPro.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, java.lang.Long> {
}