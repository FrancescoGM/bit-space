import { Flex, Center, Text } from '@chakra-ui/react'
import { usePlayer } from '../context/PlayerContext'
import { PlayerCard } from './PlayerCard'
import { theme } from '../styles/theme'
import { useDrop } from 'react-dnd'
import { Item } from './Circle'

export function CardList(): JSX.Element {
  const { players } = usePlayer()
  const { isDragging, removePlayer } = usePlayer()

  const [, dropRef] = useDrop({
    accept: 'CIRCLE',
    drop: (item: Item) => {
      removePlayer(item.player)
      item.setPlayer(null)
    }
  })

  return (
    <Flex pos="relative" ref={dropRef} w="full">
      {isDragging && (
        <Center
          as="span"
          pos="absolute"
          zIndex="2"
          top="0"
          left="0"
          w="full"
          h="full"
          p="4"
          borderRadius="4"
          borderColor="gray.800"
          bg={`${theme.colors.gray['200']}bb`}
          borderWidth="4px"
          borderStyle="dashed"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Drop here to delete player
          </Text>
        </Center>
      )}
      <Flex
        direction="column"
        gridGap="4"
        w="full"
        maxH="750"
        pr="1"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '8px'
          },

          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colors.gray['200'],
            borderRadius: '20px'
          }
        }}
      >
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </Flex>
    </Flex>
  )
}
