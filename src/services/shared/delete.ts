import toast from 'react-hot-toast';
import { mockFalse } from '../../../__mocks__/mockResponses';
import { base_url, getUserFromLocalStorage } from '../config';

export const deleteSingleItem = async (id: number, endpoint: string) => {
	const { token, token_type } = getUserFromLocalStorage();

	const myHeaders = new Headers();
	myHeaders.append('Authorization', `${token_type} ${token}`);

	const requestOptions = {
		method: 'DELETE',
		headers: myHeaders,
	};

	try {
		// prettier-ignore
		const res = await fetch(`${base_url}/back-office/${endpoint}/${id}`, requestOptions);
		const data = await res.json();

		if (!data.success || mockFalse) {
			toast.error('Algo salió mal!');
			console.log('👿', res);
		}

		// toast.success(data.message);
		toast.success('Infomacion cambiada exitosamente');
		return data;
	} catch (error) {
		toast.error('Something went wrong, check the console');
		console.log('👿', error);
	}
};
