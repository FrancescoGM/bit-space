import { Flex, Text } from '@chakra-ui/react'
import { useDrag } from 'react-dnd'
import { Player } from '../models/Player'

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps): JSX.Element {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', player },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <Flex
      ref={dragRef}
      w="full"
      h="min"
      px="5"
      py="4"
      borderWidth="2px"
      borderColor="gray.200"
      borderStyle="dashed"
      borderRadius="8"
      bg={
        isDragging
          ? 'transparent'
          : 'linear-gradient(to bottom, #f4f4f4, #f0f0f0, #ececec, #e8e8e8, #e4e4e4)'
      }
      cursor={isDragging ? 'grabbing' : 'grab'}
      direction="column"
      justify="space-between"
    >
      <Flex justify="space-between" opacity={isDragging ? 0 : 'initial'}>
        <Text fontSize="lg" color="gray.800" fontWeight="bold">
          Name:{' '}
          <Text as="span" color="pink.500" fontWeight="normal">
            {player.name}
          </Text>
        </Text>
        <Text fontSize="lg" color="gray.800" fontWeight="bold">
          Age:{' '}
          <Text as="span" color="pink.500" fontWeight="normal">
            {player.age}
          </Text>
        </Text>
      </Flex>
      <Text
        fontSize="lg"
        color="gray.800"
        fontWeight="bold"
        opacity={isDragging ? 0 : 'initial'}
      >
        Nationality:{' '}
        <Text as="span" color="pink.500" fontWeight="normal">
          {player.nationality}
        </Text>
      </Text>
    </Flex>
  )
}
