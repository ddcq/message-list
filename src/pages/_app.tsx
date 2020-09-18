import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

import '../styles/app.scss';
import { wrapper } from '../store';

import App, { AppInitialProps, AppContext } from 'next/app';
import { connect } from 'react-redux';
import { selectLoading } from '../store/messages/selectors';
import RootState from '../store/root-state';
import { CircularProgress, Overlay } from 'react-md';

type AppProps = AppInitialProps & {
	loading: boolean;
};

class MyApp extends App<AppProps> {
	public static getInitialProps = async ({ Component, ctx }: AppContext) => {
		// ctx.store.dispatch({type: 'TOE', payload: 'was set in _app'});

		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
				// Some custom thing for all pages
				pathname: ctx.pathname,
			},
		};
	};

	public render() {
		const { Component, pageProps, loading } = this.props;

		return (
			<Layout>
				<Head>
					<title>Denis Declercq - Message lList for LeBonCoin</title>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap"
					/>
				</Head>
				<Overlay
					id="app-overlay"
					visible={loading}
					portal
					onRequestClose={() => {
						alert("Patientez, s'il vous plaît. Les données sont en cours de chargement...");
					}}
				>
					<CircularProgress id="mc-submit-progress" centered />
				</Overlay>
				<Component {...pageProps} />
			</Layout>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	loading: selectLoading(state) || false,
});

export default wrapper.withRedux(connect(mapStateToProps)(MyApp));
