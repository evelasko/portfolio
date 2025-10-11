import {
  type SiteStructure,
  type StructureItem,
  type NavigationItem,
} from "./types";
import { type Pathnames } from "next-intl/routing";

const structure: SiteStructure = {
  routes: [
    {
      key: "/",
      href: { en: "/", es: "/" },
      label: { en: "home", es: "inicio" },
    },
    {
      key: "/learn",
      href: { en: "/learn", es: "/aprende" },
      label: { en: "learn", es: "aprende" },
      children: [
        {
          key: "/learn/courses",
          href: { en: "/learn/courses", es: "/aprende/cursos" },
          label: { en: "courses", es: "cursos" },
        },
        {
          key: "/learn/training-methodologies",
          href: {
            en: "/learn/training-methodologies",
            es: "/aprende/metodologias-formacion",
          },
          label: {
            en: "training methodologies",
            es: "metodologías de formación",
          },
        },
        {
          key: "/learn/resources",
          href: { en: "/learn/resources", es: "/aprende/recursos" },
          label: { en: "resources", es: "recursos" },
        },
        {
          key: "/learn/assessment",
          href: { en: "/learn/assessment", es: "/aprende/evaluacion" },
          label: { en: "evaluation", es: "evaluación" },
        },
      ],
    },
    {
      key: "/innovate",
      href: { en: "/innovate", es: "/innova" },
      label: { en: "innovate", es: "innova" },
      children: [
        {
          key: "/innovate/performance-analysis",
          href: {
            en: "/innovate/performance-analysis",
            es: "/innova/analisis-rendimiento",
          },
          label: { en: "performance analysis", es: "análisis de rendimiento" },
        },
        {
          key: "/innovate/creative-labs",
          href: {
            en: "/innovate/creative-labs",
            es: "/innova/laboratorios-creativos",
          },
          label: { en: "creative labs", es: "laboratorios creativos" },
        },
        {
          key: "/innovate/technology-integration",
          href: {
            en: "/innovate/technology-integration",
            es: "/innova/integracion-tecnologica",
          },
          label: {
            en: "technology integration",
            es: "integración tecnológica",
          },
        },
      ],
    },
    {
      key: "/optimize",
      href: { en: "/optimize", es: "/optimiza" },
      label: { en: "optimize", es: "optimiza" },
      children: [
        {
          key: "/optimize/production-collaboration",
          href: {
            en: "/optimize/production-collaboration",
            es: "/optimiza/colaboracion-produccion",
          },
          label: {
            en: "production collaboration",
            es: "colaboración en producción",
          },
        },
        {
          key: "/optimize/talent-discovery",
          href: {
            en: "/optimize/talent-discovery",
            es: "/optimiza/descubrimiento-talento",
          },
          label: { en: "talent discovery", es: "descubrimiento de talento" },
        },
        {
          key: "/optimize/workflow-consulting",
          href: {
            en: "/optimize/workflow-consulting",
            es: "/optimiza/consultoria-flujo-trabajo",
          },
          label: {
            en: "workflow consulting",
            es: "consultoría de flujo de trabajo",
          },
        },
        {
          key: "/optimize/demo",
          href: { en: "/optimize/demo", es: "/optimiza/demo" },
          label: { en: "demo", es: "demo" },
        },
        {
          key: "/optimize/automation-assessment",
          href: {
            en: "/optimize/automation-assessment",
            es: "/optimiza/evaluacion-automatizacion",
          },
          label: {
            en: "automation assessment",
            es: "evaluación de automatización",
          },
        },
      ],
    },
    {
      key: "/insights",
      href: { en: "/insights", es: "/profundiza" },
      label: { en: "insights", es: "profundiza" },
      showInMainNav: true,
      showInFooter: true,
      showInSitemap: true,
      children: [
        {
          key: "/insights/featured-research",
          href: {
            en: "/insights/featured-research",
            es: "/profundiza/investigaciones-destacadas",
          },
          label: { en: "research", es: "investigaciones" },
        },
        {
          key: "/insights/ai-approach",
          href: { en: "/insights/ai-approach", es: "/profundiza/enfoque-ia" },
          label: { en: "AI approach", es: "enfoque IA" },
        },
        {
          key: "/insights/methodology-library",
          href: {
            en: "/insights/methodology-library",
            es: "/profundiza/biblioteca-metodologias",
          },
          label: { en: "methodology", es: "metodologías" },
        },
        {
          key: "/insights/publish-with-us",
          href: {
            en: "/insights/publish-with-us",
            es: "/profundiza/publicar-con-nosotros",
          },
          label: { en: "publish with us", es: "publicar" },
        },
      ],
    },
    {
      key: "/about",
      href: { en: "/about", es: "/acerca" },
      label: { en: "about", es: "acerca" },
      children: [
        {
          key: "/about/team",
          href: { en: "/about/team", es: "/acerca/equipo" },
          label: { en: "team", es: "equipo" },
        },
        {
          key: "/about/news",
          href: { en: "/about/news", es: "/acerca/noticias" },
          label: { en: "news", es: "noticias" },
        },
      ],
    },
  ],
  external: [
    {
      key: "https://academia.cenie.org",
      href: {
        en: "https://academia.cenie.org",
        es: "https://academia.cenie.org",
      },
      label: { en: "academy", es: "academia" },
    },
    {
      key: "https://agencia.cenie.org",
      href: {
        en: "https://agencia.cenie.org",
        es: "https://agencia.cenie.org",
      },
      label: { en: "agency", es: "agencia" },
    },
    {
      key: "https://editorial.cenie.org",
      href: {
        en: "https://editorial.cenie.org",
        es: "https://editorial.cenie.org",
      },
      label: { en: "editorial", es: "editorial" },
    },
  ],
  utility: [
    {
      key: "/search",
      href: { en: "/search", es: "/buscar" },
      label: { en: "site map", es: "mapa del sitio" },
    },
    {
      key: "/account",
      href: { en: "/account", es: "/cuenta" },
      label: { en: "account", es: "cuenta" },
    },
    {
      key: "/privacy-policy",
      href: { en: "/privacy-policy", es: "/politica-privacidad" },
      label: { en: "privacy policy", es: "política de privacidad" },
    },
    {
      key: "/terms-of-service",
      href: { en: "/terms-of-service", es: "/terminos-servicio" },
      label: { en: "terms of service", es: "términos de servicio" },
    },
  ],
};

// Generator function for pathnames
export function generatePathnames(
  structure: SiteStructure
): Pathnames<["en", "es"]> {
  const pathnames: Record<string, any> = {};

  function processItem(item: StructureItem) {
    // Only include routes that are actual pages (not external)
    if (!item.key.startsWith("http")) {
      pathnames[item.key] = {
        en: item.href.en,
        es: item.href.es,
      };
    }

    item.children?.forEach(processItem);
  }

  structure.routes.forEach(processItem);
  structure.utility.forEach(processItem);

  return pathnames as Pathnames<["en", "es"]>;
}

// Validation function for structure consistency
export function validateStructure(structure: SiteStructure): string[] {
  const errors: string[] = [];
  const seenKeys = new Set<string>();

  function validateItem(item: StructureItem, path: string = "") {
    // Check for duplicate keys
    if (seenKeys.has(item.key)) {
      errors.push(`Duplicate key found: ${item.key} at ${path}`);
    } else {
      seenKeys.add(item.key);
    }

    // Check for missing translations
    if (!item.label.en || !item.label.es) {
      errors.push(`Missing label translation for key: ${item.key} at ${path}`);
    }

    if (!item.href.en || !item.href.es) {
      errors.push(`Missing href translation for key: ${item.key} at ${path}`);
    }

    // Check for consistency between key and English href for internal routes
    if (!item.key.startsWith("http") && item.key !== item.href.en) {
      errors.push(
        `Key "${item.key}" doesn't match English href "${item.href.en}" at ${path}`
      );
    }

    item.children?.forEach((child, index) =>
      validateItem(child, `${path}.children[${index}]`)
    );
  }

  structure.routes.forEach((item, index) =>
    validateItem(item, `routes[${index}]`)
  );

  structure.external.forEach((item, index) =>
    validateItem(item, `external[${index}]`)
  );

  structure.utility.forEach((item, index) =>
    validateItem(item, `utility[${index}]`)
  );

  return errors;
}

export default structure;
