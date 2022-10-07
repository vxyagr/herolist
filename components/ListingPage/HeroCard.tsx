import Link from "next/link";

import type { FunctionComponent } from "react";
// @ts-ignore
import ReactRoundedImage from "react-rounded-image";
import React, { useState, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { sha256, sha512 } from "ethers/lib/utils";
import crypto from "crypto";
/**
 * ResourcesProps is a React Component properties that passed to React Component Resources
 */
type ResourcesProps = { tokenId: number; price: number; name: string; agency: string; power: string; image: any; url: string };

/**
 * Resources is just yet another react component
 *style={{ background: "linear-gradient(206.19deg, #7BFEE8 0.2%, rgba(214, 97, 255, 0.69) 53.15%, #03A44D 88.21%)" }}
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Resources: FunctionComponent<ResourcesProps> = (props) => {
    const agencyAddress = "0x.." + props.agency.slice(props.agency.length - 4);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(props.name);
    const [power, setPower] = useState(props.power);
    const [price, setPrice] = useState(props.price);
    const url = "http://localhost:8000/hero/update/" + props.url;
    const delete_url = "http://localhost:8000/hero/delete/" + props.url;
    const delete_key = "radamel" + props.url + props.agency;
    //const delete_key = "radamel";
    const enc_delete_key = crypto.createHash("md5").update(JSON.stringify(delete_key)).digest("hex");
    console.log("enc " + enc_delete_key);
    if (!edit) {
        return (
            <div className="z-10 my-2 h-[520px] w-[250px] overflow-hidden rounded-2xl bg-gray-light-1 " style={{ justifyContent: "center", alignItems: "center" }}>
                <div className="relative aspect-square w-full " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ReactRoundedImage image={`data:image/${props.image.contentType};base64, ${Buffer.from(props.image.data).toString("base64")}`} roundedColor="orange" imageWidth="180" imageHeight="180" roundedSize="5" borderRadius="50" />
                </div>

                <div className="p-2">
                    <h1 className="text-gray text-2xl">{props.name}</h1>
                    <h2 className="text-gray text-sm ">by {agencyAddress}</h2>
                    <p className="text-gray font-light">Power : {props.power}</p>
                    <p className="text-gray font-light">${props.price} per hour</p>
                </div>
                <div className="p-2">
                    <button
                        onClick={() => {
                            setEdit(true);
                        }}
                        className="button gradient m-2 inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base"
                        type="submit"
                    >
                        Edit
                    </button>
                    <form action={delete_url} method="POST" enctype="application/json">
                        <input type="text" hidden name="id" value={props.url} />
                        <input type="text" hidden name="enck" value={enc_delete_key} />
                        <button className="button gradient m-2 inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base" type="submit">
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="z-10 my-2 h-[520px] w-[250px] overflow-hidden rounded-2xl bg-gray-light-1 ">
                <div className="relative aspect-square w-[200px] " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ReactRoundedImage image={`data:image/${props.image.contentType};base64, ${Buffer.from(props.image.data).toString("base64")}`} roundedColor="#C1F6ED" imageWidth="180" imageHeight="180" roundedSize="5" borderRadius="50" />
                </div>

                <div className="bg-gray-light p-2">
                    <form action={url} method="POST" enctype="application/json">
                        <div className="bg-gray-light p-2">
                            <input type="text" hidden name="enck" value={enc_delete_key} />
                            <input type="text" hidden value={props.url} name="id"></input>
                            <input type="text" hidden value={props.agency} name="agency"></input>
                            <input
                                type="text"
                                placeholder={props.name}
                                name="name"
                                id="name"
                                className="w-200 px-10"
                                onChange={(e) => {
                                    setName(e.currentTarget.value);
                                }}
                                value={name}
                            ></input>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder={props.power}
                                name="power"
                                id="power"
                                className="w-200 rounded-sm px-10"
                                onChange={(e) => {
                                    setPower(e.currentTarget.value);
                                }}
                                value={power}
                            ></input>
                        </div>
                        <div className="p-2">
                            <input
                                type="number"
                                placeholder={props.price.toString()}
                                name="price"
                                id="price"
                                className="w-200 px-10"
                                onChange={(e) => {
                                    setPrice(parseInt(e.currentTarget.value));
                                }}
                                value={price}
                            ></input>
                        </div>

                        <div className="p-2">
                            <button className="button gradient m-2 inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base" type="submit">
                                Update Hero Data
                            </button>
                            <button
                                onClick={() => {
                                    setEdit(false);
                                }}
                                className="button gradient m-2 inline-block rounded-full bg-[length:300%_300%] bg-center py-3 px-8 font-inter text-sm font-bold leading-none tracking-tight text-gray-50 hover:bg-left  hover:shadow-xl hover:shadow-blue-400/20 active:scale-95 dark:text-gray-900 sm:text-base md:text-base"
                                type="submit"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

export default Resources;
