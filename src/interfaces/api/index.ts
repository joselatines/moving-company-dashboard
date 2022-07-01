// These interfaces is for general api responses
export interface IMetaPagination {
	current_page: number;
	from: number;
	last_page: number;
	links: {
		url: null | string;
		label: string;
		active: boolean;
	}[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}
