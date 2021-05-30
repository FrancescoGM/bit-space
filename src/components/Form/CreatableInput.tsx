import { useEffect, KeyboardEvent, useState } from 'react'
import { FormControl, Text } from '@chakra-ui/react'
import { OptionTypeBase } from 'react-select'
import Select, { Props as CreatableProps } from 'react-select/creatable'
import { useField } from '@unform/core'
import { theme } from '../../styles/theme'

interface Props extends Omit<CreatableProps<OptionTypeBase, true>, 'isMulti'> {
  name: string
  label?: string
}

interface ValueProps {
  label: string
  value: string
}

export function CreatableInput({ name, label, ...rest }: Props): JSX.Element {
  const { fieldName, defaultValue = [], registerField, error } = useField(name)
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState<ValueProps[]>(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (value: ValueProps[]) => {
        setValue(value)
        setInputValue('')
      },
      clearValue: () => {
        setValue([])
        setInputValue('')
      }
    })
  }, [fieldName, registerField, value])

  function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case ';':
        setInputValue('')
        setValue(oldValues => [
          ...oldValues,
          { label: inputValue, value: inputValue }
        ])

        event.preventDefault()
    }
  }

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <Text as="label" htmlFor={name} fontSize="md" fontWeight="bold">
          {label}
        </Text>
      )}
      <Select
        instanceId={name}
        components={{ DropdownIndicator: null }}
        inputValue={inputValue}
        value={value}
        isMulti
        isClearable
        menuIsOpen={false}
        onChange={value => setValue(value as [])}
        onInputChange={inputValue => setInputValue(inputValue)}
        onKeyDown={handleKeyDown}
        styles={{
          control: base => ({
            ...base,
            minHeight: 250,
            marginTop: 16,
            alignItems: 'start'
          }),
          valueContainer: base => ({ ...base, padding: 16 }),
          multiValueRemove: base => ({
            ...base,
            color: theme.colors.white
          }),
          indicatorsContainer: base => ({ ...base, alignItems: 'start' }),
          multiValueLabel: base => ({
            ...base,
            height: 24,
            paddingLeft: 12,
            paddingRight: 12,
            color: theme.colors.white,
            fontSize: '1rem',
            fontWeight: 'normal',
            display: 'flex',
            alignItems: 'center'
          })
        }}
        theme={base => ({
          ...base,
          colors: {
            ...base.colors,
            primary: theme.colors.pink['500'],
            neutral10: theme.colors.pink['500'],
            dangerLight: theme.colors.pink['600'],
            danger: theme.colors.white
          }
        })}
        placeholder="Digite uma palavra e pressione enter"
        {...rest}
      />
    </FormControl>
  )
}
