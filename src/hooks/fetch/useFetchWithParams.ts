import { useState } from 'react';
import toast from 'react-hot-toast';

// If you want to call this every time the component re renders use a useEffect calling fireFetch in your component
export default function useFetchWithParams(callback: any) {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// {email: example, password: 123}
	// To keep things reusable the params should be passed as an obj and in the callback we can destructure them
	const fireFetch = async (params: any) => {
		console.log('fireFetch ~ params', params);
		console.log('fireFetchWithParams 🔫');
		setIsLoading(true);
		try {
			const res = await callback(params); // The callback is an API fetch function and we are waiting the response
			setData(res); // The call back must be return the whole response JSON obj
		} catch (err) {
			setError(err);
			toast.error('Something went wrong, check the console');
			console.log('☠️ Something went wrong:', error);
			
		} finally {
			setIsLoading(false); // If response is 404 the whole document is going to die
		}
	};

	return { data, error, isLoading, fireFetch };
}
