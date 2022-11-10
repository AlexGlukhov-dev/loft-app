import {Typography} from '@mui/material';

const PageTitle = ({title, color='#000'}) => {

	return (
		<Typography variant="h4" component="h2" sx={
			{
				display: 'inline-block',
				textAlign: 'left',
				position: 'relative',
				color: color,
				marginBottom: "16px",
				'&: before': {
					content: '""',
					position: 'absolute',
					bottom: '-4px',
					left: 0,
					height: '4px',
					width: '50%',
					backgroundColor: 'primary.main'
				}
			}
		}>
			{title}
		</Typography>
	)
};

export default PageTitle;
