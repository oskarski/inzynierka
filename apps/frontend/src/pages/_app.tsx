import '@fe/styles/globals.css';
import type { AppProps } from 'next/app';
import { headTitle } from '@fe/utils';
import Head from 'next/head';
import { NavigationBar, TopBar } from '@fe/components';
import { Roboto } from 'next/font/google';
import classNames from 'classnames';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--adm-font-family',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{headTitle()}</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <style>
          {`
          :root:root {
            --adm-font-family: ${roboto.style.fontFamily}
          }
          `}
        </style>
      </Head>

      <div className={classNames('h-screen flex flex-col justify-between')}>
        <TopBar className="grow-0 pt-4" />

        <div className="grow overflow-auto p-4">
          <Component {...pageProps} />
        </div>

        <NavigationBar className="grow-0" />
      </div>
    </>
  );
}