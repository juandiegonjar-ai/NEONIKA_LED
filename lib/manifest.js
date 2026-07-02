(function () {
  "use strict";

  window.__BRAND__ = {
    name: "NĒONIKA",
    legalName: "Nēonika Lighting Studio",
    tagline: "Iluminación LED de autor",
    year: "2026",

    nav: [
      { label: "Inicio", href: "index.html" },
      { label: "Productos", href: "productos.html" },
      { label: "Servicios", href: "servicios.html" },
      { label: "Proyectos", href: "proyectos.html" },
      { label: "Estudio", href: "nosotros.html" },
      { label: "Contacto", href: "contacto.html" }
    ],

    hero: {
      kicker: "Estudio de iluminación LED · Madrid",
      title: "La luz, esculpida.",
      sub: "Diseñamos y fabricamos sistemas LED a medida — tiras, paneles, neón flexible y control inteligente — para espacios que quieren sentirse vivos.",
      ctaPrimary: { label: "Ver catálogo", href: "productos.html" },
      ctaSecondary: { label: "Hablar con el estudio", href: "contacto.html" }
    },

    stats: [
      { value: 340, suffix: "+", label: "proyectos instalados" },
      { value: 12, suffix: "", label: "años de trabajo" },
      { value: 98, suffix: "%", label: "clientes que repiten" },
      { value: 24, suffix: "h", label: "respuesta media" }
    ],

    benefits: [
      {
        title: "Diseño a medida",
        text: "Cada instalación se calcula para el espacio real: temperatura de color, difusión y curva de intensidad ajustadas a mano."
      },
      {
        title: "Componentes de grado profesional",
        text: "Chips certificados, drivers regulables y perfiles de aluminio con disipación — pensados para durar más de 50.000 horas."
      },
      {
        title: "Control inteligente",
        text: "Escenas, automatizaciones y sincronía con música o presencia, gestionadas desde una app o integradas en tu domótica."
      },
      {
        title: "Instalación y soporte",
        text: "Un mismo equipo diseña, instala y mantiene. Sin intermediarios, sin sorpresas en el presupuesto."
      }
    ],

    products: [
      {
        id: "tira-led-pro",
        category: "Tiras LED",
        name: "Tira LED Pro RGB+CCT",
        price: "desde 38€/m",
        desc: "Alta densidad, 24V, color y blanco cálido-frío ajustables en el mismo perfil.",
        photo: "assets/img/product-strip.webp",
        photoAlt: "Primer plano de una tira LED encendida en tonos azul y morado",
        icon: "strip"
      },
      {
        id: "panel-arquitectonico",
        category: "Paneles LED",
        name: "Panel Arquitectónico Slim",
        price: "desde 145€",
        desc: "Panel ultrafino de luz indirecta para techos y muros, difusión uniforme sin puntos calientes.",
        photo: null,
        photoAlt: "Panel LED plano encendido con luz uniforme",
        icon: "panel"
      },
      {
        id: "neon-flex",
        category: "Neón flexible",
        name: "Neón Flex Signature",
        price: "desde 52€/m",
        desc: "Silicona flexible de alto brillo para rótulos, contornos y mobiliario luminoso.",
        photo: "assets/img/product-neon.webp",
        photoAlt: "Rótulo de neón flexible encendido de noche en una calle",
        icon: "neon"
      },
      {
        id: "bombilla-smart",
        category: "Bombillas inteligentes",
        name: "Bombilla Smart Filament",
        price: "desde 24€",
        desc: "Wi-Fi integrado, 16 millones de colores, compatible con las principales plataformas de domótica.",
        photo: null,
        photoAlt: "Bombilla LED inteligente encendida en la oscuridad",
        icon: "bulb"
      },
      {
        id: "facade-linear",
        category: "Iluminación arquitectónica",
        name: "Línea de Fachada Exterior",
        price: "desde 89€/m",
        desc: "IP67, resistente a la intemperie, pensada para contornear fachadas y elementos estructurales.",
        photo: "assets/img/gallery-facade-night.webp",
        photoAlt: "Fachada de un edificio iluminada de noche con líneas de luz",
        icon: "facade"
      },
      {
        id: "retail-track",
        category: "Iluminación retail",
        name: "Sistema de Carril Retail",
        price: "desde 64€/spot",
        desc: "Spots orientables de alto CRI para escaparates, vitrinas y puntos de venta.",
        photo: null,
        photoAlt: "Foco LED orientable iluminando un producto en un escaparate",
        icon: "track"
      }
    ],

    services: [
      {
        title: "Diseño lumínico",
        text: "Estudio de planos, render 3D y propuesta de temperatura, intensidad y trayectos de luz antes de instalar nada.",
        step: "01"
      },
      {
        title: "Instalación profesional",
        text: "Equipo propio certificado. Cableado oculto, perfiles a medida y acabado impecable en obra nueva o reforma.",
        step: "02"
      },
      {
        title: "Automatización y control",
        text: "Integración con KNX, Zigbee o Wi-Fi. Escenas programadas, sensores de presencia y control por voz.",
        step: "03"
      },
      {
        title: "Mantenimiento",
        text: "Revisión periódica, sustitución de drivers y garantía extendida para proyectos residenciales y comerciales.",
        step: "04"
      }
    ],

    gallery: [
      {
        title: "Dormitorio ambiente",
        category: "Residencial",
        photo: "assets/img/gallery-bedroom.webp",
        photoAlt: "Dormitorio con iluminación LED cálida ambiental"
      },
      {
        title: "Oficina de diseño",
        category: "Comercial",
        photo: "assets/img/gallery-office.webp",
        photoAlt: "Oficina moderna con iluminación LED integrada en el techo"
      },
      {
        title: "Fachada nocturna",
        category: "Arquitectónico",
        photo: "assets/img/gallery-facade-night.webp",
        photoAlt: "Fachada de edificio iluminada con líneas LED por la noche"
      },
      {
        title: "Rótulo de neón",
        category: "Retail",
        photo: "assets/img/product-neon.webp",
        photoAlt: "Calle comercial iluminada con neón flexible de noche"
      }
    ],

    testimonials: [
      {
        quote: "Nos rediseñaron la iluminación del showroom en dos semanas. El cambio de percepción del espacio fue inmediato — los clientes se quedan más tiempo.",
        name: "Marta Iglesias",
        role: "Directora, Estudio Marea"
      },
      {
        quote: "Instalaron tira LED y control por escenas en toda la casa. La app es sencilla y el acabado, invisible — no se ve un solo cable.",
        name: "Rubén Castells",
        role: "Cliente residencial"
      },
      {
        quote: "El equipo entendió el edificio antes de proponer nada. La fachada ahora es parte de la identidad del negocio.",
        name: "Laura Domínguez",
        role: "Gerente, Hotel Aurea"
      }
    ],

    faqs: [
      {
        q: "¿Cuánto tarda una instalación residencial estándar?",
        a: "Entre 2 y 5 días laborables según metros lineales y complejidad del cableado, tras la fase de diseño."
      },
      {
        q: "¿Los productos funcionan con domótica existente?",
        a: "Sí. Trabajamos con KNX, Zigbee, Wi-Fi y protocolos abiertos; integramos el sistema con lo que ya tengas instalado."
      },
      {
        q: "¿Ofrecéis garantía?",
        a: "Todos los componentes tienen 3 años de garantía de fábrica y la instalación, 2 años de garantía de mano de obra."
      },
      {
        q: "¿Hacéis proyectos fuera de Madrid?",
        a: "Sí, desplazamos equipo a toda España para proyectos comerciales y arquitectónicos de cierta envergadura."
      },
      {
        q: "¿Puedo empezar solo con el catálogo sin diseño previo?",
        a: "Claro. Para pedidos de producto sin instalación no hace falta estudio previo — te asesoramos igualmente por escrito."
      }
    ],

    contact: {
      email: "hola@neonika.studio",
      phone: "+34 910 220 145",
      whatsapp: "+34 610 220 145",
      address: "Calle del Pez 19, 28004 Madrid",
      hours: "Lunes a viernes · 10:00–19:00",
      mapQuery: "Calle del Pez 19, Madrid"
    },

    social: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Pinterest", href: "https://pinterest.com" },
      { label: "LinkedIn", href: "https://linkedin.com" }
    ]
  };
})();
