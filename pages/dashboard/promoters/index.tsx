import { ReactElement, useEffect, useState } from 'react';
import MainLayout from '../../../src/Layouts/Main';
import { NextPageWithLayout } from '../../_app';
import useFetchWithParams from '../../../src/hooks/fetch/useFetchWithParams';
import Loader from '../../../src/components/shared/Loader';
import { mockPromoters as data } from '../../../__mocks__/mockPromoters';
import Error from '../../../src/components/shared/Error';
// prettier-ignore
import { changeItemStatus, getAllItems } from '../../../src/services/shared/get';
import CustomTable from '../../../src/components/Tables/CustomTable';
import { CustomMenu } from '../../../src/components/Tables/CustomActionsMenu';
import { checkStatus } from '../../../src/utils/helpers/checkStatus';

const Promoters: NextPageWithLayout = () => {
	const { data: api, isLoading, error, fireFetch } = useFetchWithParams(getAllItems);
	const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

	useEffect(() => {
		fireFetch({ pagination, endpoint: 'promoters' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, changeItemStatus]);

	// Needs pass this function to a reusable function for all api calls
	const changeStatus = async (id: number) =>
		changeItemStatus(id, 'promoters').finally(() =>
			fireFetch({ pagination, endpoint: 'promoters' }) // Re renders the component to update new data
		);

	const actions = [
		{
			fireAction: changeStatus,
			label: 'Activar/Desactivar',
		},
	];

	const columns = [
		{
			name: 'Nombre completo',
			sortable: true,
			selector: (row: any) => `${row.last_name} ${row.first_name}`,
		},
		{
			name: 'Correo',
			sortable: true,
			selector: (row: any) => row.email,
		},
		{
			name: 'RUT',
			sortable: true,
			selector: (row: any) => row.rut,
		},
		{
			name: 'Teléfono',
			sortable: true,
			selector: (row: any) => row.phone,
		},
		{
			name: 'Estado',
			sortable: true,
			selector: (row: any) => row.status,
			conditionalCellStyles: [
				{
					when: (row: any) => row.status,
					style: (row: any) => ({
						color: checkStatus(row.status),
					}),
				},
			],
		},
		{
			// prettier-ignore
			cell: (row: any) => <CustomMenu url='promoters' row={row} actions={actions} />,
		},
	];

	if (isLoading) return <Loader />;
	if (error) return <Error error={error} />;

	return (
		<div>
			<h1>Promotores</h1>
			{data && (
				<CustomTable
					columns={columns}
					setPagination={setPagination}
					totalRows={data.meta.total}
					isLoading={isLoading}
					data={data.data}
					currentPage={data.meta.current_page}
				/>
			)}
		</div>
	);
};

Promoters.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Promoters;
