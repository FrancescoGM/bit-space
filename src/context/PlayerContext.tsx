import { createContext, ReactNode, useContext, useState } from 'react'
import { Player } from '../models/Player'
import { api } from '../services/api'

interface PlayerContextData {
  players: Player[]
  isDragging: boolean
  setIsDragging: (value: boolean) => void
  searchPlayers: (name: string) => Promise<void>
  addPlayer: (player: Player) => void
  clearPlayers: () => void
  clearData: () => void
  removePlayer: (player: Player) => void
  togglePlayer: (oldPlayer: Player, newPlayer: Player) => void
}

export const PlayerContext = createContext({} as PlayerContextData)

interface PlayerProviderProps {
  children?: ReactNode
}

export function PlayerProvider({ children }: PlayerProviderProps): JSX.Element {
  const [isDragging, setIsDragging] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [blacklistPlayers, setBlacklistPlayers] = useState<Player[]>([])

  function orderPlayers(list: Player[]): Player[] {
    return list.sort((a, b) => Number(a.id) - Number(b.id))
  }

  async function searchPlayers(name: string): Promise<void> {
    const { data } = await api.get<Player[]>('player', {
      params: {
        name
      }
    })

    const filteredData = data.filter(
      player =>
        !blacklistPlayers.some(
          blacklistPlayer => blacklistPlayer.id === player.id
        )
    )

    setPlayers(orderPlayers(filteredData))
  }

  function addPlayer(player: Player): Player {
    const blacklist = [...blacklistPlayers, player]
    setBlacklistPlayers(blacklist)

    const filteredData = players.filter(
      player =>
        !blacklist.some(blacklistPlayer => blacklistPlayer.id === player.id)
    )

    setPlayers(orderPlayers(filteredData))

    return player
  }

  function clearPlayers(): void {
    setPlayers([])
  }

  function removePlayer(player: Player): null {
    setPlayers(oldPlayers => [...oldPlayers, player])
    setBlacklistPlayers(oldBlacklistPlayers =>
      oldBlacklistPlayers.filter(
        blacklistPlayer => blacklistPlayer.id !== player.id
      )
    )
    return null
  }

  function togglePlayer(oldPlayer: Player, newPlayer: Player): void {
    setBlacklistPlayers(oldBlacklistPlayers => [
      ...oldBlacklistPlayers.filter(
        oldBlacklistPlayer => oldBlacklistPlayer.id !== oldPlayer.id
      ),
      newPlayer
    ])
    const newPlayers = orderPlayers([
      ...players.filter(player => player.id !== newPlayer.id),
      oldPlayer
    ])
    setPlayers(newPlayers)
  }

  function clearData(): void {
    setPlayers(oldPlayers => [...oldPlayers, ...blacklistPlayers])
    setBlacklistPlayers([])
  }

  return (
    <PlayerContext.Provider
      value={{
        players,
        isDragging,
        setIsDragging,
        searchPlayers,
        addPlayer,
        clearPlayers,
        clearData,
        removePlayer,
        togglePlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = (): PlayerContextData => useContext(PlayerContext)
