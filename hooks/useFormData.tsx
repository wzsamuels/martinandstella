import {ChangeEvent, useEffect, useState} from "react";

interface Field {
  name: string,
  type: string,
  label: string,
  required: boolean,
}

// TODO

/*
const handleFormUpdate = (event, formState, setFormState) => {
  const key = event.target.name
  const type = event.target.type
  let value = event.target.value

  // Automatically add dashes as phone numbers are typed
  if(type && type === 'tel') {
    if(value.length === 3 && formState.phone.length === 2) {
      value += '-'
    } else if(value.length  === 7 && formState.phone.length === 6) {
      value += '-'
    }
  }
  setFormState({ ...formState, [key]: value })
}
*/

const useFormData = (fields : Field[]) => {
  const [formData, setFormData] =
    useState<{[index: string]: string}>(fields.reduce((previousValue, currentValue ) =>
      ({ ...previousValue, [currentValue.name]: ''}), {})
    )

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((state) => {
      return {...state, [event.target.name]: event.target.value }
    })
  }

  return [formData, handleChange] as const; // infer separate types instead of union
}

export default useFormData