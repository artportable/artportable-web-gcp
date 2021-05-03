import { useState } from 'react';
import s from './radio-button-group.module.css'

export default function RadioButtonGroup({ navOptions, onNav }) {
  const [selected, setSelected] = useState(navOptions[0]);

  function handleClick(e, navOption) {
    onNav(navOption);
    setSelected(navOption);
    e.preventDefault();
  }

  function getSelected(navOption) {
    return navOption === selected ? s.selected : '';
  }

  return (
    <div className={s.buttonsContainer}>
      {navOptions.map(navOption =>
        <button
          className={getSelected(navOption)}
          key={navOption}
          onClick={(e) => handleClick(e, navOption)}
        ></button>
      )}
    </div>
  );
}