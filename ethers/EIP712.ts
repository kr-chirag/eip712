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
        verifyingContract: "0x68C673c7d5D57F704e7BD1781505AbF9D8677c73",
    };

    const types = {
        Account: [
            { name: "name", type: "string" },
            { name: "amount", type: "uint256" },
        ],
    };

    console.log("domail:", TypedDataEncoder.hashDomain(domain));
    console.log("hashStruct:", TypedDataEncoder.hashStruct("Account", types, { name: "csp", amount: 1249 }));

    const signature = await signer.signTypedData(domain, types, { name: "csp", amount: 1249 });
    const { v, r, s } = ethers.Signature.from(signature);

    console.log("r:", r);
    console.log("s:", s);
    console.log("v:", v);
    console.log("address:", signer.address);
}

main().catch(console.log);
