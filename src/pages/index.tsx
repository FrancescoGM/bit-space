import { Link } from '../components/Link'
import { Box, Flex, Heading } from '@chakra-ui/react'

export default function Home(): JSX.Element {
  return (
    <Box as="main">
      <Box maxW={1250} mx="auto" mt="4.5rem">
        <Flex as="aside" bg="white" maxW={605} p="4" borderRadius="12px">
          <Flex as="header" w="full" justify="space-between">
            <Heading>My Teams</Heading>
            <Link nextLinkProps={{ href: '/team/add' }}>+</Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
