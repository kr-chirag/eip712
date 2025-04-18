import dotEnv from "dotenv";
dotEnv.config();

import { ethers } from "ethers";
import ABI_ERC20 from "./ABI_ERC20.json";

const RPC = `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;
const PRIVATE_KEY = `${process.env.DEPLOYER_KEY}`;
const ERC20_ADDRESS = "0x3Cd209F3f01Da3D97A6422003ABE4C77aB975750";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const usdcContract = new ethers.Contract(ERC20_ADDRESS, ABI_ERC20, signer);

    const domain = {
        name: "ERC20Token",
        version: "1",
        chainId: 11155111,
        verifyingContract: ERC20_ADDRESS,
    };

    const types = {
        Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
        ],
    };

    const owner = await signer.getAddress();
    const spender = "0x58a70795F6dfdB1c87db819C7D2d2Ca4D8798e56";
    const value = ethers.parseUnits("10", 6);
    const nonce = await usdcContract.nonces(owner);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    console.log(deadline);

    const message = {
        owner,
        spender,
        value,
        nonce,
        deadline,
    };

    const signature = await signer.signTypedData(domain, types, message);
    const { v, r, s } = ethers.Signature.from(signature);
    console.log(v);
    console.log(r);
    console.log(s);
}

main().catch(console.log);
