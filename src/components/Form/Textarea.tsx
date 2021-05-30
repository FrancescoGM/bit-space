import { useRef } from 'react'
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  FormControl,
  Text,
  theme
} from '@chakra-ui/react'
import { useField } from '@unform/core'
import { useEffect } from 'react'

interface TextareaProps extends ChakraTextareaProps {
  name: string
  label?: string
}

export function Textarea({ name, label, ...rest }: TextareaProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { error, defaultValue, fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
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
      <ChakraTextarea
        id={name}
        ref={textareaRef}
        defaultValue={defaultValue}
        borderColor="gray.200"
        h={260}
        mt="4"
        resize="none"
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
