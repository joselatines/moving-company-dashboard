import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface IProps {
	error: string;
}

export default function Error({ error }: IProps) {
	return (
		<Box
			sx={{
				display: 'grid',
				placeItems: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<Typography variant='subtitle2' color='error'>{error}</Typography>;
		</Box>
	);
}
