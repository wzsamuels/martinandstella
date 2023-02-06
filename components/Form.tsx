import Button from "./Button";
import useFormData from "../hooks/useFormData";
import {ComponentPropsWithoutRef, FormEvent} from "react";
import {FormData, FormField} from "../types/formTypes";

interface Props extends ComponentPropsWithoutRef<"form"> {
  formFields: FormField[];
  handleSubmit: (event: FormEvent<HTMLFormElement>, formData: FormData) => void;
}

const Form = ({formFields, handleSubmit, className} : Props) => {
  const [formData, handleFormChange] = useFormData(formFields);

  return (
    <form
      className={className}
      onSubmit={(event) => handleSubmit(event, formData)}
    >
      { formFields.map(field =>
        <div key={field.name} className={'flex items-center flex-wrap my-4'}>
          <label className={'basis-[220px] shrink-0'}>{field.label}</label>
          {field.type === "textarea" ?
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleFormChange}
              required={field.required}
              className={'p-1 m-2 border border-black flex-grow'}
            />
            :
            <input
              name={field.name}
              value={formData[field.name]}
              type={field.type}
              required={field.required}
              onChange={handleFormChange}
              className={'p-1 m-2 border-b border-black flex-grow'}
            />
          }
        </div>
      )}
      <div className={'flex justify-center'}>
        <Button type={'submit'}>Submit</Button>
      </div>
    </form>
  )
}

export default Form