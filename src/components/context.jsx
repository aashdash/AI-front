import axios from "axios";
import React,{ createContext, useContext, useEffect, useState } from "react";

export const AppContext= createContext()

export const AppProvider= ({ children }) => {
    const [updateFlag,setUpdateFlag] = useState(false);

    const [dark, setDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
      });
    
    useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    }, [dark]);
    useEffect(() => {
        console.log('Current theme:', dark ? 'dark' : 'light');
      }, [dark]);
    

    const [activeScript, setActiveScript] = useState(null);

    const toggleScript = async (scriptType) => { 

      const shouldTurnOn = activeScript !== scriptType;
      // Turn off the currently active script
      if (activeScript) {
        await axios.post('http://localhost:5000/toggle-gesture', {
          toggle: false,
          scriptType: activeScript,
        });
        console.log(`Stopped ${activeScript}`);
      }
    
      // Turn on the new one if needed
      if (shouldTurnOn) {
        await axios.post('http://localhost:5000/toggle-gesture', {
          toggle: true,
          scriptType,
        });
        console.log(`Started ${scriptType}`);
        setActiveScript(scriptType);
      } else {
        setActiveScript(null);
      }
    };
    useEffect(() => {
      const stopAllScripts = async () => {
        const scripts = ['handyppt', 'handyvideo','voiceppt','voicevideo' ]; // Add more if needed
        for (const script of scripts) {
          try {
            await axios.post('http://localhost:5000/toggle-gesture', {
              toggle: false,
              scriptType: script,
            });
            console.log(`Stopped ${script} on refresh`);
          } catch (err) {
            console.error(`Error stopping ${script} on refresh:`, err);
          }
        }
        setActiveScript(null);
      };
  
      stopAllScripts();
    }, []);

    return (
        <AppContext.Provider value={{
            updateFlag,setUpdateFlag,
            dark,setDark,
            activeScript, setActiveScript, toggleScript,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext =()=> useContext(AppContext);