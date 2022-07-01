import toast from 'react-hot-toast';
import { mockFalse } from '../../../__mocks__/mockResponses';
import { base_url, getUserFromLocalStorage } from '../config';

interface IGetAllItems {
	pagination: any;
	endpoint: string;
}

export const getAllItems = async ({ pagination, endpoint }: IGetAllItems) => {
	const myHeaders = new Headers();
	const { token, token_type } = getUserFromLocalStorage();

	myHeaders.append('Authorization', `${token_type} ${token}`);
	const params = new URLSearchParams(pagination);

	const requestOptions = { method: 'GET', headers: myHeaders };

	try {
		// prettier-ignore
		const res = await fetch(`${base_url}/back-office/${endpoint}?${params}`, requestOptions);

		return res.json();
	} catch (err) {
		console.log('👿 Something went wrong: ', err);
	}
};

interface IGetSingleItem {
	id: string;
	endpoint: string;
}

export const getSingleItem = async ({ id, endpoint }: IGetSingleItem) => {
	const { token, token_type } = getUserFromLocalStorage();

	const myHeaders = new Headers();
	myHeaders.append('Authorization', `${token_type} ${token}`);

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
	};

	// prettier-ignore
	const res = await fetch(`${base_url}/back-office/${endpoint}/${id}`, requestOptions);
	const data = await res.json();
	console.log('🚀 ~ file: get.ts ~ line 47 ~ getSingleItem ~ data', data);
	return data;
};

export const changeItemStatus = async (id: number, endpoint: string) => {
	const { token, token_type } = getUserFromLocalStorage();

	const myHeaders = new Headers();
	myHeaders.append('Authorization', `${token_type} ${token}`);

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
	};

	try {
		// prettier-ignore
		const res = await fetch(`${base_url}/back-office/${endpoint}/${'id'}`, requestOptions);
		const data = await res.json();

		if (!data.success || mockFalse) {
			toast.error('Algo salió mal!');
			console.log('👿', res);
		}

			// toast.success(data.message);
			toast.success('Infomacion cambiada exitosamente');
		return data;
	} catch (error) {
		toast.error('Something went wrong');
		console.log('👿', error);
	}
};
