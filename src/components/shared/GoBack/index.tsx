import { useRouter } from 'next/router';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
export default function GoBack() {
	const router = useRouter();

	return (
		<Button variant='contained' type='button' onClick={() => router.back()}>
			<KeyboardBackspaceIcon />
		</Button>
	);
}
