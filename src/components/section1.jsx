import React from 'react'
import Video from '../assets/video'
import { useAppContext } from '../components/context';

const Section1 = () => {
    const { toggleScript,activeScript } = useAppContext();

     const startScript1 = async () => {
        if (activeScript !== 'handyvideo'){
            toggleScript("handyvideo")
        }
        if (activeScript === 'handyvideo'){
            await axios.post('http://localhost:5000/toggle-gesture', {
                toggle: true,
                scriptType: activeScript,
            });
            console.log(`Started ${scriptType}`);
        }
     }
     const startScript2 = async () => {
        if (activeScript !== 'voicevideo'){
            toggleScript("voicevideo")
        }
        if (activeScript === 'voicevideo'){
            await axios.post('http://localhost:5000/toggle-gesture', {
                toggle: true,
                scriptType: activeScript,
            });
            console.log(`Started ${scriptType}`);
        }
     }
  return (
    <div className=' w-full flex flex-col dark:bg-black dark:text-white dark:border-white dark:border-r'>
      
        <div className='bg-blue300 h-32 w-[855px] 
        flex flex-row justify-center items-center gap-10'>
            <div className="rounded-full h-20 w-20 bg-blue-30 bg-[url('logo.jpg')] bg-cover bg-center bg-no-repeat ">

            </div>
            <div className=' h-24 w-[650px] p-5 bg-blue300 flex justify- items-center'>
                <h1 className='font-orbitron text-[65px] font-normal'>AI PRO-VIEW</h1>
            </div>
        </div>
        
        {/* <div className='bg-blue200 h-[279px] w-[855px] flex flex-row justify-center items-center gap-5'>
            <div className='h-64 w-[350px] rounded-2xl bg-blue-300'>
            
            </div>
            <div><p className='font-orbitron text-xl font-medium'>PPT</p></div>
            <div className='h-64 w-[350px] rounded-2xl bg-blue-300'>

            </div>
        </div> */}

        <div className='bg-blue300 h-10 w-[855px] flex flex-row justify-center items-center gap-96'>
            <p className='font-orbitron text-xl font-medium'>HAND</p>
            <p className='font-orbitron text-xl font-medium'>VOIC</p>
        </div>

        <div className='bg-blue200 h-[280px] w-[855px] flex flex-row justify-center items-center gap-5'>
            <div className="h-64 w-[350px] rounded-2xl bg-blue300 bg-[url('video_voice.png')]  bg-cover" 
            onClick={ () => startScript1() }            
            >
                <Video/>
            </div>
            <div><p className='font-orbitron text-xl font-medium'>VID</p></div>
            <div className="h-64 w-[350px] rounded-2xl bg-blue-30 bg-[url('video_hand.jpg')] bg-cover bg-cente bg-no-repeat"
            onClick={ () => startScript2() }
            >
                <Video/>
            </div>
        </div>

    </div>
  )
}

export default Section1
