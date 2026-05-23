# Manual de Usuario — BioCore Medical System

> Guía Operativa para el Personal del Hospital  
> Versión 2.2 · Mayo 2026 · Confidencial — Uso Interno

---

## Tabla de Contenidos

1. [Introducción al Sistema](#1-introducción-al-sistema)
2. [Primeros Pasos — Inicio de Sesión](#2-primeros-pasos--inicio-de-sesión)
3. [Navegación General](#3-navegación-general)
4. [Recepción y Enfermería](#4-recepción-y-enfermería)
5. [Consulta Médica](#5-consulta-médica)
6. [Laboratorio](#6-laboratorio)
7. [Farmacia](#7-farmacia)
8. [Caja y Pagos](#8-caja-y-pagos)
9. [Emergencias](#9-emergencias)
10. [Portal del Paciente](#10-portal-del-paciente)
11. [Dashboard y Monitoreo](#11-dashboard-y-monitoreo)
12. [Preguntas Frecuentes](#12-preguntas-frecuentes)

---

## 1. Introducción al Sistema

**BioCore Medical System** es la plataforma digital de gestión hospitalaria diseñada para centralizar y optimizar todos los procesos de atención al paciente en un solo entorno seguro. Al eliminar el uso de documentación en papel y reducir significativamente los tiempos de espera, BioCore permite que el personal clínico y administrativo concentre su energía en la atención de calidad al paciente.

> **Confidencialidad:** Toda la información registrada en BioCore Medical System es estrictamente confidencial. El acceso a los datos del paciente está restringido por rol de usuario y protegido mediante autenticación segura. Está prohibido compartir credenciales de acceso o información de pacientes fuera del contexto clínico autorizado.

### 1.1 Áreas cubiertas por BioCore

| Área | Funcionalidad principal |
|------|------------------------|
| **Recepción** | Registro de pacientes y asignación de turnos en cola de atención |
| **Consulta Médica** | Gestión de la cola, emisión de prescripciones y órdenes de laboratorio |
| **Laboratorio** | Seguimiento de órdenes, recolección de muestras y carga de resultados |
| **Farmacia** | Venta de medicamentos y despacho de recetas médicas prescritas |
| **Caja** | Agendamiento de citas, cobros y aplicación automática de seguros |
| **Emergencias** | Registro rápido de pacientes urgentes y reportes clínicos |
| **Portal del Paciente** | Acceso personal a citas, prescripciones y resultados de laboratorio |
| **Administración** | Gestión de personal, clínicas, reportería y estadísticas en tiempo real |

### 1.2 Cómo acceder al sistema

Abra su navegador web (Google Chrome, Mozilla Firefox o Microsoft Edge — se recomienda su versión más reciente) e ingrese a la dirección web que le proporcionó el Administrador del hospital. Verá la pantalla de bienvenida de **BioCore Medical System**.

> 💡 **Tip:** Guarde la dirección del sistema en los favoritos de su navegador para acceder rápidamente en cada turno.

---

## 2. Primeros Pasos — Inicio de Sesión

### 2.1 Cómo iniciar sesión

1. En la pantalla de bienvenida, haga clic en el botón **Ingresar**.
2. Ingrese su **Usuario** y **Contraseña** en los campos correspondientes.
3. Haga clic en el botón **Iniciar Sesión**.
4. El sistema lo redirigirá automáticamente al área correspondiente a su rol asignado.

> ⚠️ **Advertencia de Seguridad:** Sus credenciales de acceso (usuario y contraseña temporal) son proporcionadas por el Administrador del sistema. Guárdelas en un lugar seguro y no las comparta con nadie, incluyendo compañeros de trabajo. Cada usuario es responsable de las acciones realizadas bajo su cuenta.

---

### 2.2 Cambio de contraseña obligatorio (primer ingreso)

Si es la primera vez que ingresa al sistema, o si el Administrador restableció su contraseña, el sistema mostrará automáticamente el formulario **Cambiar Contraseña** inmediatamente después del inicio de sesión.

> ⚠️ **Advertencia de Seguridad:** Este paso es obligatorio. El sistema detecta que su contraseña es temporal y exige establecer una nueva antes de continuar.

**Pasos para cambiar su contraseña:**

1. En el campo **Contraseña actual (temporal)**, ingrese la contraseña temporal que le fue proporcionada.
2. En el campo **Nueva contraseña**, ingrese la contraseña que desea utilizar de ahora en adelante.
3. En el campo **Confirmar nueva contraseña**, repita exactamente su nueva contraseña.
4. Haga clic en **Cambiar Contraseña**.
5. El sistema confirmará el cambio y lo dirigirá directamente a su área de trabajo.

**Recomendaciones de seguridad para su contraseña:**

| Criterio | Descripción |
|----------|-------------|
| **Longitud mínima** | Mínimo 8 caracteres |
| **Complejidad** | Combine letras mayúsculas, minúsculas y números |
| **Información personal** | No utilice su nombre, apellido ni fecha de nacimiento |
| **Confidencialidad** | Nunca comparta su contraseña con compañeros de trabajo |
| **Unicidad** | No reutilice contraseñas de otros servicios o sistemas |

---

## 3. Navegación General

Una vez dentro del sistema, encontrará dos elementos de navegación siempre visibles en la interfaz:

### 3.1 Barra lateral izquierda — Menú de Navegación

Contiene los accesos directos a todos los módulos disponibles según su rol. Solo visualizará las secciones a las que tiene permiso de acceso. En la parte inferior del menú aparece su **nombre completo y cargo**, junto al botón de cierre de sesión.

### 3.2 Barra superior — Topbar

Muestra el nombre del sistema y el botón **Salir** para cerrar sesión de forma segura en cualquier momento.

> ⚠️ **Advertencia de Seguridad:** Siempre cierre sesión al finalizar su turno usando el botón **Salir** o el ícono de logout en la parte inferior del menú lateral. Nunca deje el sistema abierto y desatendido en una estación de trabajo compartida.

> 📋 **Nota Clínica:** Si no ve un módulo que necesita en el menú, es posible que su rol no tenga permiso de acceso. Consulte con el Administrador del sistema para verificar sus permisos.

---

## 4. Recepción y Enfermería

> **Rol:** Personal de Salud (HEALTH_STAFF)

Esta sección cubre el flujo de atención desde que el paciente llega al hospital hasta que está listo para ser visto por el personal médico. Acceda desde el menú lateral haciendo clic en **Recepción**.

---

### 4.1 Registrar un Paciente

El sistema identifica a cada paciente mediante su **DPI (número de identificación personal de 13 dígitos)**. Antes de crear un turno, siempre debe identificar o registrar al paciente en el sistema.

#### Paso 1 — Buscar al paciente por DPI

1. En la pestaña **Recepción**, ingrese al **Paso 1: Identificación**.
2. Escriba los **13 dígitos del DPI** del paciente en el campo correspondiente.
3. Haga clic en **Buscar Paciente**.

**El sistema presentará una de las dos respuestas siguientes:**

**a) Paciente encontrado (ya existe en el sistema):**
- Los datos del paciente se cargarán automáticamente en el formulario.
- Revise que la información esté actualizada (teléfono, correo electrónico, seguro médico).
- Si necesita modificar algún dato, actualice los campos y haga clic en **Guardar Cambios**.
- Si todo es correcto, haga clic en **Continuar al Paso 2**.

**b) Paciente nuevo (no existe en el sistema):**
- El sistema le indicará que no encontró al paciente.
- Aparecerá el formulario completo para registrarlo. Continúe con el Paso 2.

#### Paso 2 — Registrar un paciente nuevo

Complete los siguientes campos del formulario de registro:

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| **Nombres** | ✓ | Nombre(s) completo(s) del paciente |
| **Apellidos** | ✓ | Apellido(s) completo(s) del paciente |
| **DPI** | ✓ | 13 dígitos sin espacios ni guiones |
| **Fecha de nacimiento** | — | Formato: DD/MM/AAAA |
| **Teléfono** | — | Número de contacto principal |
| **Correo electrónico** | — | Se usará para notificaciones de resultados |
| **Contacto de emergencia** | — | Nombre completo del familiar o responsable |
| **Teléfono de emergencia** | — | Teléfono del contacto de emergencia |
| **Seguro médico** | — | Seleccione de la lista si el paciente cuenta con seguro |
| **Número de póliza** | — | Si tiene seguro, ingrese el número de póliza |

Una vez completado el formulario:

1. Haga clic en **Registrar Paciente**.
2. El sistema generará automáticamente un **código de paciente** (ej. PAC-00042) y, si se marcó la opción de crear cuenta en el portal, generará también las credenciales de acceso para el paciente.
3. Si se generaron credenciales de portal, anótelas y entréguelas al paciente de forma segura y discreta.

> 🔒 **Confidencialidad:** El correo electrónico del paciente es especialmente importante: se utiliza para enviar notificaciones automáticas cuando sus resultados de laboratorio estén disponibles. Asegúrese de capturarlo correctamente.

---

### 4.2 Crear un Turno en la Cola de Atención

Una vez identificado o registrado el paciente, **debe pagar la consulta en Caja** para que se le asigne un turno en la cola de atención.

1. En la pestaña **Caja / Pagos**, identifique al paciente.
2. **Tipo de Servicio:** Indique el tipo de servicio (Consulta Médica, Control / Seguimiento).
3. **Area:** Seleccione el área (Medicina General, Consulta Externa, etc.).
4. **Emergencias:** Si el paciente requiere atención urgente, vaya al módulo de Emergencias en Recepcionista y prosiga con el formulario.

> ⚠️ **Advertencia de Seguridad:** Los pacientes marcados como **URGENTE** son colocados automáticamente al frente de la cola de atención, por encima de todos los turnos regulares. Utilice esta opción únicamente cuando el estado clínico del paciente lo justifique.

---

### 4.3 Llamar a un Paciente para Signos Vitales

Cuando el personal de enfermería esté disponible, el siguiente paso es llamar al paciente para registrar sus signos vitales antes de la consulta.

1. **Llamada a Signos Vitales:** Vaya a la pestaña **Monitoreo de Cola**.
2. **Clínica:** Seleccione la correspondiente en el selector.
3. **Llamar Siguiente:** Haga clic en **Llamar Siguiente Paciente**.
4. El sistema anunciará automáticamente al siguiente paciente en la pantalla de sala de espera.

---

### 4.4 Registrar Signos Vitales

> ⚠️ **Advertencia de Seguridad:** Obligatorio — el paciente **NO puede pasar a consulta médica** sin que sus signos vitales estén registrados. Este es un requisito del sistema para garantizar la seguridad clínica del paciente.  
> El médico en turno debe marcarse como **Disponible** para que su paciente pueda ser llamado.

1. Una vez que el paciente esté presente, localice su turno en la lista de pacientes llamados.
2. Haga clic sobre el turno del paciente para expandir su ficha.
3. Complete el formulario de signos vitales con los valores medidos:

| Signo Vital | Unidad de medida |
|-------------|-----------------|
| **Presión arterial** | mmHg (ej. 120/80) |
| **Frecuencia cardíaca** | Pulsaciones por minuto (ppm) |
| **Temperatura** | Grados Celsius (°C) |
| **Peso** | Kilogramos (kg) |
| **Talla / Altura** | Centímetros (cm) |
| **Saturación de oxígeno** | Porcentaje (%) |

4. Haga clic en **Registrar y Enviar a Médico**.
5. El paciente cambiará automáticamente al estado **Listo para Médico** y aparecerá en la cola del médico correspondiente.

---

## 5. Consulta Médica

> **Rol:** Médico (DOCTOR)

Acceda desde el menú lateral haciendo clic en **Consulta Médica** (para clínicas regulares) o **Emergencias Médicas** (si está asignado al módulo de urgencias).

---

### 5.1 Activar su Disponibilidad

Antes de comenzar a atender pacientes, debe registrar su disponibilidad en el sistema.

1. En la pantalla de Consulta Médica, localice el interruptor **Disponible / No Disponible**.
2. Actívelo para comenzar a recibir pacientes en su cola.
3. Desactívelo cuando salga a descanso o al finalizar su turno.

> 📋 **Nota Clínica:** Solo cuando usted esté marcado como disponible, el sistema le asignará pacientes de su clínica. Si no activa su disponibilidad, los pacientes no podrán ser derivados a su cola.

---

### 5.2 Ver la Cola de Pacientes

En la pantalla principal del módulo encontrará las siguientes secciones:

- **Listos para Consulta:** Pacientes con signos vitales registrados, esperando ser llamados.
- **Cola de Espera:** Vista completa de todos los turnos activos en su clínica.
- **Citas del Día:** Citas programadas para la fecha actual.
- **Calendario de Citas:** Vista mensual del total de citas asignadas.

---

### 5.3 Llamar a un Paciente a Consulta

1. En la lista de **Listos para Consulta**, identifique al siguiente paciente.
2. Haga clic en el botón **Llamar al Consultorio** que aparece junto al mensaje "Signos vitales registrados — Paciente listo" en la tarjeta del paciente.
3. El número de turno del paciente aparecerá en la pantalla de sala de espera.
4. El paciente pasará al estado **Siendo Llamado**.

Si el paciente no se presenta a la llamada:
- Haga clic en **Ausente**.
- El turno quedará en estado **Ausente** y el sistema registrará la inasistencia automáticamente.

---

### 5.4 Registrar la Consulta

Durante la atención del paciente, tiene a su disposición las siguientes acciones clínicas:

#### Ver los signos vitales del paciente

Los signos vitales registrados por personal de salud aparecerán automáticamente en el perfil del turno activo. No es necesario volver a tomarlos a menos que desee actualizarlos.

#### Emitir una Receta Médica

1. En la pantalla del turno activo, localice la sección **Diagnóstico y Receta**.
2. Ingrese el **Diagnóstico** del paciente en el campo de texto.
3. Para cada medicamento del catálogo del hospital, haga clic en **Agregar Medicamento** y selecciónelo de la lista desplegable.
4. Para medicamentos fuera del catálogo, haga clic en **Agregar Medicamento Externo** e ingrese el nombre manualmente.
5. Complete los campos por medicamento:
   - **Cantidad**
   - **Dosificación** (ej. "Tomar 1 tableta cada 8 horas con alimentos")
6. Repita el proceso para cada medicamento de la prescripción.
7. Haga clic en **Completar Consulta** para guardar la receta.

> 📋 **Nota Clínica:** La receta quedará en estado **Pendiente** hasta que el paciente la pague en el módulo de Caja y la retire en Farmacia. El médico puede consultar el estado de la receta desde el historial del turno.

#### Generar una Orden de Laboratorio

1. En la misma pantalla del turno activo, localice la sección **Órdenes de Laboratorio**.
2. Haga clic en **Agregar Orden de Laboratorio**.
3. Seleccione el **Examen** de la lista de exámenes disponibles en el hospital.
4. Agregue **Notas especiales** si necesita indicaciones particulares para el laboratorista.
5. Haga clic en **Completar Consulta** para guardar la orden.

#### Finalizar la Consulta

1. Una vez completada la atención médica, haga clic en **Completar Consulta**.
2. El turno cambiará al estado **Completado** y el espacio quedará disponible para el siguiente paciente en la cola.

---

## 6. Laboratorio

> **Rol:** Laboratorista

Acceda desde el menú lateral haciendo clic en **Laboratorio**.

---

### 6.1 Revisar Órdenes Pendientes

Al ingresar al módulo, la pestaña **Pendientes** muestra todas las órdenes de laboratorio emitidas por los médicos que aún no han sido procesadas. Cada orden muestra:

- Nombre del paciente y código de paciente.
- Tipo de examen solicitado y tipo de muestra necesaria.
- Fecha de emisión y fecha de vencimiento de la orden.

> ⚠️ **Advertencia de Seguridad:** Revise siempre la fecha de vencimiento antes de procesar una orden. Las órdenes expiran a los **30 días**. Las órdenes próximas a vencer aparecerán destacadas en el sistema. No procese órdenes ya vencidas; notifique al médico para que emita una nueva.

---

### 6.2 Activar su Disponibilidad

Al igual que los médicos, el laboratorista debe registrar su disponibilidad para recibir pacientes.

1. En la pantalla principal del módulo, active el interruptor **Disponible**.
2. Desactívelo al salir a descanso o al finalizar su turno.

---

### 6.3 Registrar la Recolección de Muestra

Cuando el paciente llegue a entregar su muestra biológica:

1. Localice la orden del paciente en la lista **Pendientes** de laboratorio.
2. Haga clic en **Llamar Siguiente Paciente** desde el Monitoreo de Cola.
3. Confirme la acción. El estado cambiará a **Muestra Recolectada**.

---

### 6.4 Programar el Examen (si aplica)

Para exámenes que requieren cita previa o procesamiento en fecha diferida, genere una cita especificando:

- **Tipo de Servicio:** Laboratorio
- **Examen de Laboratorio:** seleccione el examen correspondiente
- **Fecha y hora** de la cita

---

### 6.5 Cargar los Resultados

Una vez procesado el examen y disponibles los resultados:

1. Localice la orden en la lista.
2. Haga clic en **Adjuntar Resultados** en el panel de carga.
3. Haga clic en el área asignada y elija el archivo PDF de resultados desde su computadora, o arrástrelo directamente al área indicada.
4. **Notas del resultado:** Escriba las notas del técnico de manera opcional (interpretación clínica, valores obtenidos).
5. Haga clic en **Guardar y Enviar al Paciente** para enviar el laboratorio al correo registrado del paciente.
6. El sistema enviará automáticamente una notificación por correo electrónico al paciente informando que sus resultados están disponibles en su portal.

> ⚠️ **Advertencia de Seguridad:** Solo se aceptan archivos en formato **PDF**. El tamaño máximo permitido es de **20 MB** por archivo. No intente cargar imágenes sueltas o documentos en otro formato.

---

## 7. Farmacia

> **Rol:** Farmacéutico

Acceda desde el menú lateral haciendo clic en **Farmacia**. El módulo de farmacia gestiona dos tipos de dispensación: venta libre (OTC) y despacho con receta médica.

---

### 7.1 Venta Libre (OTC — Sin Receta)

Para medicamentos que no requieren receta médica:

1. Vaya a la pestaña **Venta Libre (OTC)**.
2. Busque el medicamento por nombre o categoría usando el campo de búsqueda.
3. Puede filtrar por **Categoría** (Antibióticos, Analgésicos, etc.) para facilitar la búsqueda.
4. Haga clic en el **carrito de compra** junto al medicamento deseado.
5. En la ventana que aparece, ingrese la **cantidad** solicitada por el cliente.

> 📋 **Nota Clínica:** El sistema muestra el stock disponible de cada medicamento. No es posible vender más unidades del stock existente. Si el stock es insuficiente, notifique al paciente y consulte con el encargado de inventario.

6. Repita los pasos 4 y 5 para cada medicamento adicional.
7. Revise el resumen del carrito en el panel derecho: lista de medicamentos, cantidades, subtotales y total a pagar.
8. **DPI:** Ingrese el DPI del paciente para asociar el medicamento a su expediente.
9. Si el cliente tiene seguro médico, al ingresar el DPI se aplicará el descuento correspondiente automáticamente.
10. **Método de pago:** Seleccione Efectivo, Tarjeta de Débito o Tarjeta de Crédito.
11. Haga clic en **POS - Efectivo** para confirmar la venta.
12. El sistema generará un correo de confirmación de pago y descontará automáticamente las unidades del inventario.

---

### 7.2 Despacho con Receta Médica

Para medicamentos prescritos por un médico del hospital:

1. Vaya a la pestaña **Despacho con Receta**.
2. Ingrese el **DPI del Paciente** y haga clic en **Buscar**.
3. Visualizará la lista de recetas emitidas por los médicos que están pendientes de despacho.
4. Localice la receta del paciente y haga clic sobre ella para expandir el detalle completo.
5. Realice el cobro correspondiente a la receta generada (Efectivo o con Tarjeta).
6. Entregue los medicamentos al paciente junto con las instrucciones indicadas en la receta.

---

## 8. Caja y Pagos

> **Rol:** Cajero

Acceda desde el menú lateral haciendo clic en **Caja / Pagos**. El módulo de caja gestiona cuatro tipos de cobro: **Citas Presenciales**, **Laboratorio**, **Farmacia** y **Emergencias**.

---

### 8.1 Buscar al Paciente

Todos los flujos de pago comienzan con la identificación del paciente:

1. En el campo **DPI del Paciente**, ingrese los 13 dígitos del documento de identificación.
2. Haga clic en **Buscar**.
3. El sistema cargará los datos del paciente, incluyendo su **seguro médico activo** y el **porcentaje de descuento** que le corresponde.

> 💡 **Tip de Uso:** El descuento por seguro médico se aplica automáticamente. No es necesario calcularlo de forma manual; BioCore realiza el cálculo y lo muestra en el desglose de pago.

---

### 8.2 Agendar y Cobrar una Cita Presencial

1. En la pestaña **Citas Presenciales**, busque al paciente por DPI.
2. Puede actualizar o crear el registro del paciente si es necesario.
3. **Tipo de Servicio:** Seleccione la Consulta o Control al que el paciente desea asistir.
4. **Fecha:** Seleccione la fecha de la cita en el calendario.
5. El sistema mostrará los **horarios disponibles** para esa clínica y fecha. Seleccione uno.
6. Revise el resumen: monto de la consulta, descuento por seguro (si aplica) y total a pagar.
7. **Método de pago:** Seleccione Efectivo, Tarjeta de Débito o Tarjeta de Crédito.
8. Haga clic en **POS | Efectivo** para procesar el pago.
9. El sistema generará un **comprobante de cita**. Entréguelo al paciente.

---

### 8.3 Cobrar Examen de Laboratorio

1. Vaya a la pestaña **Laboratorios**.
2. Busque al paciente por DPI.
3. Puede actualizar o crear el registro del paciente si es necesario.
4. **Referencias médicas disponibles:** El sistema mostrará los exámenes de laboratorio solicitados por el médico post consulta.
5. **Examen de Laboratorio:** Seleccione el examen de laboratorio a cobrar.
6. **Area de Laboratorio:** Seleccione el área del laboratorio correspondiente.
7. **Fecha:** Seleccione la fecha de la cita en el calendario.
8. Si el examen requiere cita programada, seleccione también la hora.
9. Revise el desglose con el descuento de seguro aplicado automáticamente.
10. **Método de pago:** Seleccione Efectivo, Tarjeta de Débito o Tarjeta de Crédito.
11. Haga clic en **POS | Efectivo** para procesar el pago.
12. El sistema generará un **comprobante de cobro**. Entréguelo al paciente.

---

### 8.4 Cobro de Emergencias

1. Vaya a la pestaña **Emergencias**.
2. Busque al paciente o al registro de emergencia correspondiente.
3. Procese el pago de los servicios de urgencia prestados siguiendo el mismo flujo de cobro.

---

### 8.6 Reagendar Cita

1. En la pestaña **Reagendar Cita**, busque al paciente por DPI.
2. Edite la información del paciente si es necesario.
3. Cree la nueva cita siguiendo el flujo de **Cita Presencial** descrito en la sección 8.2.

---

## 9. Emergencias

> **Roles:** Personal de Salud (HEALTH_STAFF) · Doctor de Emergencias

El módulo de emergencias permite atender a pacientes que llegan en estado de urgencia sin necesidad de pasar por el proceso de registro regular, garantizando la atención inmediata cuando el tiempo es crítico.

---

### 9.1 Registro Rápido de Paciente de Emergencia

> **Roles:** Recepcionista · Personal de Salud

Acceda desde el menú lateral haciendo clic en **Emergencias**.

1. Haga clic en **Nueva Emergencia** y complete los datos mínimos del paciente.
2. Si el paciente puede comunicarlo o porta una identificación:
   - **DPI** (si está disponible)
   - **Nombre:** si está disponible. Puede ingresar ceros si se desconoce en el momento crítico.
   - **Motivo de la emergencia:** descripción breve del estado clínico del paciente (Obligatorio).
3. El sistema marcará automáticamente el turno como **URGENTE** y lo colocará al frente de todas las colas de atención.
4. Proceda inmediatamente a registrar los **signos vitales iniciales** (consulte la sección 4.4 de este manual).

> ⚠️ **Advertencia de Seguridad:** En situaciones de emergencia que pongan en riesgo la vida del paciente, la atención clínica tiene prioridad absoluta sobre el proceso administrativo. El registro formal puede completarse una vez que el paciente esté estabilizado.

---

### 9.2 Elaborar el Reporte Médico de Emergencia

> **Rol:** Médico de Emergencias (DOCTOR)

Acceda desde el menú lateral haciendo clic en **Emergencias Médicas**.

1. Visualizará la lista de casos de emergencia asignados a usted.
2. Haga clic en el caso del paciente que está atendiendo.
3. Complete el **Reporte Médico de Emergencia** con los siguientes campos:
   - **Diagnóstico:** Descripción del diagnóstico clínico.
   - **Tratamiento:** Procedimientos médicos realizados durante la atención.
   - **Medicamentos administrados:** Lista de medicamentos utilizados durante la urgencia.
4. Haga clic en **Guardar Reporte**.

> 📋 **Nota Clínica:** Una vez guardado el reporte médico, el sistema enviará automáticamente una copia al correo electrónico del paciente, si este tiene una dirección registrada en su expediente.

---

### 9.3 Completar el Registro del Paciente (si no estaba registrado)

Si el paciente atendido en emergencias no tenía expediente previo en el sistema:

1. Dentro del caso de emergencia, haga clic en **Completar datos y crear cuenta**.
2. Complete el formulario completo con los datos del paciente, ahora que la situación clínica lo permite.
3. Haga clic en **Crear cuenta y enviar credenciales**.
4. El paciente quedará registrado con su código permanente en el historial médico electrónico del hospital.

---

## 10. Portal del Paciente

> **Rol:** Paciente (PATIENT)

Los pacientes que cuentan con una cuenta en el sistema pueden acceder a su información personal desde cualquier dispositivo con navegador web, de forma segura y desde cualquier lugar.

---

### 10.1 Cómo Acceder

1. Abra su navegador e ingrese a la dirección del sistema que le proporcionó el hospital.
2. Haga clic en **Ingresar**.
3. Utilice el **usuario** y la **contraseña** que se registró en la creación de su cuenta, o las credenciales temporales que le brindó el personal de recepción al momento de su registro.

> ⚠️ **Advertencia de Seguridad:** En su primer ingreso al portal, el sistema le solicitará que cambie su contraseña temporal por una de su elección. Siga las instrucciones descritas en la sección [2.2](#22-cambio-de-contraseña-obligatorio-primer-ingreso) de este manual.

---

### 10.2 Ver Mis Citas

1. En el menú, haga clic en **Mis Citas**.
2. Visualizará el listado de todas sus citas pasadas.
3. Cada cita muestra:
   - Fecha y hora
   - Clínica y médico asignado
   - Estado actual (Confirmada, En Proceso, Completada)

---

### 10.3 Mis Recetas

En la sección **Mis Recetas**, puede consultar todas las prescripciones emitidas por su médico, incluyendo los medicamentos, dosis e instrucciones de uso.

> 🔒 **Confidencialidad:** La información de sus recetas médicas es estrictamente confidencial. Asegúrese de acceder al portal desde un dispositivo personal y cierre sesión siempre al finalizar su consulta.

---

### 10.4 Ver y Descargar Resultados de Laboratorio

1. En la sección **Laboratorios**, visualizará el historial completo de sus órdenes de laboratorio.
2. Cuando un resultado esté disponible, el estado mostrará **Resultados listos** y aparecerá el botón **Descargar PDF**.
3. Haga clic en **Descargar PDF** para obtener su resultado en formato digital.
4. Otros estados disponibles: **Programada**, **Muestra tomada**, **Pendiente de cita**.

> 📋 **Nota Clínica:** El hospital también le enviará una notificación automática a su correo electrónico cuando sus resultados estén listos. Por esto es importante que proporcione un correo válido al momento de su registro.

---

## 11. Dashboard y Monitoreo

### 11.1 Dashboard Administrativo

> **Roles:** Administrador · Personal con acceso al módulo

Acceda desde el menú lateral haciendo clic en **Dashboard**. El panel administrativo muestra las estadísticas operativas del día en tiempo real, actualizándose automáticamente.

| Indicador | Descripción |
|-----------|-------------|
| **Pacientes Hoy** | Total de pacientes registrados y atendidos en el día |
| **En Espera** | Pacientes actualmente en la cola de atención |
| **En Consulta** | Pacientes siendo atendidos en este momento |
| **Atendidos** | Consultas finalizadas exitosamente en el día |
| **Ausentes** | Pacientes que no se presentaron a su llamado |
| **Pagos Hoy** | Total de cobros procesados en el día |

También muestra en tiempo real los pacientes que están siendo llamados en ese momento (turnos en estado **Siendo Llamado**).

**Acciones Rápidas disponibles desde el Dashboard:**

| Acción | Descripción | Acceso |
|--------|-------------|--------|
| **Registrar Paciente** | Acceso directo al formulario de registro | Todo el personal autorizado |
| **Buscar Paciente** | Ir al listado general de pacientes | Todo el personal autorizado |
| **Reportes** | Acceder al módulo de reportería | Solo Administradores |

---

### 11.2 Pantalla de Sala de Espera (Display TV)

La pantalla de sala de espera es una vista especial diseñada para mostrarse en los monitores o televisores de las salas de espera del hospital.

**Cómo activar la pantalla de sala de espera:**

1. Desde el módulo de **Monitoreo de Cola**, haga clic en el botón **Pantalla de Sala** (ícono de televisor).
2. Se abrirá una nueva ventana en pantalla completa mostrando los turnos activos.
3. Arrastre o coloque esa ventana sobre el monitor de la sala de espera.

**La pantalla muestra:**

- El número de turno que se está llamando en ese momento (visible a larga distancia).
- La clínica o área a la que debe dirigirse el paciente.
- Los próximos turnos llamados (historial reciente).
- La hora actual del sistema.

> 💡 **Tip de Uso:** La pantalla de sala de espera se actualiza automáticamente cada vez que se llama a un nuevo paciente. No necesita recargarse manualmente. Puede abrirse y cerrarse cuantas veces sea necesario desde el botón **Pantalla de Sala**.

---

### 11.3 Monitoreo de Cola

> **Rol:** Todo el personal con acceso al sistema

Acceda haciendo clic en **Monitoreo de Cola** en el menú lateral. Este módulo permite visualizar en tiempo real el estado de todos los turnos del día.

| Pestaña | Contenido | Visibilidad |
|---------|-----------|-------------|
| **Cola** | Todos los tickets activos del día con su estado actual | Todo el personal |
| **Personal** | Estado de disponibilidad de todo el personal médico en tiempo real | Administradores y Personal de Salud |

> 💡 **Tip de Uso:** Puede hacer clic en **Actualizar** en cualquier momento para refrescar la información de forma manual, aunque el sistema se actualiza periódicamente de forma automática.

---

## 12. Preguntas Frecuentes

**¿Por qué no veo todos los módulos en el menú?**  
Cada usuario del sistema únicamente visualiza los módulos correspondientes a su rol. Esto es un comportamiento esperado y está configurado por el Administrador al crear la cuenta. Si considera que le falta acceso a un módulo que necesita para sus funciones, consulte con el Administrador.

---

**¿Qué hago si el paciente no tiene DPI?**  
En situaciones de emergencia, puede ingresar ceros en el campo DPI para registrar al paciente de forma temporal e iniciar su atención de inmediato. Una vez que el paciente esté estabilizado, complete el registro formal con sus datos reales utilizando la opción **Completar datos y crear cuenta** (sección 9.3).

---

**¿Puedo despachar una receta si el paciente dice que ya pagó?**  
No. El sistema valida el estado de pago automáticamente. Una receta médica solo se habilita para despacho después de que el pago esté confirmado. Si hay alguna discrepancia, indíquele al paciente que se dirija a la ventanilla de Caja para verificar y confirmar su pago.

---

**¿Qué ocurre si una orden de laboratorio vence?**  
Una orden vencida no puede ser procesada por el sistema. El laboratorista debe notificar al médico tratante para que emita una nueva orden. Todas las órdenes de laboratorio tienen una validez de **30 días** desde su fecha de emisión.

---

**¿El sistema notifica al paciente cuando sus resultados están listos?**  
Sí, de forma automática. El sistema envía una notificación por correo electrónico al paciente tan pronto como el laboratorista carga los resultados y hace clic en **Guardar y Enviar al Paciente**. Por esta razón, es fundamental capturar correctamente el correo electrónico del paciente durante el registro inicial.

---

**¿Qué debo hacer al final de mi turno?**  
1. Si es médico o laboratorista, desactive su disponibilidad usando el interruptor correspondiente en su módulo.
2. Cierre sesión usando el botón **Salir** en la barra superior o el ícono de logout en el menú lateral.
3. No deje la sesión abierta en la computadora. Esto protege la información confidencial de los pacientes.

---

**¿Puedo cerrar y volver a abrir la pantalla de sala de espera?**  
Sí. Utilice el botón **Pantalla de Sala** en el módulo de Monitoreo de Cola cuantas veces sea necesario. Al abrirla nuevamente, se sincronizará automáticamente con el estado actual de la cola de atención.

---

*Manual de Usuario — BioCore Medical System — Versión 2.2 — Mayo 2026*  
*Para soporte técnico, contacte al Administrador del sistema.*
