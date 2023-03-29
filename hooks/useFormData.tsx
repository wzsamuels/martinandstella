import {ChangeEvent, useState} from "react";
import {FormField} from "../types/formTypes";

const useFormData = (fields : FormField[]) => {
  const [formData, setFormData] =
    useState<{[index: string]: string}>(fields.reduce((previousValue, currentValue ) =>
      ({ ...previousValue, [currentValue.name]: ''}), {})
    )

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((state) => {
      let value = event.target.value;

      if(event.target.type === 'tel') {
        if(formData[event.target.name].length === 0) {
          value = value.slice(0, -1) + '(' + value.slice(-1);
        } else if(value.length === 4 && formData[event.target.name].length === 3) {
          value += ') '
        } else if(value.length === 5 && formData[event.target.name].length === 4) {
          value = value.slice(0, -1) + ') ' + value.slice(-1);
        } else if(value.length === 6 && formData[event.target.name].length === 5) {
          value = value.slice(0, -1) + ' ' + value.slice(-1);
        } else if(value.length  === 9 && formData[event.target.name].length === 8) {
          value += '-'
        } else if(value.length  === 10 && formData[event.target.name].length === 9) {
          value = value.slice(0, -1) + '-' + value.slice(-1);
        }
      }
      return {...state, [event.target.name]:value }
    })
  }

  return [formData, handleChange] as const; // infer separate types instead of union
}

export default useFormData