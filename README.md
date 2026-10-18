# Portafolio — Axel Guerrero Díaz

Portafolio personal con estética de RPG de Game Boy: pantalla de título, hoja de personaje, misiones (proyectos), inventario (herramientas), historia (trayectoria) y "guardar partida" (contacto).

## Stack

- **Next.js 16** (App Router, páginas estáticas)
- **TypeScript**
- **Tailwind CSS v4** — paleta de 4 tonos en `app/globals.css` (`gb-ink`, `gb-dark`, `gb-mid`, `gb-light`)
- **Press Start 2P + VT323** con `next/font`
- **Resend** para el formulario de contacto

## Desarrollo

```bash
npm install
npm run dev
```

## Cómo editar el contenido

Todo el contenido vive en `lib/data.ts`, en español e inglés:

- `QUESTS` — proyectos. Cada uno genera su página en `/projects/<slug>`.
- `INVENTORY` — tecnologías y qué tan seguido las usas.
- `CHAPTERS` — trayectoria.
- `PERSONAL_INFO` — nombre, correo y redes.

Los textos de la interfaz están en `lib/i18n.ts`.

### CV

Reemplaza `public/cv.pdf`. No hace falta tocar código.

## Variables de entorno

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Sin `RESEND_API_KEY`, `/api/contact` solo escribe el mensaje en la consola y responde con éxito (útil en local).

## Rutas anteriores

Las rutas del diseño anterior (`/projects`, `/career`, `/lab`, `/contact`, `/cv`) redirigen a la sección equivalente de la página principal (ver `next.config.ts`).
