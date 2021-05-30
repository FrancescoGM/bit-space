import { ReactNode, useEffect, useRef } from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  FormControl,
  Text,
  theme
} from '@chakra-ui/react'
import { useField } from '@unform/core'

interface IconInputProps extends ChakraInputProps {
  name: string
  label?: string
  icon: ReactNode
}

export function IconInput({
  name,
  label,
  icon,
  ...rest
}: IconInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const { defaultValue, error, fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <Text as="label" htmlFor={name} fontSize="md" fontWeight="bold">
          {label}
        </Text>
      )}
      <InputGroup
        mt="4"
        _focusWithin={{
          div: {
            svg: {
              fill: 'pink.500'
            }
          }
        }}
      >
        <InputLeftElement pointerEvents="none" h="full">
          {icon}
        </InputLeftElement>
        <ChakraInput
          id={name}
          ref={inputRef}
          defaultValue={defaultValue}
          colorScheme="pink"
          borderColor="gray.200"
          h={50}
          px="10px"
          _focus={{
            boxShadow: `0 0 0 1px ${theme.colors.pink['500']}`,
            borderColor: 'pink.500'
          }}
          _placeholder={{
            color: 'gray.200'
          }}
          {...rest}
        />
      </InputGroup>
    </FormControl>
  )
}
