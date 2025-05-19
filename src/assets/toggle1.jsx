import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../components/context';


function Toggle1({ scriptType  }) {
  const { activeScript, toggleScript } = useAppContext();
  const isToggled = activeScript === scriptType;

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        id="toggle"
        checked={isToggled}
        onChange={() => toggleScript(scriptType)}
      />
      <div
        className="relative w-11 h-6 bg-green-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 
        dark:peer-focus:ring-green-800 rounded-full peer dark:bg-green-400 peer-checked:after:translate-x-full 
        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
        after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
        after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-600"
      />
    </label>
  );
}

export default Toggle1;



export function Toggle2({ scriptType }) {
  const [isToggled, setIsToggled] = useState(false);
  const { activeScript, toggleScript } = useAppContext();
  //const isToggled = activeScript === scriptType;

  const handleToggle = async () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle)
    toggleScript(scriptType)
  }
  
  return (
    <div
      onClick={handleToggle}
      className={classNames(
        'flex w-11 h-6 bg-green-300 dark:bg-green-400 rounded-full cursor-pointer transition-all duration-200',
        { 'bg-green-500': isToggled  }
      )}
    >
      <span
        className={classNames(
          'ml-0.5 mt-0.5 h-5 w-5 bg-white rounded-full transition-all duration-200',
          { 'translate-x-5': isToggled  }
        )}
      />
    </div>
  );
}
  

