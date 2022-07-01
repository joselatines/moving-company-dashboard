import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { mockTrue } from '../../../__mocks__/mockResponses';

export default function useCheckUserFromLocalStorage() {
	const [isAuth, setIsAuth] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const user = localStorage.getItem('userMock');
		if (!user) {
			setIsAuth(false);
			router.push('/login');
		}
		setIsAuth(true);
	}, [router]);

	return { isAuth: mockTrue };
}
