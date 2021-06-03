import { Center, Text } from '@chakra-ui/react'

export function Loading(): JSX.Element {
  return (
    <Center as="main" mt="10">
      <Text color="pink.500" fontSize="4xl" fontWeight="bold">
        Carregando...
      </Text>
    </Center>
  )
}
