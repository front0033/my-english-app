/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';

import {
  IconButton,
  TextField,
  MenuItem,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Checkbox,
  FormControlLabel,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import FlagIcon from '@material-ui/icons/Flag';
import MenuIcon from '@material-ui/icons/Menu';
import dictionaries from './dictionaries';
import shuffle from './tools';
import IDictionary from './dictionaries/types';

let allCountWorlds = 0;
type IDictionaries = Record<string, IDictionary>;
const mixDictionaries = (data: IDictionaries): IDictionaries => {
  const result: IDictionaries = {};

  Object.keys(data).forEach(key => {
    const {name, items} = dictionaries[key];
    const filteredItems = items.filter(item => item.word !== 'empty');
    allCountWorlds += filteredItems.length;
    // const isIrregularVerbs = name === 'irregular verbs 1' || name === 'irregular verbs 2';

    result[key] = {
      name,
      items: shuffle(filteredItems),
    };
  });

  return result;
};

const filterDictionaries = (data: IDictionaries): IDictionaries => {
  const result: IDictionaries = {};

  Object.keys(data).forEach(key => {
    const {name, items} = dictionaries[key];
    const filteredItems = items.filter(item => item.word !== 'empty');

    result[key] = {
      name,
      items: filteredItems,
    };
  });

  return result;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 'bold',
    },
    checkboxContainer: {
      padding: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    container: {
      width: '80%',
      borderRadius: 10,
      margin: theme.spacing(2),
      height: '100%',
    },
    select: {
      minWidth: '80%',
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(2),
    },
    typographyCount: {
      margin: theme.spacing(1),
      color: theme.palette.grey[700],
      fontSize: 16,
    },
    typographyWord: {
      color: 'green',
      marginBottom: theme.spacing(2),
      fontSize: 25,
      textAlign: 'center',
      width: '100%',
      height: 60,
    },
    typographyTranslate: {
      height: 50,
      color: theme.palette.grey[700],
      marginBottom: theme.spacing(2),
      fontSize: 16,
      textAlign: 'center',
      width: '!00%',
    },
    buttonContainer: {
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '30%',
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    iconButton: {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    disabledColor: {
      border: `2px solid rgba(0, 0, 0, 0.26)`,
    },
    signature: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    important: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
    },
  })
);
mixDictionaries(dictionaries);

const MainPage = () => {
  const classes = useStyles();

  const [preparedDictionaries, setPrepareDictionaries] = React.useState(filterDictionaries(dictionaries));

  const [selected, setSelected] = React.useState('irregular');
  const [count, setCount] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [fromRussian, setFromRussian] = React.useState(false);
  const [googleTranslate, setGoogleTranslate] = React.useState(false);
  const [mixed, setMixed] = React.useState(false);
  const [drawerAnchor, setDrawerAnchor] = React.useState(false);

  const size = React.useRef(preparedDictionaries[selected].items.length);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setShow(false);
    setCount(0);
    setSelected(value);
    size.current = preparedDictionaries[value].items.length;
  };

  const handleIncrementCountClick = () => {
    setShow(false);
    size.current > count + 1 ? setCount(count + 1) : setCount(0);
  };
  const handleDecrementCountClick = () => {
    setShow(false);
    setCount(count > 0 ? count - 1 : preparedDictionaries[selected].items.length - 1);
  };

  const handleShowTranslate = () => setShow(true);

  const muchIsleft = () => `${count + 1} / ${preparedDictionaries[selected].items.length}`;

  const goToGoogleTranslate = (word: string) => () => {
    const url = googleTranslate
      ? `https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${word.replace('*', '').trim()}`
      : `https://wooordhunt.ru/word/${word.replace('*', '').trim()}`;
    window.open(url);
  };

  const handleFromChecked = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFromRussian(checked);
  };

  const handleGoogleChecked = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setGoogleTranslate(checked);
  };

  const handleMixChecked = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setMixed(true);
      setPrepareDictionaries(mixDictionaries(dictionaries));
    } else {
      setMixed(false);
      setPrepareDictionaries(filterDictionaries(dictionaries));
    }
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerAnchor(!drawerAnchor);
  };

  const iconButtonClasses = {root: `${classes.iconButton} ${classes.button}`};

  const translateIconClasses = {
    root: `${show ? classes.disabledColor : classes.iconButton} ${classes.button}`,
  };

  const incrementIconButtonClasses = {
    root: `${classes.iconButton} ${classes.button}`,
  };

  const decrementIconButtonClasses = {
    root: `${classes.iconButton} ${classes.button}`,
  };

  const isImportant = preparedDictionaries[selected].items[count].word.indexOf('*') !== -1;

  const selectedItem = preparedDictionaries[selected].items[count];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="flex-start" alignItems="center">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ENGLISH CARDS
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerAnchor} onClose={toggleDrawer}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Grid container direction="column" className={classes.checkboxContainer}>
          <Typography variant="subtitle1">Settings</Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <GTranslateIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                <FormControlLabel
                  control={<Checkbox checked={googleTranslate} onChange={handleGoogleChecked} />}
                  label="Google"
                />
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShuffleIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                <FormControlLabel control={<Checkbox checked={mixed} onChange={handleMixChecked} />} label="Mix" />
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <FlagIcon color="primary" />
              </ListItemIcon>
              <ListItemText>
                <FormControlLabel
                  control={<Checkbox checked={fromRussian} onChange={handleFromChecked} />}
                  label="From Russian"
                />
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Drawer>
      <Grid container direction="column" alignItems="center" justify="center" style={{height: '81%'}}>
        <Grid className={classes.container} container direction="column" alignItems="center" justify="space-around">
          <TextField
            variant="outlined"
            className={classes.select}
            label="please select dictionary"
            size="small"
            margin="dense"
            select
            onChange={handleChange}
            value={selected}
            id="business-rules-filter-select-is_summable"
          >
            {Object.keys(dictionaries).map((key, i) => {
              const {name} = dictionaries[key];

              return (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={name + i} value={key} id={`dictionary-${name}`}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <Typography className={classes.typographyCount}>{muchIsleft()}</Typography>
          <Typography className={`${classes.typographyWord} ${isImportant ? classes.important : ''}`}>
            {fromRussian ? selectedItem.translate : selectedItem.word}
          </Typography>
          <Typography className={classes.typographyTranslate}>
            {show && (fromRussian ? selectedItem.word : selectedItem.translate)}
          </Typography>
          <Grid className={classes.buttonContainer}>
            <Grid container justify="center">
              <IconButton classes={iconButtonClasses} onClick={goToGoogleTranslate(selectedItem.word)}>
                {googleTranslate ? <GTranslateIcon color="primary" /> : <LanguageIcon color="primary" />}
              </IconButton>
              <IconButton classes={translateIconClasses} onClick={handleShowTranslate} disabled={show}>
                <TranslateIcon color={show ? 'disabled' : 'primary'} />
              </IconButton>
            </Grid>
            <Grid container alignItems="center" justify="center">
              <IconButton classes={decrementIconButtonClasses} onClick={handleDecrementCountClick}>
                <ArrowBackIcon color="primary" />
              </IconButton>
              <IconButton classes={incrementIconButtonClasses} onClick={handleIncrementCountClick}>
                <ArrowForwardIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="space-between" className={classes.signature}>
        <Typography variant="subtitle2">{`Всего: ${allCountWorlds} слов`}</Typography>
        <Typography variant="subtitle2">Developed by Igor B.</Typography>
      </Grid>
    </>
  );
};

export default React.memo(MainPage);
