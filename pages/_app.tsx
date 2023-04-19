import React, { useState } from "react";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import Head from "next/head";
import Layout from "../components/layouts/Default";
import Chains from "../components/Utils/Chains";
import { Inter } from "next/font/google";
import { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "@wagmi/core/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { LedgerConnector } from "@wagmi/connectors/ledger";

const { chains, provider } = configureChains(Chains, [
  infuraProvider({
    apiKey: process.env.INFURA_KEY as string,
    priority: 0,
  }),
  publicProvider({ priority: 1 }),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "MetaMask",
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new LedgerConnector({ chains }),
  ],
  provider,
});

const inter = Inter({ subsets: ["latin"], weight: "400" });

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>{`XOR eXchange | The Next Generation DEX Aggregator`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.webp" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, fontFamily: inter.style.fontFamily }}>
          <WagmiConfig client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WagmiConfig>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
