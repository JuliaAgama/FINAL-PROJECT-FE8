import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => (
    {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: '0',
            borderTop: '1px solid black',
        },
        img: {
            width: '168px',
        },
        btn: {
            width: '100%',
            padding: '16px 0',
            borderRadius: '0',
            outline: 'none!important',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '1px solid black'
        },
        bigBtn: {
            padding: '0'
        },
        btnBorder: {
            borderRight: '1px solid black'
        }
    }
));