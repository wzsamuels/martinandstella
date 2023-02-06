export interface FormField {
  name: string
  type: string
  label: string
  required: boolean
}

export interface FormData {
  [index: string] : string
}