# BioCore Medical — Documentación Técnica

## Índice
1. [Descripción General](#1-descripción-general)
2. [Estructura del Repositorio](#2-estructura-del-repositorio)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Comandos de Desarrollo](#4-comandos-de-desarrollo)
5. [Backend — Spring Boot](#5-backend--spring-boot)
   - [Estructura de Paquetes](#51-estructura-de-paquetes)
   - [Entidades y Base de Datos](#52-entidades-y-base-de-datos)
   - [Enumeraciones](#53-enumeraciones)
   - [Controladores y Endpoints](#54-controladores-y-endpoints)
   - [Servicios](#55-servicios)
   - [Repositorios](#56-repositorios)
   - [DTOs](#57-dtos)
   - [Seguridad JWT](#58-seguridad-jwt)
   - [Configuración](#59-configuración)
6. [Frontend — Angular](#6-frontend--angular)
   - [Estructura de Carpetas](#61-estructura-de-carpetas)
   - [Rutas](#62-rutas)
   - [Módulos / Componentes](#63-módulos--componentes)
   - [Servicios Compartidos](#64-servicios-compartidos)
   - [Modelos](#65-modelos)
   - [Guards e Interceptors](#66-guards-e-interceptors)
7. [Base de Datos](#7-base-de-datos)
   - [Diagrama de Relaciones](#71-diagrama-de-relaciones)
   - [Tablas](#72-tablas)
8. [Roles y Permisos](#8-roles-y-permisos)
9. [Flujo de un Paciente](#9-flujo-de-un-paciente)
10. [Correo Electrónico](#10-correo-electrónico)
11. [Deploy — Railway](#11-deploy--railway)
12. [Variables de Entorno](#12-variables-de-entorno)

---

## 1. Descripción General

**BioCore Medical** es un Sistema de Información Hospitalaria (HIS) desarrollado como proyecto universitario. Gestiona el flujo completo de atención: registro de pacientes, citas, colas de espera, consulta médica, laboratorio, farmacia, emergencias y pagos.

- **Backend:** API REST con Spring Boot 3.3.6 + Java 17
- **Frontend:** SPA con Angular 17 (standalone components)
- **Base de datos:** PostgreSQL en Neon Cloud
- **Deploy:** Railway (backend) + Railway (frontend estático)
- **Correo:** SendGrid HTTP API

---

## 2. Estructura del Repositorio

```
Hospital_Ing_Software/
├── backend/
│   └── biocore-backend/          # Spring Boot app
│       ├── src/main/java/com/biocore/
│       │   ├── config/           # Inicializadores y migraciones
│       │   ├── controller/       # REST controllers
│       │   ├── dto/              # Data Transfer Objects
│       │   ├── entity/           # Entidades JPA (tablas)
│       │   ├── enums/            # Enumeraciones
│       │   ├── repository/       # Spring Data JPA repos
│       │   ├── security/         # JWT filter y config
│       │   └── service/          # Lógica de negocio
│       └── src/main/resources/
│           └── application.properties
├── frontend/
│   └── biocore-frontend/         # Angular 17 app
│       └── src/app/
│           ├── core/             # Auth, guards, modelos, interceptors
│           ├── modules/          # Un componente por pantalla
│           └── shared/           # Servicios HTTP compartidos
├── Docs/                         # Documentación del proyecto
├── .gitignore
└── README.md
```

---

## 3. Stack Tecnológico

### Backend
| Dependencia | Versión | Uso |
|---|---|---|
| Spring Boot | 3.3.6 | Framework principal |
| Spring Web | — | API REST |
| Spring Security | — | Autenticación/autorización |
| Spring Data JPA | — | ORM sobre PostgreSQL |
| Hibernate | 6.5.3 | Implementación JPA |
| PostgreSQL Driver | — | Conector BD |
| JJWT | 0.12.6 | Generación/validación JWT |
| Lombok | — | Reducción de boilerplate |
| Bean Validation | — | Validación de DTOs |
| Apache PDFBox | 3.0.3 | Validación de PDFs subidos |
| Java | 17 | Versión de runtime |

### Frontend
| Dependencia | Versión | Uso |
|---|---|---|
| Angular | 17 | Framework SPA |
| Angular Material | 17 | Componentes UI (cards, dialogs, tables) |
| Angular CDK | 17 | Drag & drop, overlay |
| RxJS | 7.8 | Programación reactiva |
| TypeScript | 5.x | Lenguaje |

### Infraestructura
| Servicio | Uso |
|---|---|
| Railway | Hosting backend + frontend |
| Neon PostgreSQL | Base de datos cloud |
| SendGrid | Envío de correos transaccionales |
| GitHub | Control de versiones |

---

## 4. Comandos de Desarrollo

### Backend

```bash
# Correr localmente (requiere application-local.properties con las vars de entorno)
cd backend/biocore-backend
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Compilar el JAR
mvn clean package -DskipTests

# Correr el JAR compilado
java -jar target/biocore-backend-1.0.0.jar
```

### Frontend

```bash
# Instalar dependencias
cd frontend/biocore-frontend
npm install

# Servidor de desarrollo (http://localhost:4200)
ng serve

# Build para producción
ng build --configuration=production

# Build con URL del backend personalizada
ng build --configuration=production
```

### Git

```bash
# Ver estado
git status

# Agregar cambios y hacer commit
git add .
git commit -m "descripción del cambio"
git push

# Crear rama nueva
git checkout -b nombre-de-rama

# Ver ramas
git branch -a
```

---

## 5. Backend — Spring Boot

### 5.1 Estructura de Paquetes

```
com.biocore/
├── BiocoreApplication.java        # Punto de entrada (@SpringBootApplication)
├── config/
│   ├── DataInitializer.java       # Siembra datos iniciales (seguros, clínicas)
│   ├── SchemaMigrationRunner.java # Migraciones manuales de esquema al arrancar
│   └── SecurityConfig.java        # CORS, cadena de filtros, rutas públicas
├── controller/                    # Un controller por recurso
├── dto/                           # Request y response objects
├── entity/                        # Entidades JPA
├── enums/                         # Constantes tipadas
├── repository/                    # Interfaces JpaRepository
├── security/
│   ├── CustomUserDetails.java     # Implementación UserDetails de Spring
│   ├── JwtFilter.java             # Filtro que valida Bearer token en cada request
│   ├── JwtUtil.java               # Generación y validación de tokens JWT
│   └── UserDetailsServiceImpl.java# Carga usuario por username desde BD
└── service/                       # Lógica de negocio
```

### 5.2 Entidades y Base de Datos

#### `User` → tabla `users`
Representa al personal del hospital y pacientes con cuenta.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| firstName | String | Nombre |
| lastName | String | Apellido |
| username | String (unique) | Nombre de usuario para login |
| password | String | Hash bcrypt |
| email | String | Correo electrónico |
| specialty | String | Solo para médicos |
| collegiateNumber | String (unique) | Número de colegiado (médicos) |
| role | Role (enum) | ADMIN, DOCTOR, NURSE, HEALTH_STAFF, LAB_TECHNICIAN, PHARMACIST, CASHIER, PATIENT |
| active | boolean | Si puede iniciar sesión |
| mustChangePassword | boolean | Fuerza cambio de contraseña en primer login |
| available | boolean | Toggle disponibilidad del médico |
| onlineAt | LocalDateTime | Última actividad (polling) |
| createdAt | LocalDateTime | Timestamp auto |

#### `Patient` → tabla `patients`
Datos clínicos/administrativos del paciente.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| patientCode | String (unique) | Código PAT-0001, auto-generado |
| dpi | String (unique, 13) | DPI guatemalteco — no puede iniciar en 0 |
| firstName | String | Nombre |
| lastName | String | Apellido |
| address | String | Dirección |
| phone | String | Teléfono (8 dígitos, no inicia en 0) |
| emergencyContact | String | Nombre de contacto de emergencia |
| emergencyPhone | String | Teléfono de emergencia |
| email | String | Para notificaciones |
| birthDate | LocalDate | Fecha de nacimiento |
| insurance | Insurance (FK) | Aseguradora (opcional) |
| insuranceNumber | String | No. de póliza/carné |
| userId | Long | Referencia al User si tiene cuenta en portal |
| active | boolean | Soft delete |
| createdAt | LocalDateTime | Timestamp auto |

#### `Ticket` → tabla `tickets`
Turno de atención. Núcleo del flujo hospitalario.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| ticketNumber | String | Correlativo (A001, B002…) |
| patient | Patient (FK) | Paciente del turno |
| clinic | Clinic (FK) | Clínica de destino |
| doctor | User (FK) | Médico asignado automáticamente |
| status | TicketStatus (enum) | Estado actual del turno |
| priority | TicketPriority (enum) | NORMAL / URGENT |
| appointment | Appointment (FK) | Cita que originó el ticket (null = walk-in) |
| type | String | CONSULTA, EMERGENCIA, LABORATORIO, FARMACIA |
| notes | String | Notas adicionales |
| scheduledDate | LocalDate | Para tickets de cita |
| scheduledTime | String | HH:mm para citas |
| createdAt | LocalDateTime | Timestamp auto |
| calledAt | LocalDateTime | Cuándo fue llamado |
| consultationStartAt | LocalDateTime | Inicio de consulta |
| completedAt | LocalDateTime | Fin de consulta |
| rescheduled | Boolean | Si fue creado como reagendamiento |

#### `Appointment` → tabla `appointments`
Cita programada.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| patient | Patient (FK) | Paciente |
| clinic | Clinic (FK) | Clínica |
| doctor | User (FK) | Médico asignado al momento de agendar |
| type | String | CONSULTA, LABORATORIO, CONTROL |
| scheduledDate | LocalDate | Fecha |
| scheduledTime | String | HH:mm |
| status | AppointmentStatus (enum) | PENDING_PAYMENT, CONFIRMED, COMPLETED, CANCELLED |
| voucherCode | String (unique) | Código corto en comprobante físico |
| amount | BigDecimal | Costo de la cita (Q150.00 default) |
| notes | String | Notas |
| createdAt | LocalDateTime | Timestamp auto |

#### `Clinic` → tabla `clinics`
Clínica/área del hospital.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| name | String | Nombre de la clínica |
| type | ClinicType (enum) | EXTERNAL_CONSULTATION, GENERAL_MEDICINE, LABORATORY, PHARMACY, EMERGENCY |
| maxDoctors | int | Capacidad máxima de médicos simultáneos |
| active | boolean | Estado |
| description | String | Descripción opcional |

#### `VitalSigns` → tabla `vital_signs`
Signos vitales registrados por enfermería.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| ticket | Ticket (OneToOne) | Ticket al que pertenecen |
| bloodPressure | String | Formato "120/80" |
| heartRate | Integer | Pulsaciones por minuto |
| temperature | BigDecimal | Temperatura en °C |
| weight | BigDecimal | Peso en kg |
| height | BigDecimal | Estatura en cm |
| oxygenSaturation | Integer | % de saturación O2 |
| registeredBy | User (FK) | Personal que registró |
| recordedAt | LocalDateTime | Fecha/hora del registro |

#### `Payment` → tabla `payments`
Pago de cualquier servicio.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| patient | Patient (FK) | Paciente que paga |
| ticket | Ticket (FK) | Ticket relacionado |
| type | PaymentType (enum) | CONSULTATION, LABORATORY, PHARMACY, EMERGENCY |
| amount | BigDecimal | Monto bruto |
| discountAmount | BigDecimal | Descuento por seguro |
| netAmount | BigDecimal | Total cobrado (amount - discount) |
| method | PaymentMethod (enum) | CASH, POS |
| status | PaymentStatus (enum) | PENDING, PAID, CANCELLED |
| referenceId | Long | ID referencial (labOrder, prescription, etc.) |
| invoiceNumber | String | Número de factura |
| createdAt | LocalDateTime | Timestamp auto |
| paidAt | LocalDateTime | Cuándo se procesó el pago |

#### `Prescription` → tabla `prescriptions`
Receta médica.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| patient | Patient (FK) | Paciente |
| doctor | User (FK) | Médico que emite |
| ticket | Ticket (FK) | Ticket de consulta |
| code | String (unique, 12) | Código único de receta |
| status | PrescriptionStatus (enum) | PENDING, DISPENSED, PARTIAL, CANCELLED |
| notes | String | Diagnóstico/notas |
| createdAt | LocalDateTime | Timestamp auto |
| items | List\<PrescriptionItem\> | Medicamentos recetados |

#### `Medicine` → tabla `medicines`
Catálogo de medicamentos.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| code | String (unique) | FAR-001 … FAR-045 |
| name | String | Nombre del medicamento |
| presentation | String | Tableta, Cápsula, Jarabe, etc. |
| category | String | Antibiótico, AINE, Analgésico, etc. |
| description | String | Descripción |
| stock | int | Unidades disponibles |
| price | BigDecimal | Precio unitario |
| unit | String | Unidad de dispensación |
| active | boolean | Disponible en farmacia |

#### `PharmacySale` → tabla `pharmacy_sales`
Venta de farmacia (OTC o con receta).

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| saleCode | String (unique) | Código de venta |
| patient | Patient (FK) | Paciente (opcional en OTC anónimo) |
| prescription | Prescription (FK) | Receta (null = venta libre) |
| status | PharmacySaleStatus (enum) | RESERVED, PAID, CANCELLED |
| totalAmount | BigDecimal | Total bruto |
| discountAmount | BigDecimal | Descuento por seguro |
| netAmount | BigDecimal | Total cobrado |
| paymentMethod | PaymentMethod (enum) | CASH, POS |
| invoiceNumber | String | Número de factura |
| createdAt | LocalDateTime | Timestamp auto |
| paidAt | LocalDateTime | Cuándo se pagó |
| items | List\<PharmacySaleItem\> | Medicamentos vendidos |

#### `LabOrder` → tabla `lab_orders`
Orden de laboratorio emitida por médico.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| patient | Patient (FK) | Paciente |
| doctor | User (FK) | Médico que ordena |
| ticket | Ticket (FK) | Ticket de consulta |
| labExam | LabExam (FK) | Examen del catálogo |
| sampleType | SampleType (enum) | Tipo de muestra |
| status | LabOrderStatus (enum) | PENDING, IN_PROGRESS, COMPLETED, CANCELLED |
| orderDate | LocalDate | Fecha de emisión |
| expirationDate | LocalDate | Vigencia 30 días |
| resultAvailableAt | LocalDateTime | Cuándo están listos los resultados |
| scheduledAt | LocalDateTime | Para cita programada de laboratorio |
| notes | String | Notas |
| used | Boolean | Si ya generó cita de laboratorio |

#### `Insurance` → tabla `insurances`
Aseguradoras médicas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | Long (PK) | Auto-generado |
| name | InsuranceName (enum) | Nombre único de la aseguradora |
| discountPercentage | BigDecimal | Porcentaje de descuento aplicado |
| description | String | Descripción |

### 5.3 Enumeraciones

| Enum | Valores |
|---|---|
| `Role` | ADMIN, DOCTOR, NURSE, LAB_TECHNICIAN, PHARMACIST, CASHIER, HEALTH_STAFF, PATIENT |
| `TicketStatus` | PENDING_PAYMENT, WAITING, CALLED_TO_VITAL_SIGNS, READY_FOR_DOCTOR, BEING_CALLED, IN_CONSULTATION, COMPLETED, ABSENT, ABSENT_PENDING_RESCHEDULE, RESCHEDULED, CANCELLED_NO_PAYMENT |
| `TicketPriority` | NORMAL, URGENT |
| `ClinicType` | EXTERNAL_CONSULTATION, GENERAL_MEDICINE, LABORATORY, PHARMACY, EMERGENCY |
| `AppointmentStatus` | PENDING_PAYMENT, CONFIRMED, COMPLETED, CANCELLED |
| `PaymentType` | CONSULTATION, LABORATORY, PHARMACY, EMERGENCY |
| `PaymentMethod` | CASH, POS |
| `PaymentStatus` | PENDING, PAID, CANCELLED |
| `PrescriptionStatus` | PENDING, DISPENSED, PARTIAL, CANCELLED |
| `LabOrderStatus` | PENDING, IN_PROGRESS, COMPLETED, CANCELLED |
| `PharmacySaleStatus` | RESERVED, PAID, CANCELLED |
| `SampleType` | BLOOD, URINE, STOOL, SPUTUM, CULTURE, BIOPSY, OTHER |

### 5.4 Controladores y Endpoints

Todos los endpoints tienen prefijo `/api/`. La respuesta siempre es:
```json
{ "success": true, "message": "...", "data": { ... } }
```

#### `AuthController` — `/api/auth`
| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/login` | Público | Login, retorna JWT + datos del usuario |
| POST | `/logout` | Autenticado | Limpia `onlineAt` del usuario |

#### `PatientController` — `/api/patients`
| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/` | Autenticado | Lista todos los pacientes activos |
| GET | `/{id}` | Autenticado | Busca paciente por ID |
| GET | `/dpi/{dpi}` | Autenticado | Busca paciente por DPI |
| GET | `/search?q=` | Autenticado | Búsqueda por nombre/DPI/código |
| POST | `/` | Autenticado | Registra nuevo paciente (opcionalmente crea cuenta) |
| PUT | `/{id}` | Autenticado | Actualiza datos del paciente |
| DELETE | `/{id}` | HEALTH_STAFF, ADMIN | Desactiva paciente (soft delete) |

#### `TicketController` — `/api/tickets`
| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/` | Autenticado | Lista todos los tickets |
| GET | `/clinic/{clinicId}` | Autenticado | Tickets de una clínica |
| GET | `/queue/{clinicId}` | Autenticado | Cola activa de una clínica |
| GET | `/queue/{clinicId}/doctor/{doctorId}` | Autenticado | Cola del médico específico |
| GET | `/queue/today` | Staff | Todos los tickets activos hoy |
| GET | `/patient/{patientId}` | Autenticado | Historial de tickets del paciente |
| GET | `/patient/{patientId}/pending-reschedule` | Autenticado | Tickets pendientes de reagendar |
| GET | `/pending-reschedule/by-dpi/{dpi}` | CASHIER, ADMIN | Tickets ausentes por DPI |
| POST | `/` | Autenticado | Crea ticket (walk-in o desde cita) |
| PUT | `/clinic/{clinicId}/call-next` | DOCTOR, HEALTH_STAFF, NURSE, ADMIN | Llama al siguiente paciente |
| PUT | `/clinic/{clinicId}/call-to-vital-signs` | HEALTH_STAFF, NURSE, ADMIN | Llama a signos vitales |
| PUT | `/{id}/confirm-arrival` | DOCTOR, HEALTH_STAFF, NURSE, ADMIN | Confirma llegada del paciente |
| PUT | `/{id}/call-to-consultation` | DOCTOR, ADMIN | Llama al consultorio |
| PUT | `/{id}/complete` | DOCTOR, ADMIN | Completa la consulta |
| PUT | `/{id}/mark-absent` | DOCTOR, HEALTH_STAFF, NURSE, ADMIN | Marca como ausente |
| PUT | `/{id}/collect-sample` | HEALTH_STAFF, NURSE, ADMIN | Recolecta muestra de laboratorio |
| PUT | `/{id}/reschedule` | Autenticado | Reagenda ticket ausente |

#### `AppointmentController` — `/api/appointments`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista todas las citas |
| GET | `/{id}` | Cita por ID |
| GET | `/patient/{patientId}` | Citas de un paciente |
| GET | `/available-slots` | Slots disponibles por clínica/fecha |
| POST | `/` | Crea cita (requiere pago) |
| PUT | `/{id}/cancel` | Cancela cita |

#### `PaymentController` — `/api/payments`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista todos los pagos |
| GET | `/{id}` | Pago por ID |
| GET | `/ticket/{ticketId}` | Pagos de un ticket |
| GET | `/patient/{patientId}` | Historial de pagos del paciente |
| POST | `/` | Registra un pago |
| GET | `/insurances` | Lista aseguradoras disponibles |

#### `PharmacySaleController` — `/api/pharmacy`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista ventas de farmacia |
| GET | `/prescription/{code}` | Busca receta por código |
| POST | `/` | Crea venta (OTC o con receta) |
| PUT | `/{id}/pay` | Procesa pago de venta |

#### `LabController` — `/api/lab`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/orders` | Lista órdenes de laboratorio |
| GET | `/orders/{id}` | Orden por ID |
| GET | `/orders/patient/{patientId}` | Órdenes de un paciente |
| POST | `/orders` | Crea orden de laboratorio |
| PUT | `/orders/{id}/start` | Inicia procesamiento |
| PUT | `/orders/{id}/complete` | Sube resultado (PDF) y notifica |

#### `EmergencyController` — `/api/emergency`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista reportes de emergencia activos |
| GET | `/{id}` | Reporte por ID |
| POST | `/` | Crea ticket de emergencia (cajero) |
| PUT | `/{id}/start` | Médico inicia atención |
| PUT | `/{id}/close` | Médico cierra reporte + envía email |

#### Otros controladores
| Controller | Prefijo | Función |
|---|---|---|
| `UserController` | `/api/users` | CRUD de personal, toggle disponibilidad, cambio de contraseña |
| `ClinicController` | `/api/clinics` | CRUD de clínicas |
| `VitalSignsController` | `/api/vital-signs` | Registro de signos vitales por ticket |
| `PrescriptionController` | `/api/prescriptions` | CRUD de recetas médicas |
| `MedicineController` | `/api/medicines` | Catálogo de medicamentos |
| `ReportController` | `/api/reports` | Reportes y estadísticas (ADMIN) |
| `DocumentController` | `/api/documents` | Subida y descarga de documentos PDF |
| `PublicController` | `/api/public` | Endpoints sin autenticación (registro portal) |
| `ClinicScheduleController` | `/api/clinic-schedules` | Horarios de clínicas |
| `DoctorScheduleController` | `/api/doctor-schedules` | Horarios de médicos |
| `LabExamController` | `/api/lab-exams` | Catálogo de exámenes de laboratorio |
| `InsuranceController` | `/api/insurances` | Lista de aseguradoras |

### 5.5 Servicios

| Servicio | Responsabilidad principal |
|---|---|
| `AuthService` | Login, logout, generación de JWT, cambio de contraseña |
| `PatientService` | CRUD pacientes, creación de cuenta en portal, generación de código PAT-XXXX |
| `TicketService` | Gestión del ciclo de vida del turno: crear, llamar, confirmar, completar, ausente, reagendar. Expira tickets viejos al arrancar |
| `AppointmentService` | Agendamiento, validación de slots, asignación de médico según horario |
| `PaymentService` | Registro de pagos, cálculo de descuentos por seguro, generación de número de factura |
| `PharmacySaleService` | Venta OTC y con receta, descuento de stock, cálculo de totales con seguro |
| `LabService` | Gestión de órdenes de laboratorio, procesamiento, subida de resultados PDF |
| `EmergencyService` | Creación y cierre de reportes de emergencia médica |
| `PrescriptionService` | CRUD de recetas, validación de stock al dispensar |
| `UserService` | CRUD personal, toggle disponibilidad médico, reset de contraseña |
| `VitalSignsService` | Registro de signos vitales, valida que existan antes de pasar a consulta |
| `EmailService` | Envío de correos via SendGrid HTTP API: credenciales, confirmaciones, resultados, comprobantes |
| `ReportService` | Estadísticas: tickets por día, ingresos, ocupación de clínicas |
| `DocumentService` | Subida de archivos PDF, validación de integridad |
| `ClinicScheduleService` | Gestión de horarios de clínicas |
| `DoctorScheduleService` | Gestión de horarios de médicos, consulta de slots disponibles |

### 5.6 Repositorios

Todos extienden `JpaRepository<Entidad, Long>`. Cada uno agrega métodos de consulta personalizados con JPQL o Spring Data naming conventions:

| Repositorio | Consultas destacadas |
|---|---|
| `PatientRepository` | `findByDpi`, `findByPatientCode`, búsqueda por nombre/DPI/código |
| `TicketRepository` | `findByClinicAndStatus`, `findTodayActive`, `findByPatientAndStatus` |
| `AppointmentRepository` | `findByClinicAndDate`, verificación de slot disponible |
| `PaymentRepository` | `findByPatient`, `findByTicket`, suma de ingresos por rango de fechas |
| `UserRepository` | `findByUsername`, `findByRole`, médicos disponibles |
| `LabOrderRepository` | `findByPatient`, `findPending`, `findByStatus` |
| `PharmacySaleRepository` | `findByPatient`, `findByPrescription` |
| `PrescriptionRepository` | `findByCode`, `findByPatient`, `findByTicket` |

### 5.7 DTOs

| DTO | Uso |
|---|---|
| `LoginRequest` | Username + password para `/api/auth/login` |
| `LoginResponse` | JWT token + datos del usuario logueado |
| `ApiResponse<T>` | Wrapper genérico para todas las respuestas `{ success, message, data }` |
| `PatientCreateRequest` | Datos para crear/actualizar paciente. DPI validado con regex `[1-9]\d{12}` |
| `PatientDTO` | Vista pública del paciente (sin datos sensibles de BD) |
| `TicketCreateRequest` | patientId, clinicId, type, priority, notes |
| `TicketDTO` | Vista completa del ticket + datos del paciente y clínica + descuento |
| `PaymentCreateRequest` | ticketId, type, amount, method, referenceId |
| `PaymentDTO` | Vista del pago con montos y fechas |
| `PharmacySaleRequest` | Lista de items (medicamento + cantidad), prescriptionCode, paymentMethod |
| `PharmacySaleDTO` | Vista de la venta con detalle de items |
| `PrescriptionRequest` | Lista de medicamentos recetados por el médico |
| `PrescriptionDTO` | Receta con items y estado |
| `LabOrderRequest` | sampleType, labExamId, notes |
| `LabOrderDTO` | Orden con estado, fechas, examen |
| `VitalSignsRequest` | bloodPressure, heartRate, temperature, weight, height, oxygenSaturation |
| `UserCreateRequest` | Datos para crear personal |
| `UserDTO` | Vista del usuario sin contraseña |
| `DashboardDTO` | Métricas del dashboard: tickets hoy, ingresos, ocupación |
| `RescheduleRequest` | newDate, newTime para reagendar ticket ausente |

### 5.8 Seguridad JWT

**Flujo:**
1. Cliente envía `POST /api/auth/login` con `{ username, password }`
2. `AuthService` valida credenciales con BCrypt
3. `JwtUtil` genera token firmado (secreto desde env var `JWT_SECRET`, expira 24h)
4. Cliente almacena token en `localStorage`
5. Cada request incluye header `Authorization: Bearer <token>`
6. `JwtFilter` intercepta, valida y carga el usuario en `SecurityContext`

**Rutas públicas** (sin token):
- `POST /api/auth/login`
- `GET /api/public/**`
- `POST /api/public/register`

**Autorización por roles** con `@PreAuthorize("hasAnyRole('ROLE_X', 'ROLE_Y')")` en cada endpoint sensible.

### 5.9 Configuración

`application.properties` — todos los valores sensibles se inyectan desde variables de entorno:

```properties
# Servidor
server.port=${PORT:8085}

# Base de datos
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# JWT
app.jwt.secret=${JWT_SECRET}
app.jwt.expiration=86400000   # 24 horas en ms

# CORS
app.cors.allowed-origins=${CORS_ORIGINS}

# Email (SendGrid)
sendgrid.api.key=${SENDGRID_API_KEY}
sendgrid.from.email=biocore.hospital@gmail.com

# Logging
logging.level.com.biocore=INFO
```

---

## 6. Frontend — Angular

### 6.1 Estructura de Carpetas

```
src/app/
├── app.component.ts          # Shell principal: sidebar, navbar, layout
├── app.routes.ts             # Definición de rutas (lazy loading)
├── core/
│   ├── auth/
│   │   └── auth.service.ts   # Login, logout, estado de sesión
│   ├── guards/
│   │   └── auth.guard.ts     # Protege rutas que requieren login
│   ├── interceptors/
│   │   └── auth.interceptor.ts # Agrega Bearer token a cada request HTTP
│   └── models/               # Interfaces TypeScript
│       ├── api-response.model.ts
│       ├── lab.model.ts
│       ├── patient.model.ts
│       ├── payment.model.ts
│       ├── ticket.model.ts
│       └── user.model.ts
├── modules/                  # Un componente standalone por pantalla
│   ├── appointments/         # Agendamiento de citas y monitoreo de cola
│   ├── call-screen/          # Pantalla de sala de espera (monitor dedicado)
│   ├── consultation/         # Consulta médica (rol DOCTOR)
│   ├── emergency/            # Emergencias — cajero registra y cobra
│   ├── emergency-consultation/ # Emergencias médicas (rol DOCTOR)
│   ├── health-staff/         # Recepción + signos vitales (HEALTH_STAFF, NURSE)
│   ├── laboratory/           # Laboratorio (LAB_TECHNICIAN)
│   ├── mis-citas/            # Portal del paciente: mis turnos y recetas
│   ├── patient/
│   │   ├── patient-detail/   # Ficha clínica del paciente
│   │   ├── patient-list/     # Lista y búsqueda de pacientes
│   │   └── patient-register/ # Registro/edición de paciente con stepper
│   ├── payments/             # Caja / Pagos (CASHIER)
│   ├── pharmacy/             # Farmacia OTC + con receta (PHARMACIST)
│   ├── portal/
│   │   ├── dashboard/        # Dashboard con métricas
│   │   ├── login/            # Login
│   │   └── portal.component  # Landing pública del hospital
│   ├── public-register/      # Auto-registro de paciente (sin login)
│   ├── reporting/            # Reportería y estadísticas (ADMIN)
│   └── user-management/      # Gestión de personal (ADMIN)
└── shared/
    └── services/             # Servicios HTTP reutilizables
        ├── lab.service.ts
        ├── notification.service.ts
        ├── patient.service.ts
        ├── payment.service.ts
        └── ticket.service.ts
```

### 6.2 Rutas

| Ruta | Componente | Requiere login | Descripción |
|---|---|---|---|
| `/` | → `/portal` | No | Redirect |
| `/portal` | PortalComponent | No | Landing pública |
| `/login` | LoginComponent | No | Login del sistema |
| `/register` | PublicRegisterComponent | No | Auto-registro de paciente |
| `/dashboard` | DashboardComponent | Sí | Dashboard con métricas |
| `/patients` | PatientListComponent | Sí | Lista de pacientes |
| `/patients/register` | PatientRegisterComponent | Sí | Registrar/editar paciente |
| `/patients/:id` | PatientDetailComponent | Sí | Ficha del paciente |
| `/users` | UserManagementComponent | Sí | Gestión de personal |
| `/consultation` | ConsultationComponent | Sí | Consulta médica |
| `/emergency-consultation` | EmergencyConsultationComponent | Sí | Emergencias médicas |
| `/laboratory` | LaboratoryComponent | Sí | Portal de laboratorio |
| `/pharmacy` | PharmacyComponent | Sí | Portal de farmacia |
| `/payments` | PaymentsComponent | Sí | Caja / pagos |
| `/emergency` | EmergencyComponent | Sí | Registro de emergencias |
| `/health-staff` | HealthStaffComponent | Sí | Recepción + signos vitales |
| `/appointments` | AppointmentsComponent | Sí | Citas y monitoreo de cola |
| `/reports` | ReportingComponent | Sí | Reportes (ADMIN) |
| `/mis-citas` | MisCitasComponent | Sí | Portal del paciente |
| `/call-screen` | CallScreenComponent | Sí | Pantalla sala de espera |

### 6.3 Módulos / Componentes

Todos son **standalone components** (Angular 17). No hay NgModules. Cada componente importa sus propios `imports: [CommonModule, ReactiveFormsModule, MatXxxModule, ...]`.

| Componente | Roles que lo usan | Función principal |
|---|---|---|
| `AppComponent` | Todos | Shell: sidebar con navegación filtrada por rol, topbar |
| `LoginComponent` | Todos | Formulario de login, maneja `mustChangePassword` |
| `PortalComponent` | Público | Página de inicio del hospital |
| `DashboardComponent` | Todos | Métricas del día: tickets, ingresos, pacientes |
| `PatientListComponent` | ADMIN, HEALTH_STAFF, DOCTOR, CASHIER | Tabla de pacientes con búsqueda |
| `PatientRegisterComponent` | ADMIN, HEALTH_STAFF | Stepper: buscar por DPI → registrar/editar |
| `PatientDetailComponent` | Todos | Ficha completa: datos, historial, documentos |
| `PublicRegisterComponent` | Público | Auto-registro sin login, valida DPI |
| `HealthStaffComponent` | HEALTH_STAFF, NURSE | Cola de espera + llamar pacientes + registrar signos vitales |
| `AppointmentsComponent` | HEALTH_STAFF, ADMIN, DOCTOR | Agendamiento de citas + monitoreo de cola + personal disponible |
| `ConsultationComponent` | DOCTOR | Cola de pacientes del médico + diagnóstico + recetas + órdenes de lab |
| `EmergencyConsultationComponent` | DOCTOR | Atención de emergencias médicas, cierre de reporte |
| `EmergencyComponent` | HEALTH_STAFF, NURSE | Registro y pago de tickets de emergencia |
| `LaboratoryComponent` | LAB_TECHNICIAN | Cola de muestras pendientes + carga de resultados |
| `PharmacyComponent` | PHARMACIST | Venta OTC + dispensación con receta, descuentos |
| `PaymentsComponent` | CASHIER | Pagos de consultas, labs, emergencias, citas; reagendamientos |
| `UserManagementComponent` | ADMIN | CRUD de personal, asignación de roles y clínicas |
| `ReportingComponent` | ADMIN | Estadísticas, exportación |
| `MisCitasComponent` | PATIENT | Ver mis turnos, recetas y órdenes de laboratorio |
| `CallScreenComponent` | Todos | Pantalla pública: muestra turno llamado en tiempo real (polling) |

### 6.4 Servicios Compartidos

#### `AuthService` (`core/auth/auth.service.ts`)
- `login(username, password)` — POST `/api/auth/login`, guarda JWT en localStorage
- `logout()` — limpia token, redirige a `/login`
- `getCurrentUser()` — retorna datos del usuario desde localStorage
- `hasRole(...roles)` — verifica si el usuario tiene alguno de los roles dados
- `isLoggedIn()` — comprueba existencia y validez del token

#### `PatientService` (`shared/services/patient.service.ts`)
- `getAll()` — GET `/api/patients`
- `getById(id)` — GET `/api/patients/{id}`
- `getByDpi(dpi)` — GET `/api/patients/dpi/{dpi}`
- `search(q)` — GET `/api/patients/search?q=`
- `create(data)` — POST `/api/patients`
- `update(id, data)` — PUT `/api/patients/{id}`

#### `TicketService` (`shared/services/ticket.service.ts`)
- `getAll()`, `getByClinic(clinicId)`, `getQueue(clinicId)`
- `getTodayAllActive()`, `getByPatient(patientId)`
- `create(data)`, `callNext(clinicId)`, `complete(id)`
- `markAbsent(id)`, `confirmArrival(id)`, `reschedule(id, date, time)`

#### `PaymentService` (`shared/services/payment.service.ts`)
- `create(data)` — registra pago
- `getByTicket(ticketId)` — pagos de un ticket
- `getAll()` — lista de aseguradoras también viene de aquí

#### `LabService` (`shared/services/lab.service.ts`)
- `getOrders()`, `getOrdersByPatient(patientId)`
- `createOrder(data)`, `startOrder(id)`, `completeOrder(id, formData)`

#### `NotificationService` (`shared/services/notification.service.ts`)
- `success(msg)`, `error(msg)`, `info(msg)`, `warning(msg)`
- Muestra notificaciones tipo toast usando Angular Material Snackbar

### 6.5 Modelos

```typescript
// patient.model.ts
interface Patient {
  id: number;
  patientCode: string;  // PAT-0001
  dpi: string;          // 13 dígitos, no inicia en 0
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  insuranceId: number | null;
  insuranceNumber: string;
  active: boolean;
}

// ticket.model.ts
type TicketStatus = 'PENDING_PAYMENT' | 'WAITING' | 'CALLED_TO_VITAL_SIGNS' |
  'READY_FOR_DOCTOR' | 'BEING_CALLED' | 'IN_CONSULTATION' | 'COMPLETED' |
  'ABSENT' | 'ABSENT_PENDING_RESCHEDULE' | 'RESCHEDULED' | 'CANCELLED_NO_PAYMENT';

// user.model.ts
type UserRole = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'HEALTH_STAFF' |
  'LAB_TECHNICIAN' | 'PHARMACIST' | 'CASHIER' | 'PATIENT';
```

### 6.6 Guards e Interceptors

**`AuthGuard`** — protege todas las rutas que requieren login. Si no hay token válido, redirige a `/login`.

**`AuthInterceptor`** — intercepta cada petición HTTP saliente y agrega el header:
```
Authorization: Bearer <token>
```

---

## 7. Base de Datos

### 7.1 Diagrama de Relaciones

```
insurances ──< patients >── users (portal)
                  │
              tickets ──── clinics
                  │
              appointments
                  │
            vital_signs (1:1)
                  │
            prescriptions ──── prescription_items ──── medicines
                  │
             lab_orders ──── lab_exams
                  │
              payments
                  │
         pharmacy_sales ──── pharmacy_sale_items ──── medicines

users ──────────── doctor_clinic_assignments ──── clinics
users ──────────── doctor_schedules ──── clinics
clinics ─────────── clinic_schedules
```

### 7.2 Tablas

| Tabla | Descripción |
|---|---|
| `users` | Personal del hospital y pacientes con cuenta |
| `patients` | Expediente del paciente |
| `clinics` | Áreas/clínicas del hospital |
| `tickets` | Turnos de atención |
| `appointments` | Citas programadas |
| `vital_signs` | Signos vitales por ticket (1:1) |
| `payments` | Registro de cobros |
| `prescriptions` | Recetas médicas |
| `prescription_items` | Renglones de receta (medicamento + dosis) |
| `medicines` | Catálogo de medicamentos con stock |
| `pharmacy_sales` | Ventas de farmacia |
| `pharmacy_sale_items` | Renglones de venta (medicamento + cantidad) |
| `lab_orders` | Órdenes de laboratorio |
| `lab_exams` | Catálogo de exámenes de laboratorio |
| `lab_results` | Resultados de laboratorio (con PDF) |
| `insurances` | Aseguradoras con % de descuento |
| `doctor_clinic_assignments` | Qué médico trabaja en qué clínica |
| `doctor_schedules` | Horario semanal del médico por clínica |
| `clinic_schedules` | Horario de apertura/cierre de cada clínica |
| `slot_reservations` | Reserva de slots para evitar doble-booking |
| `emergency_reports` | Reporte de emergencia (cajero → doctor) |
| `emergency_medical_reports` | Reporte médico final de emergencia |
| `documents` | Documentos PDF subidos (resultados, etc.) |

**Estrategia de esquema:** `spring.jpa.hibernate.ddl-auto=update` — Hibernate actualiza el esquema automáticamente al arrancar. Las migraciones manuales se ejecutan en `SchemaMigrationRunner.java`.

---

## 8. Roles y Permisos

| Rol | Label en UI | Acceso principal |
|---|---|---|
| `ADMIN` | Administrador | Todo: gestión de personal, reportes, clínicas, pacientes |
| `DOCTOR` | Doctor | Consulta médica, emergencias médicas, emitir recetas y órdenes de lab |
| `NURSE` | Enfermería | Recepción, signos vitales, emergencias |
| `HEALTH_STAFF` | Recepcionista | Recepción, cola, signos vitales, registro de pacientes, emergencias |
| `LAB_TECHNICIAN` | Laboratorista | Portal de laboratorio: procesar muestras y subir resultados |
| `PHARMACIST` | Farmacéutico | Portal de farmacia: ventas OTC y con receta |
| `CASHIER` | Cajero | Caja/pagos: cobros de consultas, labs, emergencias, citas |
| `PATIENT` | — | Portal de paciente: ver turnos, recetas y órdenes propias |

---

## 9. Flujo de un Paciente

### Walk-in (sin cita)
1. **Recepción** (HEALTH_STAFF) registra paciente si no existe → genera ticket `WAITING`
2. **CASHIER** cobra la consulta → ticket pasa a `WAITING` activo
3. **HEALTH_STAFF** llama a signos vitales → `CALLED_TO_VITAL_SIGNS`
4. **NURSE/HEALTH_STAFF** registra signos vitales → `READY_FOR_DOCTOR`
5. **DOCTOR** llama al paciente → `BEING_CALLED` → confirma llegada → `IN_CONSULTATION`
6. **DOCTOR** completa consulta, emite receta y/u orden de lab → ticket `COMPLETED`
7. **CASHIER** (si tiene laboratorio) cobra la orden → `LAB_TECHNICIAN` procesa → sube resultado → email al paciente
8. **PHARMACIST** dispensa medicamentos (con receta o venta libre)

### Con cita previa
1. Paciente agenda cita en portal (o HEALTH_STAFF agenda) → pago requerido
2. En fecha de cita: HEALTH_STAFF convierte cita en ticket → flujo igual al walk-in desde paso 3

### Emergencia
1. **CASHIER** registra al paciente como emergencia → cobra → genera ticket de emergencia
2. **DOCTOR** (emergencias) atiende, completa reporte médico → email al paciente

---

## 10. Correo Electrónico

Implementado con **SendGrid HTTP API** (puerto 443, sin SMTP). El servicio `EmailService` hace `POST https://api.sendgrid.com/v3/mail/send` con Bearer token.

| Evento | Correo enviado |
|---|---|
| Registro de paciente con cuenta | Credenciales temporales (usuario + contraseña) |
| Auto-registro en portal | Confirmación de registro |
| Cita confirmada y pagada | Resumen de cita con número de ticket |
| Consulta completada | Resumen médico + receta + órdenes de lab |
| Resultados de laboratorio listos | Notificación de disponibilidad |
| Pago procesado | Comprobante de pago |
| Venta de farmacia | Comprobante con detalle de medicamentos |
| Reporte de emergencia cerrado | Reporte médico de emergencia |

---

## 11. Deploy — Railway

El proyecto se despliega en Railway con dos servicios:

**Backend:**
- Railway detecta el `pom.xml` y compila con Maven
- Corre el JAR resultante con `java -jar`
- Puerto: variable de entorno `PORT` inyectada por Railway
- URL: `https://biocore-backend.up.railway.app`

**Frontend:**
- Railway detecta el `package.json` y corre `ng build`
- Sirve el output `dist/` como archivos estáticos
- URL: `https://biocorehospital.up.railway.app`

---

## 12. Variables de Entorno

Deben configurarse en Railway → Variables del servicio backend:

| Variable | Descripción |
|---|---|
| `DB_URL` | URL completa de conexión a Neon PostgreSQL |
| `DB_USERNAME` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña de la base de datos |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT (mínimo 256 bits) |
| `CORS_ORIGINS` | Orígenes permitidos separados por coma |
| `FRONTEND_URL` | URL del frontend (usado en links de correo) |
| `SENDGRID_API_KEY` | API Key de SendGrid para envío de correos |
| `PORT` | Puerto del servidor (Railway lo inyecta automáticamente) |

**Para desarrollo local:** crear `backend/biocore-backend/src/main/resources/application-local.properties` con los valores reales (este archivo está en `.gitignore` y nunca se sube al repositorio).

```bash
# Correr con perfil local
mvn spring-boot:run -Dspring-boot.run.profiles=local
```
