import {FormEvent} from "react";
import useFormData from "../hooks/useFormData";
import Button from "../components/Button";
import Image from "next/image";

import moving1 from '../public/images/moving.jpg'
import moving2 from '../public/images/moving2.jpg'

const formFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true
  },
  {
    name: "state",
    label: "State",
    type: "text",
    required: true
  },
  {
    name: "zip",
    label: "Zip Code",
    type: "number",
    required: true
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    required: true,
  }
]

const Moving = () => {
  const [formData, handleChange] = useFormData(formFields)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
  }

  return (
    <div className={'flex flex-col justify-center items-center mt-6 w-full'}>
      <div className={'relative flex justify-center'}>
        <div className={'mb-6 relative'}>
          <Image className={'w-full max-w-4xl  w-full rounded'} src={moving1} alt={''}/>
        </div>
        <div className={'absolute bg-black/20 z-10 w-full h-full'}></div>
        <div className={'z-10 absolute top-0 flex flex-col items-center '}>
          <div className={'rounded  px-4 py-2'}>
            <h1 className={'md:text-4xl text-3xl my-6 text-center'}>Feeling Crushed by the Stress of Moving?</h1>
            <h2 className={'md:text-3xl text-2xl my-4 text-center'}>Let Us Take Some of the Weight Off!</h2>
          </div>

          <form onSubmit={handleSubmit} className={'w-full px-4 max-w-lg rounded-xl min-[550px]:bg-white/80 mt-0 max-[550px]:mt-[calc(100%+6em)] max-[500px]:mt-[calc(100%)]'}>
              { formFields.map(item =>
                <div key={item.name} className={'flex items-center flex-wrap my-4'}>
                  <label className={'basis-[220px] shrink-0 w-full flex items-center justify-between'} key={item.name}>
                    {item.label}
                  </label>
                    <input
                      className={'p-1 m-2 border-b border-black flex-grow bg-white/50'}
                      name={item.name}
                      value={formData[item.name]}
                      type={item.type}
                      onChange={handleChange}
                    />
                  </div>
              )}
              <div className={'w-full flex justify-center my-6'}>
                <Button type={"submit"}>Submit</Button>
              </div>
          </form>
        </div>

      </div>

      <div className={'mb-8 mt-0 max-[550px]:mt-[600px] mt-0 max-[500px]:mt-[40em] max-[470px]:mt-[50em] max-[450px]:mt-[55em] max-[400px]:mt-[58em] relative'}>
        <div className={'bg-white/80 rounded z-20 px-4 py-2 max-w-4xl mx-4 mb-4 rounded mt-8 absolute'}>
          Our transportation company specializes in commercial/residential moving. With over 2,000+ moves in and out of
          the North Carolina region, we are the premier moving company for your needs. We have moving trucks of every size and perform local/long distance moves. Whether you&apos;re moving out of your home, office, or business we cover all corners swiftly and efficiently. As we say, let us take the stress out of your day.
        </div>
        <div className={'absolute bg-black/20 z-10 w-full h-full'}></div>

        <div className={''}>
          <Image className={'w-full max-w-4xl  w-full rounded '} src={moving2} alt={''}/>
        </div>
      </div>
    </div>
  )
}

export default Moving