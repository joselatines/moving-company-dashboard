/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from '../../../src/Layouts/Main';
import useFetchWithParams from '../../../src/hooks/fetch/useFetchWithParams';
import Loader from '../../../src/components/shared/Loader';
import { mockCompanies as data } from '../../../__mocks__/mockCompanies';
import Error from '../../../src/components/shared/Error';
// prettier-ignore
import { changeItemStatus, getAllItems } from '../../../src/services/shared/get';
import CustomTable from '../../../src/components/Tables/CustomTable';
import { CustomMenu } from '../../../src/components/Tables/CustomActionsMenu';
import { deleteSingleItem } from '../../../src/services/shared/delete';
import { checkStatus } from '../../../src/utils/helpers/checkStatus';

const Companies: NextPageWithLayout = () => {
	const { data: api, isLoading, error, fireFetch } = useFetchWithParams(getAllItems);
	const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

	useEffect(() => {
		fireFetch({ pagination, endpoint: 'companies' });
	}, [pagination]);

	const changeStatus = async (id: number) =>
		changeItemStatus(id, 'companies').finally(() =>
			fireFetch({ pagination, endpoint: 'companies' })
		);

	const deleteItem = async (id: number) => {
		deleteSingleItem(id, 'companies').finally(() =>
			fireFetch({ pagination, endpoint: 'companies' })
		);
	};

	const actions = [
		{
			fireAction: changeStatus,
			label: 'Activar/Desactivar',
		},
		{
			fireAction: deleteItem,
			label: 'Eliminar',
			icon: <DeleteIcon />,
		},
	];

	const column = [
		{
			name: 'Nombre',
			sortable: true,
			selector: (row: any) => row.name,
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
			cell: (row: any) => <CustomMenu url='companies' row={row} actions={actions} />,
		},
	];

	if (isLoading) return <Loader />;
	if (error) return <Error error={error} />;

	return (
		<div>
			<h1>Compañías</h1>
			{data && (
				<CustomTable
					columns={column}
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

Companies.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Companies;
