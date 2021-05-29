import { Flex, Text, Box, theme } from '@chakra-ui/react'

type Player = {
  name: string
  average: string
}

interface CardPopularPlayer {
  mostPopularPlayer: Player
  lessPopularPlayer: Player
}

interface CircleProps {
  name: string
}

interface PickedPlayer {
  title: string
  player: Player
}

function Circle({ name }: CircleProps): JSX.Element {
  const nameInitials = name
    .split(' ')
    .reduce((acc, name) => acc + name.split('')[0], '')
  return (
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
  )
}

function PickedPlayer({ title, player }: PickedPlayer): JSX.Element {
  return (
    <Flex direction="column" align="center" mb="12">
      <Text color="white" fontSize="xl" fontWeight="medium" mb="5">
        {title}
      </Text>
      <Flex align="center" ml="12">
        <Circle name={player.name} />
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
