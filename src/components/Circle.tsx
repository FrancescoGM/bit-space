import { Box, Text, Icon } from '@chakra-ui/react'
import { IoAdd } from 'react-icons/io5'
import { theme } from '../styles/theme'

interface CircleProps {
  name: string
}

export function Circle({ name }: CircleProps): JSX.Element {
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

export function EmptyCircle(): JSX.Element {
  return (
    <Box pos="relative" w={90} h={90}>
      <Icon
        as={IoAdd}
        w={50}
        h={50}
        color="white"
        pos="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      />
      <svg height="90" width="90">
        <circle cx="45" cy="45" r="39" fill={`${theme.colors.white}aa`} />

        <circle
          cx="45"
          cy="45"
          r="42"
          strokeDasharray="10"
          stroke={`${theme.colors.white}aa`}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </Box>
  )
}
