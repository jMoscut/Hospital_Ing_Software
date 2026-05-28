# BioCore Medical — Diagramas de Procesos por Caso de Uso

Cada diagrama muestra el flujo de acciones por **rol** que ejecuta el proceso.
Los subgrafos representan los actores. Las flechas indican la secuencia de pasos.

---

## CU 00 — Portal Web

**Roles:** Paciente Externo · Sistema

```mermaid
flowchart TD
    subgraph PAC["👤 Paciente Externo"]
        s0([Inicio])
        t1[Clic en Ingresar]
        greg{"¿Ya registrado?"}
        tlogin[Ingresar Login y Password]
        treg1["Registrarse en Línea · FA01"]
        treg2[Ingresar datos del formulario]
        treg3[Crear credenciales y Completar]
        tserv[Seleccionar Servicio y Clínica]
        tfecha[Elegir Fecha y Horario]
        tpago[Ingresar datos de pago y clic Pagar]
        gpago{"¿Pago exitoso?"}
        eok(["✅ Cita Confirmada — correo enviado"])
        enopago(["❌ Cita Cancelada · FA08"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys2[Mostrar Form. Iniciar Sesión]
        sys3["Verificar Credenciales · RN-1 · RN-9"]
        gcred{"¿Credenciales correctas?"}
        sys4[Mostrar Dashboard Paciente — Portal]
        sys5[Mostrar Calendario Interactivo]
        sys6["Reservar horario 10 min · RN-19"]
        sys7["Validar y Procesar Pago · RN-7"]
    end

    s0 --> t1 --> sys2 --> greg
    greg -->|Sí| tlogin --> sys3
    greg -->|No| treg1 --> treg2 --> treg3 --> sys3
    sys3 --> gcred
    gcred -->|Incorrectas · FA02| sys2
    gcred -->|Correctas| sys4 --> tserv --> sys5 --> tfecha --> sys6 --> tpago --> sys7 --> gpago
    gpago -->|Pago exitoso| eok
    gpago -->|No paga| enopago
```

---

## CU 01 — Registro de Pacientes

**Roles:** Personal de Salud · Sistema

```mermaid
flowchart TD
    subgraph PS["🏥 Personal de Salud"]
        s0([PS autenticado en Sistema])
        t1[Ir a pestaña Recepción]
        t2[Ingresar DPI del Paciente y clic Buscar]
        gdpi{"¿DPI existe en sistema?"}
        tedit[Ver y Editar — actualizar datos]
        treg[Clic Registrar Nuevo Paciente]
        tform["Ingresar datos: Nombres, Apellidos, Teléfono, Correo, Dirección, Seguro"]
        eok(["✅ Paciente registrado — Credenciales enviadas al correo"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Mostrar Form. Identificar por DPI]
        sys2["Validar DPI en BD · RN-10"]
        sys3[Mostrar datos del paciente existente]
        sys4[Mostrar Form. Registro Nuevo Paciente]
        sys5["Crear registro y generar credenciales temporales · RN-1 · RN-2"]
    end

    s0 --> t1 --> sys1 --> t2 --> sys2 --> gdpi
    gdpi -->|"Existe · FA02"| sys3 --> tedit --> eok
    gdpi -->|No encontrado| treg --> sys4 --> tform --> sys5 --> eok
```

---

## CU 02 — Mantenimiento de Usuario

**Roles:** Administrador · Sistema

```mermaid
flowchart TD
    subgraph ADM["🔐 Administrador"]
        s0([Admin autenticado])
        t1[Ir a pestaña Personal]
        gacc{"¿Acción?"}
        tnu["Completar Form. Nuevo Usuario · RN-1 · RN-2 · RN-11"]
        trol[Seleccionar Rol del usuario]
        tgrd[Clic Guardar Usuario]
        gedit{"¿Acción sobre usuario existente?"}
        tedit[Editar Información y Guardar]
        tdes[Desactivar Usuario]
        treasig["Asignar o Reasignar Clínica a Médico · RN-12 · RN-13 · RN-14"]
        eok(["✅ Usuario gestionado exitosamente"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Mostrar Gestión de Personal]
        sys2[Validar datos y Crear Usuario]
        sys3[Listar personal registrado]
        sys4[Aplicar cambio seleccionado]
        sys5[Confirmar acción realizada]
    end

    s0 --> t1 --> sys1 --> gacc
    gacc -->|Nuevo usuario| tnu --> trol --> tgrd --> sys2 --> eok
    gacc -->|Gestionar existente| sys3 --> gedit
    gedit -->|Editar| tedit --> sys4
    gedit -->|Desactivar| tdes --> sys4
    gedit -->|Reasignar clínica| treasig --> sys4
    sys4 --> sys5 --> eok
```

---

## CU 03 — Gestión de Citas y Pagos

**Roles:** Cajero · Paciente Externo · Sistema

```mermaid
flowchart TD
    subgraph PAC["👤 Paciente Externo"]
        pac0([Paciente llega al hospital])
        pac1[Paciente realiza el pago]
        eok(["✅ Ticket generado — Paciente en lista de espera"])
    end

    subgraph CAJ["💼 Cajero"]
        s0([Cajero autenticado])
        t1[Ir a Caja / Pagos]
        gemer{"¿Es Emergencia?"}
        temer["Procesar cobro de emergencia · CU-06"]
        tdpi["Ingresar DPI y clic Buscar · RN-10"]
        gdpi{"¿DPI encontrado?"}
        treg["Registrar nuevo paciente · CU-01"]
        tedit[Ver y Editar datos del paciente]
        tcita["Seleccionar Servicio, Área, Fecha y Hora · RN-3 · RN-5 · RN-18"]
        tmet[Seleccionar método de pago]
        tcobrar["Cobrar con POS o Efectivo · FA09"]
    end

    subgraph SIS["⚙️ Sistema"]
        sys2["Validar DPI · RN-10"]
        sys3[Mostrar datos del paciente]
        sys4["Calendario de citas — contador 10 min · RN-19"]
        sys5[Mostrar resumen y form. de cobro]
        sys6[Validar pago — Generar Ticket correlativo]
        sys7[Actualizar estado En Espera — Monitor triaje]
    end

    pac0 --> tdpi
    s0 --> t1 --> gemer
    gemer -->|Cita normal| tdpi
    gemer -->|"Emergencia · FA04"| temer
    tdpi --> sys2 --> gdpi
    gdpi -->|Encontrado| sys3 --> tedit --> sys4 --> tcita --> sys5 --> tmet --> tcobrar
    gdpi -->|"No encontrado · FA06"| treg --> sys3
    pac1 --> tcobrar --> sys6 --> sys7 --> eok
```

---

## CU 04 — Toma de Signos Vitales

**Roles:** Personal de Salud · Sistema

```mermaid
flowchart TD
    subgraph PS["🏥 Personal de Salud"]
        s0([PS autenticado])
        t1[Monitoreo de Cola — Seleccionar Clínica]
        t2["Clic Llamar Siguiente Paciente · RN-29 · RN-30"]
        t3[Ir a Recepción > Signos Vitales]
        gaus{"¿Paciente presente?"}
        tsv[Seleccionar paciente — Clic Tomar Signos]
        tform["Ingresar PA, FC, Temperatura, Peso, Talla, SpO2"]
        treg[Clic Registrar y Enviar a Médico]
        glab{"¿Requiere muestra de Laboratorio?"}
        tmues["Recolectar muestra · FA04"]
        eok(["✅ Paciente enviado a cola del Médico"])
        eaus(["❌ Paciente marcado Ausente · RN-23"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Lista pacientes en Signos Vitales]
        sys2["Notificación visual y auditiva · RN-15 · RN-16"]
        sys3[Mostrar Form. Signos Vitales]
        sys4[Registrar signos — Estado: Listo para Médico]
    end

    s0 --> t1 --> sys1 --> t2 --> sys2 --> t3 --> sys3 --> gaus
    gaus -->|Presente| tsv --> tform --> treg --> glab
    gaus -->|"Ausente · FA03"| eaus
    glab -->|"Sí · FA04"| tmues --> sys4 --> eok
    glab -->|No| sys4 --> eok
```

---

## CU 05 — Consulta Médica

**Roles:** Médico · Paciente · Sistema

```mermaid
flowchart TD
    subgraph MED["👨‍⚕️ Médico"]
        s0([Médico autenticado])
        t1[Ir a Consulta Médica — Ver cola de espera]
        t2["Clic Llamar al Consultorio · RN-25 · RN-22"]
        gaus{"¿Paciente llega?"}
        t3[Clic Iniciar Consulta]
        t4[Ver Diagnóstico y Documentos del Paciente]
        t5[Ingresar Diagnóstico]
        gmed{"¿Requiere Medicamentos?"}
        glab{"¿Requiere Laboratorio?"}
        t6["Agregar Medicamentos a Receta · FA02"]
        t7["Agregar Orden de Laboratorio · FA03"]
        eok(["✅ Consulta completada — Receta y Lab enviados por correo"])
    end

    subgraph PAC["👤 Paciente"]
        pesp[Paciente en sala de espera]
    end

    subgraph SIS["⚙️ Sistema"]
        sys1["Notificación visual y auditiva · RN-26"]
        sys2[Estado: Siendo Llamado → En Consulta]
        sys3[Form. Diagnóstico, Receta y Órdenes Lab]
        sys4[Completar Consulta — Notificar al paciente]
        sys5[Enviar receta y Lab por correo]
    end

    s0 --> t1 --> t2 --> sys1 --> sys2 --> gaus
    pesp -.->|Llamado| gaus
    gaus -->|Presente| t3 --> sys3 --> t4 --> t5 --> gmed
    gaus -->|"Ausente · FA01"| t2
    gmed -->|Sí| t6 --> glab
    gmed -->|No| glab
    glab -->|Sí| t7 --> sys4
    glab -->|No| sys4
    sys4 --> sys5 --> eok
```

---

## CU 06 — Atención de Emergencia

**Roles:** Personal de Salud · Cajero · Médico de Emergencia · Sistema

```mermaid
flowchart TD
    subgraph PS["🏥 Personal de Salud"]
        s0([PS autenticado])
        t1[Ir a Emergencias — Nueva Emergencia]
        tdpi[Ingresar DPI y Buscar en Sistema]
        greg{"¿Paciente registrado?"}
        tnoreg["Registrar sin identificar · FA03"]
        tcont[Continuar con paciente identificado]
        tmotivo[Ingresar Motivo de Emergencia]
        tsv["Ingresar Signos Vitales · RN-21"]
        tactivar["Clic Activar Emergencia · RN-24"]
    end

    subgraph CAJ["💼 Cajero"]
        tcobrar[Procesar cobro de emergencia]
        tconf["Confirmar pago · RN-27"]
    end

    subgraph MED["👨‍⚕️ Médico Emergencia"]
        tmed1["Identificar paciente en Cola · RN-27"]
        trep[Completar Diagnóstico, Tratamiento y Medicamentos]
        tcerrar[Clic Cerrar Reporte]
        eok(["✅ Emergencia cerrada — Reporte enviado al paciente"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Validar DPI en BD]
        sys2[Mostrar datos del paciente]
        sys3["Activar emergencia — Generar ticket — Enviar orden de pago a Caja"]
        sys4[Cambiar estado a Pagado]
        sys5["Notificación visual y auditiva · RN-15 · RN-16"]
        sys6[Registrar reporte en expediente — Ticket: Reporte Cerrado]
    end

    s0 --> t1 --> tdpi --> sys1 --> greg
    greg -->|Registrado| sys2 --> tcont --> tmotivo
    greg -->|"No registrado · FA03"| tnoreg --> tmotivo
    tmotivo --> tsv --> tactivar --> sys3 --> tcobrar --> tconf --> sys4 --> sys5 --> tmed1 --> trep --> tcerrar --> sys6 --> eok
```

---

## CU 07 — Laboratorio

**Roles:** Técnico de Laboratorio · Sistema

```mermaid
flowchart TD
    subgraph TEC["🔬 Técnico de Laboratorio"]
        s0([Técnico autenticado])
        t1[Ir a Laboratorio — Ver Pendientes]
        t2[Seleccionar orden pendiente]
        t3[Clic Adjuntar Resultados]
        t4[Adjuntar PDF de resultados y agregar notas]
        t5[Clic Guardar y Enviar al Paciente]
        eok(["✅ Resultados enviados al paciente por correo"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Mostrar lista de órdenes Pendientes]
        sys2[Desplegar área adjuntar PDF y notas]
        sys3["Registrar resultados — Enviar PDF al correo — Estado: Completado"]
    end

    s0 --> t1 --> sys1 --> t2 --> t3 --> sys2 --> t4 --> t5 --> sys3 --> eok
```

---

## CU 08 — Farmacia

**Roles:** Farmacéutico · Sistema

```mermaid
flowchart TD
    subgraph FAR["💊 Farmacéutico"]
        s0([Farmacéutico autenticado])
        t1[Ir a módulo Farmacia]
        gtipo{"¿Tipo de venta?"}
        tvl[Seleccionar medicamentos — Venta Libre]
        tdr["Buscar receta por código — Estado PENDING · FA02"]
        tdpi[Ingresar DPI del Paciente y clic Buscar]
        tpago["Seleccionar método de pago — POS o Efectivo"]
        tcobrar["Cobrar y despachar medicamentos · RN-28"]
        eok(["✅ Venta completada — Inventario actualizado"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Mostrar Farmacia — Venta Libre, Receta, Inventario]
        sys2[Añadir medicamentos al carrito y sumar total]
        sys3[Validar DPI — Habilitar botones de pago]
        sys4["Validar pago — Venta Completada — Actualizar inventario"]
    end

    s0 --> t1 --> sys1 --> gtipo
    gtipo -->|Venta Libre| tvl --> sys2
    gtipo -->|Con Receta| tdr --> sys2
    sys2 --> tdpi --> sys3 --> tpago --> tcobrar --> sys4 --> eok
```

---

## CU 09 — Reportería

**Roles:** Administrador · Sistema

```mermaid
flowchart TD
    subgraph ADM["🔐 Administrador"]
        s0([Admin autenticado])
        t1[Ir a módulo Reportería]
        garea{"¿Área de reporte?"}
        tpac[Pacientes por Área]
        tfar[Ventas Farmacia]
        tmed[Productividad Médica]
        tlab[Exámenes de Laboratorio]
        tper["Seleccionar Período: Hoy / Semana / Mes / Año"]
        tgen[Clic Generar Reporte]
        texp[Clic Exportar PDF]
        eok(["✅ PDF exportado y guardado"])
    end

    subgraph SIS["⚙️ Sistema"]
        sys1[Mostrar Reportería y Estadística]
        sys2[Generar tabla de datos en pantalla]
        sys3[Mostrar ventana — Guardar como PDF]
    end

    s0 --> t1 --> sys1 --> garea
    garea -->|Pacientes| tpac --> tper
    garea -->|Farmacia| tfar --> tper
    garea -->|Médica| tmed --> tper
    garea -->|Laboratorio| tlab --> tper
    tper --> tgen --> sys2 --> texp --> sys3 --> eok
```

---

## Resumen de Roles por CU

| CU | Nombre | Roles involucrados |
|---|---|---|
| CU 00 | Portal Web | Paciente Externo, Sistema |
| CU 01 | Registro de Pacientes | Personal de Salud, Sistema |
| CU 02 | Mantenimiento de Usuarios | Administrador, Sistema |
| CU 03 | Gestión de Citas y Pagos | Cajero, Paciente Externo, Sistema |
| CU 04 | Toma de Signos Vitales | Personal de Salud (HEALTH_STAFF / NURSE), Sistema |
| CU 05 | Consulta Médica | Médico (DOCTOR), Paciente, Sistema |
| CU 06 | Atención de Emergencia | Personal de Salud, Cajero, Médico Emergencia, Sistema |
| CU 07 | Laboratorio | Técnico de Laboratorio (LAB_TECHNICIAN), Sistema |
| CU 08 | Farmacia | Farmacéutico (PHARMACIST), Sistema |
| CU 09 | Reportería | Administrador (ADMIN), Sistema |
