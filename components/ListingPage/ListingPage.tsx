import Head from "next/head";
import type { FunctionComponent } from "react";
import React, { useState } from "react";
import Favicon from "../Favicon";
import Hero from "./Listing";
import Navigation from "../AppNavigation";
import HomePageMeta from "./HeroesPageMeta";

import { useWalletContext } from "../Wallet";

/**
 * HeroPageProps is a React Component properties that passed to React Component HomePage
 */
type HeroPageProps = {};

/**
 * HomePage is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const HeroPage: FunctionComponent<HeroPageProps> = ({}) => {
    // By default use dark theme
    // Read global states
    const { chain, account, connectWallet, disconnectWallet, switchNetwork } = useWalletContext();
    var accountConnected = account ? false : true;
    accountConnected = false;
    const [walletConnected, setWalletConnected] = useState(accountConnected);
    //const bgCol = { background: "radial-gradient(100.64% 150.78% at 50% -7.3%, #28556C 0%, rgba(10, 47, 12, 0.95) 41.22%, #0A2F0C 63.49%)" };
    const bgCol = { background: "black" };
    return (
        <div className={`${bgCol} h-full w-full font-inter  lg:h-full`} style={{ background: "#000000" }}>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>Hiroes | Hero for Hire </title>
                <meta name="description" content="Get a hero to safe your day!" />
                <HomePageMeta />
            </Head>
            <Favicon />
            <Navigation />
            <Hero accountConnected={!(account ? false : true)} />
        </div>
    );
};

export default HeroPage;
