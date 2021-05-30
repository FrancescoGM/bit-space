import { useEffect, useRef, RefObject } from 'react'

import { useField } from '@unform/core'

import {
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
  FormControl,
  Text,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { theme } from '../../styles/theme'

interface Props {
  name: string
  label?: string
  options: {
    id: string
    value: string
    label: string
  }[]
}

type RefInputEl = RefObject<HTMLInputElement[]>

type InputProps = ChakraRadioProps & Props

export function Radio({
  name,
  label,
  options,
  ...rest
}: InputProps): JSX.Element {
  const inputRefs = useRef([])
  const { fieldName, registerField, defaultValue = '', error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs: RefInputEl) => {
        return refs.current.find(input => input?.checked)?.value
      },
      setValue: (refs: RefInputEl, id: string) => {
        const inputRef = refs.current.find(ref => ref.id === id)
        if (inputRef) inputRef.checked = true
      },
      clearValue: (refs: RefInputEl) => {
        const inputRef = refs.current.find(ref => ref.checked === true)
        if (inputRef) inputRef.checked = false
      }
    })
  }, [fieldName, registerField])

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <Text as="label" htmlFor={name} fontSize="md" fontWeight="bold">
          {label}
        </Text>
      )}
      <RadioGroup
        defaultValue={defaultValue || options[0].value}
        name={name}
        mt="4"
      >
        <Stack spacing="7" direction="row" align="center">
          {options.map((option, index) => (
            <ChakraRadio
              type="radio"
              key={option.id}
              value={option.value}
              ref={ref => {
                inputRefs.current[index] = ref
              }}
              colorScheme="pink"
              _focus={{
                boxShadow: `0 0 0 1px ${theme.colors.pink['500']}`
              }}
              {...rest}
            >
              {option.label}
            </ChakraRadio>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}
