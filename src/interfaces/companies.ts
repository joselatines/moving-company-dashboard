import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
export interface ICompany {
	id: number;
	name: string;
	rut: string;
	email: string;
	phone: string;
	status: string;
	actions?: ReactJSXElement;
}

export interface IVehicle {
	id: number;
	type: string;
	brand: string;
	model: string;
	patente: string;
	status: string;
}

export interface ISingleCompany {
	id: number;
	name: string;
	rut: string;
	email: string;
	phone: string;
	status: string;
	vehicles: IVehicle[];
}
