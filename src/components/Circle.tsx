import { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { IoAdd, IoAlertCircle } from 'react-icons/io5'
import { useField } from '@unform/core'

import { Player } from '../models/Player'
import { usePlayer } from '../context/PlayerContext'

import { theme } from '../styles/theme'
import { Box, Text, Icon, Tooltip } from '@chakra-ui/react'

interface PlayerCircleProps {
  player: Player
}

export function PlayerCircle({ player }: PlayerCircleProps): JSX.Element {
  const nameInitials = player.name
    .split(' ')
    .reduce((acc, name) => acc + name.split('')[0], '')
    .slice(0, 3)

  return (
    <Tooltip
      bg="white"
      color="gray.800"
      label={
        <Box>
          <Text fontWeight="bold" isTruncated>
            Name: <Text as="span">{player.name}</Text>
          </Text>
          <Text fontWeight="bold" isTruncated>
            Age: <Text as="span">{player.age}</Text>
          </Text>
          <Text fontWeight="bold" isTruncated>
            Nationality: <Text as="span">{player.nationality}</Text>
          </Text>
        </Box>
      }
      aria-label="player tooltip"
    >
      <Box pos="relative" w={100} h={100}>
        <Text
          w="min"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          fontSize="2xl"
          fontWeight="medium"
        >
          {nameInitials}
        </Text>
        <svg height="100" width="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={theme.colors.orange['500']}
            strokeWidth="3"
            fill={theme.colors.purple['800']}
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="7"
            stroke={theme.colors.purple['800']}
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </Box>
    </Tooltip>
  )
}

interface DroppablePlayerCircleProps {
  name: string
}

export type Item = {
  type: string
  player: Player
  setPlayer?: Dispatch<SetStateAction<Player>>
}

export function DroppablePlayerCircle({
  name
}: DroppablePlayerCircleProps): JSX.Element {
  const circleRef = useRef(null)
  const { setIsDragging, addPlayer, removePlayer, togglePlayer } = usePlayer()
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [player, setPlayer] = useState<Player | null>(defaultValue || null)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CIRCLE',
    item: { type: 'CIRCLE', player, setPlayer },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: ['CARD', 'CIRCLE'],
    drop: (item: Item) => {
      if (item.type === 'CIRCLE') {
        if (!!player && !!item.player) {
          setPlayer(item.player)
          item.setPlayer(player)
          return
        }
      }
      if (player) {
        togglePlayer(player, item.player)
        setPlayer(item.player)
      } else {
        if (item.type === 'CARD') {
          addPlayer(item.player)
          setPlayer(item.player)
        } else {
          setPlayer(item.player)
          item.setPlayer(null)
        }
      }
    }
  })

  useEffect(() => {
    setIsDragging(isDragging)
  }, [isDragging, setIsDragging])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => player,
      setValue: value => {
        addPlayer(value)
        setPlayer(value)
      },
      clearValue: () => {
        setPlayer(player)
        removePlayer(player)
      }
    })
  }, [registerField, addPlayer, removePlayer, fieldName, player])

  if (player) {
    const nameInitials = player.name
      .split(' ')
      .reduce((acc, name) => acc + name.split('')[0], '')
      .slice(0, 3)
    dropRef(dragRef(circleRef))
    return (
      <Box>
        <Tooltip
          bg="white"
          color="gray.800"
          label={
            <Box>
              <Text fontWeight="bold" isTruncated>
                Name: <Text as="span">{player.name}</Text>
              </Text>
              <Text fontWeight="bold" isTruncated>
                Age: <Text as="span">{player.age}</Text>
              </Text>
              <Text fontWeight="bold" isTruncated>
                Nationality: <Text as="span">{player.nationality}</Text>
              </Text>
            </Box>
          }
          aria-label="player tooltip"
        >
          <Box
            pos="relative"
            w={90}
            h={90}
            ref={circleRef}
            cursor="grab"
            bg="transparent"
          >
            <Text
              w="min"
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              color="white"
              fontSize="2xl"
              fontWeight="medium"
            >
              {nameInitials}
            </Text>
            <svg height="90" width="90">
              <circle
                cx="45"
                cy="45"
                r="39"
                stroke={theme.colors.orange['500']}
                strokeWidth="3"
                fill={theme.colors.purple['800']}
              />
              <circle
                cx="45"
                cy="45"
                r="42"
                strokeDasharray="10"
                stroke={theme.colors.purple['800']}
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </Box>
        </Tooltip>
      </Box>
    )
  }
  dropRef(circleRef)
  return (
    <Box pos="relative" w={90} h={90} ref={circleRef}>
      <Icon
        as={IoAdd}
        w={50}
        h={50}
        color="white"
        pos="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      />
      <svg height="90" width="90">
        <circle cx="45" cy="45" r="39" fill={`${theme.colors.white}aa`} />

        <circle
          cx="45"
          cy="45"
          r="42"
          strokeDasharray="10"
          stroke={`${theme.colors.white}aa`}
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {error && (
        <Tooltip
          label={error}
          aria-label="Error tooltip"
          bg="white"
          color="gray.800"
        >
          <Box as="span" pos="absolute" top="70%" left="70%">
            <Icon as={IoAlertCircle} w="6" h="6" color="red.500" />
          </Box>
        </Tooltip>
      )}
    </Box>
  )
}
