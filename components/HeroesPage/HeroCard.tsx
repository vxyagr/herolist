import Link from "next/link";

import type { FunctionComponent } from "react";
// @ts-ignore
import ReactRoundedImage from "react-rounded-image";
import React, { useState, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { sha256, sha512 } from "ethers/lib/utils";
import crypto from "crypto";
import * as endpoints from "../Endpoints";
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
    const url = endpoints.updateHero + props.url;
    const delete_url = endpoints.deleteHero + props.url;
    const delete_key = "radamel" + props.url + props.agency;
    //const delete_key = "radamel";
    const enc_delete_key = crypto.createHash("md5").update(JSON.stringify(delete_key)).digest("hex");
    console.log("enc " + enc_delete_key);

    return (
        <div className="z-10 my-2 h-[480px] w-[250px] overflow-hidden rounded-2xl bg-gray-light-1 " style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="relative aspect-square w-full " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ReactRoundedImage image={`data:image/${props.image.contentType};base64, ${Buffer.from(props.image.data).toString("base64")}`} roundedColor="orange" imageWidth="180" imageHeight="180" roundedSize="5" borderRadius="50" />
            </div>

            <div className="p-2">
                <h1 className="text-gray text-2xl">{props.name}</h1>
                <h2 className="text-gray text-sm ">by {agencyAddress}</h2>
                <p className="text-gray font-light">Power : {props.power}</p>
                <p className="text-gray font-light">${props.price} per hour</p>
            </div>
            <div className="p-2"></div>
        </div>
    );
};

export default Resources;
