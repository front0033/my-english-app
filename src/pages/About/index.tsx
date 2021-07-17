import * as React from 'react';

import { Button, Grid, Typography } from '@material-ui/core';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const AboutPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <DeveloperModeIcon className={classes.icon} />
      <Typography variant="h5" gutterBottom id="no-found-title">
        English Words
      </Typography>
      <Typography variant="body2" className={classes.subTitle} id="not-found-text">
        Delevoped by Igor Bezdenezhnykh
      </Typography>
      <div className={classes.actions}>
        <Button id="not-found-button-back" component={Link} to="/" variant="outlined" color="primary">
          Return to main page
        </Button>
      </div>
    </Grid>
  );
};

export default AboutPage;
