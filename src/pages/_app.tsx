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
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    );
  }
}


export default wrapper.withRedux(MyApp);