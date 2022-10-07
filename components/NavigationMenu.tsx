import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";

import ButtonConnectWalletDesktop from "./Buttons/ConnectWalletDesktop";

// Import popper
import { usePopper } from "react-popper";

// Import headless ui
import { Popover, Transition } from "@headlessui/react";
import ButtonConnectWalletMobile from "./Buttons/ConnectWalletMobile";

/**
 * NavigationProps is a React Component properties that passed to React Component Navigation
 */
type NavigationProps = { showWallet: boolean };

/**
 * Navigation is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Navigation: FunctionComponent<NavigationProps> = (props) => {
    const bgStyle = { background: "linear-gradient(89.93deg, #0A2F0C 27.17%, #295771 76.4%, #0A2F0C 99.83%)" };
    const launchStyle = { background: "linear-gradient(85.79deg, #3BCAB0 5.43%, #DA69EC 49.91%, #C0FFF4 108.32%);border-radius: 10px;)" };
    const [openMenu, setOpenMenu] = useState(false);
    let [referenceElement1, setReferenceElement1] = useState<HTMLButtonElement | null>();
    let [popperElement1, setPopperElement1] = useState<HTMLDivElement | null>();
    let popper1 = usePopper(referenceElement1, popperElement1, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 16],
                },
            },
        ],
    });

    let [referenceElement2, setReferenceElement2] = useState<HTMLButtonElement | null>();
    let [popperElement2, setPopperElement2] = useState<HTMLDivElement | null>();
    let popper2 = usePopper(referenceElement2, popperElement2, {
        placement: "bottom-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 16],
                },
            },
        ],
    });
    return (
        //<div className='{"background":"linear-gradient(89.93deg, #0A2F0C 27.17%, #295771 76.4%, #0A2F0C 99.83%)"} sticky  top-0 z-40 flex flex-row items-center justify-between bg-green-300 p-4 backdrop-blur-lg dark:bg-green-700 '>
        <>
            <div className="items-right hidden h-[60px] items-center  justify-center p-4 lg:flex">
                <ul className="flex h-[50px] items-center justify-center space-x-2">
                    <li className="cursor-pointer">
                        <Link href="/">
                            <p className="first::pt-0 text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70">Home</p>
                        </Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link href="/list">
                            <p
                                className="
                              first::pt-0 
                              text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                            >
                                List Your Hero
                            </p>
                        </Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link href="https://vxyagr.gitbook.io/hiroes-heroes-for-hire/">
                            <p
                                className="
                              first::pt-0 
                              text-2xs font-500 padding-huge relative flex h-7 flex-row items-center items-center items-center justify-center rounded bg-white bg-opacity-20 px-4 pt-0.5 font-mono uppercase tracking-wider text-white  duration-1000 duration-200 hover:bg-opacity-70"
                            >
                                About
                            </p>
                        </Link>
                    </li>

                    {props.showWallet && (
                        <>
                            <li className="cursor-pointer">
                                <div className="hidden p-0 lg:flex" style={{ justifyContent: "center", alignItems: "center" }}>
                                    <ButtonConnectWalletDesktop />
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navigation;
