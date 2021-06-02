import { Flex, Box } from '@chakra-ui/react'
import { DroppablePlayerCircle } from './Circle'

interface FootballFieldProps {
  name: string
  formation: string
}

export function FootballField({
  name,
  formation
}: FootballFieldProps): JSX.Element {
  const formattedFormation = `1-${formation}`
    .split('-')
    .map((number, i) =>
      new Array(Number(number))
        .fill(null)
        .map((value, j) => `${name}[${i}][${j}]`)
    )
    .reverse()

  return (
    <Flex
      minH={750}
      maxW="581"
      w="full"
      borderRadius="4"
      pos="relative"
      px="12"
      py="20"
      direction="column"
      align="center"
      justify="space-between"
      bg="linear-gradient(to bottom, #ed2786, #f92b71, #ff395b, #ff4b45, #ff5f2d)"
    >
      <Box
        pos="absolute"
        w="full"
        left="0"
        top="50%"
        transform="translateY(-50%)"
      >
        <svg height="100" width="100%">
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
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
      {formattedFormation.map((players, i) => (
        <Flex key={`${name}.${i}`} gridGap={players.length <= 4 ? '10' : '4'}>
          {players.map(name => (
            <DroppablePlayerCircle key={name} name={name} />
          ))}
        </Flex>
      ))}
    </Flex>
  )
}
