import { useState } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { INavLink } from '../../../Layouts/Main';
import GoBack from '../GoBack';
import logo from '../../../../public/imgs/logo/mock-sin-fondo-horizontal.png';
import { userLogout } from '../../../services/login';
import Watermark from '../watermark';
import { Divider } from '@mui/material';

const drawerWidth = 240;

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children: React.ReactNode;
	links: INavLink[];
}

export default function ResponsiveDrawer({ window, children, links }: Props) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<List>
				<div style={{ margin: '0 1rem 1rem' }}>
					<NextLink href='/dashboard' passHref>
						<a>
							<NextImage src={logo} layout='responsive' alt='logo-mock' />
						</a>
					</NextLink>
				</div>
				<Divider />

				{links.map(el => (
					<ListItem key={el.title} disablePadding>
						<NextLink href={el.href} passHref>
							<ListItemButton>
								<ListItemIcon>{el.icon}</ListItemIcon>
								<ListItemText primary={el.title} />
							</ListItemButton>
						</NextLink>
					</ListItem>
				))}
				<ListItem disablePadding>
					<NextLink href='/' passHref>
						<ListItemButton onClick={userLogout}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary={'Log out'} />
						</ListItemButton>
					</NextLink>
				</ListItem>
				<ListItem>{/* 	<Watermark /> */}</ListItem>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Mock panel de control
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<GoBack />
				{children}
			</Box>
		</Box>
	);
}
