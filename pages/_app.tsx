import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../src/utils/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

export type NextPageWithLayout = NextPage & {
	// eslint-disable-next-line no-unused-vars
	getLayout?: (page: ReactElement) => ReactNode;
};

/* 
interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
} */

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
	emotionCache?: EmotionCache;
};

const MyApp: React.FunctionComponent<AppPropsWithLayout> = props => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page: any) => page);

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={lightTheme}>
				<Toaster toastOptions={{ duration: 2000 }} />
				<CssBaseline />
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
