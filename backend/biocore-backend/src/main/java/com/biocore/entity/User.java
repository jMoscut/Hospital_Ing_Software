package com.biocore.entity;

import com.biocore.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    /** Solo para médicos (CU2 FA01) */
    private String specialty;

    /** RN-M05: No puede haber colegiado duplicado */
    @Column(unique = true)
    private String collegiateNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    /** RN-P003: El sistema obliga a cambiar contraseña temporal en el primer inicio de sesión */
    @Column(nullable = false)
    @Builder.Default
    private boolean mustChangePassword = false;

    /** Médico disponible para recibir paciente — toggle manual, auto-off al completar consulta */
    @Column(nullable = false)
    @Builder.Default
    private boolean available = false;

    /** Updated by GET /api/users/me polling — used to detect if portal is open */
    @Column
    private LocalDateTime onlineAt;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
