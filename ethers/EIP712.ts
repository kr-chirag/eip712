import dotEnv from "dotenv";
import { TypedDataEncoder } from "ethers";
dotEnv.config();

import { ethers } from "ethers";

const RPC = `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;
const PRIVATE_KEY = `${process.env.DEPLOYER_KEY}`;

async function main() {

    const provider = new ethers.JsonRpcProvider(RPC);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const domain = {
        name: "EIP712",
        version: "1",
        chainId: 11155111,
        verifyingContract: "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5",
    };

    const types = {
        Account: [
        { name: "name", type: "string" },
            { name: "amount", type: "uint256" },
        ],
    };

    const signature = await signer.signTypedData(domain, types, {name: "csp", amount:1249});
    const {v,r,s} = ethers.Signature.from(signature);

    console.log("r:", r);
    console.log("s:", s);
    console.log("v:", v);
    console.log("address:", signer.address);

}

main().catch(console.log);
