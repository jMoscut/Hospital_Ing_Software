import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-XY2K5ZLM.js";
import {
  MatToolbar,
  MatToolbarModule
} from "./chunk-QYPJIECG.js";
import "./chunk-SRE6VCYJ.js";
import "./chunk-MHA7Y7AJ.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-ZXMIIXBI.js";
import {
  RouterLink
} from "./chunk-2UH3GGF7.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule
} from "./chunk-KREJ5GPI.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵreference,
  ɵɵtext
} from "./chunk-XHW7K2DC.js";

// src/app/modules/portal/portal.component.ts
var PortalComponent = class _PortalComponent {
  static {
    this.\u0275fac = function PortalComponent_Factory(t) {
      return new (t || _PortalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PortalComponent, selectors: [["app-portal"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 195, vars: 3, consts: [["menuNosotros", "matMenu"], ["menuServicios", "matMenu"], ["menuPacientes", "matMenu"], ["color", "primary", 1, "portal-header"], [1, "brand"], [1, "spacer"], [1, "nav-links"], ["href", "#inicio"], ["mat-button", "", 1, "nav-btn", 3, "matMenuTriggerFor"], [1, "dropdown-arrow"], ["mat-menu-item", "", "href", "#nosotros"], ["mat-menu-item", "", "href", "#servicios"], ["mat-menu-item", "", "routerLink", "/register"], ["mat-menu-item", "", "routerLink", "/login"], ["mat-raised-button", "", "color", "accent", "routerLink", "/login"], ["id", "inicio", 1, "hero"], [1, "hero-content"], [1, "hero-sub"], [1, "hero-desc"], [1, "hero-actions"], ["mat-raised-button", "", "color", "primary", "routerLink", "/login", 1, "cta-btn"], ["href", "#servicios"], ["mat-stroked-button", "", "color", "primary", 1, "cta-btn"], [1, "hero-image"], [1, "hero-icon"], ["id", "servicios", 1, "section"], [1, "section-container"], [1, "section-title"], [1, "services-grid"], [1, "service-card"], [1, "service-icon"], ["id", "nosotros", 1, "section", "section-alt"], [1, "about-grid"], [1, "about-card"], [1, "about-icon"], ["id", "pacientes", 1, "section"], [1, "patient-actions"], ["routerLink", "/register", 1, "patient-card"], ["mat-raised-button", "", "color", "primary"], ["routerLink", "/login", 1, "patient-card"], ["mat-raised-button", "", "color", "accent"], [1, "portal-footer"], [1, "footer-content"], [1, "footer-brand"]], template: function PortalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "mat-toolbar", 3)(1, "mat-icon");
        \u0275\u0275text(2, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "span", 4);
        \u0275\u0275text(4, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275element(5, "span", 5);
        \u0275\u0275elementStart(6, "nav", 6)(7, "a", 7);
        \u0275\u0275text(8, "Inicio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 8);
        \u0275\u0275text(10, " Nosotros ");
        \u0275\u0275elementStart(11, "mat-icon", 9);
        \u0275\u0275text(12, "expand_more");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "mat-menu", null, 0)(15, "a", 10)(16, "mat-icon");
        \u0275\u0275text(17, "flag");
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " Misi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "a", 10)(20, "mat-icon");
        \u0275\u0275text(21, "visibility");
        \u0275\u0275elementEnd();
        \u0275\u0275text(22, " Visi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "a", 10)(24, "mat-icon");
        \u0275\u0275text(25, "star");
        \u0275\u0275elementEnd();
        \u0275\u0275text(26, " Valores");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "button", 8);
        \u0275\u0275text(28, " Servicios ");
        \u0275\u0275elementStart(29, "mat-icon", 9);
        \u0275\u0275text(30, "expand_more");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "mat-menu", null, 1)(33, "a", 11)(34, "mat-icon");
        \u0275\u0275text(35, "medical_services");
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, " Consulta Externa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "a", 11)(38, "mat-icon");
        \u0275\u0275text(39, "healing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(40, " Medicina General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "a", 11)(42, "mat-icon");
        \u0275\u0275text(43, "science");
        \u0275\u0275elementEnd();
        \u0275\u0275text(44, " Laboratorio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "a", 11)(46, "mat-icon");
        \u0275\u0275text(47, "medication");
        \u0275\u0275elementEnd();
        \u0275\u0275text(48, " Farmacia");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "button", 8);
        \u0275\u0275text(50, " Pacientes ");
        \u0275\u0275elementStart(51, "mat-icon", 9);
        \u0275\u0275text(52, "expand_more");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "mat-menu", null, 2)(55, "a", 12)(56, "mat-icon");
        \u0275\u0275text(57, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(58, " Registro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "a", 13)(60, "mat-icon");
        \u0275\u0275text(61, "folder_shared");
        \u0275\u0275elementEnd();
        \u0275\u0275text(62, " Ver historial");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(63, "button", 14)(64, "mat-icon");
        \u0275\u0275text(65, "login");
        \u0275\u0275elementEnd();
        \u0275\u0275text(66, " Ingresar ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(67, "section", 15)(68, "div", 16)(69, "h1");
        \u0275\u0275text(70, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "p", 17);
        \u0275\u0275text(72, "Sistema Integral de Gesti\xF3n Hospitalaria");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "p", 18);
        \u0275\u0275text(74, "Cuidamos tu salud con tecnolog\xEDa de vanguardia. Atenci\xF3n m\xE9dica de calidad, laboratorio, farmacia y m\xE1s.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "div", 19)(76, "button", 20)(77, "mat-icon");
        \u0275\u0275text(78, "login");
        \u0275\u0275elementEnd();
        \u0275\u0275text(79, " Acceder al Sistema ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "a", 21)(81, "button", 22)(82, "mat-icon");
        \u0275\u0275text(83, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(84, " Nuestros Servicios ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(85, "div", 23)(86, "mat-icon", 24);
        \u0275\u0275text(87, "local_hospital");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(88, "section", 25)(89, "div", 26)(90, "h2", 27);
        \u0275\u0275text(91, "Nuestros Servicios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "div", 28)(93, "mat-card", 29)(94, "mat-icon", 30);
        \u0275\u0275text(95, "medical_services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(96, "h3");
        \u0275\u0275text(97, "Consulta Externa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(98, "p");
        \u0275\u0275text(99, "Atenci\xF3n m\xE9dica especializada con los mejores profesionales de la salud.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(100, "mat-card", 29)(101, "mat-icon", 30);
        \u0275\u0275text(102, "healing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "h3");
        \u0275\u0275text(104, "Medicina General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(105, "p");
        \u0275\u0275text(106, "Diagn\xF3stico y tratamiento de enfermedades comunes con atenci\xF3n integral.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(107, "mat-card", 29)(108, "mat-icon", 30);
        \u0275\u0275text(109, "science");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(110, "h3");
        \u0275\u0275text(111, "Laboratorio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "p");
        \u0275\u0275text(113, "An\xE1lisis cl\xEDnicos con tecnolog\xEDa de \xFAltima generaci\xF3n y resultados confiables.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(114, "mat-card", 29)(115, "mat-icon", 30);
        \u0275\u0275text(116, "medication");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(117, "h3");
        \u0275\u0275text(118, "Farmacia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "p");
        \u0275\u0275text(120, "Despacho de medicamentos con receta electr\xF3nica verificada por nuestros m\xE9dicos.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(121, "mat-card", 29)(122, "mat-icon", 30);
        \u0275\u0275text(123, "emergency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "h3");
        \u0275\u0275text(125, "Emergencias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "p");
        \u0275\u0275text(127, "Atenci\xF3n de urgencias las 24 horas, con personal altamente capacitado.");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(128, "section", 31)(129, "div", 26)(130, "h2", 27);
        \u0275\u0275text(131, "Nosotros");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(132, "div", 32)(133, "mat-card", 33)(134, "mat-icon", 34);
        \u0275\u0275text(135, "flag");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(136, "h3");
        \u0275\u0275text(137, "Misi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(138, "p");
        \u0275\u0275text(139, "Brindar atenci\xF3n m\xE9dica integral de alta calidad, accesible y humanizada, con tecnolog\xEDa de vanguardia para mejorar la salud y calidad de vida de nuestros pacientes.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(140, "mat-card", 33)(141, "mat-icon", 34);
        \u0275\u0275text(142, "visibility");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(143, "h3");
        \u0275\u0275text(144, "Visi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(145, "p");
        \u0275\u0275text(146, "Ser el hospital de referencia en Guatemala, reconocido por la excelencia m\xE9dica, la innovaci\xF3n tecnol\xF3gica y el compromiso con el bienestar de la comunidad.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(147, "mat-card", 33)(148, "mat-icon", 34);
        \u0275\u0275text(149, "star");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(150, "h3");
        \u0275\u0275text(151, "Valores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(152, "ul")(153, "li");
        \u0275\u0275text(154, "Excelencia m\xE9dica");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(155, "li");
        \u0275\u0275text(156, "Compromiso con el paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(157, "li");
        \u0275\u0275text(158, "\xC9tica e integridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(159, "li");
        \u0275\u0275text(160, "Innovaci\xF3n continua");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(161, "li");
        \u0275\u0275text(162, "Trabajo en equipo");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(163, "section", 35)(164, "div", 26)(165, "h2", 27);
        \u0275\u0275text(166, "Para Pacientes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(167, "div", 36)(168, "mat-card", 37)(169, "mat-icon", 30);
        \u0275\u0275text(170, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(171, "h3");
        \u0275\u0275text(172, "Registro en L\xEDnea");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(173, "p");
        \u0275\u0275text(174, "Pre-reg\xEDstrate en nuestro sistema desde casa. Al llegar, el personal te asignar\xE1 tu turno de inmediato.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(175, "button", 38);
        \u0275\u0275text(176, "Registrarme Ahora");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(177, "mat-card", 39)(178, "mat-icon", 30);
        \u0275\u0275text(179, "folder_shared");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(180, "h3");
        \u0275\u0275text(181, "Acceso al Sistema");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(182, "p");
        \u0275\u0275text(183, "Accede al sistema hospitalario si eres personal autorizado de BioCore Medical.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(184, "button", 40);
        \u0275\u0275text(185, "Ingresar");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(186, "footer", 41)(187, "div", 42)(188, "div", 43)(189, "mat-icon");
        \u0275\u0275text(190, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(191, "span");
        \u0275\u0275text(192, "BioCore Medical");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(193, "p");
        \u0275\u0275text(194, "\xA9 2026 BioCore Medical. Hospital Information System.");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const menuNosotros_r1 = \u0275\u0275reference(14);
        const menuServicios_r2 = \u0275\u0275reference(32);
        const menuPacientes_r3 = \u0275\u0275reference(54);
        \u0275\u0275advance(9);
        \u0275\u0275property("matMenuTriggerFor", menuNosotros_r1);
        \u0275\u0275advance(18);
        \u0275\u0275property("matMenuTriggerFor", menuServicios_r2);
        \u0275\u0275advance(22);
        \u0275\u0275property("matMenuTriggerFor", menuPacientes_r3);
      }
    }, dependencies: [RouterLink, MatButtonModule, MatButton, MatIconModule, MatIcon, MatToolbarModule, MatToolbar, MatCardModule, MatCard, MatMenuModule, MatMenu, MatMenuItem, MatMenuTrigger], styles: ["\n\n.portal-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 700;\n  margin-left: 8px;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-right: 16px;\n}\n.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n  font-size: 0.95rem;\n  padding: 4px 12px;\n  border-radius: 4px;\n}\n.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #bbdefb;\n  background: rgba(255, 255, 255, 0.1);\n}\n.nav-btn[_ngcontent-%COMP%] {\n  color: white !important;\n  font-size: 0.95rem !important;\n}\n.nav-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1) !important;\n}\n.dropdown-arrow[_ngcontent-%COMP%] {\n  font-size: 18px !important;\n  width: 18px !important;\n  height: 18px !important;\n  vertical-align: middle;\n  margin-left: 2px;\n}\n.hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 80vh;\n  padding: 80px 80px;\n  background:\n    linear-gradient(\n      135deg,\n      #1a237e 0%,\n      #1565c0 50%,\n      #0288d1 100%);\n  color: white;\n}\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n  font-weight: 700;\n  line-height: 1.1;\n  margin-bottom: 12px;\n}\n.hero-sub[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  color: #90caf9;\n  margin-bottom: 16px;\n}\n.hero-desc[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: rgba(255, 255, 255, 0.85);\n  max-width: 500px;\n  margin-bottom: 32px;\n  line-height: 1.6;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.cta-btn[_ngcontent-%COMP%] {\n  padding: 12px 28px !important;\n  font-size: 1rem !important;\n}\n.hero-image[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0.5;\n}\n.hero-icon[_ngcontent-%COMP%] {\n  font-size: 180px;\n  width: 180px;\n  height: 180px;\n  color: rgba(255, 255, 255, 0.2);\n}\n.section[_ngcontent-%COMP%] {\n  padding: 80px 0;\n}\n.section-alt[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n}\n.section-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 40px;\n}\n.section-title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1a237e;\n  margin-bottom: 48px;\n}\n.services-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 24px;\n}\n.service-card[_ngcontent-%COMP%] {\n  padding: 32px 24px;\n  text-align: center;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.service-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;\n}\n.service-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #1565c0;\n  margin-bottom: 16px;\n}\n.service-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 8px;\n  color: #1a237e;\n}\n.service-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #555;\n  line-height: 1.5;\n}\n.about-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n.about-card[_ngcontent-%COMP%] {\n  padding: 32px;\n}\n.about-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: #1565c0;\n  margin-bottom: 16px;\n}\n.about-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: #1a237e;\n}\n.about-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .about-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  color: #555;\n  line-height: 1.7;\n}\n.about-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.patient-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 32px;\n}\n.patient-card[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.patient-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\n.patient-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: #1a237e;\n}\n.patient-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  margin-bottom: 24px;\n}\n.portal-footer[_ngcontent-%COMP%] {\n  background: #1a237e;\n  color: white;\n  padding: 40px;\n  text-align: center;\n}\n.footer-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-size: 1.3rem;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.portal-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n  .hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 40px 24px;\n  }\n  .hero-image[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .nav-links[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=portal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PortalComponent, { className: "PortalComponent", filePath: "src\\app\\modules\\portal\\portal.component.ts", lineNumber: 245 });
})();
export {
  PortalComponent
};
//# sourceMappingURL=chunk-XVLSK6LF.js.map
