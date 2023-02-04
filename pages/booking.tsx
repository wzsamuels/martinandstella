import event1 from "../public/images/event1.jpg"
import event2 from "../public/images/event2.jpg"
import event3 from "../public/images/event3.jpg"
import event4 from "../public/images/event4.jpg"
import event5 from "../public/images/event5.jpg"
import event6 from "../public/images/event6.jpg"
import Image from "next/image";

const images = [
  event1, event2, event3, event4, event5, event6
]

const Booking = () => {
  return (
    <div className={'flex flex-col p-4'}>
      <h1 className={'md text-4xl text-3xl my-6 text-center'}>Captivating Event Space</h1>
      <h2 className={'md text-3xl text-2xl my-4 text-center'}>Available Now for Booking!</h2>
      <p>
        Fits 200 people, with over 150 chair, 15 round tables, and 3 rectangle tables.
        Perfect for baby showers , birthday parties, weddings and more!

      </p>
      <div className={'flex flex-wrap items-center justify-center'}>
        { images.map((image, index) =>
          <Image key={index} src={image} alt={""} className={'m-4 rounded'}/>
        )}
      </div>

    </div>
  )
}

export default Booking