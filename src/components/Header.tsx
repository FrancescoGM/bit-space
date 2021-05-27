import NextLink from 'next/link'
import { Box, Flex, Link } from '@chakra-ui/react'
import Logo from '../assets/logo.svg'

export function Header(): JSX.Element {
  return (
    <Box
      bg="linear-gradient(to right, #ed2786, #f92b71, #ff395b, #ff4b45, #ff5f2d)"
      px="4"
      position="fixed"
      top="0"
      left="0"
      right="0"
    >
      <Flex as="header" maxW={1250} mx="auto" h="80px" align="center">
        <NextLink href="/">
          <Link>
            <Logo />
          </Link>
        </NextLink>
      </Flex>
    </Box>
  )
}
