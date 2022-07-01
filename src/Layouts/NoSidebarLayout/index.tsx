import React from 'react';
interface Props {
	children: React.ReactNode;
}

export interface INavLink {
	href: string;
	icon: React.ReactElement;
	title: string;
}

const NoSidebarLayout = ({ children }: Props) => (
	<>
		{children}
		<footer>Watermark</footer>
	</>
);

export default NoSidebarLayout;
