package com.biocore.repository;

import com.biocore.entity.User;
import com.biocore.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByCollegiateNumber(String collegiateNumber);
    List<User> findByRole(Role role);
    List<User> findByActiveTrue();
    List<User> findByRoleAndActiveTrue(Role role);
    boolean existsByUsername(String username);
    boolean existsByCollegiateNumber(String collegiateNumber);
}
