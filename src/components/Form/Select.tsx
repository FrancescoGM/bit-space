import { useRef, useEffect } from 'react'
import {
  FormControl,
  Text,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react'
import { useField } from '@unform/core'
import { theme } from '../../styles/theme'

type Option = {
  id: string
  label: string
  value: string
}

interface Props extends ChakraSelectProps {
  name: string
  label?: string
  options: Option[]
  disabled?: boolean
}

export function Select({
  name,
  label,
  options,
  disabled = false,
  ...rest
}: Props): JSX.Element {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
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
      <ChakraSelect
        defaultValue={defaultValue}
        ref={selectRef}
        h={50}
        mt="4"
        disabled={disabled}
        className="select"
        _focus={{
          boxShadow: `0 0 0 1px ${theme.colors.pink['500']}`,
          borderColor: 'pink.500'
        }}
        {...rest}
      >
        {options.map(option => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  )
}
