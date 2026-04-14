import {
  MatToolbar,
  MatToolbarModule
} from "./chunk-H4UWVRIX.js";
import {
  RouterLink
} from "./chunk-ZOTSATNJ.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-IVAI7UHG.js";
import {
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-R33V2XU6.js";

// src/app/modules/portal/portal.component.ts
var PortalComponent = class _PortalComponent {
  static {
    this.\u0275fac = function PortalComponent_Factory(t) {
      return new (t || _PortalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PortalComponent, selectors: [["app-portal"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 149, vars: 0, consts: [["color", "primary", 1, "portal-header"], [1, "brand"], [1, "spacer"], [1, "nav-links"], ["href", "#inicio"], ["href", "#nosotros"], ["href", "#servicios"], ["href", "#pacientes"], ["mat-raised-button", "", "color", "accent", "routerLink", "/login"], ["id", "inicio", 1, "hero"], [1, "hero-content"], [1, "hero-sub"], [1, "hero-desc"], [1, "hero-actions"], ["mat-raised-button", "", "color", "primary", "routerLink", "/login", 1, "cta-btn"], ["mat-stroked-button", "", "color", "primary", 1, "cta-btn"], [1, "hero-image"], [1, "hero-icon"], ["id", "servicios", 1, "section"], [1, "section-container"], [1, "section-title"], [1, "services-grid"], [1, "service-card"], [1, "service-icon"], ["id", "nosotros", 1, "section", "section-alt"], [1, "about-grid"], [1, "about-card"], [1, "about-icon"], ["id", "pacientes", 1, "section"], [1, "patient-actions"], ["routerLink", "/login", 1, "patient-card"], ["mat-raised-button", "", "color", "primary"], ["mat-raised-button", "", "color", "accent"], [1, "portal-footer"], [1, "footer-content"], [1, "footer-brand"]], template: function PortalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "mat-toolbar", 0)(1, "mat-icon");
        \u0275\u0275text(2, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "span", 1);
        \u0275\u0275text(4, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275element(5, "span", 2);
        \u0275\u0275elementStart(6, "nav", 3)(7, "a", 4);
        \u0275\u0275text(8, "Inicio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "a", 5);
        \u0275\u0275text(10, "Nosotros");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "a", 6);
        \u0275\u0275text(12, "Servicios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "a", 7);
        \u0275\u0275text(14, "Pacientes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "button", 8)(16, "mat-icon");
        \u0275\u0275text(17, "login");
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " Ingresar ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "section", 9)(20, "div", 10)(21, "h1");
        \u0275\u0275text(22, "BioCore Medical");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p", 11);
        \u0275\u0275text(24, "Sistema Integral de Gesti\xF3n Hospitalaria");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p", 12);
        \u0275\u0275text(26, "Cuidamos tu salud con tecnolog\xEDa de vanguardia. Atenci\xF3n m\xE9dica de calidad, laboratorio, farmacia y m\xE1s.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 13)(28, "button", 14)(29, "mat-icon");
        \u0275\u0275text(30, "login");
        \u0275\u0275elementEnd();
        \u0275\u0275text(31, " Acceder al Sistema ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "a", 6)(33, "button", 15)(34, "mat-icon");
        \u0275\u0275text(35, "info");
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, " Nuestros Servicios ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(37, "div", 16)(38, "mat-icon", 17);
        \u0275\u0275text(39, "local_hospital");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(40, "section", 18)(41, "div", 19)(42, "h2", 20);
        \u0275\u0275text(43, "Nuestros Servicios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "div", 21)(45, "mat-card", 22)(46, "mat-icon", 23);
        \u0275\u0275text(47, "medical_services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "h3");
        \u0275\u0275text(49, "Consulta Externa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "p");
        \u0275\u0275text(51, "Atenci\xF3n m\xE9dica especializada con los mejores profesionales de la salud.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "mat-card", 22)(53, "mat-icon", 23);
        \u0275\u0275text(54, "healing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "h3");
        \u0275\u0275text(56, "Medicina General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "p");
        \u0275\u0275text(58, "Diagn\xF3stico y tratamiento de enfermedades comunes con atenci\xF3n integral.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "mat-card", 22)(60, "mat-icon", 23);
        \u0275\u0275text(61, "science");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "h3");
        \u0275\u0275text(63, "Laboratorio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "p");
        \u0275\u0275text(65, "An\xE1lisis cl\xEDnicos con tecnolog\xEDa de \xFAltima generaci\xF3n y resultados confiables.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(66, "mat-card", 22)(67, "mat-icon", 23);
        \u0275\u0275text(68, "medication");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "h3");
        \u0275\u0275text(70, "Farmacia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "p");
        \u0275\u0275text(72, "Despacho de medicamentos con receta electr\xF3nica verificada por nuestros m\xE9dicos.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(73, "mat-card", 22)(74, "mat-icon", 23);
        \u0275\u0275text(75, "emergency");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "h3");
        \u0275\u0275text(77, "Emergencias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "p");
        \u0275\u0275text(79, "Atenci\xF3n de urgencias las 24 horas, con personal altamente capacitado.");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(80, "section", 24)(81, "div", 19)(82, "h2", 20);
        \u0275\u0275text(83, "Nosotros");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(84, "div", 25)(85, "mat-card", 26)(86, "mat-icon", 27);
        \u0275\u0275text(87, "flag");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "h3");
        \u0275\u0275text(89, "Misi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "p");
        \u0275\u0275text(91, "Brindar atenci\xF3n m\xE9dica integral de alta calidad, accesible y humanizada, con tecnolog\xEDa de vanguardia para mejorar la salud y calidad de vida de nuestros pacientes.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(92, "mat-card", 26)(93, "mat-icon", 27);
        \u0275\u0275text(94, "visibility");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "h3");
        \u0275\u0275text(96, "Visi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "p");
        \u0275\u0275text(98, "Ser el hospital de referencia en Guatemala, reconocido por la excelencia m\xE9dica, la innovaci\xF3n tecnol\xF3gica y el compromiso con el bienestar de la comunidad.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(99, "mat-card", 26)(100, "mat-icon", 27);
        \u0275\u0275text(101, "star");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(102, "h3");
        \u0275\u0275text(103, "Valores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "ul")(105, "li");
        \u0275\u0275text(106, "Excelencia m\xE9dica");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(107, "li");
        \u0275\u0275text(108, "Compromiso con el paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(109, "li");
        \u0275\u0275text(110, "\xC9tica e integridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(111, "li");
        \u0275\u0275text(112, "Innovaci\xF3n continua");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "li");
        \u0275\u0275text(114, "Trabajo en equipo");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(115, "section", 28)(116, "div", 19)(117, "h2", 20);
        \u0275\u0275text(118, "Para Pacientes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "div", 29)(120, "mat-card", 30)(121, "mat-icon", 23);
        \u0275\u0275text(122, "person_add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(123, "h3");
        \u0275\u0275text(124, "Registro de Paciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(125, "p");
        \u0275\u0275text(126, "Registra tus datos y agenda tu cita m\xE9dica de forma r\xE1pida y sencilla.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(127, "button", 31);
        \u0275\u0275text(128, "Registrarse");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(129, "mat-card", 30)(130, "mat-icon", 23);
        \u0275\u0275text(131, "folder_shared");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(132, "h3");
        \u0275\u0275text(133, "Ver Historial");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(134, "p");
        \u0275\u0275text(135, "Accede a tu historial cl\xEDnico, resultados de laboratorio y recetas m\xE9dicas.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(136, "button", 32);
        \u0275\u0275text(137, "Ver Historial");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(138, "footer", 33)(139, "div", 34)(140, "div", 35)(141, "mat-icon");
        \u0275\u0275text(142, "local_hospital");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(143, "span");
        \u0275\u0275text(144, "BioCore Medical");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(145, "p");
        \u0275\u0275text(146, "\xA9 2026 BioCore Medical. Hospital Information System.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(147, "p");
        \u0275\u0275text(148, "Desarrollado por Pablo Miguel Chavez & Emerson Antonio Sec");
        \u0275\u0275elementEnd()()();
      }
    }, dependencies: [RouterLink, MatButtonModule, MatButton, MatIconModule, MatIcon, MatToolbarModule, MatToolbar, MatCardModule, MatCard], styles: ["\n\n.portal-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 700;\n  margin-left: 8px;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin-right: 24px;\n}\n.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n  font-size: 0.95rem;\n}\n.nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #bbdefb;\n}\n.hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 80vh;\n  padding: 80px 80px;\n  background:\n    linear-gradient(\n      135deg,\n      #1a237e 0%,\n      #1565c0 50%,\n      #0288d1 100%);\n  color: white;\n}\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n  font-weight: 700;\n  line-height: 1.1;\n  margin-bottom: 12px;\n}\n.hero-sub[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  color: #90caf9;\n  margin-bottom: 16px;\n}\n.hero-desc[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: rgba(255, 255, 255, 0.85);\n  max-width: 500px;\n  margin-bottom: 32px;\n  line-height: 1.6;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.cta-btn[_ngcontent-%COMP%] {\n  padding: 12px 28px !important;\n  font-size: 1rem !important;\n}\n.hero-image[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0.5;\n}\n.hero-icon[_ngcontent-%COMP%] {\n  font-size: 180px;\n  width: 180px;\n  height: 180px;\n  color: rgba(255, 255, 255, 0.2);\n}\n.section[_ngcontent-%COMP%] {\n  padding: 80px 0;\n}\n.section-alt[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n}\n.section-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 40px;\n}\n.section-title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1a237e;\n  margin-bottom: 48px;\n}\n.services-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 24px;\n}\n.service-card[_ngcontent-%COMP%] {\n  padding: 32px 24px;\n  text-align: center;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.service-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;\n}\n.service-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #1565c0;\n  margin-bottom: 16px;\n}\n.service-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 8px;\n  color: #1a237e;\n}\n.service-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #555;\n  line-height: 1.5;\n}\n.about-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n.about-card[_ngcontent-%COMP%] {\n  padding: 32px;\n}\n.about-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: #1565c0;\n  margin-bottom: 16px;\n}\n.about-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: #1a237e;\n}\n.about-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .about-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  color: #555;\n  line-height: 1.7;\n}\n.about-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.patient-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 32px;\n}\n.patient-card[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.patient-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\n.patient-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: #1a237e;\n}\n.patient-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  margin-bottom: 24px;\n}\n.portal-footer[_ngcontent-%COMP%] {\n  background: #1a237e;\n  color: white;\n  padding: 40px;\n  text-align: center;\n}\n.footer-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-size: 1.3rem;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.portal-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n  .hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 40px 24px;\n  }\n  .hero-image[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .nav-links[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=portal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PortalComponent, { className: "PortalComponent", filePath: "src\\app\\modules\\portal\\portal.component.ts", lineNumber: 215 });
})();
export {
  PortalComponent
};
//# sourceMappingURL=chunk-CWJKSKFO.js.map
