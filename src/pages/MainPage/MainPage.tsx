/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';

import {
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  colors,
} from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DescriptionIcon from '@material-ui/icons/Description';
// import wordApi from 'api/words';
import dictionaries from './dictionaries';
import {shuffle, filterDictionaries} from './tools';
import {IDictionaries} from './dictionaries/types';
import useStyles from './styles';

let allCountWorlds = 0;

const mixDictionaries = (data: IDictionaries): IDictionaries => {
  const result: IDictionaries = {};

  Object.keys(data).forEach(key => {
    const {name, items, lastChange} = dictionaries[key];
    const filteredItems = items.filter(item => item.word !== 'empty');
    allCountWorlds += filteredItems.length;
    // const isIrregularVerbs = name === 'irregular verbs 1' || name === 'irregular verbs 2';

    result[key] = {
      name,
      items: shuffle(filteredItems),
      lastChange,
    };
  });

  return result;
};

mixDictionaries(dictionaries);

const preparedDictionaries = filterDictionaries(dictionaries);

const MainPage = () => {
  const classes = useStyles();

  const [selected, setSelected] = React.useState('irregular');
  const [count, setCount] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [example, setExample] = React.useState('');

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
    const url = `https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${word.replace('*', '').trim()}`;
    window.open(url);
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
      <Grid container direction="column" alignItems="center" justify="center" style={{height: '81%'}}>
        <Grid
          className={classes.container}
          container
          direction="column"
          alignItems="center"
          justify="space-around"
          wrap="nowrap"
        >
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
            {Object.keys(preparedDictionaries).map(key => {
              const {name, items, lastChange} = preparedDictionaries[key];
              const {length} = items;
              return (
                <MenuItem key={name + key} value={key} id={`dictionary-${name}`}>
                  <Grid container wrap="nowrap" alignItems="center" justify="space-between">
                    <Typography style={lastChange ? {color: colors.deepOrange[500], fontWeight: 'bold'} : {}}>
                      {name}
                    </Typography>
                    <Chip label={length} />
                  </Grid>
                </MenuItem>
              );
            })}
          </TextField>
          <Typography className={classes.typographyCount}>{muchIsleft()}</Typography>
          <Typography className={`${classes.typographyWord} ${isImportant ? classes.important : ''}`}>
            {selectedItem.word}
          </Typography>
          <Typography className={classes.typographyTranslate} noWrap>
            {show && selectedItem.translate}
            {show && selectedItem.example && (
              <DescriptionIcon className={classes.exampleIcon} onClick={() => setExample(selectedItem.example || '')} />
            )}
          </Typography>
          {/** TODO: убрать кнопки, сделать перелистывание по свайпу, и оставшивеся кнопки убрать в тулбар */}
          <Grid className={classes.buttonContainer}>
            <Grid container justify="center">
              <IconButton classes={iconButtonClasses} onClick={goToGoogleTranslate(selectedItem.word)}>
                <GTranslateIcon color="primary" />
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
      {!!example && (
        <Dialog onClose={() => setExample('')} aria-labelledby="customized-dialog-title" open={!!example}>
          <DialogTitle id="customized-dialog-title">Example</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{example}</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setExample('')} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default React.memo(MainPage);
