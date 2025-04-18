import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const demo = await hre.deployments.deploy("EIP712", {
        from: deployer,
        proxy: {
            execute: {
                init: {
                    methodName: "initialize",
                    args: [deployer, 11155111, "1"],
                },
            },
            proxyContract: "OpenZeppelinTransparentProxy",
        },
        log: true,
    });
    console.log("EIP712 Deployed at:", demo.address, demo.newlyDeployed);
};

export const tags = ["EIP712"];
