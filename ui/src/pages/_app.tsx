import "../styles/globals.css";
import "../styles/loading.css";
import '@suiet/wallet-kit/style.css';
import type { AppProps } from "next/app";
import {
  WalletProvider,
  AllDefaultWallets
} from '@suiet/wallet-kit';

function WalletSelector({ Component, pageProps }: AppProps) {

  return (
    <WalletProvider defaultWallets={AllDefaultWallets}>
      <Component {...pageProps} className="bg-base-300" />
    </WalletProvider>
  );
}

export default WalletSelector;
