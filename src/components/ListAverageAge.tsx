import { Box, Heading, Text, Flex } from '@chakra-ui/react'

export type ListAverageAgeTeam = {
  id: string
  name: string
  average: string | number
}

interface ListAverageAgeProps {
  title: string
  data: ListAverageAgeTeam[]
}

export function ListAverageAge(props: ListAverageAgeProps): JSX.Element {
  const data = props.data.slice(0, 5)
  return (
    <Box>
      <Heading fontSize="lg" mb="4">
        {props.title}
      </Heading>
      <Flex
        direction="column"
        w="full"
        bg="gray.100"
        gridGap="5px"
        p="5px"
        borderRadius="4"
      >
        {data.map(team => (
          <Flex
            key={team.id}
            h={42}
            bg="white"
            px="10px"
            justify="space-between"
            align="center"
            borderRadius="4"
          >
            <Text fontWeight="medium">{team.name}</Text>
            <Text fontWeight="medium">{team.average}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
