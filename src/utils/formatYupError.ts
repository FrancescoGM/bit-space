import { ValidationError } from 'yup'

export function formatYupError(error: Error): Record<string, string> {
  if (error instanceof ValidationError) {
    const validationErrors = {}
    error.inner.forEach(error => {
      if (error.path) validationErrors[error.path] = error.message
    })
    return validationErrors
  }
}
