import {makeStyles, Theme, createStyles} from '@material-ui/core';

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
      width: '100%',
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

      paddingRight: theme.spacing(2),
    },
    exampleIcon: {
      marginLeft: theme.spacing(1),
      marginBottom: -3,
      height: 16,
      cursor: 'pointer',
    },
  })
);

export default useStyles;
