import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
dayjs.extend(isBetween);
export interface Dates {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface Props {
  dates: Dates;
  setDates: (value: Dates) => void;
  onClose?: () => void;
  range?: boolean;
}



const Calendar = ({dates, setDates, onClose, range = false} : Props) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const currentDate = dayjs();
  //const nights = dates.endDate && dates.startDate ? dates.endDate.diff(dates.startDate, 'day') : null;

  const handleLeftButton = () => {
    setSelectedDate(state => state.subtract(1, "month"));
  }

  const handleRightButton = () => {
    setSelectedDate(state => state.add(1, "month"));
  }

  useEffect(() => {
    console.log(dates)
  }, [dates])

  const handleDateClick = (day: Dayjs) => {
    // Clear all dates when re-selecting the start date
    if(dates.startDate && day.isSame(dates.startDate, 'day')) {
      setDates({startDate: null, endDate: null})
    }
    // If no dates are selected, selected date must be start date
    else if(!dates.startDate && !dates.endDate) {
      setDates({...dates, startDate: day})
    }
    // Clear end date when re-selecting it
    else if(dates.endDate && day.isSame(dates.endDate, 'day')) {
      setDates({...dates, endDate: null})
    }
    // If one date is selected and a date range is allowed, selecting another date sets the end date
    else if(range) {
      setDates({...dates, endDate: day})
    }
    // If one date is selected and date range is disallowed, selecting another date sets a new start date
    else {
      setDates({...dates, startDate: day})
    }
  }

  const renderCalendar = (date: Dayjs) => {
    return (
      <>
        <div className={'flex justify-center my-4 w-full'}>
          <h3 className={'font-bold'}>{date.format('MMMM YYYY')}</h3>
        </div>
        <div className={'grid grid-cols-7 grid-rows-auto  items-center justify-center content-center'}>
          <div className={'flex justify-center items-center my-8 xl:m-4 '}>Su</div>
          <div className={'flex justify-center items-center'}>Mo</div>
          <div className={'flex justify-center items-center'}>Tu</div>
          <div className={'flex justify-center items-center'}>We</div>
          <div className={'flex justify-center items-center'}>Th</div>
          <div className={'flex justify-center items-center'}>Fr</div>
          <div className={'flex justify-center items-center'}>Sa</div>
          {renderCalendarDates(date)}
        </div>
      </>
    )
  }

  const renderCalendarDates = (date: Dayjs) => {
    let state = "preBlank";
    let divs = [];
    let indexDate = dayjs(date.date(1))
    let dayOfWeek = 0;

    while(true) {
      if(state === "preBlank") {
        if(dayOfWeek === indexDate.day()) {
          state = "date";
        }
        else {
          dayOfWeek += 1;
          divs.push(<div className={'aspect-square max-w-full max-h-full w-full h-full'}></div>)
        }
      }
      else if(state === "date") {
        divs.push(renderCalendarDay(indexDate))
        indexDate = indexDate.add(1, "day");
        dayOfWeek = indexDate.day();
        if(indexDate.date() === indexDate.daysInMonth()) {
          divs.push(renderCalendarDay(indexDate))
          state = "postBlank";
          break;
        }
      }
    }
    return divs;
  }

  const renderCalendarDay = (day: Dayjs) => {
    if(dates.startDate && day.isSame(dates.startDate, 'day') || dates.endDate && day.isSame(dates.endDate, 'day')) {
      const style = day.isSame(dates.startDate, 'day') ? 'right-0' : 'left-0';
      return (
        <div className={'relative p-1'}>
          {dates.startDate && dates.endDate && <div className={`absolute ${style} bg-gray-100 w-1/2 h-full top-0`}/>}
          <button
            onClick={() => handleDateClick(day)}
            className={'relative text-white aspect-square shadow-xl max-w-full max-h-full w-full h-full flex p-2 justify-center items-center rounded-full bg-black text-light hover:cursor-pointer'}>{day.date()}
          </button>

        </div>
      )
    } else if(dates.startDate && dates.endDate && day.isBetween(dates.startDate,dates.endDate, 'day')) {
      return (
        <div className={'bg-gray-100 p-1'}>
          <button
            onClick={() => handleDateClick(day)}
            className={`aspect-square rounded-full max-w-full max-h-full w-full h-full  flex p-2  justify-center items-center border border-gray-100 hover:border-gray-300 hover:cursor-pointer`}>
            {day.date()}
          </button>
        </div>
      )
    }
    return (
      <div className={'p-1'}>
        <button
          onClick={() => handleDateClick(day)}
          // Disallow selecting an end date before the start date if range of dates
          disabled={(day.isBefore(dates.startDate, 'day') || day.isBefore(currentDate, 'day')) && range}
          className={`aspect-square  disabled:text-gray-300 disabled:line-through max-w-full max-h-full w-full h-full hover:cursor-pointer flex p-2  justify-center items-center rounded-full hover:border hover:border-gray-300 hover:cursor-pointer`}>
          {day.date()}
        </button>
      </div>
    )
  }


  return (
    <>

      <div className={'relative '}>
        <div className={'px-12 text-lg font-bold'}>
          { dates.startDate || dates.endDate ?
            <span>
              { dates.startDate ?
                dates.startDate.format('MMMM D, YYYY') : ''}
              {dates.endDate ? ` - ${dates.endDate.format('MMMM D, YYYY')}` : ''
              }
            </span>
            :
            <span>&nbsp;</span>
          }
        </div>
        <div className={'flex justify-between mt-10 absolute top-0 w-full px-12 xl:px-4'}>
          <button className={'disabled:opacity-20'} onClick={handleLeftButton} disabled={selectedDate.month() === currentDate.month() && selectedDate.year() === currentDate.year()}><FiChevronLeft className={'w-6 h-6'}/></button>
          <button onClick={handleRightButton}><FiChevronRight className={'w-6 h-6'} /></button>
        </div>
        <div className={'flex justify-center lg:justify-between top-0'}>
          <div className={'w-full md:mr-16'}>
            {renderCalendar(selectedDate)}
          </div>
          <div className={'hidden md:block w-full'}>
            {renderCalendar(selectedDate.add(1, "month"))}
          </div>
        </div>
        <div className={'flex justify-end items-center mt-4'}>
          <button
            className={'underline w-full flex justify-end mx-4'}
            onClick={() => {setDates({endDate: null, startDate: null})}}>
            Clear dates
          </button>
          { onClose &&
            <button onClick={onClose} className={'rounded-lg py-1 px-3 bg-black text-white'}>Close</button>
          }
        </div>
      </div>
    </>
  )
}

export default Calendar