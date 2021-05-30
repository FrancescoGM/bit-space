import { Form as UnformForm } from '@unform/web'
import { FormHandles, FormProps as UnformFormProps } from '@unform/core'

import { chakra } from '@chakra-ui/react'
import { ChakraComponent } from '@chakra-ui/react'

interface FormProps extends Omit<UnformFormProps, 'ref'> {
  ref?: React.RefObject<FormHandles>
}

type FormComponent = ChakraComponent<'form', FormProps>

export const Form = chakra(UnformForm, {}) as FormComponent
