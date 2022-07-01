import { base_url } from './config';

interface IParams {
	email: string;
	password: string;
	remember: boolean;
}

export const userLogin = async (userData: IParams) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(userData),
	};

	try {
		const res = await fetch(`${base_url}/back-office/login`, requestOptions);
		const data = await res.json();

		if (data.status) {
			localStorage.setItem('userMudy', btoa(JSON.stringify(data)));
			return data;
		}

		return data;
	} catch (err) {
		console.log('Something went wrong:', err);
	}
};

export const userLogout = () => localStorage.removeItem('userMudy');
