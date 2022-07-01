import { ReactElement, useEffect } from 'react';
import MainLayout from '../../../src/Layouts/Main';
import { GetServerSideProps } from 'next';
import useFetchWithParams from '../../../src/hooks/fetch/useFetchWithParams';
import Loader from '../../../src/components/shared/Loader';
import Error from '../../../src/components/shared/Error';
import { mockPromoter as data } from '../../../__mocks__/mockPromoters';
import { getSingleItem } from '../../../src/services/shared/get';
import { ISinglePromoter } from '../../../src/interfaces/promoters';

const items = [
	{ label: 'Nombre', key: 'first_name' },
	{ label: 'Apellido', key: 'last_name' },
	{ label: 'RUT', key: 'rut' },
	{ label: 'Correo electrónico', key: 'email' },
	{ label: 'Numero de teléfono', key: 'phone' },
	{ label: 'Banco', key: 'bank_name' },
	{ label: 'Tipo de cuanta de banco', key: 'bank_account_type' },
	{ label: 'Numero de cuenta', key: 'bank_account_number' },
	{ label: 'Estado', key: 'status' },
];

interface IProps {
	id: string;
}

const Promoter = ({ id }: IProps) => {
	const { data: api, isLoading, error, fireFetch } =
		useFetchWithParams(getSingleItem);

	useEffect(() => {
		fireFetch({ id, endpoint: 'promoters' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (isLoading) return <Loader />;
	if (error) return <Error error={error} />;

	return (
		<>
			{data && (
				<div>
					<h1>
						{data.data.first_name} {data.data.last_name}
					</h1>
					<div>
						<ul>
							{items.map(({ label, key }) => (
								<li key={key}>
									{label}: {data.data[key as keyof ISinglePromoter]}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ctx => {
	return { props: { id: ctx.query.id } };
};

Promoter.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Promoter;
