import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
interface IProps {
	title?: string;
	columns: any;
	setPagination: (obj: any) => any;
	totalRows: number;
	isLoading: boolean;
	data: any; // An array of obj from the database
	currentPage: number;
}

export default function CustomTable({
	title,
	columns,
	setPagination,
	totalRows,
	data,
	currentPage,
}: IProps) {
	const changePage = (direction: string) => {
		if (direction.includes('next') && currentPage < totalRows) {
			setPagination((prev: any) => ({ ...prev, page: prev.page + 1 }));
		}
		if (direction.includes('prev') && currentPage > 1) {
			setPagination((prev: any) => ({ ...prev, page: prev.page - 1 }));
		}
	};

	const handlePageChange = (page: number) => {
		console.log('🚀 handlePageChange ~ page', page);
		setPagination((prev: any) => ({ ...prev, page: page }));
	};

	const handlePerRowsChange = async (newPerPage: number, page: number) => {
		setPagination((prev: any) => ({
			...prev,
			page: page,
			per_page: newPerPage,
		}));
	};

	return (
		<>
			<DataTable
				title={title}
				fixedHeader
				highlightOnHover
				columns={columns}
				data={data}
				/* 		progressPending={isLoading}
				pagination
				paginationServer
				paginationTotalRows={totalRows}
				onChangeRowsPerPage={handlePerRowsChange}
				onChangePage={handlePageChange} */
			/>
			<div style={{ display: 'flex', gap: '.5em', placeItems: 'center' }}>
				<Button onClick={() => changePage('prev')}>
					<NavigateBeforeIcon />
					Prev
				</Button>
				<span>
					{currentPage}/{totalRows}
				</span>
				<Button onClick={() => changePage('next')}>
					Next <NavigateNextIcon />
				</Button>
			</div>
		</>
	);
}
