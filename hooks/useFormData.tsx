import {ChangeEvent, useEffect, useState} from "react";

interface Field {
  name: string,
  type: string,
  label: string,
  required: boolean,
}

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