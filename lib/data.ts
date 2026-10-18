import type { Chapter, InventoryItem, Quest } from "@/types"

export const SITE_URL = "https://www.axel-diaz.com"

export const PERSONAL_INFO = {
  name: "Axel Guerrero Díaz",
  location: "Colima, México",
  email: "axelrgdiaz@gmail.com",
  github: "https://github.com/AxelRGDiaz",
  linkedin: "https://www.linkedin.com/in/axel-diaz24/",
  cv: "/cv.pdf",
  yearsOfExperience: 3,
}

export const QUESTS: Quest[] = [
  {
    slug: "plantelia",
    name: "Plantelia",
    kind: "main",
    status: "active",
    year: 2026,
    stack: ["Rails 7.2", "Vue 3 + TS", "PostgreSQL 16", "Sidekiq", "Redis", "PWA"],
    links: { demo: "https://plantelia.axel-diaz.com" },
    shot: {
      alt: {
        es: "Pase de lista de un grupo y tabla de calificaciones en Plantelia",
        en: "A class attendance list and a grades table in Plantelia",
      },
    },
    summary: {
      es: "Control escolar para primarias y secundarias: asistencias con QR, calificaciones, expedientes y avisos a las familias. Sigue funcionando sin internet.",
      en: "School management for elementary and middle schools: QR attendance, grades, student records and messages to families. It keeps working offline.",
    },
    reward: {
      es: "Varias escuelas en una sola base de datos, permisos por rol con Pundit y modo sin conexión con IndexedDB.",
      en: "Many schools in one database, role-based permissions with Pundit and offline mode with IndexedDB.",
    },
    problem: {
      es: "En las escuelas la información vive en listas de papel, hojas de Excel, cuadernos de calificaciones y grupos de WhatsApp. Cada maestro pasa lista a su manera y alguien tiene que juntarlo todo a fin de mes. Y los salones del fondo casi nunca tienen señal.",
      en: "In schools, information lives in paper lists, Excel sheets, grade notebooks and WhatsApp groups. Every teacher takes attendance their own way and someone has to put it all together at the end of the month. And the back classrooms rarely have signal.",
    },
    built: {
      es: [
        "Pase de lista con un toque o con código QR, que se guarda en el celular y se sincroniza cuando vuelve la señal.",
        "Cada registro lleva su escuela; un middleware la toma del token y ninguna consulta puede ver datos de otra.",
        "Dirección, maestros, enfermería, psicología y familias ven cosas distintas, con una política de Pundit por recurso.",
        "Boletas en PDF, reportes en Excel y notificaciones push generados en segundo plano con Sidekiq.",
        "Bitácora de auditoría automática: quién cambió qué y cuándo.",
      ],
      en: [
        "Attendance with one tap or a QR code, stored on the phone and synced when the signal comes back.",
        "Every record carries its school; a middleware reads it from the token so no query can see another school's data.",
        "Principals, teachers, nurses, psychologists and families see different things, with one Pundit policy per resource.",
        "PDF report cards, Excel reports and push notifications generated in the background with Sidekiq.",
        "Automatic audit log: who changed what and when.",
      ],
    },
  },
  {
    slug: "converter-app",
    name: "Converter App",
    kind: "side",
    status: "done",
    year: 2026,
    stack: ["Rails 7.1", "Sidekiq", "Turbo Streams", "MySQL 8", "ffmpeg", "LibreOffice"],
    links: { demo: "https://k8s.axel-diaz.com" },
    shot: {
      alt: {
        es: "Pantalla principal de Converter App para subir archivos y elegir el formato",
        en: "Converter App home screen for uploading files and picking a format",
      },
    },
    summary: {
      es: "Convierte video, audio, imágenes y documentos. Cada archivo entra a una cola y el avance llega en vivo al navegador.",
      en: "Converts video, audio, images and documents. Every file goes into a queue and progress shows up live in the browser.",
    },
    reward: {
      es: "Colas con ffmpeg, ImageMagick y LibreOffice, y avisos en tiempo real con Turbo Streams.",
      en: "Queues running ffmpeg, ImageMagick and LibreOffice, with real-time updates over Turbo Streams.",
    },
    problem: {
      es: "Convertir un archivo no debería significar subirlo a un sitio lleno de anuncios ni dejar la pestaña congelada mientras termina.",
      en: "Converting a file shouldn't mean uploading it to a site full of ads or freezing the tab until it's done.",
    },
    built: {
      es: [
        "Video a MP4 o GIF, audio a MP3 o WAV, imágenes a JPG, PNG, WEBP o PDF y documentos de Office a PDF.",
        "Cada conversión corre en un job de Sidekiq; el navegador recibe el avance por Turbo Streams.",
        "Hasta 20 archivos a la vez con descarga en ZIP; lo convertido como invitado pasa a tu cuenta al registrarte.",
        "Límites con rack-attack para subidas e intentos de inicio de sesión.",
      ],
      en: [
        "Video to MP4 or GIF, audio to MP3 or WAV, images to JPG, PNG, WEBP or PDF, and Office documents to PDF.",
        "Each conversion runs in a Sidekiq job; the browser gets progress through Turbo Streams.",
        "Up to 20 files at once with a ZIP download; guest conversions move to your account when you sign up.",
        "Rate limits with rack-attack for uploads and login attempts.",
      ],
    },
  },
  {
    slug: "notchflow",
    name: "NotchFlow",
    kind: "secret",
    status: "active",
    year: 2026,
    stack: ["Swift 6", "SwiftUI", "macOS 14+"],
    links: {},
    shot: {
      alt: {
        es: "Panel de NotchFlow abierto en el módulo de música",
        en: "NotchFlow panel open on the music module",
      },
    },
    summary: {
      es: "El notch de la MacBook como panel: música, calendario, tareas, bandeja con AirDrop y temporizador.",
      en: "The MacBook notch as a control panel: music, calendar, tasks, an AirDrop shelf and a timer.",
    },
    reward: {
      es: "Una app nativa de macOS en Swift, sin red ni cuentas.",
      en: "A native macOS app in Swift, with no network and no accounts.",
    },
    problem: {
      es: "El notch ocupa espacio en la pantalla y no hace nada. Quería que sirviera para algo sin estorbar.",
      en: "The notch takes up screen space and does nothing. I wanted it to be useful without getting in the way.",
    },
    built: {
      es: [
        "En reposo se esconde tras el notch; al pasar el cursor se despliega un panel.",
        "Módulos de música, calendario, tareas, bandeja de archivos con AirDrop, temporizador y espejo de cámara.",
        "Indicadores junto al notch: música sonando, temporizador en marcha, evento próximo o batería baja.",
        "Sin telemetría ni cuentas: las preferencias se quedan en la Mac.",
      ],
      en: [
        "At rest it hides behind the notch; hover over it and a panel slides open.",
        "Music, calendar, tasks, a file shelf with AirDrop, a timer and a camera mirror.",
        "Indicators next to the notch: music playing, timer running, an upcoming event or low battery.",
        "No telemetry and no accounts: preferences stay on the Mac.",
      ],
    },
  },
  {
    slug: "clatuatech-tools",
    name: "ClatuaTech Tools",
    kind: "side",
    status: "active",
    year: 2026,
    stack: ["Electron", "TypeScript", "React 19", "winget"],
    links: {},
    shot: {
      alt: {
        es: "Catálogo de programas de ClatuaTech Tools",
        en: "ClatuaTech Tools software catalog",
      },
    },
    summary: {
      es: "Navaja suiza para técnicos de Windows: instala programas, corre diagnósticos y repara el sistema desde una ventana.",
      en: "A Swiss Army knife for Windows technicians: install software, run diagnostics and repair the system from one window.",
    },
    reward: {
      es: "Juntar en una app todo lo que hacía a mano cuando era técnico.",
      en: "Putting everything I used to do by hand as a technician into one app.",
    },
    problem: {
      es: "Preparar o reparar una computadora significa abrir veinte herramientas distintas y teclear los mismos comandos una y otra vez.",
      en: "Setting up or repairing a computer means opening twenty different tools and typing the same commands over and over.",
    },
    built: {
      es: [
        "Instalación de programas con winget desde un catálogo editable.",
        "Diagnóstico de hardware y red, reparación con SFC, DISM y CHKDSK, y detección de Office y activación.",
        "Solo se pueden lanzar comandos de una lista blanca; la interfaz nunca toca Node directamente.",
        "Panel de registro en vivo para ver qué está pasando en cada paso.",
      ],
      en: [
        "Software installs with winget from an editable catalog.",
        "Hardware and network diagnostics, repairs with SFC, DISM and CHKDSK, and Office and activation checks.",
        "Only allow-listed commands can run; the UI never touches Node directly.",
        "A live log panel that shows what is happening at every step.",
      ],
    },
  },
  {
    slug: "environmental-monitor",
    name: "Monitor ambiental",
    nameEn: "Environmental Monitor",
    kind: "side",
    status: "archived",
    year: 2023,
    stack: ["Node.js", "MQTT", "MongoDB", "Linux", "SSH"],
    links: {},
    summary: {
      es: "Recibe lecturas de sensores por MQTT, las guarda como series de tiempo y no pierde datos cuando se cae la red.",
      en: "Receives sensor readings over MQTT, stores them as time series and doesn't lose data when the network drops.",
    },
    reward: {
      es: "Reconexión sin pérdida de datos y despliegue en un servidor Linux por SSH.",
      en: "Reconnection without data loss and deployment to a Linux server over SSH.",
    },
    problem: {
      es: "Varios sensores repartidos mandan lecturas en tiempo real por una conexión que se cae de vez en cuando.",
      en: "Several distributed sensors send real-time readings over a connection that drops from time to time.",
    },
    built: {
      es: [
        "Un servicio en Node.js suscrito a un broker MQTT que recibe la telemetría.",
        "Esquema en MongoDB pensado para consultar series de tiempo.",
        "Lógica de reconexión para no perder lecturas cuando falla la red.",
        "Despliegue y mantenimiento en un servidor Linux sin pantalla, por SSH.",
      ],
      en: [
        "A Node.js service subscribed to an MQTT broker that receives the telemetry.",
        "A MongoDB schema designed for time-series queries.",
        "Reconnection logic so readings aren't lost when the network fails.",
        "Deployed and maintained on a headless Linux server over SSH.",
      ],
    },
  },
  {
    slug: "fullstack-cms",
    name: "App Node + Vue",
    kind: "side",
    status: "done",
    year: 2024,
    stack: ["Node.js", "Express", "Vue 3", "MySQL", "JWT"],
    links: {},
    summary: {
      es: "Una API REST en Express con autenticación JWT y una SPA en Vue 3, para salir de Rails y conocer otro ecosistema.",
      en: "An Express REST API with JWT authentication and a Vue 3 SPA, built to step outside Rails and learn another ecosystem.",
    },
    reward: {
      es: "Separar rutas, controladores y servicios en Express, y manejar la sesión en Vue con la Composition API.",
      en: "Splitting routes, controllers and services in Express, and handling auth state in Vue with the Composition API.",
    },
    problem: {
      es: "Quería comprobar que sé construir una aplicación completa fuera de Ruby on Rails.",
      en: "I wanted to prove I can build a complete application outside Ruby on Rails.",
    },
    built: {
      es: [
        "API REST en Express con autenticación JWT y operaciones CRUD.",
        "SPA en Vue 3 que consume la API, con la sesión manejada de forma reactiva.",
        "MySQL como base de datos, con conexiones administradas desde Node.",
      ],
      en: [
        "An Express REST API with JWT authentication and CRUD operations.",
        "A Vue 3 SPA consuming the API, with reactive auth state.",
        "MySQL as the database, with connections managed from Node.",
      ],
    },
  },
]

export const INVENTORY: InventoryItem[] = [
  { name: "Ruby on Rails", use: "daily" },
  { name: "Vue 3", use: "daily" },
  { name: "MySQL", use: "daily" },
  { name: "Git", use: "daily" },
  { name: "Sidekiq + Redis", use: "often" },
  { name: "PostgreSQL", use: "often" },
  { name: "Docker", use: "often" },
  { name: "TypeScript", use: "often" },
  { name: "Node.js", use: "sometimes" },
  { name: "Swift", use: "sometimes" },
  { name: "Electron", use: "sometimes" },
  { name: "Linux / SSH", use: "since2021" },
]

export const CHAPTERS: Chapter[] = [
  {
    period: { es: "2021—2024", en: "2021—2024" },
    title: { es: "La universidad", en: "University" },
    text: {
      es: "Ingeniería en Tecnologías del Internet en la Universidad de Colima.",
      en: "B.Eng. in Internet Technologies at Universidad de Colima.",
    },
  },
  {
    period: { es: "2021—2024", en: "2021—2024" },
    title: { es: "El técnico", en: "The technician" },
    text: {
      es: "Reparación de equipos, redes pequeñas y talleres de robótica educativa, por mi cuenta.",
      en: "Computer repair, small networks and educational robotics workshops, on my own.",
    },
  },
  {
    period: { es: "2024— EN CURSO", en: "2024— ONGOING" },
    title: { es: "Mobysuite", en: "Mobysuite" },
    text: {
      es: "Desarrollador full stack remoto: APIs en Rails, pantallas en Vue 3, colas con Sidekiq y reportes en MySQL.",
      en: "Remote full stack developer: Rails APIs, Vue 3 screens, Sidekiq queues and MySQL reports.",
    },
    current: true,
  },
]
