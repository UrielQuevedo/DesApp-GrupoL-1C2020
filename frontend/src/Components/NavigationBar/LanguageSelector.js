import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List, Divider } from '@material-ui/core';

// Icons
import LanguageIcon from '@material-ui/icons/Language';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Svg from '../Svg';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const languages = [
    {
      languageTitle: 'Español',
      xlink: '/svg/Icons.svg#argentina-flag',
      language: 'es'
    },
    {
      languageTitle: 'Ingles',
      xlink: '/svg/Icons.svg#uk-flag',
      language: 'en'
    }
  ]

  const LanguageList = () => {
    return languages.map(({ languageTitle, xlink, language}) => (
      <div key={language}>
        <Divider />
        <ListItem button onClick={() => i18n.changeLanguage(language)} disabled={i18n.language === language}>
          <ListItemIcon className="icons">
            <span>
              <Svg xlink={xlink} />
            </span>
          </ListItemIcon>
          <ListItemText
            primary={t(languageTitle)}
          />
        </ListItem>
      </div>
    ));
  }

  const handleClickCollapse = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClickCollapse}>
        <ListItemIcon className="icons">
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="Idioma" />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <LanguageList />
          <Divider />
        </List>
      </Collapse>
    </>
  );
}

export default LanguageSelector;