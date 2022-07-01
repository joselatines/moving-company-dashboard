import { ReactElement, useEffect } from 'react';
import MainLayout from '../../../src/Layouts/Main';
import { GetServerSideProps } from 'next';
import useFetchWithParams from '../../../src/hooks/fetch/useFetchWithParams';
import Loader from '../../../src/components/shared/Loader';
import Error from '../../../src/components/shared/Error';
import { mockCompany as data } from '../../../__mocks__/mockCompanies';
import { getSingleItem } from '../../../src/services/shared/get';
import DataTable from 'react-data-table-component';
import { checkStatus } from '../../../src/utils/helpers/checkStatus';
interface IProps {
	id: string;
}

const Company = ({ id }: IProps) => {
	const { data: api, isLoading, error, fireFetch } =
		useFetchWithParams(getSingleItem);

	useEffect(() => {
		fireFetch({ id, endpoint: 'companies' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	let vehiclesData = [];
	if (data) vehiclesData = data.data.vehicles;

	const column = [
		{
			name: 'Tipo',
			sortable: true,
			selector: (row: any) => row.type,
		},
		{
			name: 'Marca',
			sortable: true,
			selector: (row: any) => row.brand,
		},
		{
			name: 'Modelo',
			sortable: true,
			selector: (row: any) => row.model,
		},
		{
			name: 'Patente',
			sortable: true,
			selector: (row: any) => row.patente,
		},
		{
			name: 'Estado',
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: any) => row.status,
					style: (row: any) => ({
						color: checkStatus(row.status),
					}),
				},
			],
			selector: (row: any) => row.status,
		},
	];

	if (isLoading) return <Loader />;
	if (error) return <Error error={error} />;

	return (
		<>
			{data && (
				<>
					<h1>{data.data.name}</h1>
					<div>
						<h2>Acerca la compañía</h2>
						<ul>
							<li>Nombre: {data.data.name}</li>
							<li>RUT: {data.data.rut}</li>
							<li>Correo: {data.data.email}</li>
							<li>Teléfono: {data.data.phone}</li>
							<li>Estado: {data.data.status}</li>
						</ul>
					</div>
					<div>
						<h2>Vehículos</h2>
						<DataTable
							fixedHeader
							highlightOnHover
							columns={column}
							data={vehiclesData}
						/>
					</div>
				</>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	return { props: { id: ctx.query.id } };
};

Company.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Company;
