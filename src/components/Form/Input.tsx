import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  Text,
  theme
} from '@chakra-ui/react'
import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: InputProps): JSX.Element {
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
      <ChakraInput
        id={name}
        ref={inputRef}
        defaultValue={defaultValue}
        colorScheme="pink"
        borderColor="gray.200"
        h={50}
        mt="4"
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
    </FormControl>
  )
}
