import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export default makeStyles(theme => (
    {
        wrapper: {
            margin: `${theme.spacing(1)} auto`,
        },
        paper: {
            flexGrow: 1,
            alignItems: 'flex-start',
            textTransform: 'capitalize',
            justifyContent: 'space-between',
        },
        input: {
            paddingTop: theme.spacing(1),
            paddingTBottom: theme.spacing(1),
        },
        textField: {
            margin: `${theme.spacing(1)} auto`,
            width: '100%',
            backgroundColor: '#fff',
        },
        justify: {
            width: '100%'
        },
        formControl: {
            margin: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        link: {
            display: 'inline-block',
            textDecoration: 'none!important',
            textTransform: 'uppercase',
            marginTop: theme.spacing(3),
            color: '#000000',
            "&:hover": {
                color: green[600],
                textDecoration: 'underline',
            },
        },
        btn: {
            display: 'block',
            width: '25%',
            margin: '0 auto',
            marginTop: theme.spacing(2),
            borderRadius: '18px',
            outline: 'none!important',
            textDecoration: 'none!important',
        },
    }
));
