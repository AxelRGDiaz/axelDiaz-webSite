import { TitleScreen } from "@/components/game/TitleScreen"
import { CharacterSheet } from "@/components/game/CharacterSheet"
import { QuestLog } from "@/components/game/QuestLog"
import { Inventory } from "@/components/game/Inventory"
import { Story } from "@/components/game/Story"
import { SaveGame } from "@/components/game/SaveGame"

export default function HomePage() {
  return (
    <>
      <TitleScreen />
      <CharacterSheet />
      <QuestLog />
      <Inventory />
      <Story />
      <SaveGame />
    </>
  )
}
