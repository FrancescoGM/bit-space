import { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'

interface LinkProps {
  children: ReactNode
  nextLinkProps: NextLinkProps
  chakraLinkProps?: ChakraLinkProps
}

export function Link({
  children,
  chakraLinkProps,
  nextLinkProps
}: LinkProps): JSX.Element {
  return (
    <NextLink {...nextLinkProps}>
      <ChakraLink
        w="38px"
        h="38px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="4"
        fontSize="2xl"
        bg="linear-gradient(to right bottom, #ed2786, #f92b71, #ff395b, #ff4b45, #ff5f2d)"
        color="white"
        {...chakraLinkProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
