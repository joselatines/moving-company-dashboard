export const base_url = 'https://api-dev.mudy.itsirius.com/api';

interface IUserLocalStorage {
	status: boolean;
	token: string;
	token_type: string;
	user: {
		user_type: string;
		first_name: string;
		last_name: string;
		full_name: string;
		email: string;
		phone: string;
		profile_photo_url: string;
		company_name: null | string;
		created_at: string;
		updated_at: string;
		status: 'ACTIVE' | 'INACTIVE';
	};
	message: string;
}

export const getUserFromLocalStorage = (): IUserLocalStorage => {
	const user = localStorage.getItem('userMudy');

	if (user) {
		const decoded = atob(user);
		return JSON.parse(decoded);
	}
	throw new Error(
		'User is not authenticated in the local storage ~ src/services/config.ts'
	);
};
