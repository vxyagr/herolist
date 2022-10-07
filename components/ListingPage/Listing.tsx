import type { FunctionComponent } from "react";
// Import components
// @ts-ignore
import { DEFAULT_CHAIN, RinkebyProvider, useWalletContext, MainnetProvider, mainnetSigner } from "../Wallet";
import { ethers, providers } from "ethers";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeroCard from "./HeroCard";
/**
 * HeroProps is a React Component properties that passed to React Component Hero
 */
type HeroProps = { accountConnected: boolean };

/**
 * Hero is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 *
 */

interface ICard {
    yield: number;
    tokenId: number;
}

const Hero: FunctionComponent<HeroProps> = (props) => {
    const { chain } = useWalletContext();
    const { account } = useWalletContext();
    const { signer } = useWalletContext();
    const showConnectWallet = account ? false : true;
    const showSwitchToDefaultNetwork = !showConnectWallet && chain.unsupported ? true : false;
    const [heroList, setHeroList] = useState([]);
    const getAllHeroes = async () => {
        const response = await fetch(`http://localhost:8000/hero`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const heroes = await response.json();
        console.log(heroes);
        setHeroList(heroes);
    };

    const getHeroesByAgency = async () => {
        var endpoint = `http://localhost:8000/hero/agency/` + account;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const heroes = await response.json();
        console.log(heroes);
        setHeroList(heroes);
    };
    useEffect(() => {
        getHeroesByAgency();
        console.log(heroList);
        console.log("length " + heroList.length);
        console.log("account rendered " + account);
    }, [account]); // <-- empty dependency array
    if (!showConnectWallet && !showSwitchToDefaultNetwork) {
        //if (true) {
        return (
            <div className="relative h-full w-full justify-center overflow-hidden lg:h-full">
                <div className="relative z-10 m-auto flex w-screen flex-col items-center gap-8 py-[20px] px-4 text-center align-middle lg:py-10">
                    <div className="w-full px-10">
                        <div>
                            <form action="http://localhost:8000/hero" method="POST" enctype="multipart/form-data">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Hero Name (e.g Sonic Wrath)"
                                        name="name"
                                        id="name"
                                        className="w-200 rounded-md px-10"
                                        onChange={(e) => {
                                            //setPower(e.currentTarget.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Power (e.g super speed)"
                                        name="power"
                                        id="power"
                                        className="w-200 rounded-md px-10"
                                        onChange={(e) => {
                                            //setPower(e.currentTarget.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="p-2">
                                    <input type="text" id="agency" name="agency" className="text-white" value={account} hidden />
                                    <input
                                        type="number"
                                        placeholder="Price per hour (USD)"
                                        name="price"
                                        id="price"
                                        className="w-200 rounded-md px-10"
                                        onChange={(e) => {
                                            //setPower(e.currentTarget.value);
                                        }}
                                    ></input>
                                </div>
                                <div>
                                    <input type="file" id="image" name="image" className="text-white" />
                                </div>{" "}
                                <div className="p-2">
                                    <button className="button gradient inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base" type="submit">
                                        List New Hero
                                    </button>
                                </div>
                            </form>
                        </div>{" "}
                        <hr />
                    </div>
                    <div className="w-full px-10" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                        {" "}
                        <hr />
                        <h2 className="med-hero-text w-full px-10">
                            Your Listed <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">Heroes</span>
                        </h2>
                    </div>
                    {/* <h2 className="med-hero-text">
                        Stonker <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">Treasury Farming</span>
                    </h2>
                    <h2 className="small-hero-text">(coming soon)</h2>*/}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                        {heroList.map((hero) => (
                            <div className="my-2 mx-2" style={{ flexBasis: "21%" }}>
                                <HeroCard url={hero._id} name={hero.name} price={hero.price} tokenId={hero.id} agency={hero.agency} power={hero.power} image={hero.image} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else if (showSwitchToDefaultNetwork) {
        return (
            <div className="lg:py-30 relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                <h2 className="med-hero-text">
                    Please Switch Network to <span className="gradient move-gradient bg-[length:250%_250%] bg-clip-text text-transparent transition-none sm:py-20">{DEFAULT_CHAIN.name}</span>
                </h2>
            </div>
        );
    } else {
        return (
            <div className="lg:py-30 relative z-10 m-auto flex max-w-screen-md flex-col items-center gap-8 py-[60px] px-4 text-center align-middle">
                <h2 className="med-hero-text">Please Connect Your Wallet</h2>
            </div>
        );
    }
};

export default Hero;
