import { ReactElement } from 'react';
import NextImage from 'next/image';
import { NextPageWithLayout } from '../_app';
import logo from '../../public/imgs/logo/mudy-sin-fondo-oscuro.png';
import MainLayout from '../../src/Layouts/Main';

const Dashboard: NextPageWithLayout = () => {
	return (
		<div style={{ display: 'grid', placeItems: 'center' }}>
			<div>
				<h1>Mudy Dashboard</h1>
				<NextImage src={logo} layout='responsive' />
			</div>
		</div>
	);
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
