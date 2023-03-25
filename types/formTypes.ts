export interface FormField {
  name: string
  type: string
  label: string
  required: boolean
  minLength?: number
  maxLength?: number
}

export interface FormData {
  [index: string] : string
}