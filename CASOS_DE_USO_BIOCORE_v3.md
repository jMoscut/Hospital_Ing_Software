# BioCore Medical — Hospital Information System
## Casos de Uso — Versión 3

**Elaborado por:** Pablo Miguel Chavez, Emerson Antonio Sec, Jackeline Sanchez  
**Fecha:** 18/03/2026 | **Versión:** 3.0

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Java 17, Spring Boot 3.3.6, Spring Security, Hibernate/JPA, Lombok, Maven |
| Frontend | Angular 17, Angular Material |
| Base de Datos | PostgreSQL (Neon Cloud) — `ddl-auto: update` |
| Autenticación | JWT (jjwt 0.12.6), stateless, expira en 24 h |
| Correo | Gmail SMTP (TLS 587) |
| Archivos | Multipart hasta 20 MB |

---

## CU 00 — Portal Web

**Definición:** Portal público del hospital. Permite a pacientes registrarse y agendar citas en línea con pago incluido. El personal interno accede con credenciales asignadas por el administrador.

### Flujo Principal
1. El usuario ingresa al portal web del hospital.
2. El sistema despliega la página principal.
3. El usuario selecciona Registro o Inicio de Sesión.
4. El usuario ingresa sus credenciales.
5. El sistema verifica las credenciales y redirige al dashboard correspondiente.
6. El sistema muestra el módulo de agendamiento de citas.
7. El usuario elige fecha y hora disponible.
8. El sistema muestra resumen: nombre, fecha, hora, DPI, correo.
9. El sistema ofrece adjuntar documentos de laboratorio (opcional).
10. El sistema genera la cita y asigna médico y clínica por disponibilidad.
11. El sistema genera la orden de pago.
12. El usuario realiza el pago en línea.
13. El sistema confirma el pago, registra la cita como activa y envía voucher por correo.

### Estructura del Menú
- Inicio
- Nosotros (Misión, Visión, Valores)
- Servicios (Consulta Externa, Medicina General, Laboratorio, Farmacia)
- Pacientes (Registro, Ver Historial)

### Flujos Alternos

**Inicio de Sesión del Personal**
- El usuario interno ingresa credenciales asignadas por el administrador.
- El sistema redirige al dashboard del módulo correspondiente según su rol.

**Registro de Paciente Nuevo**
- El sistema pide: nombre completo, nombre de usuario, contraseña, DPI, fecha de nacimiento, correo, teléfono, dirección, número de seguro (opcional), aseguradora (opcional).
- El sistema crea el usuario y redirige a login.

**Adjuntar Documentos de Laboratorio**
- El usuario adjunta resultados de laboratorio previos en PDF.
- El sistema valida el documento: no vacío, no cifrado, máximo 20 MB.
- Si es válido, lo vincula a la cita y al expediente del paciente.

**Paciente que No Realiza el Pago**
- El sistema cancela la cita generada, libera el espacio en el calendario y registra el evento como "Cita Cancelada por Falta de Pago".

---

## CU 01 — Registro de Pacientes

**Definición:** Proceso presencial mediante el cual el Personal de Salud recibe al paciente, verifica su registro por DPI, crea el perfil si es nuevo y genera el voucher de pago para que el paciente cancele en Caja.

### Actores
- **Personal de Salud:** Recibe, verifica y registra al paciente.
- **Paciente:** Se presenta presencialmente.
- **Sistema:** Gestiona registro, cita y generación de voucher.

### Flujo Principal
1. El paciente se presenta al hospital.
2. El Personal de Salud ingresa el DPI del paciente.
3. El sistema valida el DPI (13 dígitos numéricos, sin duplicados).
4. El sistema recupera el expediente: nombre, historial, citas.
5. El Personal de Salud verifica si el caso es emergencia.
6. Se agenda la cita seleccionando clínica disponible.
7. El sistema verifica si el paciente desea adjuntar laboratorios previos.
8. El sistema genera la orden de pago.
9. El Personal de Salud imprime el voucher para pagar en Caja.
10. El sistema genera un ticket de atención correlativo (ej. A0001).
11. Se toman y registran los signos vitales del paciente.
12. El sistema envía los signos vitales al médico asignado.
13. El sistema actualiza el estado del paciente a "En espera de consulta".

### Flujos Alternos

**Registro de Nuevo Paciente**
- El sistema no encuentra el DPI.
- El Personal de Salud completa el formulario de registro.
- El sistema genera un código único correlativo de paciente (PAT-XXXX).
- El sistema envía credenciales temporales al correo del paciente.

**Paciente de Emergencia**
- El Personal identifica al paciente como emergencia y el proceso se redirige al CU 05.

**Adjuntar Laboratorios**
- El paciente desea adjuntar resultados previos en PDF (máx. 20 MB).
- El sistema vincula el documento al expediente digital.

### Postcondiciones
- El paciente queda registrado con perfil y credenciales temporales (si es nuevo).
- Se ha generado un ticket de atención correlativo.
- El voucher de pago ha sido impreso para su cancelación en Caja.

---

## CU 02 — Mantenimiento de Usuarios

**Definición:** Gestión del personal médico y su asignación a clínicas. El Administrador crea usuarios, modifica roles y asigna o reasigna médicos según la demanda operativa.

### Actores
- **Administrador:** Gestiona la distribución del personal.
- **Sistema:** Administra usuarios y la relación Médico–Clínica.

### Flujo Principal
1. El administrador ingresa al módulo de Gestión de Personal.
2. El sistema despliega la lista de todos los usuarios registrados.
3. El administrador selecciona un usuario de rol Médico.
4. El sistema muestra el perfil del médico y su estado actual.
5. El administrador asigna o cambia la clínica del médico.
6. El sistema valida que la clínica no exceda su capacidad máxima.
7. El sistema valida que el médico no esté asignado a otra clínica activa.
8. El administrador confirma la asignación.
9. El sistema actualiza la asignación en tiempo real y vincula al médico con la cola de pacientes.

### Flujos Alternos

**Creación de Nuevo Usuario**
- El administrador registra: nombre completo, rol, número de colegiado (obligatorio salvo cajero y farmacéutico), usuario, contraseña, correo.
- El sistema asigna automáticamente al personal no médico a sus áreas respectivas.
- El sistema valida unicidad del número de colegiado.

**Configuración de Notificaciones**
- El administrador activa/desactiva pantallas de llamado visual y sistema de audio.
- Configura: pantallas activas, volumen, tipo de alerta, tiempo de visualización, repeticiones.
- Los cambios se aplican en tiempo real sin reiniciar el sistema.

**Reasignación por Alta Demanda**
- El administrador mueve a un médico de una clínica con baja demanda a una con saturación.
- El sistema actualiza en tiempo real el monitor de pacientes y notifica al médico.

**Asignación de Clínica**
- El sistema muestra clínicas disponibles: Consulta Externa, Medicina General, Emergencias.

### Postcondiciones
- El médico queda asignado a una única clínica activa.
- Las colas de atención se actualizan en tiempo real.

---

## CU 03 — Generación de Citas

**Definición:** Proceso completo de generación de citas presenciales: desde la verificación del paciente hasta el llamado por pantalla con notificación visual y auditiva para pasar a consulta.

### Actores
- **Personal de Salud:** Verifica registro, agenda cita y toma signos vitales.
- **Paciente:** Se presenta al hospital.
- **Médico:** Confirma llegada del paciente.
- **Sistema:** Gestiona disponibilidad, asignación, cola y notificaciones.

### Flujo Principal
1. El paciente llega al hospital.
2. El Personal de Salud ingresa el DPI del paciente.
3. El sistema recupera el expediente del paciente.
4. El Personal verifica si es caso de emergencia.
5. Se revisa la disponibilidad en el calendario.
6. Se agenda la cita seleccionando la clínica destino.
7. El sistema verifica si el paciente desea adjuntar laboratorios.
8. El sistema genera la orden de pago.
9. El paciente paga en Caja.
10. El sistema registra el pago y confirma la cita.
11. El Personal imprime el voucher de cita.
12. El sistema genera ticket correlativo y asigna médico y clínica por disponibilidad.
13. La pantalla llama al paciente hacia el Área de Signos Vitales.
14. El Personal toma y registra los signos vitales.
15. El sistema actualiza el estado a "En Espera de Consulta" y notifica al médico.
16. La pantalla llama al paciente con notificación visual y auditiva (número de ticket y clínica asignada).
17. El médico confirma la llegada del paciente en el sistema.
18. El sistema cambia el estado a "En Consulta" e inicia el cronómetro de atención.

### Flujos Alternos

**Registro de Nuevo Paciente**
- Si el DPI no existe, el Personal completa el formulario CU 01.
- El sistema genera código único de paciente y continúa.

**Paciente con Cita Agendada en Línea**
- El Personal verifica la cita activa agendada por portal web.
- El sistema confirma datos y el paciente continúa desde el llamado a Signos Vitales.

**Paciente de Emergencia**
- El proceso se redirige a CU 05.

**Adjuntar Laboratorios**
- El paciente adjunta PDF (máx. 20 MB). El sistema vincula al expediente.

**Paciente que No Paga**
- La cita se cancela, el espacio se libera y se registra como "Cita Cancelada por Falta de Pago".

### Postcondiciones
- El paciente tiene cita activa, médico y clínica asignados.
- Los signos vitales han sido tomados y registrados.
- El paciente ha sido llamado por pantalla con notificación visual y auditiva.

---

## CU 04 — Mantenimiento de Consulta

**Definición:** Gestión de la cola de pacientes en sala de espera y el mecanismo de llamado visual y auditivo al siguiente paciente, seguido del proceso de consulta, diagnóstico y prescripción médica.

### Actores
- **Médico:** Llama al siguiente paciente, realiza consulta y registra diagnóstico y receta.
- **Personal de Salud:** Registra signos vitales.
- **Paciente:** Receptor del llamado y la atención.
- **Sistema:** Gestiona la lógica de cola y notificaciones.

### Flujo Principal
1. El médico visualiza la lista de pacientes en espera.
2. El médico selecciona "Llamar Siguiente Paciente".
3. El sistema valida que el médico no tenga consulta activa en proceso.
4. El sistema selecciona al siguiente paciente según prioridad (URGENTE primero, luego cronológico).
5. El sistema cambia el estado del paciente a "Siendo Llamado".
6. El sistema activa simultáneamente la notificación visual (ticket y clínica) y el mensaje de voz.
7. El número del paciente permanece visible en "Últimos Llamados" hasta el siguiente llamado.
8. El paciente se dirige a la clínica indicada.
9. El médico confirma la llegada en el sistema.
10. El sistema cambia el estado a "En Consulta" e inicia el cronómetro.
11. El médico revisa el expediente del paciente en el sistema.
12. El médico atiende al paciente y registra diagnóstico y receta médica.
13. El sistema envía la receta por correo.
14. Si requiere laboratorios: el médico asigna los exámenes (ver CU 06).
15. Si requiere medicamentos: el médico asigna medicamentos y dosificación (ver CU 08).

### Flujos Alternos

**Cambio de Clínica durante Cola Activa**
- El médico es reasignado por el administrador (CU 02).
- El sistema actualiza automáticamente el destino en las pantallas de notificación.

**Paciente Ausente tras Tres Llamados**
- El médico selecciona "Paciente Ausente".
- El sistema cambia el estado a "Paciente No se Presentó".
- El médico puede llamar al siguiente paciente.

### Postcondiciones
- El paciente fue notificado y atendido.
- El diagnóstico y la receta quedan registrados en el expediente.
- Se conserva trazabilidad de tiempos de espera y consulta.

---

## CU 05 — Atención de Emergencia

**Definición:** Proceso de atención prioritaria a pacientes que ingresan por emergencias, ya sea directamente o derivados desde otro módulo. Garantiza respuesta inmediata y coordinada.

### Actores
- **Personal de Salud:** Recibe, toma signos vitales y registra el ingreso.
- **Cajero:** Maneja el cobro de emergencia.
- **Médico:** Atiende y registra diagnóstico y receta.
- **Paciente:** Recibe la atención.
- **Sistema:** Valida, asigna y mantiene trazabilidad.

### Flujo Principal
1. El paciente ingresa al área de emergencias.
2. El sistema genera la orden de pago.
3. El sistema registra el pago.
4. El Personal de Salud ingresa el DPI del paciente.
5. El sistema recupera el expediente clínico.
6. El Personal registra el motivo de ingreso y marca el ticket como "Emergencia".
7. El sistema asigna automáticamente prioridad máxima al turno del paciente.
8. El Personal toma y registra los signos vitales.
9. El sistema llama al médico disponible según prioridad y disponibilidad de clínica.
10. El médico accede al expediente y atiende al paciente.
11. El médico registra diagnóstico y receta en el sistema.
12. Si requiere laboratorios: continúa según CU 06.
13. Si requiere medicamentos: el sistema genera receta electrónica (ver CU 08).
14. El sistema actualiza el expediente y cierra el evento.

### Flujos Alternos

**Paciente con Seguro Médico**
- El sistema detecta el seguro registrado y aplica el descuento correspondiente automáticamente.

**Paciente No Registrado**
- El Personal registra con datos mínimos (nombre, DPI o descripción si no puede proveerlos).
- El sistema crea el expediente básico y continúa.

**Requiere Laboratorios**
- El médico indica la necesidad. El sistema genera la orden de laboratorio (CU 06).

**Requiere Medicamentos**
- El médico prescribe. El sistema genera receta electrónica (CU 08).

### Postcondiciones
- El expediente de emergencia está documentado.
- El médico ha registrado diagnóstico y receta.
- La orden de pago ha sido generada y procesada.
- El evento de emergencia queda trazable en el historial clínico.

---

## CU 06 — Laboratorio

**Definición:** Gestión de órdenes de exámenes de laboratorio: inmediatos o programados. Incluye notificación electrónica de resultados al paciente.

### Actores
- **Técnico de Laboratorio:** Recibe, procesa muestras y registra resultados.
- **Paciente:** Recibe el servicio y la notificación de resultados.
- **Sistema:** Administra órdenes, estados y notificaciones.

### Flujo Principal
1. El médico emite la orden de laboratorio indicando el tipo de muestra (sangre, orina, heces, hisopado nasal, tejido o células cervicales).
2. El paciente agenda su cita de laboratorio (en línea o presencialmente).
3. El paciente cancela la boleta de pago.
4. El Personal identifica al paciente y revisa la orden.
5. El Personal toma la muestra según el tipo indicado.
6. El Personal registra la muestra en el sistema.
7. Los técnicos procesan la muestra:
   - **Inmediata:** El examen se realiza al momento. Estado → "Muestra Recolectada".
   - **Programada:** El técnico agenda fecha y hora. Estado → "Cita Programada".
8. El sistema valida que el expediente tenga correo electrónico registrado.
9. Al finalizar, el técnico registra la fecha y hora de disponibilidad de resultados.
10. El sistema envía automáticamente un correo de notificación al paciente con los resultados.

### Flujos Alternos

**Orden Expirada (más de 30 días)**
- El sistema marca la orden como "Expirada".
- El técnico informa al paciente que debe solicitar nueva orden médica.

**Correo No Registrado**
- El sistema solicita ingresar o actualizar el correo del paciente antes de continuar.

**Notificación Electrónica**
- Asunto: *Notificación de Resultados – Laboratorio Hospital*
- Cuerpo: Estimado(a) [Nombre], sus resultados de laboratorio fueron culminados el DD/MM/AAAA a las HH:MM. Los adjuntamos en este correo. Para consultas, agender nueva cita adjuntando los laboratorios. Presentar ticket o código de paciente.

### Catálogo de Exámenes de Laboratorio

| Código | Nombre del Examen | Muestra | Categoría |
|---|---|---|---|
| LAB-001 | Hemograma completo (BHC) | Sangre | Hematología |
| LAB-002 | Grupo sanguíneo y Rh | Sangre | Hematología |
| LAB-003 | Tiempo de protrombina (TP) | Sangre | Hematología |
| LAB-004 | Tiempo de tromboplastina parcial (TTP) | Sangre | Hematología |
| LAB-005 | Velocidad de sedimentación globular (VSG) | Sangre | Hematología |
| LAB-006 | Glucosa en ayunas | Sangre | Química Clínica |
| LAB-007 | Hemoglobina glucosilada (HbA1c) | Sangre | Química Clínica |
| LAB-008 | Perfil lipídico | Sangre | Química Clínica |
| LAB-009 | Creatinina sérica | Sangre | Química Clínica |
| LAB-010 | Urea (BUN) | Sangre | Química Clínica |
| LAB-011 | Ácido úrico | Sangre | Química Clínica |
| LAB-012 | Proteínas totales y albúmina | Sangre | Química Clínica |
| LAB-013 | Bilirrubinas (total, directa, indirecta) | Sangre | Química Clínica |
| LAB-014 | Transaminasas (ALT, AST) | Sangre | Química Clínica |
| LAB-015 | Fosfatasa alcalina | Sangre | Química Clínica |
| LAB-016 | Amilasa y lipasa | Sangre | Química Clínica |
| LAB-017 | Electrolitos (Na, K, Cl, Ca) | Sangre | Química Clínica |
| LAB-018 | Proteína C reactiva (PCR) | Sangre | Inmunología |
| LAB-019 | Factor reumatoide | Sangre | Inmunología |
| LAB-020 | Prueba de embarazo (β-HCG) | Sangre/Orina | Inmunología |
| LAB-021 | TSH (tiroides) | Sangre | Inmunología |
| LAB-022 | T3 y T4 libre | Sangre | Inmunología |
| LAB-023 | VIH (ELISA) | Sangre | Serología |
| LAB-024 | VDRL (sífilis) | Sangre | Serología |
| LAB-025 | Antígeno de superficie hepatitis B (HBsAg) | Sangre | Serología |
| LAB-026 | Anticuerpos hepatitis C | Sangre | Serología |
| LAB-027 | Dengue NS1 / IgM / IgG | Sangre | Serología |
| LAB-028 | Cultivo de sangre (hemocultivo) | Sangre | Microbiología |
| LAB-029 | Cultivo de orina (urocultivo) | Orina | Microbiología |
| LAB-030 | Cultivo de heces (coprocultivo) | Heces | Microbiología |
| LAB-031 | Examen general de orina (EGO) | Orina | Uroanálisis |
| LAB-032 | Creatinina en orina de 24 horas | Orina | Uroanálisis |
| LAB-033 | Examen coproparasitoscópico | Heces | Parasitología |
| LAB-034 | Sangre oculta en heces | Heces | Parasitología |
| LAB-035 | Prueba rápida COVID-19 (Antígeno) | Hisopado nasal | Virología |
| LAB-036 | PCR COVID-19 | Hisopado nasal | Virología |
| LAB-037 | Papanicolaou (PAP) | Células cervicales | Citología |
| LAB-038 | Biopsia de tejido | Tejido | Histopatología |
| LAB-039 | PSA (antígeno prostático) | Sangre | Oncología |
| LAB-040 | CEA (antígeno carcinoembrionario) | Sangre | Oncología |

### Postcondiciones
- La orden queda registrada y procesada.
- El paciente recibe notificación electrónica.
- El estado del examen queda actualizado en el expediente digital.

---

## CU 07 — Pagos

**Definición:** Consolidación y cobro de servicios médicos (consulta, laboratorio, farmacia, emergencias). Aplica descuentos de seguro y genera factura electrónica.

### Actores
- **Cajero:** Procesa el pago del paciente.
- **Paciente:** Realiza el pago.
- **Sistema:** Consolida cargos, aplica descuentos y genera factura.

### Flujo Principal
1. El cajero ingresa al módulo de Caja y Facturación.
2. El sistema solicita identificación del paciente por DPI.
3. El sistema muestra el desglose de cargos (consulta, laboratorios, farmacia, emergencia).
4. El sistema valida si el paciente tiene seguro registrado.
5. El sistema aplica automáticamente el porcentaje de descuento correspondiente.
6. El sistema calcula el Total Neto a pagar.
7. El cajero selecciona el método de pago (Efectivo, Tarjeta Débito/Crédito).
8. El paciente realiza el pago.
9. El sistema procesa la transacción y genera la factura electrónica.
10. El sistema cambia el estado del evento a "Finalizado/Pagado".

### Tabla de Descuentos por Seguro
| Aseguradora | Descuento |
|---|---|
| El Roble | 10% |
| Universales | 20% |
| G&T | 25% |

### Flujos Alternos

**Cancelación de Servicio Opcional**
- El paciente indica que no pagará un servicio.
- El cajero elimina el ítem del desglose.
- El sistema recalcula el total y registra el servicio como "Cancelado".

**Cambio o Registro de Seguro en Ventanilla**
- El cajero actualiza el seguro del paciente.
- El sistema recalcula el total con el nuevo descuento.

**Intento de Cierre con Saldo Pendiente**
- El sistema bloquea el cierre administrativo.
- Mensaje: *"No es posible cerrar el expediente con saldo pendiente."*

### Postcondiciones
- El pago queda registrado. Se genera factura electrónica.
- El expediente cambia a estado "Pagado".

---

## CU 08 — Farmacia

**Definición:** Despacho de medicamentos en farmacia a partir de una receta electrónica validada. Incluye preparación, pago y actualización del inventario.

### Actores
- **Farmacéutico:** Despacha medicamentos y procesa el pago.
- **Paciente:** Recibe los medicamentos.
- **Sistema:** Valida receta, procesa pago y actualiza inventario.

### Flujo Principal
1. El paciente presenta la receta electrónica al farmacéutico.
2. El sistema muestra el listado de medicamentos indicados.
3. El farmacéutico verifica disponibilidad en inventario.
4. El farmacéutico agrega al carrito los medicamentos disponibles.
5. El sistema genera la orden de pago con el detalle.
6. El paciente realiza el pago.
7. El sistema valida el pago y confirma la transacción.
8. El farmacéutico entrega los medicamentos y registra el despacho.
9. El sistema actualiza el inventario descontando los medicamentos despachados.

### Flujos Alternos

**Ingreso de Medicamentos al Inventario**
- El usuario selecciona "Ingreso de medicamento a Inventario".
- El sistema ofrece: nuevo ingreso o actualización de medicamento.
- El inventario se actualiza en tiempo real.

**Medicamento Sin Stock**
- El sistema notifica al farmacéutico los medicamentos faltantes.
- El farmacéutico informa al paciente y registra los faltantes como "No Despachado".
- La orden de pago se genera únicamente por los medicamentos disponibles.

**Paciente que No Paga**
- El farmacéutico cancela la orden.
- El sistema libera los medicamentos reservados y restaura el inventario.

### Catálogo de Medicamentos

| Código | Nombre Genérico | Presentación | Categoría |
|---|---|---|---|
| FAR-001 | Paracetamol 500 mg | Tableta | Analgésico / Antipirético |
| FAR-002 | Paracetamol 120 mg/5 ml | Jarabe 60 ml | Analgésico / Antipirético |
| FAR-003 | Ibuprofeno 400 mg | Tableta | AINE |
| FAR-004 | Ibuprofeno 200 mg/5 ml | Suspensión 120 ml | AINE |
| FAR-005 | Diclofenaco 50 mg | Tableta | AINE |
| FAR-006 | Diclofenaco 75 mg/3 ml | Inyectable | AINE |
| FAR-007 | Naproxeno 500 mg | Tableta | AINE |
| FAR-008 | Ketorolaco 30 mg/ml | Inyectable | AINE |
| FAR-009 | Amoxicilina 500 mg | Cápsula | Antibiótico |
| FAR-010 | Amoxicilina 250 mg/5 ml | Suspensión 60 ml | Antibiótico |
| FAR-011 | Amoxicilina + Ácido clavulánico 875/125 mg | Tableta | Antibiótico |
| FAR-012 | Azitromicina 500 mg | Tableta | Antibiótico |
| FAR-013 | Ciprofloxacino 500 mg | Tableta | Antibiótico |
| FAR-014 | Metronidazol 500 mg | Tableta | Antibiótico |
| FAR-015 | Clindamicina 300 mg | Cápsula | Antibiótico |
| FAR-016 | Omeprazol 20 mg | Cápsula | Gastrointestinal |
| FAR-017 | Ranitidina 150 mg | Tableta | Gastrointestinal |
| FAR-018 | Metoclopramida 10 mg | Tableta/Inyectable | Gastrointestinal |
| FAR-019 | Sales de rehidratación oral | Sobre | Gastrointestinal |
| FAR-020 | Loperamida 2 mg | Cápsula | Gastrointestinal |
| FAR-021 | Loratadina 10 mg | Tableta | Antihistamínico |
| FAR-022 | Cetirizina 10 mg | Tableta | Antihistamínico |
| FAR-023 | Difenhidramina 25 mg | Cápsula | Antihistamínico |
| FAR-024 | Salbutamol 100 mcg | Inhalador (MDI) | Respiratorio |
| FAR-025 | Ambroxol 30 mg/5 ml | Jarabe 120 ml | Respiratorio |
| FAR-026 | Loratadina + Pseudoefedrina | Tableta | Respiratorio |
| FAR-027 | Metformina 500 mg | Tableta | Antidiabético |
| FAR-028 | Glibenclamida 5 mg | Tableta | Antidiabético |
| FAR-029 | Insulina NPH 100 UI/ml | Vial 10 ml | Antidiabético |
| FAR-030 | Enalapril 10 mg | Tableta | Antihipertensivo |
| FAR-031 | Losartán 50 mg | Tableta | Antihipertensivo |
| FAR-032 | Amlodipino 5 mg | Tableta | Antihipertensivo |
| FAR-033 | Atorvastatina 20 mg | Tableta | Hipolipemiante |
| FAR-034 | Ácido acetilsalicílico 100 mg | Tableta | Antiagregante |
| FAR-035 | Clonazepam 0.5 mg | Tableta | Ansiolítico |
| FAR-036 | Diazepam 5 mg | Tableta | Ansiolítico |
| FAR-037 | Sertralina 50 mg | Tableta | Antidepresivo |
| FAR-038 | Vitamina C 500 mg | Tableta | Suplemento |
| FAR-039 | Complejo B | Tableta/Inyectable | Suplemento |
| FAR-040 | Sulfato ferroso 300 mg | Tableta | Suplemento |
| FAR-041 | Ácido fólico 1 mg | Tableta | Suplemento |
| FAR-042 | Hidrocortisona 1% | Crema 30 g | Dermatológico |
| FAR-043 | Clotrimazol 1% | Crema 20 g | Antifúngico tópico |
| FAR-044 | Solución salina 0.9% | Frasco 500 ml | Solución IV |
| FAR-045 | Dextrosa 5% | Frasco 500 ml | Solución IV |

### Postcondiciones
- Los medicamentos han sido despachados.
- El inventario se ha actualizado.
- El pago queda registrado. El estado de la receta cambia a "Despachada".

---

## CU 09 — Reportería

**Definición:** Generación, consulta y exportación de reportes estadísticos sobre la operación del hospital, consolidando información de todos los módulos.

### Actores
- **Administrador:** Supervisa la operación y genera reportes.
- **Sistema:** Procesa datos y genera reportes dinámicos.

### Flujo Principal
1. El administrador ingresa al módulo de Reportería y Estadísticas.
2. El sistema muestra un Dashboard con métricas del día (actualización en tiempo real):
   - Pacientes ingresados
   - Pacientes atendidos
   - Pacientes en consulta
   - Pacientes cancelados
   - Pagos realizados hoy
3. El administrador selecciona el tipo de reporte:
   - Productividad por Médico
   - Atención por Áreas
   - Despacho de Farmacia
4. El administrador aplica filtros: rango de fechas, clínica, estado del paciente.
5. El sistema muestra resultados en tablas y gráficos dinámicos.
6. El sistema aplica anonimización automática en reportes estadísticos generales.
7. El administrador puede generar un PDF descargable.
8. El sistema valida permisos para exportación financiera.

### Flujos Alternos

**Búsqueda de Paciente**
- El administrador ingresa el Código Único de Paciente (PAT-XXXX).
- El sistema muestra: historial de visitas, resultados de laboratorio, pagos realizados y seguros utilizados.

### Postcondiciones
- Los reportes reflejan información actualizada.
- Se mantiene privacidad de datos clínicos.
- Los archivos exportados quedan registrados en bitácora.

---

## CU 10 — Reglas de Negocio

### Acceso y Autenticación
| Regla | Descripción |
|---|---|
| Formato de Credenciales | Contraseña: mínimo 8 caracteres, una mayúscula y un número. |
| Restricción de Auto-registro | El portal web no permite que personal interno cree su propia cuenta. Solo el administrador puede crear usuarios internos. |
| Contraseña Temporal | Vigencia de 24 horas. El sistema obliga a cambiarla en el primer inicio de sesión. |
| Autenticación Obligatoria | Todo usuario interno debe autenticarse para acceder a módulos administrativos. |

### Registro de Pacientes
| Regla | Descripción |
|---|---|
| Validación de DPI | Obligatorio, 13 dígitos numéricos, sin duplicados. |
| Asignación Obligatoria de Clínica | No puede generarse ticket sin clínica seleccionada. |
| Secuencialidad de Signos | No se puede asignar el paciente a consulta sin signos vitales previos. |
| Código Único de Paciente | Generado automáticamente en formato PAT-XXXX al registrar por primera vez. |
| Formato de PDF | Solo archivos .pdf, máximo 20 MB. |

### Gestión de Personal Médico
| Regla | Descripción |
|---|---|
| Capacidad de Clínica | Una clínica no puede exceder el número máximo de médicos permitidos simultáneamente. |
| Unicidad de Asignación | Un médico solo puede estar asignado a una clínica activa a la vez. |
| Actualización en Tiempo Real | Los cambios de clínica deben reflejarse inmediatamente en la cola y monitores. |
| Perfil de Seguridad | Solo el Administrador puede modificar asignaciones médicas. |
| Unicidad de Colegiado | No puede registrarse un número de colegiado duplicado. |

### Cola y Llamado de Pacientes
| Regla | Descripción |
|---|---|
| Prioridad de Llamado | Cronológico, salvo ticket marcado como "Urgente". |
| Sincronización Audio/Video | Notificación visual y auditiva deben ejecutarse simultáneamente. |
| Persistencia en Pantalla | El último paciente llamado permanece visible hasta el siguiente llamado. |
| Restricción de Llamado | No puede llamarse nuevo paciente si hay consulta activa en proceso. |

### Atención de Emergencias
| Regla | Descripción |
|---|---|
| Marcado de Emergencia | El Personal debe registrar explícitamente el ingreso como "Emergencia". |
| Prioridad de Cola | Los tickets de emergencia se colocan al frente de la cola. |
| Signos Vitales Obligatorios | No puede asignarse médico sin signos vitales previos registrados. |
| Registro Mínimo | Si el paciente no puede proveer datos, se permite crear expediente mínimo para no detener la atención. |

### Laboratorio
| Regla | Descripción |
|---|---|
| Vigencia de Orden | Una orden médica tiene vigencia de 30 días calendario. |
| Formato de Notificación | Fecha: DD/MM/AAAA. Hora: formato 24 horas. |
| Correo Obligatorio | Si no existe correo registrado, debe ingresarse antes de programar la entrega de resultados. |
| Validación de PDF externo | El PDF no debe estar vacío, cifrado ni superar los 20 MB. |

### Pagos y Facturación
| Regla | Descripción |
|---|---|
| Descuentos Fijos por Seguro | El Roble 10%, Universales 20%, G&T 25%. |
| Cálculo de Descuento | Aplicado sobre el total consolidado (consulta + laboratorio + farmacia). |
| Bloqueo de Cierre | No puede cerrarse expediente con saldos pendientes. |

### Farmacia
| Regla | Descripción |
|---|---|
| Validación de Stock | No puede generarse orden de pago si el medicamento no está disponible. Con disponibilidad parcial, se despacha lo disponible y el resto queda como "No Despachado". |
| Pago Previo al Despacho | Los medicamentos no pueden entregarse sin confirmación de pago exitosa. |

### Reportería
| Regla | Descripción |
|---|---|
| Generación de Código | El código de paciente se genera automáticamente en el registro inicial. |
| Anonimización | Los reportes estadísticos no deben mostrar nombres de pacientes. |
| Actualización en Tiempo Real | Las métricas se actualizan al cerrarse consultas. |
| Restricción de Exportación | Solo el Administrador General puede exportar reportes financieros detallados. |

### Notificaciones
| Regla | Descripción |
|---|---|
| Control Visual | La notificación visual solo se proyecta en pantallas habilitadas por el administrador. |
| Control Auditivo | La notificación auditiva requiere que el audio esté operativo y habilitado. Si está desactivado, opera solo en modo visual. |
| Aplicación en Tiempo Real | Los cambios de configuración se aplican inmediatamente sin reiniciar el sistema. |

---

*Fin del documento — BioCore Medical v3.0*
