# BioCore Medical — Casos de Uso
**Versión:** 3.0  
**Autores:** Jackeline Sanchez, Emerson Sec, Pablo Chavez  
**Fecha:** 2/05/2026

---

## Índice

- [CU 00 – Portal Web](#cu-00--portal-web)
- [CU 01 – Registro de Pacientes](#cu-01--registro-de-pacientes)
- [CU 02 – Mantenimiento de Usuario](#cu-02--mantenimiento-de-usuario)
- [CU 03 – Gestión de Citas y Pagos](#cu-03--gestión-de-citas-y-pagos)
- [CU 04 – Toma de Signos Vitales](#cu-04--toma-de-signos-vitales)
- [CU 05 – Consulta Médica](#cu-05--consulta-médica)
- [CU 06 – Atención de Emergencia](#cu-06--atención-de-emergencia)
- [CU 07 – Laboratorio](#cu-07--laboratorio)
- [CU 08 – Farmacia](#cu-08--farmacia)
- [CU 09 – Reportería](#cu-09--reportería)
- [CU 10 – Reglas de Negocio](#cu-10--reglas-de-negocio)
- [Catálogos](#catálogos)

---

## CU 00 – Portal Web

### 1. Introducción

**1.1 Definición:**  
Portal web oficial del hospital diseñado para la interacción pública e ingreso privado. Permite a los pacientes registrarse y agendar citas completamente en línea, incluido el pago. El personal interno accede a través del portal mediante credenciales asignadas por el administrador.

**1.2 Objetivo:**  
Centralizar el acceso a la información institucional y permitir la autenticación de usuarios administrativos y médicos.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Usuario Externo (Paciente):** Paciente que accede al portal para registrarse y agendar su cita de forma completamente en línea, incluyendo el pago.
- **2.1.2 Usuario Interno (Personal del Hospital):** Personal que accede al portal con credenciales asignadas por el administrador para ingresar a su módulo correspondiente.
- **2.1.3 Sistema Informático:** Plataforma web de gestión hospitalaria.

#### 2.2 Precondiciones
- El servidor de alojamiento web debe estar operativo.
- El sistema debe encontrarse activo.
- Debe tener conexión a la base de datos.
- La información mostrada debe estar actualizada.

#### 2.3 Flujo Normal Básico

1. El usuario externo ingresa al portal web del hospital.
2. El sistema despliega la página principal.
3. El usuario externo da clic en el botón **Ingresar**.
4. El sistema muestra el formulario de Iniciar Sesión. `[FA01]`
5. El usuario externo ingresa su login y su contraseña.
6. El sistema verifica credenciales. `[RN-1]` `[RN-2]` `[RN-9]` `[FA02]`
7. El sistema despliega el portal del paciente con las siguientes pestañas:
   - Agendar Cita
   - Mis Citas
   - Mis Turnos
   - Mis Recetas
   - Diagnósticos
   - Laboratorio
   - Pagos
   - Mi Perfil
8. El sistema despliega la pestaña de **Agendar Cita**. `[FA03]` `[FA04]` `[FA05]`
9. El sistema muestra el calendario interactivo de citas disponibles.
10. El usuario externo selecciona su tipo de servicio. `[FA06]` `[RN-3]`
11. El usuario externo selecciona su tipo de Clínica/Área - Laboratorio. `[FA07]` `[RN-4]`
12. El usuario externo elige fecha. `[RN-5]`
13. El sistema despliega los horarios disponibles en esa fecha.
14. El usuario externo elige el horario disponible.
15. El sistema valida la selección hecha por el usuario y reserva por un tiempo máximo de 10 min.
16. El usuario externo da clic en el botón **Continuar al Pago**.
17. El sistema muestra el resumen de la cita (fecha y hora, Área, precio de cita), formulario de pago con tarjeta y adjuntar documentos de forma opcional. `[RN-6]`
18. El usuario externo ingresa datos en formulario de pago (Nombre de la tarjeta, número de tarjeta, fecha de vencimiento, CVV) y da clic en el botón **Pagar**. `[FA08]`
19. El sistema valida los datos de la tarjeta ingresada y realiza el cobro correspondiente. Muestra en el botón: *Procesando Pago*. `[RN-7]`
20. El sistema procesa el pago y genera pantalla con: **¡Cita Confirmada!** con resumen de datos de cita y botón de **Agendar otra cita**.
21. Fin del caso de uso.

### 3. Flujos Alternos

#### FA01 – Registrarse en Línea
1. Usuario da clic en **Registrarse en Línea**.
2. El sistema muestra formulario de registro en línea.
3. Usuario ingresa datos al formulario correspondiente.
4. El usuario da clic en el botón **Continuar**.
5. Sistema muestra formulario para Crear Credenciales de Acceso.
6. El usuario ingresa Nombre de Usuario y contraseña, da clic en **Continuar**. `[RN-1]` `[RN-2]`
7. El sistema muestra un resumen de la confirmación del registro del usuario.
8. El usuario da clic en el botón **Completar Registro**.
9. El sistema valida los datos ingresados y crea el usuario. `[RN-8]`
10. Fin de flujo alterno.

#### FA02 – Credenciales Incorrectas
1. El sistema detecta que las credenciales ingresadas son incorrectas.
2. El sistema despliega un mensaje de error: *"Usuario o contraseña inválidos"*.
3. Fin de flujo alterno.

#### FA03 – Mi Perfil
1. Usuario ingresa a pestaña **Mi Perfil**.
2. El sistema muestra información del paciente con el botón **Editar información**.
3. Usuario da clic al botón editar información.
4. El sistema habilita la información personal del paciente para ser editada.
5. Usuario da clic en **Guardar cambios**.
6. Sistema actualiza perfil exitosamente.
7. Usuario puede modificar datos de seguridad y acceso. Da clic en botón **Cambiar contraseña**.
8. El sistema valida y actualiza los datos del usuario.
9. Fin de flujo alterno.

#### FA04 – Agendar Laboratorio desde Orden
1. El usuario da clic en la pestaña **Laboratorio**.
2. El sistema muestra todos los laboratorios asignados y su estado (Pendiente de cita, Programada, Resultados listos).
3. El usuario da clic al botón **Agendar Cita**.
4. El portal lo redirige a la pestaña Agendar cita con el calendario interactivo y los campos de Tipo de Servicio y Examen de Laboratorio ya marcados.
5. Termina el flujo alterno, continúa con el paso 2.3.12 del flujo normal básico.

#### FA05 – Re-agendar Cita
1. El usuario da clic en la pestaña **Mis Turnos**.
2. El sistema muestra todos los turnos del usuario con su estado (En espera, Expirado, Pendiente Reagendar, Reagendar, Atendido).
3. El usuario da clic al botón **Reagendar** (solo disponible si fue marcado como ausente y está en estado *Pendiente Reagendar*).
4. El sistema muestra un calendario interactivo con título *Reagendar Turno* y número del turno.
5. El usuario selecciona la fecha y hora disponible para su reasignación.
6. El sistema valida la selección; si es válida habilita el botón **Confirmar Reagendamiento**; si no, muestra: *"Ya tienes una cita agendada para el [fecha con cita]"* y reserva por un máximo de 10 min.
7. El usuario da clic al botón **Confirmar Reagendamiento**.
8. El sistema crea el reagendamiento y muestra una ventana emergente: *"Cita reagendada correctamente"*.
9. Fin de flujo alterno.

#### FA06 – Selección de Tipo de Servicio
1. El usuario selecciona el dropdown y muestra las opciones: Consulta Médica, Laboratorio, Control / Seguimiento.
2. El usuario selecciona una de las tres opciones.
3. Fin de flujo alterno.

#### FA07 – Selección de Tipo de Clínica / Área - Laboratorio
1. El usuario selecciona su clínica (Consulta Externa, Medicina General) o su examen de laboratorio.
2. Fin de flujo alterno.

#### FA08 – Paciente No Accede a Pagar
1. El paciente no puede o se niega a realizar el pago en línea.
2. El sistema cancela la cita generada y libera el espacio en el calendario.
3. El sistema registra el evento como *"Cita Cancelada por Falta de Pago"*.
4. Fin del flujo alterno.

---

## CU 01 – Registro de Pacientes

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe el proceso presencial mediante el cual el Personal de Salud recibe al paciente en el hospital, verifica su registro en el sistema mediante DPI, crea su perfil con contraseña temporal si es nuevo, agenda la cita correspondiente y genera un voucher de pago para que el paciente cancele en la Caja.

**1.2 Objetivo:**  
Registrar al paciente de forma presencial, validando su identidad mediante DPI, recolectando su información personal, asignando credenciales de acceso temporales al portal y generando la orden de pago correspondiente para su cancelación en caja.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Personal de Salud (Usuario Interno):** Responsable de recibir al paciente, verificar su registro, crear el perfil si es nuevo y agendar la cita.
- **2.1.2 Paciente (Usuario Externo):** Persona que se presenta presencialmente al hospital para registrarse y agendar cita.
- **2.1.3 Sistema Informático:** Plataforma que gestiona el registro, la cita y la generación del voucher.

#### 2.2 Precondiciones
- El servidor de alojamiento web debe estar operativo.
- El sistema debe encontrarse activo.
- Debe tener conexión a la base de datos.
- La información mostrada debe estar actualizada.
- El paciente se presenta presencialmente al hospital.

#### 2.3 Flujo Normal Básico

1. El usuario interno da clic en el botón **Ingresar**.
2. El sistema muestra el formulario de Iniciar Sesión. `[FA01]`
3. El usuario interno ingresa su login y su contraseña.
4. El sistema verifica credenciales. `[RN-1]` `[RN-2]` `[RN-9]`
5. El sistema muestra dashboard principal para el personal.
6. El usuario interno se dirige a la pestaña **Recepción**.
7. El sistema muestra un formulario para Identificar por DPI.
8. El usuario interno solicita e ingresa el DPI del paciente y da clic en **Buscar**.
9. El sistema valida que no exista el DPI en la base de datos. `[RN-10]` `[FA02]`
10. El sistema muestra: *"DPI no encontrado — complete los datos para registrar al paciente"*.
11. El usuario interno da clic al botón **Registrar**.
12. El sistema muestra un formulario para registrar nuevo paciente.
13. El usuario interno solicita los datos:
    - Nombres
    - Apellidos
    - Fecha de nacimiento (dd/mm/aaaa)
    - Teléfono
    - Correo electrónico
    - Dirección
    - Seguro médico
    - N.° de Póliza (Opcional)
14. El sistema valida la información ingresada; si es válida crea el registro del nuevo paciente.
15. El sistema muestra una nueva ventana indicando:
    - Paciente registrado exitosamente.
    - Credenciales generadas y enviadas al correo (se muestra usuario y contraseña temporal).
    - Botón: **Nuevo Paciente**.
16. Fin del flujo normal.

### 2.4 Flujos Alternos

#### FA01 – Credenciales Incorrectas
1. El sistema detecta que las credenciales ingresadas son incorrectas.
2. El sistema despliega: *"Usuario o contraseña inválidos"*.
3. Fin de flujo alterno.

#### FA02 – Ver y Editar
1. El sistema muestra que el paciente consultado existe en la base de datos.
2. El usuario interno da clic en el botón **Ver y Editar**.
3. El sistema muestra la información registrada del paciente y permite su edición.
4. El usuario interno edita la información y da clic en **Guardar cambios**.
5. El sistema valida la información y muestra:
   - *"Datos actualizados correctamente."*
   - Botón: **Nuevo Paciente**.
6. Fin del flujo alterno.

### 2.5 Postcondiciones
- El paciente queda registrado o identificado correctamente en el sistema.
- Si es nuevo paciente, se ha creado su perfil con contraseña temporal de acceso al portal.

---

## CU 02 – Mantenimiento de Usuario

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe la gestión administrativa integral de los usuarios del sistema y la configuración operativa del flujo de atención. Abarca la creación de nuevos usuarios, edición de información del personal, asignación y reasignación dinámica de médicos a clínicas, configuración de horarios médicos, y parametrización de notificaciones visuales y auditivas para el llamado de pacientes.

**1.2 Objetivo:**  
Administrar de forma centralizada el registro, acceso y distribución del personal hospitalario, garantizando cobertura médica óptima y control de los sistemas de notificación audiovisual.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Usuario Interno (Administrador):** Responsable de la logística y asignación de personal.
- **2.1.2 Sistema Informático:** Gestiona la base de datos de usuarios y la relación Médico-Clínica.

#### 2.2 Precondiciones
- El administrador debe haber iniciado sesión correctamente. `[RN-9]`
- Las clínicas deben estar creadas previamente en el sistema.
- El sistema debe encontrarse activo.

#### 2.3 Flujo Normal Básico

1. El sistema muestra Dashboard con el menú desplegable:
   - Dashboard
   - Pacientes
   - Monitoreo de Cola
   - Personal
   - Reportería
   - Pantalla de Llamado
2. El administrador ingresa a la pestaña **Personal**. `[FA-1]`
3. El sistema muestra la ventana de Gestión de Personal. `[FA-2]` `[FA-3]` `[FA-4]` `[FA-5]`
4. El usuario interno en la ventana **Nuevo Usuario** ingresa datos para un nuevo registro. `[RN-1]` `[RN-2]` `[RN-11]`
5. El usuario interno selecciona el rol del nuevo usuario.
6. El sistema muestra un mensaje con el rol seleccionado; si es personal de salud, despliega el campo N.° Colegiado.
7. El usuario interno da clic en **Guardar Usuario** o en **Limpiar** para reingresar datos.
8. El sistema valida los datos ingresados. `[FA-6]`
9. El sistema crea el nuevo usuario y muestra: *"Usuario creado exitosamente"*.
10. Fin de flujo normal.

### 2.4 Flujos Alternos

#### FA-1: Paciente
1. El usuario ingresa a la pestaña **Pacientes**.
2. El sistema muestra los pacientes registrados con filtro de búsqueda y botón **Registrar Paciente**.
3. El usuario da clic al botón Registrar Paciente.
4. Continúa en CU 01 – Registro de Pacientes.

#### FA-2: Personal Registrado
1. El sistema despliega el listado completo del personal registrado (nombre, rol, N.° colegiado, Área/Clínica, Acciones).
2. El usuario interno elige a un usuario específico del listado.
3. El sistema habilita: **Editar Información**, **Desactivar Usuario** y (si es médico) **Asignar/Reasignar Clínica**.
4. El administrador selecciona la acción:
   - **Editar Información:** Modifica los campos requeridos y guarda. El sistema actualiza los datos.
   - **Desactivar Usuario:** Confirma la desactivación. El sistema cambia el estado a *"Inactivo"* y revoca credenciales.
   - **Asignar o Reasignar Clínica:** Selecciona la nueva clínica. El sistema valida capacidad y unicidad. Actualiza en tiempo real.
5. El sistema muestra mensaje de confirmación de la acción realizada.
6. Fin del flujo alterno.

#### FA-3: Reasignar Clínica
1. El administrador selecciona **Reasignar clínica** en el perfil del médico.
2. El sistema despliega una ventana modal *"Reasignar Clínica"* con lista desplegable: Consulta Externa, Medicina General, Emergencias.
3. El administrador elige una acción:
   - **Confirmar cambio:** Selecciona clínica y da clic en Confirmar. El sistema valida `[RN-12]` `[RN-14]`, guarda cambios y actualiza la cola en tiempo real. `[RN-13]`
   - **Desasignar:** El sistema retira al médico de su clínica actual y lo deja sin asignación activa.
   - **Cancelar:** El sistema cierra la modal sin aplicar cambios.
4. Fin del flujo alterno.

#### FA-4: Asignación de Horarios
1. El usuario interno ingresa a **Personal** → **Horarios por Médico** o **Horarios Laboratorio**.
2. El sistema despliega una vista con lista desplegable para seleccionar Médico o Laboratorio.
3. El usuario selecciona el campo deseado.
4. El sistema carga un calendario interactivo. Los días con horario asignado se marcan con un punto.
5. El usuario elige configurar para un día específico o un patrón recurrente:
   - **Día específico:** Selecciona un día → sistema muestra campos de Hora de Inicio, Hora Fin, Almuerzo inicio, Almuerzo fin → da clic en **Aplicar a 1 día(s)** → sistema guarda y marca el día.
   - **Patrón semanal recurrente:** Selecciona Día de semana, horas y almuerzo → da clic en **Agregar patrón semanal** → sistema guarda la regla cíclica y aplica a semanas futuras.
6. Fin del flujo alterno.

#### FA-5: Notificaciones
1. El Usuario Interno selecciona la pestaña **Notificaciones** dentro de Gestión de Personal.
2. El sistema despliega la ventana **Configuración de Notificaciones** con dos secciones:
   - **Notificaciones Visuales:**
     - Interruptor: *Activar pantalla de llamado*. `[RN-15]`
     - Campo numérico: *Tiempo de visualización del llamado* (en segundos).
   - **Notificaciones Auditivas:**
     - Interruptor: *Activar sistema de audio*. `[RN-16]`
     - Barra deslizante: *Volumen del audio* (0% a 100%).
     - Lista desplegable: *Tipo de alerta*.
     - Campo numérico: *Repeticiones del llamado*.
     - Botón: **Probar audio**.
3. El sistema guarda cualquier cambio de forma automática e inmediata. `[RN-17]`
4. Fin del flujo alterno.

#### FA-6: Credenciales Incorrectas
1. El sistema detecta que las credenciales ingresadas son incorrectas.
2. El sistema despliega: *"Ingrese credenciales válidas"*.
3. Fin de flujo alterno.

### 2.5 Postcondiciones
- El médico queda correctamente asignado a una única clínica activa.
- El sistema actualiza las colas de atención en tiempo real.
- Se mantiene coherencia entre clínica y disponibilidad.

---

## CU 03 – Gestión de Citas y Pagos

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe el proceso integral de atención presencial: verificación de identidad del paciente, agendamiento de citas médicas, consolidación de cobros (consultas, laboratorios y emergencias), aplicación de descuentos por seguros, generación de factura electrónica, toma obligatoria de signos vitales y activación del sistema de llamado visual y auditivo.

**1.2 Objetivo:**  
Gestionar de manera unificada el flujo administrativo, financiero y clínico inicial del paciente.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Usuario Interno (Cajero):** Verifica el registro del paciente, agenda la cita, toma signos vitales y gestiona el proceso presencial.
- **2.1.2 Usuario Externo (Paciente):** Persona que se presenta al hospital para agendar cita o que ya la agendó previamente en línea.
- **2.1.3 Usuario Interno (Médico):** Recibe al paciente en la clínica asignada y confirma su llegada.
- **2.1.4 Sistema Informático:** Gestiona disponibilidad, asignación, cobro, cola de pacientes y notificaciones.

#### 2.2 Precondiciones
- El sistema debe estar operativo y conectado a la base de datos.
- El calendario de citas debe estar actualizado y debe existir al menos un médico con disponibilidad activa.
- Los precios de los servicios deben estar preconfigurados como valores fijos.
- El usuario interno debe estar autenticado. `[RN-9]`
- El paciente se presenta físicamente en el hospital.
- El cobro y la toma de signos vitales deben solventarse antes de habilitar al paciente para consulta.

#### 2.3 Flujo Normal Básico

1. El sistema muestra el Dashboard del usuario interno (Cajero) con el menú:
   - Dashboard
   - Pacientes `[FA-01]`
   - Monitoreo de Cola `[FA-02]`
   - Caja / Pagos
2. El usuario interno da clic a la pestaña **Caja/Pagos**.
3. El sistema muestra la ventana **Caja y Facturación** en la pestaña **Citas Presenciales**, con pestañas adicionales:
   - Laboratorios `[FA-03]`
   - Emergencias `[FA-04]`
   - Reagendar Cita `[FA-05]`
4. El usuario interno ingresa el DPI del usuario externo y da clic en **Buscar**. `[RN-10]`
5. El sistema valida que exista el DPI y muestra nombre, código y teléfono. `[FA06]`
6. El usuario interno da clic en **Ver y Editar**.
7. El sistema muestra el formulario con la información del usuario externo con opción a editar.
8. El usuario interno da clic al botón **Guardar y Continuar**. `[FA07]`
9. El sistema actualiza la información y muestra **Paso 3 - Seleccionar Cita** con un calendario interactivo.
10. El usuario interno selecciona Tipo de Servicio, Área, día y hora. `[RN-3]` `[RN-18]` `[RN-5]`
11. El sistema muestra el horario reservado e inicia un contador de 10 min.
12. El usuario da clic al botón **Continuar al Pago**. `[FA07]`
13. El sistema muestra el **Paso 4 - Cobro** con resumen del usuario externo, el contador, opción de adjuntar documentos y selección de método de pago. `[FA08]`
14. El usuario interno selecciona el método de pago.
15. Usuario da clic a **Tarjeta (POS)**. `[FA09]`
16. Usuario da clic al botón **Cobrar con POS**.
17. El sistema valida el pago realizado.
18. El sistema muestra mensaje *"Cita Registrada y Pagada"* con tabla de resumen y botón **Nueva Cita**.
19. El sistema genera un Ticket de atención correlativo y asigna al médico y clínica según la reserva.
20. El sistema actualiza el estado del paciente a *"En Espera"* y lo muestra en el monitor de triaje.
21. Fin de Caso de Uso.

### 2.4 Flujos Alternos

#### FA01 - Pacientes
1. Sistema muestra pestaña de pacientes.
2. Sistema muestra botón de **Registrar Paciente** (opcional). `[CU-01, paso 2.3.8]`
3. El sistema da la opción de buscar pacientes por DPI o desde el listado.
4. Fin del flujo alterno.

#### FA02 - Monitoreo de Cola
1. El usuario interno da clic a **Monitoreo de Cola**.
2. El Sistema muestra la pestaña con las sub-pestañas: Cola, Personal, Completados.
3. El usuario en la pestaña Cola da clic en **Llamar Siguiente Paciente**.
4. El sistema llama por formato visual y auditivo al usuario externo. `[RN-15]` `[RN-16]`
5. Fin del flujo alterno.

#### FA03 - Laboratorios
1. Usuario da clic a la pestaña **Laboratorios**.
2. Sistema muestra Paso 1 - Identificar paciente con campo de DPI.
3. El usuario ingresa el DPI y da clic en **Buscar**. El sistema valida. `[FA06]`
4. El usuario da clic en **Ver y Editar**.
5. El sistema muestra el formulario con la información registrada con opción a editar.
6. El usuario da clic en **Guardar y Continuar**.
7. El sistema muestra los exámenes de laboratorio por Referencia Médica, dropdown de laboratorios, área de laboratorio y calendario interactivo.
8. El usuario selecciona laboratorios y fecha.
9. El sistema despliega los horarios disponibles.
10. El sistema valida la selección y reserva por 10 min.
11. El usuario da clic en **Continuar al Pago**.
12. Fin del flujo alterno. Continúa con el paso 2.3.13.

#### FA04 - Emergencias
1. Usuario da clic a la pestaña **Emergencias**.
2. El sistema muestra las emergencias disponibles para cobrar.
3. El usuario da clic al botón **Cobrar**.
4. El sistema muestra un formulario de cobro con: Nombre del Paciente, DPI, Motivo, Registrado, monto y métodos de pago.
5. El usuario ingresa el monto y selecciona el método de pago.
6. Fin de flujo alterno. Continúa con el paso 2.3.15.

#### FA05 - Re-Agendar Cita
1. Usuario da clic a la pestaña **Re-agendar Cita**.
2. El sistema muestra filtro de búsqueda por DPI.
3. El usuario ingresa el DPI y da clic en **Buscar**.
4. El sistema muestra el nombre del usuario externo, su DPI y las citas en las que fue marcado ausente.
5. El usuario da clic a la cita marcada como ausente.
6. El sistema despliega el calendario interactivo de fechas disponibles.
7. El usuario externo elige el horario disponible.
8. El sistema valida la selección y reserva por 10 min.
9. El usuario interno da clic en **Confirmar Reagendamiento**.
10. El sistema reagenda la cita y muestra: *"Cita reagendada correctamente"*, eliminándola de las citas marcadas ausentes.
11. Fin de flujo alterno.

#### FA06: Registro de Nuevo Paciente
1. El sistema no encuentra el DPI en la base de datos. Muestra: *"DPI no encontrado — complete los datos para registrar al paciente"*.
2. El usuario interno da clic al botón **Registrar**.
3. Sistema muestra formulario de Registrar Nuevo Paciente.
4. El usuario llena el formulario y da clic en **Guardar**.
5. Fin de flujo alterno.

#### FA07: Botón Anterior
1. El usuario da clic al botón **Anterior**.
2. El sistema redirige al paso o pantalla inmediatamente anterior del flujo.
3. El sistema mantiene los campos completados anteriormente.
4. Fin del flujo alterno.

#### FA08: Adjuntar Documentos
1. El usuario externo indica que desea adjuntar documentos (Laboratorios).
2. El sistema habilita la carga de archivos PDF.
3. El usuario interno adjunta el documento.
4. El sistema valida formato y tamaño. `[RN-6]`
   - Si son válidos, los vincula al expediente digital.
   - Si no son válidos, muestra advertencia y permite reintentar.
5. Fin del flujo alterno.

#### FA09: Pago en Efectivo
1. Usuario selecciona **Efectivo**.
2. Usuario ingresa el Efectivo Recibido.
3. Sistema calcula el vuelto y lo muestra en pantalla.
4. Usuario da clic al botón **Confirmar Pago en Efectivo**.
5. Fin del flujo alterno.

### 2.5 Postcondiciones
- El paciente queda con una cita activa, médico y clínica asignados.
- La orden de pago ha sido generada y solventada.
- El voucher de cita ha sido impreso para el paciente.
- Los signos vitales han sido tomados y registrados en el sistema.
- El paciente ha sido llamado por pantalla con notificación visual y auditiva.
- El sistema mantiene trazabilidad de tiempos de espera y atención.
- Si aplica, los documentos de laboratorio quedan vinculados al expediente.

---

## CU 04 – Toma de Signos Vitales

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe el proceso técnico y clínico mediante el cual el personal de salud recolecta y registra los parámetros fisiológicos básicos del paciente (presión arterial, frecuencia cardíaca, temperatura, peso, etc.) después de que este ha solventado su pago o confirmado su cita, pero antes de ser atendido por el médico.

**1.2 Objetivo:**  
Cuantificar el estado fisiológico actual del paciente y cargar dicha información al expediente digital en tiempo real, permitiendo que el médico tratante cuente con datos clínicos actualizados al iniciar la consulta.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Usuario Interno (Personal de Salud):** Enfermero o técnico encargado de recibir al paciente, realizar las mediciones físicas y registrar manualmente los datos en el sistema.
- **2.1.2 Sistema Informático:** Recibe los datos, los valida según rangos normales y los vincula al número de ticket y expediente del paciente.

#### 2.2 Precondiciones
- El paciente debe haber completado satisfactoriamente el flujo de Registro y Pago, contando con un ticket de atención activo.
- El Personal de Salud debe estar autenticado en el sistema.
- El sistema debe mostrar al paciente en la lista de *"Pacientes en área de signos vitales"*.
- El equipo físico de medición debe estar disponible en la estación de enfermería.
- Debe existir conexión activa a la base de datos.

#### 2.3 Flujo Normal Básico

1. El sistema muestra Dashboard con el menú:
   - Dashboard
   - Pacientes
   - Monitoreo de Cola
   - Recepción
   - Emergencias
   - Pantalla de Llamado
2. El usuario interno da clic a la opción **Monitoreo de Cola**.
3. El sistema muestra la pantalla Monitoreo de Cola con las pestañas: Cola, Persona, Completados.
4. El usuario dentro de la pestaña Cola despliega la lista de clínicas y da clic a la clínica de su interés.
5. El sistema habilita el botón **Llamar siguiente paciente**. `[RN-29]` `[RN-30]`
6. El usuario da clic al botón **Llamar siguiente paciente**. `[RN-15]` `[RN-16]`
7. El usuario da clic a la pestaña **Recepción** del menú desplegable.
8. El sistema muestra la información de Personal de Salud con opciones:
   - Recepción
   - Signos Vitales
   - Cola del Día `[RN-22]` `[RN-24]`
9. El usuario ingresa a **Signos Vitales**. `[FA01]` `[FA02]`
10. El sistema muestra la pantalla de signos vitales con listado de todos los pacientes pendientes y los botones **Tomar Signos Vitales** y **Ausente**. `[FA03]`
11. El usuario da clic al botón **Tomar Signos Vitales**.
12. El sistema despliega formulario de signos vitales: Presión Arterial, Frec. Cardíaca, Temperatura, Peso, Talla, Saturación.
13. El usuario ingresa los valores del paciente dentro del formulario. `[FA04]`
14. El usuario da clic al botón **Registrar y Enviar a Médico**.
15. El sistema registra los signos vitales y muestra mensaje: *"[Nombre paciente] ha sido enviado al consultorio"*.
16. Fin del Flujo.

### 2.4 Flujos Alternos

#### FA01: Recepción Walk-in
1. El usuario ingresa a la pestaña **Recepción**.
2. El sistema muestra el formulario para ingreso de DPI del Paciente.
3. Continúa con el CU 03 – Generación de Citas en el paso 2.3.4.

#### FA02: Cola del Día
1. El usuario ingresa a la pestaña **Cola del día**.
2. El sistema muestra un resumen de todos los pacientes que han pasado por toma de signos vitales con sus estados (En espera, Listo para Médico, Ausente).

#### FA03: Paciente Ausente
1. El paciente no se presenta; el usuario da clic en el botón **Ausente**.
2. El sistema asigna al paciente como ausente e inicia el proceso de agendamiento en su portal web. `[RN-23]`

#### FA04: Toma de Muestras para Laboratorio
1. El usuario da clic al botón **Registrar y Enviar**.
2. El sistema muestra en pantalla *Recolección de Muestra (nombre del paciente)* con el nombre del laboratorio.
3. El usuario da clic al botón **Muestra Recolectada - Enviar a Lab** tras haber recolectado las muestras. `[FA03]`
4. El sistema muestra: *"Muestra [Código de muestra] enviada a laboratorio"* y limpia la pantalla.

### 2.5 Postcondiciones
- El estado del paciente cambia de *"Pendiente de Signos Vitales"* a *"Listo para Médico"*.
- Los valores de signos vitales quedan vinculados permanentemente al expediente digital del paciente y son visibles de forma inmediata en el portal del médico.
- El sistema habilita al paciente en la cola de reproducción para el monitor de sala de espera.
- El sistema registra la hora exacta de la toma y el usuario (Personal de Salud) que realizó el procedimiento.

---

## CU 05 – Consulta Médica

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe la gestión de la cola de pacientes en sala de espera y el mecanismo automático de notificación visual y auditiva cuando el médico llama al siguiente paciente.

**1.2 Objetivo:**  
Garantizar el llamado ordenado, sincronizado y controlado de los pacientes hacia su clínica asignada, optimizando el flujo y reduciendo tiempos de espera.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Usuario Interno (Médico):** Activa el llamado del siguiente paciente desde su portal, recibe reporte de signos vitales, procesa consulta, diagnóstico y receta médica.
- **2.1.2 Usuario Externo (Paciente):** Receptor de la notificación (por pantallas y audio en ventana emergente en otra pantalla).
- **2.1.3 Sistema Informático:** Gestiona la lógica de la cola y las notificaciones.

#### 2.2 Precondiciones
- El paciente debe haber completado el CU 01 (Registro) y pasado por la toma de signos vitales.
- El médico debe estar asignado a una clínica mediante el CU 02 (Mantenimiento de Usuario).
- Los monitores y sistemas de audio en las salas de espera deben estar encendidos y conectados.

#### 2.3 Flujo Normal Básico

1. El sistema muestra Dashboard con el menú:
   - Dashboard
   - Pacientes
   - Monitoreo de Cola
   - Consulta Médica
2. El usuario da clic a la pestaña **Consulta Médica**.
3. El sistema muestra las consultas activas, la cola de espera, Citas del Día, Calendario de Citas y un botón interactivo para cambiar estado entre **No disponible** y **Disponible**.
4. El usuario visualiza la cola de espera de pacientes para su clínica (nombre del paciente y signos vitales registrados).
5. El médico da clic en el botón **Llamar al Consultorio**.
6. El sistema valida que el médico no tenga una consulta activa en proceso. `[RN-25]`
7. El sistema selecciona al siguiente paciente según orden cronológico o prioridad de urgencia. `[RN-22]`
8. El sistema cambia el estado del paciente a *"Siendo Llamado"*.
9. El sistema activa simultáneamente:
   - Notificación visual en pantalla emergente (Ticket y Clínica).
   - Mensaje de voz automatizado. `[RN-26]`
10. El usuario confirma la llegada del paciente dando clic en **Iniciar Consulta**. `[FA01]`
11. El sistema cambia el estado a *"En consulta"* e inicia la consulta médica.
12. El sistema muestra formulario de Diagnóstico y Receta, Medicamentos y Órdenes de Laboratorio.
13. El usuario puede ver los documentos adjuntos en el área **Documentos del Paciente** si existen.
14. El usuario atiende al paciente y realiza el diagnóstico, llenando la caja de texto de **Diagnóstico**. `[FA02]` `[FA03]`
15. El usuario registra el diagnóstico y la receta dando clic en **Completar Consulta**.
16. El sistema muestra un mensaje emergente: *"Consulta completada, notificación enviada al paciente."* y *"Receta generada, Laboratorio Generado"* (si se asignaron medicamentos y laboratorio).
17. El sistema envía la receta por correo.
18. Fin del caso de uso.

### 2.4 Flujos Alternos

#### FA01: Paciente Ausente
1. El paciente no se presenta a consulta médica; el usuario da clic en el botón **Ausente**.
2. El sistema asigna al paciente como ausente e inicia el proceso de agendamiento en su portal web. `[RN-23]`
3. El usuario puede llamar al siguiente paciente en la lista.

#### FA02: Agregar Medicamento
1. El usuario da clic en **Agregar medicamento**:
   - El sistema despliega lista desplegable de medicamentos, cantidad y dosificación.
2. O da clic en **Agregar medicamento Externo**:
   - El sistema despliega campo de texto para nombre del medicamento, cantidad y dosificación.
3. Fin de flujo alterno.

#### FA03: Agregar Orden de Laboratorio
1. El usuario da clic en **Agregar Orden de Laboratorio**.
2. El sistema despliega formulario con lista desplegable del laboratorio y caja de texto para notas.
3. El usuario selecciona el examen de laboratorio y agrega notas si es necesario.
4. Fin del flujo alterno.

### 2.5 Postcondiciones
- El paciente es notificado correctamente.
- Se mantiene el orden de la cola.
- El sistema conserva trazabilidad de tiempos de espera y consulta.
- La sincronización entre audio y video queda registrada.

---

## CU 06 – Atención de Emergencia

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe el proceso de atención prioritaria a pacientes que ingresan por el área de emergencias del hospital, ya sea de forma directa o derivados desde otro módulo del sistema, garantizando una respuesta inmediata y coordinada.

**1.2 Objetivo:**  
Gestionar la atención de pacientes en situación de emergencia con criterios de prioridad, asegurando el registro correcto del ingreso, la asignación inmediata de médico y clínica, y la trazabilidad completa del evento.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Personal de Salud (Usuario Interno):** Responsable de recibir al paciente, tomar signos vitales y registrar el ingreso de emergencia.
- **2.1.2 Cajero (Usuario Interno):** Responsable de manejar el cobro de emergencia.
- **2.1.3 Médico (Usuario Interno):** Atiende al paciente de emergencia y registra diagnóstico y receta.
- **2.1.4 Paciente (Usuario Externo):** Personal que es atendida.
- **2.1.5 Sistema Informático:** Gestiona la validación, asignación y trazabilidad del proceso.

#### 2.2 Precondiciones
- El sistema debe estar operativo y conectado a la base de datos central.
- El área de emergencias debe estar activa y con al menos un médico disponible.
- El personal de salud debe estar autenticado en el sistema. `[RN-9]`
- Los monitores de sala de espera deben estar sincronizados.

#### 2.3 Flujo Normal Básico

1. El sistema muestra el Dashboard del usuario interno (personal de salud) con el menú:
   - Dashboard
   - Paciente
   - Monitoreo de Cola
   - Recepción
   - Emergencias
   - Pantalla de Llamado
2. El usuario interno da clic a la pestaña **Emergencias**.
3. El sistema muestra la pantalla **Atención de Emergencia** en la pestaña **Nueva Emergencia**, con pestañas:
   - Nueva Emergencia
   - Reportes de Emergencia `[FA01]`
   - Cola de Emergencias `[FA02]`
4. El usuario interno ingresa el DPI del Paciente y da clic en **Buscar en Sistema**.
5. El sistema valida el DPI en la base de datos.
6. El sistema muestra en pantalla los datos del usuario externo. `[FA03]`
7. El usuario interno da clic al botón **Continuar con paciente identificado**.
8. El sistema muestra el nombre del paciente identificado y un cuadro de texto para ingresar el **Motivo de Emergencia**. `[FA04]`
9. El usuario interno ingresa el motivo y da clic al botón **Continuar → Signos Vitales**.
10. El sistema muestra los signos vitales a registrar: Presión Arterial, Frecuencia cardíaca, Temperatura, Peso, Talla, SpO2.
11. El usuario interno ingresa los resultados y da clic al botón **Activar Emergencia**. `[FA04]`
12. El sistema activa la Emergencia para orden de pago y muestra: *"Emergencia Activada"*, el ticket, clínica, botón **Nueva emergencia**. Incluye la leyenda: *"Orden de pago enviada a Caja — el cajero debe procesar el cobro para activar la cola de emergencias."*
13. El cobro de emergencia continúa con el CU 08 - Pagos.
14. Una vez que el Cajero confirma el pago, el sistema cambia el estado del paciente a *"Pagado"*.
15. El sistema activa automáticamente la Pantalla de Llamado con notificación visual y auditiva (Ticket y Clínica). `[RN-15]` `[RN-16]`
16. El Usuario Interno (Médico de Emergencia) inicia sesión en su portal administrativo. `[RN-9]` `[RN-27]`
17. El médico identifica al paciente y visualiza el resumen: Turno, Nombre, DPI, Motivo de Emergencia y Signos Vitales.
18. El usuario interno da clic al botón **Reporte de Paciente**.
19. El sistema despliega el formulario de reporte médico con tres campos obligatorios: Diagnóstico, Tratamiento y Medicamentos Indicados.
20. El usuario interno completa la información y da clic al botón **Cerrar Reporte**.
21. El sistema valida el registro, guarda los datos en el expediente y muestra: *"Reporte cerrado exitosamente"*.
22. El sistema actualiza el estado del ticket a *"Reporte Cerrado"* (indicador verde) y envía automáticamente una copia del reporte al correo electrónico del paciente.
23. Fin del caso de uso.

### 2.4 Flujos Alternos

#### FA01 - Reportes de Emergencia
1. El usuario da clic a la pestaña **Reportes de Emergencia**.
2. El sistema muestra en pantalla los Reportes de Emergencia en orden cronológico con la información: Estado, Nombre del Paciente, DPI, fecha de registro, motivo de emergencia, y dos botones: **Completar datos y crear cuenta** y **Cancelar**.
3. El usuario da clic a **Completar datos y crear cuenta**.
4. El sistema despliega formulario de registro: Nombres, Apellidos, DPI, correo electrónico, teléfono, dirección. Con la leyenda: *"Se enviará usuario y contraseña temporal al correo del paciente."*
5. El usuario llena los campos y da clic en **Completar datos y crear cuenta**.
6. El sistema registra los datos, muestra: *"Paciente registrado. Credenciales enviadas al correo"* y cambia el estado a *Registrado*.

#### FA02 - Cola Emergencia
1. El usuario da clic a la pestaña **Cola de Emergencia**.
2. El sistema muestra los pacientes esperando atención en orden de listado con el botón **Paciente atendido**.
3. El usuario da clic en **Paciente Atendido**.
4. El sistema muestra: *"Paciente marcado como atendido"* y lo quita de la lista de espera.

#### FA03 - Paciente No Registrado
1. El sistema verifica que el DPI ingresado no pertenece a ningún usuario externo.
2. El usuario da clic al botón **Registrar sin Identificar**.
3. El sistema muestra en pantalla el formulario de registro mínimo de datos.
4. El usuario interno registra los datos disponibles y el motivo de emergencia (obligatorio) y da clic en **Continuar → Signos Vitales**.
5. Fin de flujo alterno. Continúa con el paso 2.3.9.

#### FA04: Botón Anterior
1. El usuario da clic al botón **Anterior**.
2. El sistema redirige al paso o pantalla inmediatamente anterior del flujo.
3. El sistema mantiene los campos completados anteriormente.

### 2.5 Postcondiciones
- Los signos vitales, diagnóstico y tratamiento quedan vinculados permanentemente al historial de emergencias del paciente.
- El ticket de emergencia queda marcado como *"Reporte Cerrado"* y se libera el cupo en la clínica de emergencias.
- El paciente cuenta con su receta y reporte médico en su buzón de correo electrónico.
- El evento de emergencia queda conciliado con el pago realizado en Caja.

---

## CU 07 – Laboratorio

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe la gestión de órdenes de exámenes de laboratorio, ya sean realizados inmediatamente después de consulta médica o programados para una fecha posterior, incluyendo la notificación electrónica de resultados.

**1.2 Objetivo:**  
Registrar, programar y procesar órdenes de laboratorio, garantizando que el paciente sea notificado oportunamente sobre la disponibilidad de sus resultados.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Usuario Interno (Tec. de Laboratorios):** Encargado de recibir reporte de signos vitales, procesar muestras médicas y enviar resultados.
- **2.1.2 Usuario Externo (Paciente):** Recibe el servicio y la notificación.
- **2.1.3 Sistema Informático:** Administra órdenes, estados y notificaciones electrónicas.

#### 2.2 Precondiciones
- El paciente debe tener una orden de laboratorio activa emitida por un médico (Orina, Heces, Sangre, Hisopado Nasal, Tejido o Células cervicales) enviada a su correo.
- El paciente realizó su cita para laboratorios en el portal web o presencial.
- El correo electrónico del paciente debe estar registrado y validado.
- El técnico debe haber iniciado sesión correctamente. `[RN-9]`
- El paciente solventa la boleta de pago de laboratorios.

#### 2.3 Flujo Normal Básico

1. El sistema muestra el Dashboard del usuario interno (Tec. Laboratorio) con el menú:
   - Dashboard
   - Pacientes `[FA-01]`
   - Monitoreo de Cola `[FA-02]`
   - Laboratorio
2. El usuario da clic a **Laboratorio**.
3. El sistema muestra la vista de laboratorio con las pestañas:
   - Pendientes
   - Completadas `[FA-03]`
   - Catálogo
4. El sistema muestra la lista de pendientes de forma predeterminada con la información del paciente para laboratorio y un botón para **Adjuntar los resultados de laboratorio**.
5. El usuario da clic a **Adjuntar resultados**.
6. El sistema despliega un área para adjuntar el PDF y un cuadro de texto para escribir notas (con la leyenda: *"Se enviará el PDF al correo registrado"*).
7. El usuario adjunta el PDF, agrega notas y da clic al botón **Guardar y enviar al paciente**.
8. El sistema muestra: *"Registrado PDF enviado"* y borra el registro de la pestaña de pendientes, cambiando el estado a completado.
9. Fin del flujo normal básico.

### 2.4 Flujos Alternos

#### FA01 – Pacientes en Laboratorio
1. Sistema muestra pestaña de pacientes.
2. Sistema muestra botón de registrar Paciente (opcional). `[CU-01, paso 2.3.8]`
3. El sistema da la opción de buscar pacientes por DPI o desde el listado.

#### FA02 – Monitoreo de Cola Laboratorio
1. El Sistema muestra la pestaña de Monitoreo de cola.
2. Sistema muestra opción de Filtrar por clínica.
3. Usuario selecciona la clínica que desea ver en cola.
4. El sistema muestra las citas en cola.
5. Usuario da clic a **Pantalla de sala**, el sistema despliega un modal con el eslogan BioCore Medical y la cola de llamado de pacientes.

#### FA03 – Laboratorio con Estado Completado
1. Usuario selecciona **Completadas** dentro de la pestaña laboratorio.
2. Sistema muestra listado de los laboratorios con estados completos con los documentos PDF.

### 2.5 Postcondiciones
- La orden queda correctamente registrada y procesada.
- El paciente recibe notificación electrónica.
- El estado del examen queda actualizado en el expediente digital.
- Se mantiene trazabilidad de vigencia y entrega.

---

## CU 08 – Farmacia

### 1. Introducción

**1.1 Definición:**  
Este caso de uso describe el proceso de despacho de medicamentos en la farmacia del hospital, a partir de una receta electrónica validada generada por el médico tratante. Incluye la preparación del carrito de medicamentos, la autenticación del personal farmacéutico, la generación de la orden de pago y la entrega final de los medicamentos al paciente.

**1.2 Objetivo:**  
Garantizar el despacho correcto, seguro y trazable de los medicamentos prescritos, validando la receta electrónica, procesando el pago correspondiente y actualizando el inventario del sistema farmacéutico.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Farmacéutico (Usuario Interno):** Despacha medicina en base a receta médica y procesa el pago.
- **2.1.2 Paciente (Usuario Externo):** Persona que recibe y paga los medicamentos despachados.
- **2.1.3 Sistema Informático:** Valida la receta, procesa el pago y actualiza el inventario.

#### 2.2 Precondiciones
- Debe existir una receta electrónica enviada por el médico al sistema.
- El personal de farmacia debe estar autenticado en el sistema. `[RN-9]`
- Los medicamentos indicados deben estar disponibles en el inventario de farmacia. `[RN-28]`

#### 2.3 Flujo Normal Básico

1. El sistema muestra el Dashboard del usuario interno (Farmacéutico) con el menú:
   - Pacientes `[FA01]`
   - Farmacia
2. El usuario interno da clic al botón **Farmacia**.
3. El sistema muestra en pantalla la **Farmacia** en la pestaña **Venta Libre** de forma predeterminada, con las pestañas:
   - Venta Libre
   - Despacho con Receta `[FA02]`
   - Inventario `[FA03]`
4. El usuario en la pestaña de venta libre puede seleccionar medicamentos para añadirlos al carrito.
5. El sistema añade los medicamentos al carrito y suma el total de forma automática.
6. El usuario interno ingresa el DPI del usuario externo y da clic en **Buscar**.
7. El sistema valida el DPI y muestra el nombre del usuario, código y habilita los botones para pago POS y Efectivo. `[FA04]`
8. El usuario da clic al botón **POS**. `[FA05]`
9. El sistema habilita dos botones dependiendo el tipo de tarjeta: débito o crédito.
10. El usuario da clic al tipo de tarjeta para el pago.
11. El sistema valida el pago y muestra: *"Venta Completada"*, el código, total, método y el correo donde fue enviado el comprobante de pago.
12. Fin de flujo normal básico.

### 2.6 Flujos Alternos

#### FA01 - Pacientes
1. Sistema muestra pestaña de pacientes.
2. Sistema muestra botón de registrar Paciente (opcional). `[CU-01, paso 2.3.8]`
3. El sistema da la opción de buscar pacientes por DPI o desde el listado.

#### FA02 - Despacho con Receta
1. El usuario da clic a la pestaña **Despacho con Receta**.
2. El sistema muestra el filtro de búsqueda por DPI.
3. El usuario ingresa el DPI y da clic en **Buscar**.
4. El sistema muestra las recetas disponibles para el DPI ingresado con estado PENDING.
5. El usuario selecciona una receta disponible.
6. El sistema despliega los detalles de la receta: nombre, DPI, doctor, fecha, diagnóstico y medicamentos prescritos con el valor estimado. Se muestran los botones para pago POS y Efectivo.
7. Fin del flujo alterno. Continúa con el paso 2.3.8.

#### FA03 - Inventario
1. El usuario interno da clic a la pestaña **Inventario**.
2. El sistema muestra una tabla de medicamentos con: código, medicamento, stock, precio, acciones. `[FA03.1]`
3. El usuario interno da clic al botón **Nuevo Medicamento**.
4. El sistema muestra un formulario con los campos: Código, Nombre, Presentación, Categoría, Unidad, Precio, Stock Inicial y Descripción.
5. El usuario completa el formulario y da clic en **Guardar**.
6. El sistema registra el medicamento y muestra: *"Medicamento creado"*.

**FA03.1 - Acciones**  
El usuario dispone de 3 acciones por medicamento:
- **Editar:** Modifica un medicamento creado con anterioridad.
- **Ajustar Stock:** Permite ajustar la cantidad de stock disponible.
- **Eliminar:** Desactiva el medicamento del catálogo.

#### FA04 - Registrar Nuevo Paciente
1. El sistema no encuentra el DPI en la base de datos. Muestra: *"DPI no encontrado — complete los datos para registrar al paciente"*.
2. El usuario interno da clic al botón **Registrar**.
3. Sistema muestra formulario de Registrar Nuevo Paciente.
4. El usuario llena el formulario y da clic en **Guardar**.

#### FA05: Pago en Efectivo
1. Usuario da clic a **Efectivo**.
2. Usuario ingresa el Efectivo Recibido.
3. Sistema calcula y muestra el vuelto a dar.
4. Usuario da clic al botón **Confirmar Pago en Efectivo**.

### 2.7 Postcondiciones
- Los medicamentos han sido despachados y entregados correctamente al paciente.
- El inventario de farmacia ha sido actualizado en el sistema.
- El pago queda registrado y asociado al expediente del paciente.
- El estado de la receta electrónica cambia a *"Despachada"* en el expediente clínico.
- El despacho queda trazable para efectos de reportería y auditoría.
- Actualización o Ingreso de medicamentos actualizados al inventario.

---

## CU 09 – Reportería

### 1. Introducción

**1.1 Definición:**  
Este caso de uso permite a los usuarios administrativos generar, consultar y exportar reportes estadísticos sobre la operación del hospital, consolidando información de registros, consultas, laboratorio y farmacia.

**1.2 Objetivo:**  
Proporcionar herramientas analíticas que permitan evaluar la productividad médica, el flujo de pacientes y el rendimiento operativo del hospital.

### 2. Definición del Caso de Uso

#### 2.1 Actores
- **2.1.1 Administrador (Usuario Interno):** Usuario encargado de supervisar la operación.
- **2.1.2 Sistema Informático:** Procesa datos y genera reportes dinámicos.

#### 2.2 Precondiciones
- El administrador debe estar autenticado con rol autorizado. `[RN-9]`
- Debe existir data histórica previa cargada en el sistema.

#### 2.3 Flujo Normal Básico

1. El sistema muestra el Dashboard del usuario interno (Admin) con el menú:
   - Pacientes `[FA01]`
   - Monitoreo de Cola `[FA02]`
   - Personal `[FA03]`
   - Reportería
2. El usuario da clic a la opción **Reportería**.
3. El sistema muestra la ventana **Reportería y Estadística** con las pestañas:
   - Pacientes por Área (predeterminada)
   - Ventas Farmacia `[FA04]`
   - Productividad Médica `[FA04]`
   - Exámenes de Laboratorio `[FA04]`
4. El usuario interno en la pestaña **Pacientes por Área** da clic al dropdown de **Período**.
5. El sistema despliega los períodos disponibles: Hoy, Esta Semana, Este Mes, Este Año.
6. El usuario selecciona el período de su preferencia y da clic al botón **Generar**.
7. El sistema genera en pantalla una tabla de datos: Área/Clínica, Pacientes y %, con el total de pacientes y período seleccionado.
8. El sistema muestra en pantalla el botón **Exportar PDF**.
9. El usuario interno da clic al botón **Exportar PDF**.
10. El sistema muestra una ventana emergente con la opción de guardar como PDF el reporte generado.
11. El usuario interno guarda el PDF en el lugar de su elección.
12. Fin del flujo.

### 2.4 Flujos Alternos

#### FA01 - Pacientes
1. Sistema muestra pestaña de pacientes.
2. Sistema muestra botón de registrar Paciente (opcional). `[CU-01, paso 2.3.8]`
3. El sistema da la opción de buscar pacientes por DPI o desde el listado.

#### FA02 - Monitoreo de Cola
1. El usuario interno da clic a **Monitoreo de Cola**.
2. El Sistema muestra la pestaña de Monitoreo de Cola con sub-pestañas: Cola, Personal, Completados.
3. El usuario interno puede visualizar estas pestañas.

#### FA03 - Personal
1. El usuario interno da clic a la opción **Personal** dentro del menú desplegable.
2. El sistema muestra de forma predeterminada la pestaña Personal, con pestañas adicionales: Horarios Médicos, Notificaciones. `(CU 02 – Mantenimiento de Usuario)`

#### FA04 - Reportería Áreas
1. El usuario da clic a la pestaña del área deseada (Ventas Farmacia, Productividad Médica, Exámenes de Laboratorio).
2. El sistema muestra el reporte interactivo.
3. El usuario da clic al dropdown de Período.
4. El sistema despliega los períodos disponibles: Hoy, Esta Semana, Este Mes, Este Año.
5. El usuario selecciona el período y da clic al botón **Generar**.
6. El sistema muestra una tabla del reporte de esa área.
7. El sistema muestra el botón **Exportar PDF**.
8. El usuario da clic al botón Exportar PDF.
9. El sistema muestra una ventana emergente con la opción de guardar como PDF.
10. El usuario guarda el PDF en el lugar de su elección.

### 2.5 Postcondiciones
- Los reportes reflejan información actualizada.
- Se mantiene privacidad de datos clínicos.
- Los archivos exportados quedan registrados en la bitácora del sistema.

---

## CU 10 – Reglas de Negocio

### 1. Introducción

**1.1 Definición:**  
Este caso de uso consolida todas las reglas de negocio que gobiernan el funcionamiento del sistema hospitalario, garantizando coherencia operativa, seguridad, validaciones técnicas y cumplimiento administrativo en todos los módulos.

**1.2 Objetivos:**  
Centralizar y formalizar las reglas que regulan los procesos del sistema, permitiendo su referencia desde los demás casos de uso para asegurar trazabilidad y control normativo.

### Reglas de Negocio

| ID | Nombre | Descripción |
|----|--------|-------------|
| RN-1 | Validación de contraseña | La contraseña debe tener mínimo 8 caracteres, una mayúscula y una minúscula. |
| RN-2 | Validación de usuario | Debe tener mínimo 4 caracteres sin espacio; puede incluir letras y números. |
| RN-3 | Selección obligatoria de tipo de servicio | Consulta médica, control de seguimiento, laboratorio. |
| RN-4 | Selección obligatoria de clínica | No puede generarse una cita sin que el Personal de Salud seleccione la clínica destino correspondiente. |
| RN-5 | Selección obligatoria de fecha y hora | Solo se pueden agendar fechas y horas futuras siempre que haya un doctor asignado al área, en horarios disponibles del hospital. |
| RN-6 | Archivos válidos con extensión PDF | Solo se permiten archivos .pdf con tamaño máximo de 20MB. No deben contener cifrado, estar en blanco o vacíos. |
| RN-7 | Validación de datos para pago con tarjeta | El número de tarjeta debe tener 16 dígitos numéricos; el CVV debe tener 3 o 4 dígitos; la fecha de vencimiento debe ser mayor al mes y año actual, con formato (MM/AA). |
| RN-8 | Nombre de usuario | Se debe validar en base de datos; el nombre de usuario debe ser único. |
| RN-9 | Autenticación obligatoria | Todo usuario interno debe iniciar sesión con credenciales válidas para acceder a módulos administrativos. |
| RN-10 | Validación de DPI | El DPI es obligatorio y debe contener 13 dígitos numéricos sin guiones y espacios. |
| RN-11 | Validación de correo electrónico | El correo electrónico es obligatorio y debe tener la extensión @. |
| RN-12 | Unicidad de asignación | Un médico solo puede estar asignado a una clínica activa a la vez. |
| RN-13 | Actualización en tiempo real | Los cambios de clínica deben reflejarse inmediatamente en la cola de pacientes y monitores. |
| RN-14 | Capacidad de clínica | Una clínica no puede exceder el número máximo de médicos permitidos simultáneamente: Consulta externa: 5 médicos, Medicina general: 3 médicos, Emergencias: 6 médicos. |
| RN-15 | Control de notificación visual | La notificación visual solo se proyecta en las pantallas que el administrador haya habilitado. Si ninguna pantalla está activa, el sistema omite la notificación visual y registra una advertencia en bitácora. |
| RN-16 | Control de notificación auditiva | La notificación auditiva requiere que el sistema de audio esté operativo y habilitado por el administrador. Si el audio está desactivado, el llamado opera únicamente en modo visual. |
| RN-17 | Aplicación en tiempo real | Los cambios en la configuración de notificaciones se aplican inmediatamente sin necesidad de reiniciar el sistema. |
| RN-18 | Selección obligatoria de área | Consulta externa, consulta general. |
| RN-19 | Tiempo de espera | El usuario tiene 10 minutos para crear su cita; en ese tiempo el horario y fecha están bloqueados para cualquier otro usuario. |
| RN-20 | Fecha de nacimiento | La fecha de nacimiento debe ser mayor a 1900. |
| RN-21 | Signos vitales obligatorios | No puede asignarse médico ni clínica sin haber registrado previamente los signos vitales del paciente de emergencia. |
| RN-22 | Prioridad de cola | Los tickets marcados como *"Emergencia"* se colocan al frente de la cola de atención, por encima de cualquier cita agendada o turno ordinario. |
| RN-23 | Cita reagendada | Si el paciente es marcado como ausente una vez, solo tiene derecho a reasignar su cita una sola vez. |
| RN-24 | Marcado de emergencia | El personal de salud debe registrar explícitamente el ingreso como *"Emergencia"* para activar el flujo prioritario. No puede asignarse prioridad de emergencia de forma automática sin validación del personal. |
| RN-25 | Validación cita activa | El sistema valida que el médico no cuente con una cita activa. |
| RN-26 | Sincronización audio/video | La notificación visual y auditiva debe ejecutarse simultáneamente. |
| RN-27 | Bloqueo de atención | El sistema no permite que el médico visualice al paciente en la *"Cola de Emergencias"* hasta que el cajero haya validado la orden de pago. |
| RN-28 | Validación de stock | No puede generarse una orden de pago si el medicamento no está disponible en el inventario. En caso de disponibilidad parcial, se despacha únicamente lo disponible y el resto queda registrado como *"No Despachado"*. |
| RN-29 | Habilitación de botón | El botón se habilita si el personal médico o técnico de laboratorio está marcado como disponible en su área de trabajo. |
| RN-30 | Disponibilidad de médico | El botón no llamará si el médico asignado no está disponible: *"No hay pacientes elegibles — los médicos asignados no están disponibles. Espere a que un médico se marque disponible."* |

### 2. Postcondiciones
- Todas las reglas son obligatorias para los módulos del sistema.
- Cada caso de uso debe referenciar las reglas correspondientes mediante su ID.
- La modificación de una regla debe actualizarse únicamente en este caso de uso.

---

## Catálogos

### Catálogo de Exámenes de Laboratorio

| Código | Nombre del Examen | Tipo de Muestra | Categoría |
|--------|-------------------|-----------------|-----------|
| LAB-001 | Hemograma completo (BHC) | Sangre | Hematología |
| LAB-002 | Grupo sanguíneo y Rh | Sangre | Hematología |
| LAB-003 | Tiempo de protrombina (TP) | Sangre | Hematología |
| LAB-004 | Tiempo de tromboplastina parcial (TTP) | Sangre | Hematología |
| LAB-005 | Velocidad de sedimentación globular (VSG) | Sangre | Hematología |
| LAB-006 | Glucosa en ayunas | Sangre | Química Clínica |
| LAB-007 | Hemoglobina glucosilada (HbA1c) | Sangre | Química Clínica |
| LAB-008 | Perfil lipídico (colesterol total, HDL, LDL, triglicéridos) | Sangre | Química Clínica |
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
| LAB-020 | Prueba de embarazo (β-HCG) | Sangre / Orina | Inmunología |
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

---

### Catálogo de Medicamentos — Farmacia Hospitalaria

| Código | Nombre Genérico | Presentación | Categoría |
|--------|-----------------|--------------|-----------|
| FAR-001 | Paracetamol 500 mg | Tableta | Analgésico / Antipirético |
| FAR-002 | Paracetamol 120 mg/5ml | Jarabe 60ml | Analgésico / Antipirético |
| FAR-003 | Ibuprofeno 400 mg | Tableta | AINE |
| FAR-004 | Ibuprofeno 200 mg/5ml | Suspensión 120ml | AINE |
| FAR-005 | Diclofenaco 50 mg | Tableta | AINE |
| FAR-006 | Diclofenaco 75 mg/3ml | Inyectable | AINE |
| FAR-007 | Naproxeno 500 mg | Tableta | AINE |
| FAR-008 | Ketorolaco 30 mg/ml | Inyectable | AINE |
| FAR-009 | Amoxicilina 500 mg | Cápsula | Antibiótico |
| FAR-010 | Amoxicilina 250 mg/5ml | Suspensión 60ml | Antibiótico |
| FAR-011 | Amoxicilina + Ácido clavulánico 875/125 mg | Tableta | Antibiótico |
| FAR-012 | Azitromicina 500 mg | Tableta | Antibiótico |
| FAR-013 | Ciprofloxacino 500 mg | Tableta | Antibiótico |
| FAR-014 | Metronidazol 500 mg | Tableta | Antibiótico |
| FAR-015 | Clindamicina 300 mg | Cápsula | Antibiótico |
| FAR-016 | Omeprazol 20 mg | Cápsula | Gastrointestinal |
| FAR-017 | Ranitidina 150 mg | Tableta | Gastrointestinal |
| FAR-018 | Metoclopramida 10 mg | Tableta / Inyectable | Gastrointestinal |
| FAR-019 | Sales de rehidratación oral | Sobre | Gastrointestinal |
| FAR-020 | Loperamida 2 mg | Cápsula | Gastrointestinal |
| FAR-021 | Loratadina 10 mg | Tableta | Antihistamínico |
| FAR-022 | Cetirizina 10 mg | Tableta | Antihistamínico |
| FAR-023 | Difenhidramina 25 mg | Cápsula | Antihistamínico |
| FAR-024 | Salbutamol 100 mcg | Inhalador (MDI) | Respiratorio |
| FAR-025 | Ambroxol 30 mg/5ml | Jarabe 120ml | Respiratorio |
| FAR-026 | Loratadina + Pseudoefedrina | Tableta | Respiratorio |
| FAR-027 | Metformina 500 mg | Tableta | Antidiabético |
| FAR-028 | Glibenclamida 5 mg | Tableta | Antidiabético |
| FAR-029 | Insulina NPH 100 UI/ml | Vial 10ml | Antidiabético |
| FAR-030 | Enalapril 10 mg | Tableta | Antihipertensivo |
| FAR-031 | Losartán 50 mg | Tableta | Antihipertensivo |
| FAR-032 | Amlodipino 5 mg | Tableta | Antihipertensivo |
| FAR-033 | Atorvastatina 20 mg | Tableta | Hipolipemiante |
| FAR-034 | Ácido acetilsalicílico 100 mg | Tableta | Antiagregante |
| FAR-035 | Clonazepam 0.5 mg | Tableta | Ansiolítico |
| FAR-036 | Diazepam 5 mg | Tableta | Ansiolítico |
| FAR-037 | Sertralina 50 mg | Tableta | Antidepresivo |
| FAR-038 | Vitamina C 500 mg | Tableta | Suplemento |
| FAR-039 | Complejo B | Tableta / Inyectable | Suplemento |
| FAR-040 | Sulfato ferroso 300 mg | Tableta | Suplemento |
| FAR-041 | Ácido fólico 1 mg | Tableta | Suplemento |
| FAR-042 | Hidrocortisona 1% | Crema 30g | Dermatológico |
| FAR-043 | Clotrimazol 1% | Crema 20g | Antifúngico tópico |
| FAR-044 | Solución salina 0.9% | Frasco 500ml | Solución IV |
| FAR-045 | Dextrosa 5% | Frasco 500ml | Solución IV |
