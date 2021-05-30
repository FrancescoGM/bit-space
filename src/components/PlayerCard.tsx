import { Flex, Text } from '@chakra-ui/react'

type Player = {
  id: string
  name: string
  age: number
  nationality: string
}

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps): JSX.Element {
  return (
    <Flex
      w="full"
      h="min"
      px="5"
      py="4"
      borderWidth="2px"
      borderColor="gray.200"
      borderStyle="dashed"
      borderRadius="8"
      bg="linear-gradient(to bottom, #f4f4f4, #f0f0f0, #ececec, #e8e8e8, #e4e4e4)"
      cursor="grab"
      direction="column"
      justify="space-between"
    >
      <Flex justify="space-between">
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
      <Text fontSize="lg" color="gray.800" fontWeight="bold">
        Nationality:{' '}
        <Text as="span" color="pink.500" fontWeight="normal">
          {player.nationality}
        </Text>
      </Text>
    </Flex>
  )
}
