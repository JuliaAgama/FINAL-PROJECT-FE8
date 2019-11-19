import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => (
    {
        border: {
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
        },
        container: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center'
        },
        form: {
            width: '250px'
        },
        hide: {
            display: 'none'
        },
        btn: {
            borderRadius: '18px',
            margin: '20px 0',
            outline: 'none!important',
        }
    }
));