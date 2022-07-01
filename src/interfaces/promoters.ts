export interface IPromoter {
	id: number;
	first_name: string;
	last_name: string;
	rut: string;
	email: string;
	phone: string;
	status: string;
}

export interface ISinglePromoter {
	id: number;
	first_name: string;
	last_name: string;
	rut: string;
	email: string;
	phone: string;
	bank_id: number;
	bank_name: string;
	bank_account_type: string;
	bank_account_number: string;
	status: string;
	created_at: Date;
}
