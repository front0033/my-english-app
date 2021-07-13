import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Link} from 'react-router-dom';

import useStyles from './styles';

export type IBotoomNavConfig = Array<{value: string; label: string; url: string; icon: React.FC}>;

interface IBottomNavigationProps {
  items: IBotoomNavConfig;
  currentValue: string;
}

const AppBottomNavigation: React.FC<IBottomNavigationProps> = ({items, currentValue}) => {
  const classes = useStyles();
  return (
    <BottomNavigation value={currentValue} showLabels className={classes.root}>
      {items.map(item => {
        const {value, label, url, icon: Icon} = item;
        return <BottomNavigationAction value={value} component={Link} to={url} label={label} icon={<Icon />} />;
      })}
    </BottomNavigation>
  );
};

export default React.memo(AppBottomNavigation);
