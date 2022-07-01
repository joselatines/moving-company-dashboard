export const checkStatus = (status: string) => {
	const statusOpt = ['ACTIVE', 'ON', true];

	if (
		status === statusOpt[0] ||
		status === statusOpt[1] ||
		status === statusOpt[2]
	) {
		return '#40916c';
	} else return '#ef233c';
};
