import React from 'react'
import Head from 'next/head'

import Layout from '../components/Layout'

import '../styles/app.scss'
import { wrapper } from '../store'

import App, { AppInitialProps, AppContext } from 'next/app';
class MyApp extends App<AppInitialProps> {

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
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Head>
          <title>Denis Declercq - Message lList for LeBonCoin</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    );
  }
}


export default wrapper.withRedux(MyApp);