# Manual de Usuario — BioCore Medical System

> Guía Operativa para el Personal del Hospital  
> Versión 2.2 · Confidencial — Uso Interno

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

**BioCore Medical System** es la plataforma digital de gestión hospitalaria del hospital. Su propósito es centralizar y agilizar todos los procesos de atención al paciente en un solo lugar, eliminando el uso de papel y reduciendo los tiempos de espera.

### ¿Qué procesos cubre el sistema?

| Área | Lo que hace BioCore |
|------|---------------------|
| **Recepción** | Registro de pacientes y asignación de turnos en cola |
| **Consulta Médica** | Gestión de la cola, emisión de prescripciones y órdenes de laboratorio |
| **Laboratorio** | Seguimiento de órdenes, recolección de muestras y carga de resultados |
| **Farmacia** | Venta de medicamentos y despacho de recetas médicas |
| **Caja** | Agendamiento de citas, cobros y aplicación de seguros |
| **Emergencias** | Registro rápido de pacientes urgentes y reportes clínicos |
| **Portal del Paciente** | Acceso personal a citas, recetas y resultados de laboratorio |
| **Administración** | Gestión de personal, clínicas, reportería y estadísticas en tiempo real |

### ¿Cómo accede al sistema?

Abra su navegador web (Chrome, Firefox o Edge) e ingrese a la dirección que le proporcionó el administrador del hospital. Verá la pantalla de bienvenida de **BioCore Medical**.

---

## 2. Primeros Pasos — Inicio de Sesión

### 2.1 Cómo iniciar sesión

1. En la pantalla de bienvenida, haga clic en el botón **Ingresar** o navegue directamente a la sección de acceso.
2. Ingrese su **Usuario** y **Contraseña** en los campos correspondientes.
3. Haga clic en el botón **Iniciar Sesión**.
4. El sistema lo redirigirá automáticamente al área correspondiente a su rol.

> **Nota:** Sus credenciales de acceso (usuario y contraseña temporal) son proporcionadas por el Administrador del sistema. Guárdelas en un lugar seguro y no las comparta con nadie.

---

### 2.2 Cambio de contraseña obligatorio (primer ingreso)

Si es la primera vez que ingresa al sistema o si el administrador reinició su contraseña, verá automáticamente el formulario **Cambiar Contraseña** después de iniciar sesión.

> ⚠️ **Importante:** Este paso es obligatorio. No podrá acceder al sistema hasta completarlo. El sistema detecta que su contraseña es temporal y le exige establecer una nueva antes de continuar.

**Pasos para cambiar su contraseña:**

1. En el campo **Contraseña actual (temporal)**, ingrese la contraseña que le fue proporcionada.
2. En el campo **Nueva contraseña**, ingrese la contraseña que desea usar de ahora en adelante.
3. En el campo **Confirmar nueva contraseña**, repita su nueva contraseña.
4. Haga clic en **Cambiar Contraseña**.
5. El sistema confirmará el cambio y lo llevará directamente a su área de trabajo.

**Recomendaciones para su nueva contraseña:**
- Mínimo 8 caracteres
- Combine letras mayúsculas, minúsculas y números
- No use su nombre ni fecha de nacimiento
- No comparta su contraseña con compañeros de trabajo

---

## 3. Navegación General

Una vez dentro del sistema, verá dos elementos siempre presentes:

### Barra lateral izquierda (Menú de Navegación)
Contiene los accesos directos a todos los módulos disponibles para su rol. Solo verá las secciones a las que tiene permiso. Al final del menú, en la parte inferior, aparece su **nombre y cargo** junto al botón de cierre de sesión.

### Barra superior (Topbar)
Muestra el nombre del sistema y el botón **Salir** para cerrar sesión de forma segura.

> **Consejo:** Siempre cierre sesión al terminar su turno usando el botón **Salir** o el ícono de logout en la parte inferior del menú. Nunca deje el sistema abierto sin supervisión.

---

## 4. Recepción y Enfermería

> **Roles:** Personal de Salud (Recepcionista) · Enfermería

Esta sección cubre el flujo de atención desde que el paciente llega al hospital hasta que está listo para ver al médico. Acceda desde el menú lateral haciendo clic en **Recepción**.

---

### 4.1 Registrar un Paciente

El sistema identifica a cada paciente por su **DPI (número de identificación personal de 13 dígitos)**. Antes de crear un turno, siempre debe identificar o registrar al paciente.

#### Paso 1 — Buscar al paciente por DPI

1. En la pestaña **Recepción**, ingrese al **Paso 1: Identificación**.
2. Escriba los **13 dígitos del DPI** del paciente en el campo correspondiente.
3. Haga clic en **Buscar**.

**El sistema tiene dos posibles respuestas:**

**a) Paciente encontrado (ya existe en el sistema):**
- Los datos del paciente se cargarán automáticamente en el formulario.
- Revise que la información esté actualizada (teléfono, correo, seguro médico).
- Si necesita modificar algo, actualice los campos y haga clic en **Guardar Cambios**.
- Si todo está correcto, haga clic en **Continuar al Paso 2**.

**b) Paciente nuevo (no existe en el sistema):**
- El sistema le indicará que no encontró al paciente.
- Aparecerá el formulario completo para registrarlo. Pase al siguiente punto.

#### Paso 2 — Registrar un paciente nuevo

Complete los siguientes campos del formulario:

| Campo | ¿Obligatorio? | Descripción |
|-------|:-------------:|-------------|
| **Nombres** | ✓ | Nombre(s) del paciente |
| **Apellidos** | ✓ | Apellido(s) del paciente |
| **DPI** | ✓ | 13 dígitos sin espacios |
| **Fecha de nacimiento** | — | Formato: DD/MM/AAAA |
| **Teléfono** | — | Número de contacto |
| **Correo electrónico** | — | Para notificaciones de resultados |
| **Contacto de emergencia** | — | Nombre del familiar |
| **Teléfono de emergencia** | — | Teléfono del familiar |
| **Seguro médico** | — | Seleccione de la lista si aplica |
| **Número de póliza** | — | Si tiene seguro, ingrese el número |

Una vez completado:
1. Haga clic en **Registrar Paciente**.
2. El sistema generará automáticamente un **código de paciente** (ej. PAC-00042) y, si se marcó la opción de crear cuenta portal, generará también las credenciales de acceso para el paciente.
3. Si se generaron credenciales, anótelas y entréguelas al paciente de forma segura.

---

### 4.2 Crear un Turno en la Cola de Atención

Una vez identificado o registrado el paciente, debe asignarle un turno en la cola.

1. En la pestaña **Recepción**, complete el **Paso 2: Asignación de Turno**.
2. Seleccione la **Clínica de destino** (Medicina General, Pediatría, etc.).
3. Indique el **Tipo de consulta** (Consulta, Control, Laboratorio).
4. Si el paciente requiere atención urgente, marque la opción **Urgente**.

   > ⚠️ **Pacientes marcados como URGENTE** pasan automáticamente al frente de la cola de atención, por encima de todos los turnos normales.

5. Agregue **notas** si el médico necesita contexto previo (opcional).
6. Haga clic en **Crear Turno**.
7. El sistema generará un número de turno (ej. T-00087) y el paciente quedará en estado **En Espera**.

---

### 4.3 Llamar a un Paciente para Signos Vitales

Cuando el médico esté disponible, el siguiente paso es llamar al paciente para registrar sus signos vitales antes de la consulta.

1. Vaya a la pestaña **Llamada a Signos Vitales**.
2. Seleccione la **Clínica** correspondiente en el selector.
3. Haga clic en **Llamar Siguiente**.
4. El sistema anunciará automáticamente al siguiente paciente en la pantalla de sala de espera.

---

### 4.4 Registrar Signos Vitales

> ⚠️ **Obligatorio:** El paciente NO puede pasar a consulta médica sin que sus signos vitales estén registrados. Este es un requisito del sistema.

1. Una vez que el paciente esté frente a usted, busque su turno en la lista.
2. Haga clic en el turno del paciente para expandirlo.
3. Complete el formulario de signos vitales con los valores medidos:

| Signo Vital | Unidad |
|-------------|--------|
| **Presión arterial** | ej. 120/80 |
| **Frecuencia cardíaca** | ppm |
| **Temperatura** | °C |
| **Peso** | kg |
| **Talla / Altura** | cm |
| **Saturación de oxígeno** | % |

4. Haga clic en **Guardar Signos Vitales**.
5. El paciente cambiará automáticamente al estado **Listo para Médico** y aparecerá en la cola del médico correspondiente.

---

## 5. Consulta Médica

> **Rol:** Médico (DOCTOR)

Acceda desde el menú lateral haciendo clic en **Consulta Médica** (para clínicas regulares) o **Emergencias Médicas** (si está asignado a urgencias).

---

### 5.1 Activar su Disponibilidad

Antes de empezar a atender pacientes, debe marcar que está disponible.

1. En la pantalla de Consulta Médica, busque el interruptor **Disponible / No Disponible**.
2. Actívelo para empezar a recibir pacientes.
3. Desactívelo cuando salga a descanso o termine su turno.

> **Nota:** Solo cuando usted esté marcado como disponible, el sistema le asignará pacientes de su clínica.

---

### 5.2 Ver la Cola de Pacientes

En la pantalla principal verá dos secciones:

- **Pacientes Listos para Consulta:** Pacientes que ya tienen sus signos vitales registrados y esperan ser llamados por usted.
- **Cola General:** Vista completa del estado de todos los turnos en su clínica.

---

### 5.3 Llamar a un Paciente a Consulta

1. En la lista de **Pacientes Listos**, identifique al siguiente paciente (respetando el orden de llegada y dando prioridad a los marcados como **URGENTE**).
2. Haga clic en el botón **Llamar a Consulta** junto al nombre del paciente.
3. El número de turno del paciente aparecerá en la pantalla de sala de espera.
4. El paciente pasará al estado **Siendo Llamado**.

Si el paciente no se presenta:
- Haga clic en **Marcar como Ausente**.
- El turno quedará en estado **Ausente** y el sistema registrará la inasistencia.

---

### 5.4 Registrar la Consulta

Mientras atiende al paciente, puede:

#### Ver los signos vitales
Los signos vitales registrados por enfermería aparecen automáticamente en el perfil del turno. No necesita volver a tomarlos a menos que desee actualizarlos.

#### Emitir una Prescripción Médica

1. En la pantalla del turno activo, haga clic en **Nueva Prescripción**.
2. Para cada medicamento, haga clic en **Agregar Medicamento**.
3. Puede elegir entre:
   - **Buscar en catálogo:** Seleccione el medicamento de la lista del hospital.
   - **Medicamento personalizado:** Escriba el nombre manualmente (para medicamentos fuera del catálogo).
4. Complete los campos:
   - **Cantidad:** Número de unidades.
   - **Dosis:** Ej. "500mg".
   - **Instrucciones:** Ej. "Tomar 1 tableta cada 8 horas con alimentos".
5. Agregue todos los medicamentos necesarios.
6. En el campo **Notas de la receta**, puede agregar observaciones generales.
7. Haga clic en **Guardar Prescripción**.

> **Recuerde:** La receta quedará en estado **Pendiente** hasta que el paciente la pague en caja y la retire en farmacia.

#### Generar una Orden de Laboratorio

1. Haga clic en **Nueva Orden de Laboratorio**.
2. Seleccione el **tipo de examen** de la lista de exámenes disponibles.
3. El sistema completará automáticamente el tipo de muestra requerida (sangre, orina, etc.).
4. Agregue **notas** si necesita indicaciones especiales para el laboratorio.
5. Haga clic en **Guardar Orden**.

> ⚠️ **Advertencia:** Las órdenes de laboratorio tienen una validez de **30 días** a partir de la fecha de emisión. Si el paciente no realiza el examen en ese plazo, la orden expirará y deberá emitirse una nueva.

---

### 5.5 Finalizar la Consulta

1. Una vez completada la atención, haga clic en **Finalizar Consulta**.
2. El turno pasará al estado **Completado** y se liberará el espacio para el siguiente paciente.

---

## 6. Laboratorio

> **Rol:** Laboratorista (LAB_TECHNICIAN)

Acceda desde el menú lateral haciendo clic en **Laboratorio**.

---

### 6.1 Revisar Órdenes Pendientes

Al ingresar al módulo verá la pestaña **Pendientes**, que muestra todas las órdenes de laboratorio emitidas por los médicos que aún no han sido procesadas.

Cada orden muestra:
- Nombre del paciente y código
- Tipo de examen solicitado
- Tipo de muestra necesaria
- Médico que la ordenó
- Fecha de la orden y fecha de vencimiento

> ⚠️ **Revise la fecha de vencimiento:** Las órdenes expiran a los **30 días**. Las órdenes próximas a vencer aparecen destacadas. No procese órdenes ya vencidas.

---

### 6.2 Activar su Disponibilidad

Al igual que los médicos, debe marcar que está disponible para recibir pacientes de laboratorio.

1. En la pantalla principal, active el interruptor **Disponible**.
2. Desactívelo cuando salga a descanso o al final de su turno.

---

### 6.3 Registrar la Recolección de Muestra

Cuando el paciente llegue a entregar su muestra:

1. Localice la orden del paciente en la lista de **Pendientes**.
2. Haga clic en **Recolectar Muestra**.
3. Confirme la acción. El estado de la orden cambiará a **Muestra Recolectada**.

---

### 6.4 Programar el Examen (si aplica)

Para exámenes que requieren cita previa o procesamiento diferido:

1. Haga clic en **Programar**.
2. Seleccione la **fecha y hora** en que se realizará el examen.
3. Haga clic en **Confirmar Programación**.
4. El estado cambiará a **Programado**.

---

### 6.5 Cargar los Resultados

Una vez procesado el examen:

1. Localice la orden en la lista (puede estar en estado **Muestra Recolectada** o **Programado**).
2. Haga clic en **Cargar Resultados**.
3. En el panel que aparece:
   - Escriba las **notas del resultado** (interpretación, valores obtenidos).
   - Haga clic en **Seleccionar archivo PDF** y elija el archivo de resultados desde su computadora.

   > ⚠️ **Solo se aceptan archivos en formato PDF** con un tamaño máximo de **20 MB**.

4. Haga clic en **Guardar Resultados**.
5. El estado cambiará a **Completado**.
6. El sistema enviará automáticamente una notificación por correo electrónico al paciente informando que sus resultados están disponibles.

---

## 7. Farmacia

> **Rol:** Farmacéutico (PHARMACIST)

Acceda desde el menú lateral haciendo clic en **Farmacia**.

Hay dos tipos de venta en el módulo de farmacia:

---

### 7.1 Venta Libre (OTC — Sin Receta)

Para medicamentos que no requieren receta médica:

1. Vaya a la pestaña **Venta Libre**.
2. Busque el medicamento por nombre o categoría usando el campo de búsqueda.
3. Puede filtrar por **Categoría** (Antibióticos, Analgésicos, etc.) para facilitar la búsqueda.
4. Haga clic en **Agregar** junto al medicamento deseado.
5. En la ventana que aparece, ingrese la **cantidad** solicitada.

   > **Nota:** El sistema muestra el stock disponible de cada medicamento. No se puede vender más del stock existente.

6. Repita los pasos 3-5 para cada medicamento adicional.
7. Revise el resumen del carrito que aparece en el panel derecho:
   - Lista de medicamentos y cantidades
   - Subtotal por ítem
   - **Total a pagar**
8. Seleccione el **método de pago**: Efectivo, Tarjeta de Débito o Tarjeta de Crédito.
9. Si el cliente tiene seguro médico, indique el **ID del paciente** para aplicar el descuento correspondiente.
10. Haga clic en **Confirmar Venta**.
11. El sistema generará un número de factura y descontará automáticamente las unidades del inventario.

---

### 7.2 Despacho con Receta Médica

Para medicamentos prescritos por un médico del hospital:

1. Vaya a la pestaña **Prescripciones Pendientes**.
2. Verá la lista de todas las recetas emitidas por los médicos que están pendientes de despacho.

> ⚠️ **Importante:** Solo puede despachar una receta si el paciente **ya realizó el pago en caja**. Si la receta aparece marcada como **Pendiente de Pago**, indíquele al paciente que primero debe pagar en el módulo de Caja.

3. Localice la receta del paciente (puede buscar por nombre o código de receta).
4. Haga clic sobre la receta para expandir el detalle.
5. Verá la lista de medicamentos prescritos. Para cada ítem:
   - Verifique que haya suficiente stock.
   - Marque la casilla junto a los medicamentos que va a despachar.
6. Si solo puede despachar una parte de los medicamentos (por falta de stock), marque únicamente los disponibles. La receta quedará en estado **Parcialmente Despachada**.
7. Haga clic en **Despachar Seleccionados**.
8. Confirme la acción.
9. Entregue los medicamentos al paciente junto con las instrucciones indicadas en la receta.

---

## 8. Caja y Pagos

> **Rol:** Cajero (CASHIER)

Acceda desde el menú lateral haciendo clic en **Caja / Pagos**.

El módulo de caja maneja cuatro tipos de cobro: **Citas**, **Laboratorio**, **Farmacia** y **Emergencias**.

---

### 8.1 Buscar al Paciente

Todos los flujos de pago comienzan identificando al paciente:

1. En el campo **DPI del Paciente**, ingrese los 13 dígitos.
2. Haga clic en **Buscar**.
3. El sistema cargará los datos del paciente, incluyendo su **seguro médico activo** y el **porcentaje de descuento** que le corresponde.

> **El descuento por seguro se aplica automáticamente.** No necesita calcularlo manualmente. BioCore lo calcula y lo muestra en el desglose del pago.

---

### 8.2 Agendar y Cobrar una Cita Presencial

1. En la pestaña **Citas Presenciales**, busque al paciente por DPI.
2. Seleccione la **Clínica** a la que desea asistir.
3. Seleccione la **Fecha** de la cita en el calendario.
4. El sistema mostrará los **horarios disponibles** para esa clínica y fecha. Seleccione uno.
5. Revise el resumen:
   - Monto de la consulta
   - Descuento por seguro (si aplica)
   - **Total a pagar**
6. Seleccione el **método de pago**: Efectivo, Tarjeta de Débito o Tarjeta de Crédito.
7. Haga clic en **Procesar Pago**.
8. El sistema generará un **número de factura** y un **comprobante de cita**. Entréguelo al paciente.

---

### 8.3 Cobrar Examen de Laboratorio

1. Vaya a la pestaña **Laboratorio**.
2. Busque al paciente por DPI.
3. Seleccione la **orden de laboratorio** pendiente de pago que aparece en la lista.
4. Seleccione fecha y hora si el examen requiere cita programada.
5. Revise el desglose con el descuento aplicado automáticamente.
6. Seleccione el método de pago y haga clic en **Procesar Pago**.

---

### 8.4 Procesar Pago de Farmacia

1. Vaya a la pestaña **Farmacia**.
2. Busque al paciente por DPI.
3. Las recetas pendientes de pago del paciente aparecerán en la lista.
4. Seleccione la receta a pagar.
5. Revise el monto total con descuento de seguro.
6. Procese el pago. Una vez confirmado, el sistema habilitará el despacho en farmacia.

---

### 8.5 Cobro de Emergencias

1. Vaya a la pestaña **Emergencias**.
2. Busque al paciente o al registro de emergencia.
3. Procese el pago de los servicios de urgencia prestados.

---

### 8.6 Historial de Pagos

En la pestaña **Historial** puede consultar todos los pagos procesados, filtrar por fecha o paciente, y ver el detalle de cada factura emitida.

---

## 9. Emergencias

> **Roles:** Personal de Salud · Enfermería · Doctor de Emergencias

El módulo de emergencias permite atender pacientes que llegan en estado de urgencia sin necesidad de pasar por el proceso de registro normal.

---

### 9.1 Registro Rápido de Paciente de Emergencia (Recepción)

Acceda desde el menú lateral haciendo clic en **Emergencias**.

1. Haga clic en **Registrar Emergencia**.
2. Complete los datos mínimos del paciente:
   - **Nombre** (si el paciente puede comunicarlo o lo porta en identificación).
   - **DPI** (si está disponible; puede ingresar ceros si se desconoce en el momento).
   - **Motivo de la emergencia** (descripción breve del estado del paciente).
3. El sistema marcará automáticamente el turno como **URGENTE** y lo colocará al frente de todas las colas.
4. Proceda inmediatamente a registrar los **signos vitales iniciales** (siga el mismo proceso descrito en la sección 4.4).

---

### 9.2 Elaborar el Reporte Médico de Emergencia (Doctor)

Acceda desde el menú lateral haciendo clic en **Emergencias Médicas**.

1. Verá la lista de casos de emergencia asignados a usted.
2. Haga clic en el caso del paciente que está atendiendo.
3. Complete el **Reporte Médico de Emergencia**:
   - **Diagnóstico:** Describa el diagnóstico clínico.
   - **Tratamiento:** Indique los procedimientos realizados.
   - **Medicamentos administrados:** Liste los medicamentos usados durante la atención.
4. Haga clic en **Guardar Reporte**.

> **Nota:** Una vez guardado el reporte, el sistema enviará automáticamente una copia al correo del paciente si este tiene dirección registrada.

---

### 9.3 Completar el Registro del Paciente (si no estaba registrado)

Si el paciente atendido en emergencias no tenía expediente previo en el sistema:

1. Dentro del caso de emergencia, haga clic en **Registrar Paciente Formalmente**.
2. Complete el formulario completo con los datos del paciente ahora que la situación lo permite.
3. Haga clic en **Guardar**. El paciente quedará registrado con su código permanente en el sistema.

---

## 10. Portal del Paciente

> **Rol:** Paciente (PATIENT)

Los pacientes que cuentan con una cuenta en el sistema pueden acceder a su información personal desde cualquier dispositivo con navegador.

---

### 10.1 Cómo Acceder

1. Abra su navegador e ingrese a la dirección del sistema que le proporcionó el hospital.
2. Haga clic en **Ingresar**.
3. Use el **usuario** y la **contraseña temporal** que le entregó el personal de recepción.

> ⚠️ **En su primer ingreso** el sistema le pedirá que cambie su contraseña temporal. Siga las instrucciones de la sección [2.2](#22-cambio-de-contraseña-obligatorio-primer-ingreso) de este manual.

---

### 10.2 Ver Mis Citas

1. En el menú, haga clic en **Mis Citas**.
2. Verá el listado de todas sus citas: pasadas, actuales y próximas.
3. Cada cita muestra:
   - Fecha y hora
   - Clínica y médico asignado
   - Estado (Confirmada, En Proceso, Completada)

---

### 10.3 Ver Mis Prescripciones

En la misma sección **Mis Citas**, encontrará una pestaña **Recetas** donde puede ver todas las prescripciones emitidas por su médico, incluyendo los medicamentos, dosis e instrucciones.

---

### 10.4 Ver y Descargar Resultados de Laboratorio

1. En la sección **Mis Citas**, haga clic en la pestaña **Laboratorio**.
2. Verá el historial de todas sus órdenes de laboratorio.
3. Cuando un resultado esté disponible, el estado mostrará **Completado** y aparecerá el botón **Descargar PDF**.
4. Haga clic en **Descargar PDF** para obtener su resultado en formato digital.

> **Nota:** El hospital también le enviará una notificación a su correo electrónico cuando sus resultados estén listos.

---

## 11. Dashboard y Monitoreo

### 11.1 Dashboard Administrativo

> **Rol:** Administrador · Todo el personal con acceso

Acceda desde el menú lateral haciendo clic en **Dashboard**.

El dashboard muestra estadísticas del día en tiempo real, actualizadas automáticamente cada 10 segundos:

| Tarjeta | Qué indica |
|---------|-----------|
| **Pacientes Hoy** | Total de pacientes atendidos en el día |
| **En Espera** | Pacientes actualmente en la cola |
| **En Consulta** | Pacientes siendo atendidos en este momento |
| **Atendidos** | Consultas finalizadas en el día |
| **Ausentes** | Pacientes que no se presentaron |
| **Pagos Hoy** | Total de cobros procesados en el día |

También muestra en tiempo real los **pacientes siendo llamados en este momento** (turnos con estado "Siendo Llamado").

**Acciones Rápidas disponibles desde el Dashboard:**
- **Registrar Paciente** → acceso directo al formulario de registro
- **Buscar Paciente** → ir al listado de pacientes
- **Emergencia** → registro rápido de urgencia (solo personal de salud)
- **Reportes** → ir al módulo de reportería (solo administradores)

---

### 11.2 Pantalla de Sala de Espera (Display TV)

La pantalla de sala de espera es una vista especial diseñada para mostrarse en los televisores o monitores de las salas de espera del hospital.

**¿Cómo activarla?**
1. Desde el módulo de **Monitoreo de Cola**, haga clic en el botón **Pantalla de Sala** (ícono de televisor).
2. Se abrirá una nueva ventana en pantalla completa mostrando los turnos activos.
3. Coloque esa ventana en el monitor de la sala de espera.

**¿Qué muestra la pantalla?**
- El turno que se está llamando en ese momento (número grande y visible).
- La clínica o área a la que debe dirigirse el paciente.
- Los últimos turnos llamados (historial reciente).
- Hora actual del sistema.

> **Nota:** La pantalla de sala de espera se actualiza automáticamente cada vez que se llama a un nuevo paciente. No necesita recargar manualmente.

---

### 11.3 Monitoreo de Cola (Para todo el personal)

Acceda haciendo clic en **Monitoreo de Cola** en el menú lateral.

Este módulo permite a cualquier usuario con acceso ver el estado en tiempo real de todos los turnos del día.

**Pestaña Cola:** Muestra todos los tickets activos del día con su estado actual.

**Pestaña Personal** *(solo visible para Administradores y Personal de Salud):* Muestra el estado de disponibilidad de todo el personal médico.

Puede hacer clic en **Actualizar** en cualquier momento para refrescar la información manualmente, aunque el sistema se actualiza solo periódicamente.

---

## 12. Preguntas Frecuentes

**¿Qué hago si olvidé mi contraseña?**
Comuníquese con el **Administrador del sistema**. Él podrá restablecer su contraseña y le generará una temporal nueva.

---

**¿Por qué no veo todos los módulos del menú?**
Cada usuario solo ve las secciones correspondientes a su rol. Esto es normal y se configura al momento de crear su cuenta. Si cree que le falta acceso a un módulo que necesita, consulte con el Administrador.

---

**¿Qué pasa si el paciente no tiene DPI?**
En el caso de emergencias, puede ingresar ceros en el campo DPI para registrar al paciente temporalmente. Una vez estabilizado, complete el registro formal con sus datos reales.

---

**¿Puedo despachar una receta si el paciente dice que ya pagó?**
No. El sistema lo valida automáticamente. Una receta solo se habilita para despacho después de que el pago esté confirmado en el módulo de Caja. Si hay un problema, pídale al paciente que vaya a la ventana de Caja para verificar su pago.

---

**¿Qué pasa si una orden de laboratorio vence?**
Una orden vencida no puede procesarse. El laboratorista debe notificar al médico para que emita una nueva orden. Las órdenes tienen validez de **30 días** desde su fecha de emisión.

---

**¿El sistema notifica al paciente cuando sus resultados de laboratorio están listos?**
Sí, automáticamente. El sistema envía un correo electrónico al paciente cuando el laboratorista marca la orden como completada. Por eso es importante capturar el correo electrónico del paciente al momento del registro.

---

**¿Puedo cerrar la pantalla de sala de espera y volver a abrirla?**
Sí. Use el botón **Pantalla de Sala** en el módulo de Monitoreo de Cola las veces que necesite. Al abrirla, se sincronizará automáticamente con el estado actual de la cola.

---

**¿Qué debo hacer al final de mi turno?**
1. Si es médico o laboratorista, desactive su disponibilidad usando el interruptor correspondiente.
2. Cierre sesión usando el botón **Salir** en la barra superior o el ícono de logout en el menú lateral.
3. No deje la sesión abierta en la computadora.

---

*Manual de Usuario BioCore Medical System — v2.2 — 2026*  
*Para soporte técnico, contacte al Administrador del sistema.*
