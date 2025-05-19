import React from 'react'
import Section1 from './section1'
import Section2 from './section2'
import Section3 from './section3'
import { useAppContext } from './context'

const Home = () => {
  const { dark } = useAppContext()
  return (
    <div className={`w-full min-h-screen flex justify-center items-center 
      ${dark ? 'bg-black text-white' : 'bg-gradient-to-l from-purple-300 via-blue-200 to-violet-100'}`}>
    <div className='w-full h-[725px] flex flex-row items-center justify-center gap-2 '>
        
        <section className='bg-red300 h-[725px] w-[855px] '>
          <Section1 />
        </section>

        <section className='bg-red300 h-[725px] w-[673px] gap-5 
        flex flex-col justify-center'>
          <div className='bg-red400 h-28 w-full'>
          <Section2/>
          </div>
          <div className='bg-red400 h-[584px] w-full'>
          <Section3 />
          </div>
        </section>

    </div>
    </div>
  )
}

export default Home