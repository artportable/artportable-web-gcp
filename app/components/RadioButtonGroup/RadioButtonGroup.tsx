import { useEffect, useState } from 'react';
import s from './radio-button-group.module.css'

export default function HashNavigation({ navOptions, onNav }) {
  const [selected, setSelected] = useState(navOptions[0]);
  useEffect(() => {
    
  }, []);
  function handleClick(e, navOption) {
    onNav(navOption);
    setSelected(navOption);
    e.preventDefault();
  }

  function getSelected(navOption) {
    return navOption === selected ? s.selected : '';
  }

  const buttons = navOptions.map(navOption => 
    <button className={getSelected(navOption)} key={navOption} onClick={(e) => handleClick(e, navOption)}></button>
  );

  return (
    <div className={s.buttonsContainer}>
      {buttons}
    </div>
  );
}