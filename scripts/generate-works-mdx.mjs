import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to convert date from DD/MM/YYYY to YYYY-MM-DD
function convertDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dateStr;
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to parse technologies
function parseTechnologies(techStr) {
  if (!techStr || techStr.trim() === '') return [];
  return techStr.split(',').map(t => t.trim()).filter(t => t);
}

// Project descriptions based on links
const projectDescriptions = {
  'Fundación Alicia Alonso': {
    en: 'Brand identity design for Fundación Alicia Alonso, creating a comprehensive visual system that represents the legacy and artistic excellence of one of the most prestigious dance foundations in the world.',
    es: 'Diseño de identidad de marca para la Fundación Alicia Alonso, creando un sistema visual integral que representa el legado y la excelencia artística de una de las fundaciones de danza más prestigiosas del mundo.',
  },
  'Congreso Mundial de A.A.E.E.': {
    en: 'Brand identity design for the World Congress of Performing Arts Research (CMIAE), creating a visual identity system that represents the academic excellence and international scope of this major congress.',
    es: 'Diseño de identidad de marca para el Congreso Mundial de Investigación en las Artes del Espectáculo (CMIAE), creando un sistema de identidad visual que representa la excelencia académica y el alcance internacional de este importante congreso.',
  },
  'Obsidian Zotero Linker': {
    en: 'An Obsidian plugin that creates bidirectional links between Obsidian notes and Zotero references, streamlining academic research workflows by seamlessly connecting your note-taking and reference management systems.',
    es: 'Un plugin de Obsidian que crea enlaces bidireccionales entre notas de Obsidian y referencias de Zotero, optimizando los flujos de trabajo de investigación académica al conectar de manera fluida tus sistemas de toma de notas y gestión de referencias.',
  },
  'Ilurama App': {
    en: 'A mobile application built with Flutter, designed to provide an innovative solution for artistic and creative workflows, combining modern UI/UX principles with robust functionality.',
    es: 'Una aplicación móvil desarrollada con Flutter, diseñada para proporcionar una solución innovadora para flujos de trabajo artísticos y creativos, combinando principios modernos de UI/UX con funcionalidad robusta.',
  },
  'Qlab Show Control Scripts': {
    en: 'AppleScript automation scripts for QLab show control software, enabling enhanced workflow automation and control for live performance and theater productions.',
    es: 'Scripts de automatización en AppleScript para el software de control de espectáculos QLab, permitiendo una automatización y control mejorados de flujos de trabajo para producciones en vivo y teatrales.',
  },
  'INEDITO': {
    en: 'Art direction for INÉDITO, a platform and festival dedicated to showcasing new generations of creators, strengthening the language of performing arts through innovative presentations and artistic direction.',
    es: 'Dirección de arte para INÉDITO, una plataforma y festival dedicado a mostrar las nuevas generaciones de creadores, fortaleciendo el lenguaje de las artes escénicas a través de presentaciones innovadoras y dirección artística.',
  },
  'Alicia Alonso Campus App': {
    en: 'Mobile application for the Alicia Alonso Campus, providing students and faculty with essential tools and resources for campus life, academic management, and access to institutional information.',
    es: 'Aplicación móvil para el Campus Alicia Alonso, proporcionando a estudiantes y profesores herramientas y recursos esenciales para la vida en el campus, gestión académica y acceso a información institucional.',
  },
  'Theodore System': {
    en: 'An AI-powered system built with TypeScript, ExtendScript, and Python that automates and enhances creative workflows in Adobe applications, integrating machine learning capabilities with professional creative tools.',
    es: 'Un sistema impulsado por IA desarrollado con TypeScript, ExtendScript y Python que automatiza y mejora los flujos de trabajo creativos en aplicaciones Adobe, integrando capacidades de aprendizaje automático con herramientas creativas profesionales.',
  },
  'Zotero Citation Linker': {
    en: 'A tool that automatically links citations in documents to their corresponding Zotero bibliography entries, streamlining academic writing and ensuring accurate reference management.',
    es: 'Una herramienta que vincula automáticamente las citas en documentos con sus entradas de bibliografía correspondientes en Zotero, optimizando la escritura académica y asegurando una gestión precisa de referencias.',
  },
};

// Content for linked projects
const projectContent = {
  'Fundación Alicia Alonso': {
    en: `## Project Overview

This project involved creating a comprehensive brand identity for the Fundación Alicia Alonso, one of the most prestigious dance foundations in the world. The design work focused on developing a visual system that honors the legacy of Alicia Alonso while presenting the foundation's work in a modern, accessible way.

## Design Approach

The brand identity encompasses various applications including digital and print materials, ensuring consistency across all touchpoints while maintaining the artistic integrity and cultural significance of the foundation's mission.

## Impact

The visual identity serves as a bridge between the foundation's rich history and its continued relevance in contemporary dance education and performance.`,
    es: `## Resumen del Proyecto

Este proyecto involucró la creación de una identidad de marca integral para la Fundación Alicia Alonso, una de las fundaciones de danza más prestigiosas del mundo. El trabajo de diseño se centró en desarrollar un sistema visual que honra el legado de Alicia Alonso mientras presenta el trabajo de la fundación de manera moderna y accesible.

## Enfoque de Diseño

La identidad de marca abarca diversas aplicaciones incluyendo materiales digitales e impresos, asegurando consistencia en todos los puntos de contacto mientras se mantiene la integridad artística y el significado cultural de la misión de la fundación.

## Impacto

La identidad visual sirve como puente entre la rica historia de la fundación y su continua relevancia en la educación y el rendimiento de la danza contemporánea.`,
  },
  'Congreso Mundial de A.A.E.E.': {
    en: `## Project Overview

The World Congress of Performing Arts Research (CMIAE) required a comprehensive brand identity that would represent its academic excellence and international scope. This project involved creating a visual system that communicates the congress's commitment to advancing research in performing arts.

## Design Strategy

The brand identity was designed to be versatile across various media formats, from digital platforms to printed materials, ensuring that the visual language supports the academic and professional nature of the event while remaining accessible to a diverse international audience.

## Key Features

- Clear typography hierarchy for readability
- Professional color palette reflecting academic rigor
- Flexible logo system adaptable to various applications`,
    es: `## Resumen del Proyecto

El Congreso Mundial de Investigación en las Artes del Espectáculo (CMIAE) requirió una identidad de marca integral que representara su excelencia académica y alcance internacional. Este proyecto involucró crear un sistema visual que comunica el compromiso del congreso con el avance de la investigación en las artes escénicas.

## Estrategia de Diseño

La identidad de marca fue diseñada para ser versátil en varios formatos de medios, desde plataformas digitales hasta materiales impresos, asegurando que el lenguaje visual apoye la naturaleza académica y profesional del evento mientras permanece accesible a una audiencia internacional diversa.

## Características Clave

- Jerarquía tipográfica clara para legibilidad
- Paleta de colores profesional que refleja rigor académico
- Sistema de logotipo flexible adaptable a diversas aplicaciones`,
  },
  'Obsidian Zotero Linker': {
    en: `## Project Overview

Obsidian Zotero Linker is an Obsidian plugin designed to bridge the gap between note-taking and reference management. It creates bidirectional links between Obsidian notes and Zotero references, enabling researchers to seamlessly integrate their research workflows.

## Key Features

- **Bidirectional Linking**: Create links between Obsidian notes and Zotero items that work in both directions
- **Automatic Reference Detection**: Automatically detect and link Zotero references in your notes
- **Seamless Integration**: Works within the Obsidian interface without disrupting your workflow

## Technical Implementation

Built with TypeScript, the plugin leverages Obsidian's plugin API and Zotero's data structure to create a robust connection between the two systems. The plugin handles edge cases and provides error handling to ensure reliability.

## Use Cases

- Academic researchers managing large bibliographies
- Writers tracking sources and citations
- Anyone using both Obsidian and Zotero for knowledge management`,
    es: `## Resumen del Proyecto

Obsidian Zotero Linker es un plugin de Obsidian diseñado para cerrar la brecha entre la toma de notas y la gestión de referencias. Crea enlaces bidireccionales entre notas de Obsidian y referencias de Zotero, permitiendo a los investigadores integrar de manera fluida sus flujos de trabajo de investigación.

## Características Clave

- **Enlaces Bidireccionales**: Crea enlaces entre notas de Obsidian y elementos de Zotero que funcionan en ambas direcciones
- **Detección Automática de Referencias**: Detecta y vincula automáticamente referencias de Zotero en tus notas
- **Integración Fluida**: Funciona dentro de la interfaz de Obsidian sin interrumpir tu flujo de trabajo

## Implementación Técnica

Desarrollado con TypeScript, el plugin aprovecha la API de plugins de Obsidian y la estructura de datos de Zotero para crear una conexión robusta entre los dos sistemas. El plugin maneja casos límite y proporciona manejo de errores para asegurar confiabilidad.

## Casos de Uso

- Investigadores académicos gestionando grandes bibliografías
- Escritores rastreando fuentes y citas
- Cualquiera que use tanto Obsidian como Zotero para gestión del conocimiento`,
  },
  'Ilurama App': {
    en: `## Project Overview

Ilurama is a mobile application developed with Flutter, designed to provide innovative solutions for artistic and creative workflows. The app combines modern UI/UX principles with robust functionality to serve its users effectively.

## Features

- Intuitive user interface optimized for mobile devices
- Cross-platform compatibility (iOS and Android)
- Responsive design adapting to various screen sizes

## Technical Stack

Built with Flutter and Dart, the application leverages modern mobile development practices to deliver a smooth, performant experience across platforms.`,
    es: `## Resumen del Proyecto

Ilurama es una aplicación móvil desarrollada con Flutter, diseñada para proporcionar soluciones innovadoras para flujos de trabajo artísticos y creativos. La aplicación combina principios modernos de UI/UX con funcionalidad robusta para servir efectivamente a sus usuarios.

## Características

- Interfaz de usuario intuitiva optimizada para dispositivos móviles
- Compatibilidad multiplataforma (iOS y Android)
- Diseño responsivo que se adapta a diversos tamaños de pantalla

## Stack Técnico

Desarrollada con Flutter y Dart, la aplicación aprovecha prácticas modernas de desarrollo móvil para entregar una experiencia fluida y eficiente en todas las plataformas.`,
  },
  'Qlab Show Control Scripts': {
    en: `## Project Overview

QLab Show Control Scripts is a collection of AppleScript automation scripts designed to enhance workflow automation for QLab, a professional show control software used in live performances and theater productions.

## Features

- **Workflow Automation**: Automate repetitive tasks in QLab show control
- **Custom Controls**: Create custom control interfaces tailored to specific production needs
- **Error Handling**: Robust error handling ensures reliable operation during live performances

## Technical Details

Written in AppleScript, these scripts interface directly with QLab's automation capabilities, allowing for complex show control sequences and custom automation workflows that streamline production operations.

## Use Cases

- Live theater productions
- Concert and event production
- Any QLab-based show control system requiring custom automation`,
    es: `## Resumen del Proyecto

QLab Show Control Scripts es una colección de scripts de automatización en AppleScript diseñados para mejorar la automatización de flujos de trabajo para QLab, un software profesional de control de espectáculos utilizado en actuaciones en vivo y producciones teatrales.

## Características

- **Automatización de Flujos de Trabajo**: Automatiza tareas repetitivas en el control de espectáculos QLab
- **Controles Personalizados**: Crea interfaces de control personalizadas adaptadas a necesidades específicas de producción
- **Manejo de Errores**: Manejo robusto de errores asegura operación confiable durante actuaciones en vivo

## Detalles Técnicos

Escritos en AppleScript, estos scripts se interfazan directamente con las capacidades de automatización de QLab, permitiendo secuencias de control de espectáculos complejas y flujos de trabajo de automatización personalizados que optimizan las operaciones de producción.

## Casos de Uso

- Producciones teatrales en vivo
- Producción de conciertos y eventos
- Cualquier sistema de control de espectáculos basado en QLab que requiera automatización personalizada`,
  },
  'INEDITO': {
    en: `## Project Overview

INÉDITO is a platform and festival dedicated to showcasing new generations of creators and strengthening the language of performing arts. As Art Director, I worked on creating a comprehensive visual identity that reflects the innovative and forward-thinking nature of the festival.

## Design Philosophy

The visual identity for INÉDITO emphasizes the intersection of tradition and innovation in performing arts, creating a platform that celebrates emerging talent while honoring the rich heritage of the performing arts tradition.

## Key Elements

- Modern visual language that appeals to new generations of artists
- Flexible identity system adaptable to various festival formats
- Strong emphasis on artistic expression and creative freedom`,
    es: `## Resumen del Proyecto

INÉDITO es una plataforma y festival dedicado a mostrar las nuevas generaciones de creadores y fortalecer el lenguaje de las artes escénicas. Como Director de Arte, trabajé en crear una identidad visual integral que refleja la naturaleza innovadora y visionaria del festival.

## Filosofía de Diseño

La identidad visual para INÉDITO enfatiza la intersección de la tradición y la innovación en las artes escénicas, creando una plataforma que celebra el talento emergente mientras honra la rica herencia de la tradición de las artes escénicas.

## Elementos Clave

- Lenguaje visual moderno que atrae a las nuevas generaciones de artistas
- Sistema de identidad flexible adaptable a diversos formatos de festival
- Énfasis fuerte en la expresión artística y la libertad creativa`,
  },
  'Alicia Alonso Campus App': {
    en: `## Project Overview

The Alicia Alonso Campus App is a mobile application designed to provide students and faculty of the Instituto Superior de Danza "Alicia Alonso" with essential tools and resources for campus life, academic management, and access to institutional information.

## Features

- **Campus Information**: Access to schedules, events, and campus news
- **Academic Tools**: Grade tracking, course materials, and academic calendar
- **Institutional Resources**: Direct access to library resources, administrative services, and more

## Technical Implementation

Developed with Flutter and Dart, the app provides a native experience on both iOS and Android platforms, ensuring all users have access to campus resources regardless of their device.`,
    es: `## Resumen del Proyecto

La Aplicación del Campus Alicia Alonso es una aplicación móvil diseñada para proporcionar a estudiantes y profesores del Instituto Superior de Danza "Alicia Alonso" herramientas y recursos esenciales para la vida en el campus, gestión académica y acceso a información institucional.

## Características

- **Información del Campus**: Acceso a horarios, eventos y noticias del campus
- **Herramientas Académicas**: Seguimiento de calificaciones, materiales de curso y calendario académico
- **Recursos Institucionales**: Acceso directo a recursos de la biblioteca, servicios administrativos y más

## Implementación Técnica

Desarrollada con Flutter y Dart, la aplicación proporciona una experiencia nativa en plataformas iOS y Android, asegurando que todos los usuarios tengan acceso a los recursos del campus independientemente de su dispositivo.`,
  },
  'Theodore System': {
    en: `## Project Overview

Theodore System is an AI-powered automation platform designed to enhance creative workflows in Adobe applications. Built with TypeScript, ExtendScript, and Python, the system integrates machine learning capabilities with professional creative tools to automate complex tasks and improve productivity.

## Key Features

- **Adobe Integration**: Deep integration with Adobe Creative Suite applications
- **AI-Powered Automation**: Machine learning algorithms optimize creative workflows
- **Cross-Platform**: Works across different Adobe applications seamlessly
- **ExtendScript Compatibility**: Leverages Adobe's ExtendScript for native integration

## Technical Architecture

The system combines TypeScript for modern development practices, ExtendScript for Adobe integration, and Python for AI/ML processing, creating a robust platform that bridges the gap between automation and creative work.`,
    es: `## Resumen del Proyecto

Theodore System es una plataforma de automatización impulsada por IA diseñada para mejorar los flujos de trabajo creativos en aplicaciones Adobe. Desarrollado con TypeScript, ExtendScript y Python, el sistema integra capacidades de aprendizaje automático con herramientas creativas profesionales para automatizar tareas complejas y mejorar la productividad.

## Características Clave

- **Integración Adobe**: Integración profunda con aplicaciones de Adobe Creative Suite
- **Automatización Impulsada por IA**: Algoritmos de aprendizaje automático optimizan flujos de trabajo creativos
- **Multiplataforma**: Funciona sin problemas en diferentes aplicaciones Adobe
- **Compatibilidad ExtendScript**: Aprovecha ExtendScript de Adobe para integración nativa

## Arquitectura Técnica

El sistema combina TypeScript para prácticas de desarrollo modernas, ExtendScript para integración Adobe y Python para procesamiento de IA/ML, creando una plataforma robusta que cierra la brecha entre la automatización y el trabajo creativo.`,
  },
  'Zotero Citation Linker': {
    en: `## Project Overview

Zotero Citation Linker is a tool designed to automatically link citations in documents to their corresponding Zotero bibliography entries. This streamlines academic writing workflows by ensuring accurate reference management and easy navigation between citations and their sources.

## Features

- **Automatic Citation Detection**: Identifies citations in documents and links them to Zotero entries
- **Bidirectional Links**: Navigate seamlessly between document citations and Zotero bibliography
- **Multiple Format Support**: Works with various citation styles and document formats

## Technical Details

Built with TypeScript, the tool interfaces with Zotero's API and document processing libraries to create reliable citation links, improving the efficiency of academic writing and research workflows.`,
    es: `## Resumen del Proyecto

Zotero Citation Linker es una herramienta diseñada para vincular automáticamente las citas en documentos con sus entradas de bibliografía correspondientes en Zotero. Esto optimiza los flujos de trabajo de escritura académica al asegurar una gestión precisa de referencias y una navegación fácil entre citas y sus fuentes.

## Características

- **Detección Automática de Citas**: Identifica citas en documentos y las vincula con entradas de Zotero
- **Enlaces Bidireccionales**: Navega sin problemas entre citas de documentos y bibliografía de Zotero
- **Soporte de Múltiples Formatos**: Funciona con varios estilos de citas y formatos de documentos

## Detalles Técnicos

Desarrollada con TypeScript, la herramienta se interfaza con la API de Zotero y bibliotecas de procesamiento de documentos para crear enlaces de citas confiables, mejorando la eficiencia de los flujos de trabajo de escritura académica e investigación.`,
  },
};

// Read CSV
const csvPath = join(__dirname, '..', 'src', 'content', 'works', 'works.csv');
const csvContent = readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Parse header
const headers = lines[0].split(',').map(h => h.trim());

// Parse rows
const rows = lines.slice(1).map(line => {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  
  const row = {};
  headers.forEach((header, index) => {
    row[header] = values[index] || '';
  });
  return row;
});

// Ensure directories exist
const enDir = join(__dirname, '..', 'src', 'content', 'works', 'en');
const esDir = join(__dirname, '..', 'src', 'content', 'works', 'es');

if (!existsSync(enDir)) mkdirSync(enDir, { recursive: true });
if (!existsSync(esDir)) mkdirSync(esDir, { recursive: true });

// Generate MDX files
rows.forEach(row => {
  if (!row.title || row.title.trim() === '') return;
  
  const slug = generateSlug(row.title);
  const technologies = parseTechnologies(row.technologies);
  const publishedAt = convertDate(row.publishedAt);
  const featured = row.featured === 'TRUE';
  const hasLink = row.link && row.link.trim() !== '';
  
  // Get description
  let description = '';
  if (projectDescriptions[row.title]) {
    description = projectDescriptions[row.title].en;
  } else {
    description = `A ${row.category.replace('-', ' ')} project${row.role ? ` where I worked as ${row.role}` : ''}.`;
  }
  
  // Generate English MDX
  const enMdx = `---
title: "${row.title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
publishedAt: "${publishedAt}"
author: "Enrique Velasco"
category: ${row.category}
tags: ${row.tags ? `[${row.tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]` : '[]'}
featured: ${featured}
draft: false
client: "${row.client.replace(/"/g, '\\"')}"
role: "${row.role.replace(/"/g, '\\"')}"
technologies: [${technologies.map(t => `"${t}"`).join(', ')}]
${hasLink ? `projectUrl: "${row.link}"\n` : ''}alternateLocales:
  es: "${slug}"
---

# ${row.title}

${projectDescriptions[row.title]?.en || description}

${projectContent[row.title]?.en || ''}
`;

  // Get Spanish description
  let descriptionEs = '';
  if (projectDescriptions[row.title]) {
    descriptionEs = projectDescriptions[row.title].es;
  } else {
    descriptionEs = `Un proyecto de ${row.category.replace('-', ' ')}${row.role ? ` en el que trabajé como ${row.role}` : ''}.`;
  }
  
  // Generate Spanish MDX
  const esMdx = `---
title: "${row.title.replace(/"/g, '\\"')}"
description: "${descriptionEs.replace(/"/g, '\\"')}"
publishedAt: "${publishedAt}"
author: "Enrique Velasco"
category: ${row.category}
tags: ${row.tags ? `[${row.tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]` : '[]'}
featured: ${featured}
draft: false
client: "${row.client.replace(/"/g, '\\"')}"
role: "${row.role.replace(/"/g, '\\"')}"
technologies: [${technologies.map(t => `"${t}"`).join(', ')}]
${hasLink ? `projectUrl: "${row.link}"\n` : ''}alternateLocales:
  en: "${slug}"
---

# ${row.title}

${projectDescriptions[row.title]?.es || descriptionEs}

${projectContent[row.title]?.es || ''}
`;

  // Write files
  writeFileSync(join(enDir, `${slug}.mdx`), enMdx, 'utf-8');
  writeFileSync(join(esDir, `${slug}.mdx`), esMdx, 'utf-8');
  
  console.log(`Generated: ${slug}.mdx (EN & ES)`);
});

console.log(`\nGenerated ${rows.length} work entries in both English and Spanish.`);

