import { Player } from './Player'

type Tag = {
  label: string
  value: string
}

export type Team = {
  players: Player[][]
  tags: Tag[]
  formation: string
  description: string
  website: string
  name: string
}
