import { Flex, Text, Box } from '@chakra-ui/react'
import { Player } from '../models/Player'
import { PlayerCircle } from './Circle'

type PopularPlayer = {
  average: string
  player: Player
}

interface CardPopularPlayer {
  mostPopularPlayer: PopularPlayer
  lessPopularPlayer: PopularPlayer
}
interface PickedPlayer {
  title: string
  player: PopularPlayer
}

function PickedPlayer({ title, player }: PickedPlayer): JSX.Element {
  return (
    <Flex direction="column" align="center" mb="12">
      <Text color="white" fontSize="xl" fontWeight="medium" mb="5">
        {title}
      </Text>
      <Flex align="center" ml="12">
        <PlayerCircle player={player.player} />
        <Text ml="3" color="white" fontWeight="bold" fontSize="xl">
          {player.average}
        </Text>
      </Flex>
    </Flex>
  )
}

export function CardPopularPlayer({
  mostPopularPlayer,
  lessPopularPlayer
}: CardPopularPlayer): JSX.Element {
  return (
    <Flex
      w="full"
      h="full"
      px="42px"
      gridGap="140px"
      borderRadius="12"
      pos="relative"
      d="flex"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(to right, #ed2786, #f02b7d, #f33074, #f4366b, #f53d63)"
    >
      <PickedPlayer title="Most picked player" player={mostPopularPlayer} />
      <Box pos="absolute" h="100%">
        <svg height="100%" width="100">
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </Box>
      <PickedPlayer title="Less picked player" player={lessPopularPlayer} />
    </Flex>
  )
}
