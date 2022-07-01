import { ReactElement, ReactNode } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ResponsiveDrawer from '../../components/shared/Sidebar';
import ApartmentIcon from '@mui/icons-material/Apartment';
import useCheckUserFromLocalStorage from '../../hooks/auth/useCheckUserFromLocalStorage';
import Loader from '../../components/shared/Loader';
import Head from 'next/head';
interface Props {
	children: ReactNode;
}

export interface INavLink {
	href: string;
	icon: ReactElement;
	title: string;
}

const navLinks = [
	{
		href: '/dashboard/promoters',
		icon: <PersonIcon />,
		title: 'Promotores',
	},
	{
		href: '/dashboard/companies',
		icon: <ApartmentIcon />,
		title: 'Compañías',
	},
];
const MainLayout = ({ children }: Props) => {
	const { isAuth } = useCheckUserFromLocalStorage();

	if (isAuth)
		return (
			<>
				<Head>
					<title>Mudy Dashboard</title>
					<meta name='description' content='Generated by Mudy' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<>
					<nav>Nav</nav>
					<ResponsiveDrawer links={navLinks}>{children}</ResponsiveDrawer>
					<footer>Footer</footer>
				</>
			</>
		);

	return <Loader />;
};

export default MainLayout;