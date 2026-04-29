package com.biocore.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Applies schema changes that Hibernate's ddl-auto=update may miss
 * when using Neon's PgBouncer connection pooling (DDL via pooled connections
 * is silently dropped in transaction pooling mode).
 *
 * Safe to run on every startup — all statements use ADD COLUMN IF NOT EXISTS.
 */
@Slf4j
@Component
@Order(1)
@RequiredArgsConstructor
public class SchemaMigrationRunner implements ApplicationRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(ApplicationArguments args) {
        log.info("Running schema migration checks...");

        applyIfMissing(
            "users", "must_change_password",
            "ALTER TABLE users ADD COLUMN must_change_password BOOLEAN NOT NULL DEFAULT FALSE"
        );
        applyIfMissing(
            "patients", "birth_date",
            "ALTER TABLE patients ADD COLUMN birth_date DATE"
        );
        applyIfMissing(
            "patients", "user_id",
            "ALTER TABLE patients ADD COLUMN user_id BIGINT"
        );

        // Recreate role check constraint to include PATIENT role
        fixRoleCheckConstraint();

        // Recreate ticket status check constraint to include PENDING_PAYMENT
        fixTicketStatusCheckConstraint();

        log.info("Schema migration checks complete.");
    }

    private void fixRoleCheckConstraint() {
        try {
            // Drop the old constraint (created without PATIENT) and recreate it with all roles
            jdbcTemplate.execute("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check");
            jdbcTemplate.execute(
                "ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (" +
                "role IN ('ADMIN','DOCTOR','NURSE','LAB_TECHNICIAN','PHARMACIST','CASHIER','HEALTH_STAFF','PATIENT'))"
            );
            log.info("Schema: users_role_check constraint updated to include PATIENT role");
        } catch (Exception e) {
            log.warn("Schema migration warning for users_role_check: {}", e.getMessage());
        }
    }

    private void fixTicketStatusCheckConstraint() {
        try {
            jdbcTemplate.execute("ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_status_check");
            jdbcTemplate.execute(
                "ALTER TABLE tickets ADD CONSTRAINT tickets_status_check CHECK (" +
                "status IN ('PENDING_PAYMENT','WAITING','CALLED','IN_CONSULTATION','COMPLETED','CANCELLED','NO_SHOW'))"
            );
            log.info("Schema: tickets_status_check constraint updated to include PENDING_PAYMENT");
        } catch (Exception e) {
            log.warn("Schema migration warning for tickets_status_check: {}", e.getMessage());
        }
    }

    private void applyIfMissing(String table, String column, String ddl) {
        try {
            Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.columns " +
                "WHERE table_name = ? AND column_name = ?",
                Integer.class, table, column
            );
            if (count == null || count == 0) {
                jdbcTemplate.execute(ddl);
                log.info("Schema: added column {}.{}", table, column);
            }
        } catch (Exception e) {
            log.warn("Schema migration warning for {}.{}: {}", table, column, e.getMessage());
        }
    }
}
