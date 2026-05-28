# BioCore Medical System

> Sistema Integral de Gestión Hospitalaria — Hospital Information System

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.6-6DB33F?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-336791?logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![Railway](https://img.shields.io/badge/Deployed_on-Railway-0B0D0E?logo=railway&logoColor=white)

---

## Descripción

BioCore Medical es un sistema hospitalario completo que digitaliza y automatiza los procesos de atención médica: desde el registro del paciente hasta la entrega de resultados de laboratorio.

El sistema opera con **7 roles de usuario** y cubre los flujos de trabajo de recepción, consulta médica, laboratorio, farmacia, caja y administración.

---

## Características Principales

- **Cola de atención en tiempo real** — Monitoreo con actualización automática cada 10 segundos
- **Gestión de pacientes** — Registro, búsqueda por DPI, expediente clínico completo
- **Consulta médica** — Prescripciones, órdenes de laboratorio, historial por ticket
- **Laboratorio** — Órdenes, recolección de muestras, resultados en PDF con notificación por email
- **Farmacia** — Venta libre (OTC) y despacho con receta médica
- **Caja / Pagos** — Citas, laboratorio, farmacia con descuento por seguro y reagendamiento
- **Emergencias** — Registro rápido, signos vitales, reporte médico
- **Dashboard administrativo** — Estadísticas en tiempo real
- **Portal del paciente** — Acceso a citas, recetas y resultados de laboratorio propios
- **Pantalla de sala de espera** — Display TV con turnos siendo llamados
- **Gestión de personal** — Altas, bajas, asignación de clínicas, horarios

---

## Stack Tecnológico

### Frontend
| Tecnología | Versión |
|-----------|---------|
| Angular | 17.0.0 |
| TypeScript | 5.2.0 |
| Angular Material (MDC) | 17.0.0 |
| RxJS | 7.8.0 |
| SCSS | integrado |

### Backend
| Tecnología | Versión |
|-----------|---------|
| Spring Boot | 3.3.6 |
| Java | 17 |
| Spring Security + JWT | JJWT 0.12.6 |
| Spring Data JPA / Hibernate | — |
| PostgreSQL | Neon Cloud |
| Spring Mail | Gmail SMTP |

---

## Estructura del Repositorio

```
Hospital_Ing_Software/
│
├── frontend/
│   └── biocore-frontend/                    # Aplicación Angular 17
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/                    # Configuración centralizada
│       │   │   │   ├── auth/                # Servicios de autenticación
│       │   │   │   ├── guards/              # Guardias de rutas (role-based)
│       │   │   │   ├── interceptors/        # Interceptores HTTP (JWT)
│       │   │   │   └── models/              # Interfaces y tipos globales
│       │   │   │
│       │   │   ├── shared/                  # Código compartido
│       │   │   │   └── services/            # Servicios HTTP y utilitarios
│       │   │   │
│       │   │   └── modules/                 # Módulos funcionales (lazy-loaded)
│       │   │       ├── appointments/        # Gestión de citas
│       │   │       ├── call-screen/         # Pantalla de sala de espera
│       │   │       ├── consultation/        # Módulo de consulta médica
│       │   │       ├── emergency/           # Módulo de emergencias
│       │   │       ├── emergency-consultation/ # Consulta de emergencia
│       │   │       ├── health-staff/        # Panel de recepción/enfermería
│       │   │       ├── laboratory/          # Módulo de laboratorio
│       │   │       ├── mis-citas/           # Portal paciente (mis citas)
│       │   │       ├── patient/             # Gestión de pacientes
│       │   │       ├── payments/            # Módulo de pagos/caja
│       │   │       ├── pharmacy/            # Módulo de farmacia
│       │   │       ├── portal/              # Portal del paciente
│       │   │       ├── public-register/     # Registro público
│       │   │       ├── reporting/           # Reportes y estadísticas
│       │   │       └── user-management/     # Gestión de usuarios/personal
│       │   │
│       │   ├── environments/                # Configuración por ambiente
│       │   ├── styles.scss                  # Estilos globales
│       │   ├── main.ts                      # Bootstrap de la aplicación
│       │   └── index.html                   # HTML principal
│       │
│       ├── angular.json                     # Configuración de Angular CLI
│       ├── tsconfig.json                    # Configuración de TypeScript
│       ├── tsconfig.app.json                # TypeScript para la aplicación
│       ├── package.json                     # Dependencias npm
│       ├── package-lock.json                # Lock file
│       ├── Dockerfile                       # Contenerización
│       ├── .dockerignore                    # Exclusiones Docker
│       ├── nginx.conf                       # Configuración NGINX (producción)
│       └── railway.toml                     # Configuración Railway
│
├── backend/
│   └── biocore-backend/                     # API Spring Boot
│       ├── src/main/
│       │   ├── java/com/biocore/
│       │   │   ├── BiocoreApplication.java  # Clase principal
│       │   │   │
│       │   │   ├── config/                  # Configuración (CORS, Security, DataInitializer)
│       │   │   │   ├── SecurityConfig.java  # Spring Security + CORS + JWT filter
│       │   │   │   ├── DataInitializer.java # Seed de datos al arrancar
│       │   │   │   └── SchemaMigrationRunner.java
│       │   │   │
│       │   │   ├── controller/              # Controladores REST
│       │   │   │   └── *Controller.java
│       │   │   │
│       │   │   ├── service/                 # Lógica de negocio
│       │   │   │   └── *Service.java
│       │   │   │
│       │   │   ├── repository/              # Interfaces Spring Data JPA
│       │   │   │   └── *Repository.java
│       │   │   │
│       │   │   ├── entity/                  # Entidades JPA (23 tablas)
│       │   │   │   └── *.java
│       │   │   │
│       │   │   ├── dto/                     # Data Transfer Objects
│       │   │   │   ├── request/             # DTOs de entrada
│       │   │   │   └── response/            # DTOs de salida
│       │   │   │
│       │   │   ├── security/                # Seguridad
│       │   │   │   ├── JwtUtil.java         # Generación y validación JWT
│       │   │   │   ├── JwtFilter.java       # Filtro JWT (OncePerRequestFilter)
│       │   │   │   ├── UserDetailsServiceImpl.java
│       │   │   │   └── CustomUserDetails.java
│       │   │   │
│       │   │   └── enums/                   # Enumeraciones de dominio
│       │   │
│       │   └── resources/
│       │       └── application.properties   # Propiedades de la aplicación
│       │
│       ├── pom.xml                          # Dependencias Maven
│       ├── target/                          # Artefactos compilados
│       └── uploads/                         # Almacenamiento de archivos
│
├── Docs/
│   ├── 2. Manual_Tecnico_BioCore_Medical_v2.2.md   # Documentación técnica (este archivo)
│   ├── 1. Manual_Usuario_BioCore_Medical_v2.2.pdf  # Manual de usuario
│   ├── 4. Plan de pruebas de software.pdf          # Plan de pruebas
│   ├── 5. BioCore_Medical_Casos_de_Uso.pdf         # Casos de uso
│   ├── 3.1 Diagrama de Clases.png
│   ├── 3.2 Diagrama de Estados.png
│   ├── 3.3 Diagrama de Procesos.png
│   ├── 3.4 Diagrama de Despliegue.png
│   └── 3.5 Diagrama Entidad Relacion.png
│
└── README.md                                 # Este archivo

```

---

## Organización de Módulos Frontend

Cada módulo en `src/app/modules/` es un **componente Angular standalone** contenido en un único archivo:

```
modulo/
└── modulo.component.ts   # Componente standalone con lógica, template y estilos
```

Los servicios compartidos viven en `src/app/shared/services/` y son inyectados por los componentes.

---

## Organización del Backend

### Capas de la Aplicación

```
Controller (REST Endpoints)
    ↓
Service (Lógica de Negocio)
    ↓
Repository (Acceso a Datos)
    ↓
Entity (Modelo de Base de Datos)
```

### Seguridad

- **JWT (JSON Web Tokens)** para autenticación
- **Roles basados en autorización** (ADMIN, DOCTOR, PATIENT, etc.)
- **Filtros de seguridad** en cada request

---

## Roles y Permisos

| Rol | Descripción | Módulos |
|-----|-------------|---------|
| `ADMIN` | Administrador | Todo + Reportería + Personal |
| `HEALTH_STAFF` | Recepcionista / Enfermería | Recepción, Cola, Signos Vitales, Emergencias |
| `DOCTOR` | Médico | Consulta, Prescripciones, Laboratorio |
| `LAB_TECHNICIAN` | Laboratorista | Órdenes de Lab, Resultados |
| `PHARMACIST` | Farmacéutico | Inventario, Ventas, Despacho |
| `CASHIER` | Cajero | Citas, Pagos, Facturación |
| `PATIENT` | Paciente | Portal personal (mis citas, resultados) |

---

## Instalación y Ejecución

### Requisitos previos

- Node.js 18+
- npm 9+
- Java 17+
- Maven 3.8+
- PostgreSQL (local o Neon Cloud)

---

### Frontend

```bash
# 1. Ingresar al directorio
cd frontend/biocore-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar API URL en src/environments/environment.ts
#    apiUrl: 'http://localhost:8085/api'

# 4. Iniciar servidor de desarrollo
npm start
# Disponible en http://localhost:4200
```

#### Build de producción

```bash
npm run build
# Genera dist/biocore-frontend/
```

---

### Backend

```bash
# 1. Ingresar al directorio
cd backend/biocore-backend

# 2. Configurar application.properties
#    (Ver sección Variables de Entorno)

# 3. Compilar y ejecutar (perfil local carga application-local.properties)
mvn spring-boot:run "-Dspring-boot.run.profiles=local"

# O generar JAR y ejecutar
mvn clean package
java -jar target/biocore-backend-*.jar
# API disponible en http://localhost:8085
```

---

## Variables de Entorno

### Backend — `application.properties`

```properties
# Servidor
server.port=8085

# Base de datos PostgreSQL
spring.datasource.url=jdbc:postgresql://<HOST>/neondb?sslmode=require
spring.datasource.username=<USUARIO>
spring.datasource.password=<CONTRASEÑA>

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT
app.jwt.secret=<CLAVE_SECRETA_256_BITS>
app.jwt.expiration=86400000

# CORS
app.cors.allowed-origins=http://localhost:4200,https://<FRONTEND_DOMAIN>

# Archivos
spring.servlet.multipart.max-file-size=20MB
app.upload.dir=uploads/

# Email (SendGrid HTTP API)
sendgrid.api.key=<SENDGRID_API_KEY>
sendgrid.from.email=biocore.hospital@gmail.com
sendgrid.from.name=BioCore Medical
```

### Frontend — `environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8085/api'
};
```

---

## API Endpoints Principales

| Recurso | Base URL | Métodos |
|---------|----------|---------|
| Autenticación | `/api/auth` | POST login |
| Pacientes | `/api/patients` | GET, POST, PUT, DELETE |
| Tickets / Cola | `/api/tickets` | GET, POST, PUT (estados) |
| Clínicas | `/api/clinics` | GET, POST |
| Citas | `/api/appointments` | GET, POST, PUT |
| Signos Vitales | `/api/vital-signs` | GET, POST |
| Órdenes de Lab | `/api/lab-orders` | GET, POST, PUT |
| Exámenes de Lab | `/api/lab-exams` | GET |
| Medicamentos | `/api/medicines` | GET, POST, PUT, DELETE |
| Prescripciones | `/api/prescriptions` | GET, POST, PUT |
| Ventas Farmacia | `/api/pharmacy/sales` | GET, POST |
| Pagos | `/api/payments` | GET, POST, PUT |
| Emergencias | `/api/emergency` | GET, POST, PUT |
| Reportes | `/api/reports` | GET |
| Usuarios | `/api/users` | GET, POST, PUT, DELETE |
| Seguros | `/api/insurances` | GET |

Todos los endpoints (excepto `/api/auth/**` y `/api/public/**`) requieren `Authorization: Bearer <JWT>`.

---

## Base de Datos

El sistema utiliza **23 tablas** en PostgreSQL gestionadas automáticamente por Hibernate (`ddl-auto=update`).

Tablas principales:
`users` · `patients` · `insurances` · `clinics` · `doctor_clinic_assignments` · `doctor_schedules` · `clinic_schedules` · `appointments` · `slot_reservations` · `tickets` · `vital_signs` · `prescriptions` · `prescription_items` · `medicines` · `lab_exams` · `lab_orders` · `lab_results` · `payments` · `pharmacy_sales` · `pharmacy_sale_items` · `documents` · `emergency_reports` · `emergency_medical_reports`

Ver [Manual_Tecnico_BioCore_Medical.md](./Docs/Manual_Tecnico_BioCore_Medical.md) para el diagrama ER completo y descripción de cada tabla.

---

## Despliegue en Producción

El sistema está desplegado en **Railway**:

| Componente | URL |
|-----------|-----|
| Frontend | `https://biocorehospital.up.railway.app` |
| Backend API | `https://<backend-service>.up.railway.app` |
| Base de Datos | Neon Cloud PostgreSQL (US East 2) |

### Proceso de despliegue

1. `git push origin main` — Railway detecta el cambio automáticamente
2. Frontend: `npm run build` → sirve `dist/biocore-frontend/`
3. Backend: `mvn package` → ejecuta el JAR con variables de entorno de Railway

---

## Documentación

El directorio `Docs/` incluye:

- **Manual Técnico** — Herramientas, versiones, historial, arquitectura, diagramas UML, ER y de secuencia
- **Manual de Usuario** — Guía de uso completa por rol
- **Casos de Uso** — Descripción de flujos de negocio principales

---

## Historial de Versiones

| Versión | Descripción |
|---------|-------------|
| **2.3** | Versión actual — validaciones de formulario, filtro reagendamiento, recibo con descuento, usuario único |
| 2.2 | UI Bosque palette, correcciones globales |
| 2.1.1 | Hotfixes post-2.1 |
| 2.1 | Mejoras funcionales |
| 2.0 | Refactorización mayor de módulos |
| 1.9 | Módulo de laboratorio completo |
| 1.8 | Módulo de farmacia |
| 1.7 | Módulo de pagos y caja |
| 1.6 | Módulo de emergencias |
| 1.5 | Módulo de consulta médica |
| 1.4 | Módulo de recepción y cola |

---

## Licencia

Proyecto académico — Ingeniería de Software — 2026
