import NextLink from 'next/link';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CustomizedMenus from './Menu';
interface IAction {
	fireAction: (obj: any) => any; // Pass an ibj to de action to make it reusable
	label: string;
	icon?: ReactJSXElement;
	color?: string;
}

interface IProps {
	row: any; // An obj from the database {id: string, ....}
	actions: IAction[];
	url: string;
}

export function CustomMenu({ row, actions, url }: IProps) {
	return (
		<CustomizedMenus>
			<div style={{ display: 'grid', gap: '.5em', placeItems: 'center' }}>
				{actions.map((action: IAction) => (
					<Button
						key={action.label}
						onClick={() => action.fireAction(row.id)}
						variant='outlined'
						sx={{ display: 'grid', placeItems: 'center' }}
					>
						{action.icon ? action.icon : action.label}
					</Button>
				))}
				<NextLink href={`/dashboard/${url}/${row.id}`} passHref>
					<Button
						sx={{
							display: 'grid',
							placeItems: 'center',
						}}
						variant='outlined'
					>
						<RemoveRedEyeIcon />
					</Button>
				</NextLink>
			</div>
		</CustomizedMenus>
	);
}
