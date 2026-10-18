import { TitleScreen } from "@/components/game/TitleScreen"
import { CharacterSheet } from "@/components/game/CharacterSheet"
import { QuestLog } from "@/components/game/QuestLog"
import { Inventory } from "@/components/game/Inventory"
import { Story } from "@/components/game/Story"
import { SaveGame } from "@/components/game/SaveGame"
import { PERSONAL_INFO, SITE_URL } from "@/lib/data"

// Datos estructurados para que Google asocie el sitio con la persona y sus perfiles
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#persona`,
      name: PERSONAL_INFO.name,
      alternateName: ["Axel Díaz", "Axel Guerrero"],
      url: SITE_URL,
      image: `${SITE_URL}/apple-icon.png`,
      jobTitle: "Desarrollador full stack",
      email: `mailto:${PERSONAL_INFO.email}`,
      worksFor: { "@type": "Organization", name: "Mobysuite" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Colima" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colima",
        addressRegion: "Colima",
        addressCountry: "MX",
      },
      knowsAbout: ["Ruby on Rails", "Vue.js", "PostgreSQL", "MySQL", "Sidekiq", "Docker", "TypeScript"],
      sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#sitio`,
      url: SITE_URL,
      name: PERSONAL_INFO.name,
      inLanguage: ["es", "en"],
      publisher: { "@id": `${SITE_URL}/#persona` },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <TitleScreen />
      <CharacterSheet />
      <QuestLog />
      <Inventory />
      <Story />
      <SaveGame />
    </>
  )
}
