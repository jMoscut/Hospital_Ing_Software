package com.biocore.config;

import com.biocore.entity.Clinic;
import com.biocore.entity.Insurance;
import com.biocore.entity.LabExam;
import com.biocore.entity.Medicine;
import com.biocore.entity.User;
import com.biocore.enums.ClinicType;
import com.biocore.enums.InsuranceName;
import com.biocore.enums.Role;
import com.biocore.enums.SampleType;
import com.biocore.repository.ClinicRepository;
import com.biocore.repository.InsuranceRepository;
import com.biocore.repository.LabExamRepository;
import com.biocore.repository.MedicineRepository;
import com.biocore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final InsuranceRepository insuranceRepository;
    private final ClinicRepository clinicRepository;
    private final MedicineRepository medicineRepository;
    private final LabExamRepository labExamRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initAdmin();
        initInsurances();
        initClinics();
        initMedicines();
        initLabExams();
    }

    // =========================================================
    // Admin
    // =========================================================
    private void initAdmin() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .firstName("Administrador")
                    .lastName("Sistema")
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("admin@biocore.hospital.gt")
                    .role(Role.ADMIN)
                    .active(true)
                    .build();
            userRepository.save(admin);
            log.info("Admin por defecto creado: admin / admin123");
        }
    }

    // =========================================================
    // Seguros — RN-P01
    // =========================================================
    private void initInsurances() {
        if (!insuranceRepository.existsByName(InsuranceName.EL_ROBLE)) {
            insuranceRepository.save(Insurance.builder()
                    .name(InsuranceName.EL_ROBLE)
                    .discountPercentage(new BigDecimal("10.00"))
                    .description("Seguro El Roble — Descuento 10%")
                    .build());
        }
        if (!insuranceRepository.existsByName(InsuranceName.UNIVERSALES)) {
            insuranceRepository.save(Insurance.builder()
                    .name(InsuranceName.UNIVERSALES)
                    .discountPercentage(new BigDecimal("20.00"))
                    .description("Seguros Universales — Descuento 20%")
                    .build());
        }
        if (!insuranceRepository.existsByName(InsuranceName.GT)) {
            insuranceRepository.save(Insurance.builder()
                    .name(InsuranceName.GT)
                    .discountPercentage(new BigDecimal("25.00"))
                    .description("Seguros G&T — Descuento 25%")
                    .build());
        }
        log.info("Seguros médicos inicializados");
    }

    // =========================================================
    // Clínicas
    // =========================================================
    private void initClinics() {
        if (!clinicRepository.existsByType(ClinicType.EXTERNAL_CONSULTATION))
            clinicRepository.save(Clinic.builder().name("Consulta Externa").type(ClinicType.EXTERNAL_CONSULTATION)
                    .maxDoctors(5).description("Clínica de consulta externa general").build());
        if (!clinicRepository.existsByType(ClinicType.GENERAL_MEDICINE))
            clinicRepository.save(Clinic.builder().name("Medicina General").type(ClinicType.GENERAL_MEDICINE)
                    .maxDoctors(3).description("Clínica de medicina general").build());
        if (!clinicRepository.existsByType(ClinicType.LABORATORY))
            clinicRepository.save(Clinic.builder().name("Laboratorio").type(ClinicType.LABORATORY)
                    .maxDoctors(4).description("Laboratorio clínico").build());
        if (!clinicRepository.existsByType(ClinicType.PHARMACY))
            clinicRepository.save(Clinic.builder().name("Farmacia").type(ClinicType.PHARMACY)
                    .maxDoctors(2).description("Farmacia del hospital").build());
        if (!clinicRepository.existsByType(ClinicType.EMERGENCY))
            clinicRepository.save(Clinic.builder().name("Emergencias").type(ClinicType.EMERGENCY)
                    .maxDoctors(6).description("Área de emergencias").build());
        log.info("Clínicas verificadas/inicializadas");
    }

    // =========================================================
    // Catálogo de Medicamentos — FAR-001 … FAR-045
    // =========================================================
    private void initMedicines() {
        if (medicineRepository.existsByCode("FAR-001")) return;

        List<Medicine> meds = List.of(
            med("FAR-001","Paracetamol 500 mg","Tableta","Analgésico / Antipirético",100,new BigDecimal("2.50"),"Tableta"),
            med("FAR-002","Paracetamol 120 mg/5 ml","Jarabe 60 ml","Analgésico / Antipirético",50,new BigDecimal("15.00"),"Frasco"),
            med("FAR-003","Ibuprofeno 400 mg","Tableta","AINE",80,new BigDecimal("3.00"),"Tableta"),
            med("FAR-004","Ibuprofeno 200 mg/5 ml","Suspensión 120 ml","AINE",40,new BigDecimal("18.00"),"Frasco"),
            med("FAR-005","Diclofenaco 50 mg","Tableta","AINE",70,new BigDecimal("3.50"),"Tableta"),
            med("FAR-006","Diclofenaco 75 mg/3 ml","Inyectable","AINE",30,new BigDecimal("12.00"),"Ampolla"),
            med("FAR-007","Naproxeno 500 mg","Tableta","AINE",60,new BigDecimal("4.00"),"Tableta"),
            med("FAR-008","Ketorolaco 30 mg/ml","Inyectable","AINE",25,new BigDecimal("14.00"),"Ampolla"),
            med("FAR-009","Amoxicilina 500 mg","Cápsula","Antibiótico",90,new BigDecimal("5.00"),"Cápsula"),
            med("FAR-010","Amoxicilina 250 mg/5 ml","Suspensión 60 ml","Antibiótico",45,new BigDecimal("22.00"),"Frasco"),
            med("FAR-011","Amoxicilina + Ác. clavulánico 875/125 mg","Tableta","Antibiótico",60,new BigDecimal("9.00"),"Tableta"),
            med("FAR-012","Azitromicina 500 mg","Tableta","Antibiótico",50,new BigDecimal("8.00"),"Tableta"),
            med("FAR-013","Ciprofloxacino 500 mg","Tableta","Antibiótico",55,new BigDecimal("6.00"),"Tableta"),
            med("FAR-014","Metronidazol 500 mg","Tableta","Antibiótico",65,new BigDecimal("4.50"),"Tableta"),
            med("FAR-015","Clindamicina 300 mg","Cápsula","Antibiótico",40,new BigDecimal("7.00"),"Cápsula"),
            med("FAR-016","Omeprazol 20 mg","Cápsula","Gastrointestinal",80,new BigDecimal("3.50"),"Cápsula"),
            med("FAR-017","Ranitidina 150 mg","Tableta","Gastrointestinal",70,new BigDecimal("3.00"),"Tableta"),
            med("FAR-018","Metoclopramida 10 mg","Tableta / Inyectable","Gastrointestinal",55,new BigDecimal("4.00"),"Tableta"),
            med("FAR-019","Sales de rehidratación oral","Sobre","Gastrointestinal",100,new BigDecimal("5.00"),"Sobre"),
            med("FAR-020","Loperamida 2 mg","Cápsula","Gastrointestinal",50,new BigDecimal("3.00"),"Cápsula"),
            med("FAR-021","Loratadina 10 mg","Tableta","Antihistamínico",75,new BigDecimal("2.50"),"Tableta"),
            med("FAR-022","Cetirizina 10 mg","Tableta","Antihistamínico",65,new BigDecimal("3.00"),"Tableta"),
            med("FAR-023","Difenhidramina 25 mg","Cápsula","Antihistamínico",40,new BigDecimal("2.00"),"Cápsula"),
            med("FAR-024","Salbutamol 100 mcg","Inhalador (MDI)","Respiratorio",30,new BigDecimal("45.00"),"Inhalador"),
            med("FAR-025","Ambroxol 30 mg/5 ml","Jarabe 120 ml","Respiratorio",40,new BigDecimal("20.00"),"Frasco"),
            med("FAR-026","Loratadina + Pseudoefedrina","Tableta","Respiratorio",50,new BigDecimal("4.00"),"Tableta"),
            med("FAR-027","Metformina 500 mg","Tableta","Antidiabético",80,new BigDecimal("3.50"),"Tableta"),
            med("FAR-028","Glibenclamida 5 mg","Tableta","Antidiabético",60,new BigDecimal("2.50"),"Tableta"),
            med("FAR-029","Insulina NPH 100 UI/ml","Vial 10 ml","Antidiabético",20,new BigDecimal("85.00"),"Vial"),
            med("FAR-030","Enalapril 10 mg","Tableta","Antihipertensivo",70,new BigDecimal("3.00"),"Tableta"),
            med("FAR-031","Losartán 50 mg","Tableta","Antihipertensivo",65,new BigDecimal("4.50"),"Tableta"),
            med("FAR-032","Amlodipino 5 mg","Tableta","Antihipertensivo",60,new BigDecimal("3.50"),"Tableta"),
            med("FAR-033","Atorvastatina 20 mg","Tableta","Hipolipemiante",55,new BigDecimal("5.00"),"Tableta"),
            med("FAR-034","Ácido acetilsalicílico 100 mg","Tableta","Antiagregante",80,new BigDecimal("2.00"),"Tableta"),
            med("FAR-035","Clonazepam 0.5 mg","Tableta","Ansiolítico",30,new BigDecimal("4.00"),"Tableta"),
            med("FAR-036","Diazepam 5 mg","Tableta","Ansiolítico",25,new BigDecimal("3.50"),"Tableta"),
            med("FAR-037","Sertralina 50 mg","Tableta","Antidepresivo",40,new BigDecimal("6.00"),"Tableta"),
            med("FAR-038","Vitamina C 500 mg","Tableta","Suplemento",100,new BigDecimal("2.00"),"Tableta"),
            med("FAR-039","Complejo B","Tableta / Inyectable","Suplemento",80,new BigDecimal("3.00"),"Tableta"),
            med("FAR-040","Sulfato ferroso 300 mg","Tableta","Suplemento",70,new BigDecimal("2.50"),"Tableta"),
            med("FAR-041","Ácido fólico 1 mg","Tableta","Suplemento",75,new BigDecimal("1.50"),"Tableta"),
            med("FAR-042","Hidrocortisona 1%","Crema 30 g","Dermatológico",35,new BigDecimal("18.00"),"Tubo"),
            med("FAR-043","Clotrimazol 1%","Crema 20 g","Antifúngico tópico",30,new BigDecimal("15.00"),"Tubo"),
            med("FAR-044","Solución salina 0.9%","Frasco 500 ml","Solución IV",50,new BigDecimal("25.00"),"Frasco"),
            med("FAR-045","Dextrosa 5%","Frasco 500 ml","Solución IV",40,new BigDecimal("28.00"),"Frasco")
        );

        medicineRepository.saveAll(meds);
        log.info("Catálogo de medicamentos inicializado: {} registros", meds.size());
    }

    private Medicine med(String code, String name, String presentation, String category,
                         int stock, BigDecimal price, String unit) {
        return Medicine.builder()
                .code(code).name(name).presentation(presentation)
                .category(category).stock(stock).price(price).unit(unit)
                .active(true).build();
    }

    // =========================================================
    // Catálogo de Exámenes de Laboratorio — LAB-001 … LAB-040
    // =========================================================
    private void initLabExams() {
        if (labExamRepository.existsByCode("LAB-001")) return;

        List<LabExam> exams = List.of(
            // Hematología
            exam("LAB-001","Hemograma completo (BHC)", SampleType.BLOOD,"Hematología"),
            exam("LAB-002","Grupo sanguíneo y Rh", SampleType.BLOOD,"Hematología"),
            exam("LAB-003","Tiempo de protrombina (TP)", SampleType.BLOOD,"Hematología"),
            exam("LAB-004","Tiempo de tromboplastina parcial (TTP)", SampleType.BLOOD,"Hematología"),
            exam("LAB-005","Velocidad de sedimentación globular (VSG)", SampleType.BLOOD,"Hematología"),
            // Química Clínica
            exam("LAB-006","Glucosa en ayunas", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-007","Hemoglobina glucosilada (HbA1c)", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-008","Perfil lipídico", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-009","Creatinina sérica", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-010","Urea (BUN)", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-011","Ácido úrico", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-012","Proteínas totales y albúmina", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-013","Bilirrubinas (total, directa, indirecta)", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-014","Transaminasas (ALT, AST)", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-015","Fosfatasa alcalina", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-016","Amilasa y lipasa", SampleType.BLOOD,"Química Clínica"),
            exam("LAB-017","Electrolitos (Na, K, Cl, Ca)", SampleType.BLOOD,"Química Clínica"),
            // Inmunología
            exam("LAB-018","Proteína C reactiva (PCR)", SampleType.BLOOD,"Inmunología"),
            exam("LAB-019","Factor reumatoide", SampleType.BLOOD,"Inmunología"),
            exam("LAB-020","Prueba de embarazo (β-HCG)", SampleType.BLOOD,"Inmunología"),
            exam("LAB-021","TSH (tiroides)", SampleType.BLOOD,"Inmunología"),
            exam("LAB-022","T3 y T4 libre", SampleType.BLOOD,"Inmunología"),
            // Serología
            exam("LAB-023","VIH (ELISA)", SampleType.BLOOD,"Serología"),
            exam("LAB-024","VDRL (sífilis)", SampleType.BLOOD,"Serología"),
            exam("LAB-025","Antígeno de superficie hepatitis B (HBsAg)", SampleType.BLOOD,"Serología"),
            exam("LAB-026","Anticuerpos hepatitis C", SampleType.BLOOD,"Serología"),
            exam("LAB-027","Dengue NS1 / IgM / IgG", SampleType.BLOOD,"Serología"),
            // Microbiología
            exam("LAB-028","Cultivo de sangre (hemocultivo)", SampleType.BLOOD,"Microbiología"),
            exam("LAB-029","Cultivo de orina (urocultivo)", SampleType.URINE,"Microbiología"),
            exam("LAB-030","Cultivo de heces (coprocultivo)", SampleType.FECES,"Microbiología"),
            // Uroanálisis
            exam("LAB-031","Examen general de orina (EGO)", SampleType.URINE,"Uroanálisis"),
            exam("LAB-032","Creatinina en orina de 24 horas", SampleType.URINE,"Uroanálisis"),
            // Parasitología
            exam("LAB-033","Examen coproparasitoscópico", SampleType.FECES,"Parasitología"),
            exam("LAB-034","Sangre oculta en heces", SampleType.FECES,"Parasitología"),
            // Virología
            exam("LAB-035","Prueba rápida COVID-19 (Antígeno)", SampleType.NASAL_SWAB,"Virología"),
            exam("LAB-036","PCR COVID-19", SampleType.NASAL_SWAB,"Virología"),
            // Citología / Histopatología / Oncología
            exam("LAB-037","Papanicolaou (PAP)", SampleType.CERVICAL_CELLS,"Citología"),
            exam("LAB-038","Biopsia de tejido", SampleType.TISSUE,"Histopatología"),
            exam("LAB-039","PSA (antígeno prostático)", SampleType.BLOOD,"Oncología"),
            exam("LAB-040","CEA (antígeno carcinoembrionario)", SampleType.BLOOD,"Oncología")
        );

        labExamRepository.saveAll(exams);
        log.info("Catálogo de exámenes de laboratorio inicializado: {} registros", exams.size());
    }

    private LabExam exam(String code, String name, SampleType sampleType, String category) {
        return LabExam.builder()
                .code(code).name(name).sampleType(sampleType)
                .category(category).active(true).build();
    }
}
