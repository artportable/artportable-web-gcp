import { Menu, MenuItem } from '@material-ui/core'
import Button from '../Button/Button'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'next-i18next'
import { useState } from 'react';
import { Locales, DisplayLocales } from '../../models/i18n/locales'
import { useRouter } from 'next/router';
import { styles } from './i18nSelector.css'

export default function I18nSelector() {
  const { t } = useTranslation('i18n');
  const s = styles();
  const [anchorElement, setAnchorElement] = useState(null);
  const router = useRouter();
  const displayLocale = router.locale === Locales.sv ?
    DisplayLocales.sv : DisplayLocales.en;

  function handleClick(event) {
    setAnchorElement(event.currentTarget);
    event.stopPropagation();
  }

  function handleClose(_, locale?: Locales) {
    setAnchorElement(null);
    if(locale !== undefined) {
      router.push(router.asPath, null, { locale: locale });
    }
  } 

  return (
    <>
      <Button
        size="small"
        className={s.button}
        endIcon={<KeyboardArrowDownIcon />}
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        disableElevation
        rounded>
          {displayLocale}
      </Button>
      <Menu
        id="language-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorElement}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={(_) => handleClose(_)}
      >
        <MenuItem onClick={(_) => handleClose(_, Locales.sv)}>Swe</MenuItem>
        <MenuItem onClick={(_) => handleClose(_, Locales.en)}>Eng</MenuItem>
      </Menu>
    </>
  );
}