import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => (
	{	
		sectionContainer:{
			padding: '0px',
<<<<<<< HEAD
			margin: '100px 0px'
=======
			marginTop: '100px'
>>>>>>> 922ef201fd69c70a56320490677ac6367624d495
		},

		sectionGrid:{
			marginTop: '40px'
		},

		photoCardImage:{
			height: '100%',
			width: '100%',
			padding: '0px',
		},

		photoCardCaption:{
			display: "none",
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			background: 'linear-gradient(to top, #000000, transparent)',
		},

		photoCardCaptionButton:{
			border: '2px solid white',
			top: '45%',
    		color: 'white',
    		backgroundColor: 'transparent',
    		alignSelf: 'start',
    		'&:hover':{
    			color: '#ffffff'
    		}
		},

		photoCard:{
			width: "100%",
			height: "750px",
			boxShadow: 'none',
			borderRadius: '0px',
			position: 'relative',

			'&:hover $photoCardCaption': {
				display: 'flex',
				justifyContent: 'center',
			}
		}
    }
));