import { Menu, MenuItem } from '@material-ui/core'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { useState } from 'react';
import { Locales, DisplayLocales } from '../../models/i18n/locales'
import { useRouter } from 'next/router';

export default function I18nSelector() {
  const { t } = useTranslation('i18n');
  const [anchorElement, setAnchorElement] = useState(null);
  const router = useRouter();
  const displayLocale = router.locale === Locales.se ?
    DisplayLocales.se : DisplayLocales.en; 

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
        color="secondary"
        endIcon={<FontAwesomeIcon icon="chevron-down" />}
        aria-controls="language-menu" 
        aria-haspopup="true"
        onClick={handleClick}
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
        <MenuItem onClick={(_) => handleClose(_, Locales.se)}>Swe</MenuItem>
        <MenuItem onClick={(_) => handleClose(_, Locales.en)}>Eng</MenuItem>
      </Menu>
    </>
  );
}