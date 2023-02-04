import {FormEvent, useState} from "react";
import useFormData from "../hooks/useFormData";
import emailForm from "../lib/emailForm"

const formFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    name: 'feedback',
    type: 'textarea',
    label: "What's on your mind?",
    required: true,
  }
]

const Contact = () => {
  const [formData, handleChange] = useFormData(formFields);
  const [message, setMessage] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    try {
      emailForm("contact@twinsilverdesign.com", "Email Form Test", formData)
      setMessage("Thanks for your feedback! We'll quickly responded to any questions or concerns.")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below.")
    }
  }

  return (
    <div className={'flex flex-col items-center mt-4'}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={'w-full max-w-md p-2'}>
        {formFields.map(field =>
          <div key={field.name} className={'flex items-center flex-wrap my-4'}>
            <label className={'basis-[220px] shrink-0'}>{field.label}</label>
            {field.type === "textarea" ?
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={'p-1 m-2 border border-black flex-grow'}
              />
              :
              <input
                name={field.name}
                value={formData[field.name]}
                type={field.type}
                onChange={handleChange}
                className={'p-1 m-2 border-b border-black flex-grow'}
              />
            }
          </div>
        )}
        <div className={'w-full flex justify-center my-4'}>
          <button className={'border border-black bg-lightGreen rounded-xl py-1 px-3'} type={"submit"}>Submit</button>
        </div>
      </form>
    </div>

  )
}



export default Contact