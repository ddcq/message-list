import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode } from 'react';
import { Configuration, Layout as RMDLayout, useLayoutNavigation } from 'react-md';
import LinkUnstyled from '../LinkUnstyled';
import navItems from './navItems';

interface LayoutProps {
	children: ReactNode;
}

// Check out the documentation for Configuring your Layout for more information:
// - https://react-md.dev/guides/configuring-your-layout
export default function Layout({ children }: LayoutProps): ReactElement {
	const { pathname } = useRouter();

	return (
		<Configuration>
			<RMDLayout
				title="DDCQ Messages"
				navHeaderTitle="Menu"
				tabletLayout="temporary"
				landscapeTabletLayout="temporary"
				desktopLayout="temporary"
				largeDesktopLayout="temporary"
				treeProps={useLayoutNavigation(navItems, pathname, LinkUnstyled)}
			>
				{children}
			</RMDLayout>
		</Configuration>
	);
}
