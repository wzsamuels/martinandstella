import Calendar, {Dates} from "../components/Calendar";
import {useState} from "react";

const Rental = () => {
  const [dates, setDates] = useState<Dates>({startDate: null, endDate: null})
  return (
    <div className={'flex flex-col items-center my-4'}>
      <h1 className={'text-3xl'}>Select a Moving Date</h1>
      <div className={'max-w-[900px] w-full my-8'}>
        <Calendar dates={dates} setDates={setDates} range={true} />
      </div>
    </div>
  )
}

export default Rental