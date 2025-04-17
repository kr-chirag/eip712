import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const demo = await hre.deployments.deploy("AdminBox", {
        from: deployer,
        proxy: {
            execute: {
                init: {
                    methodName: "initialize",
                    args: [deployer, 11155111],
                },
            },
            proxyContract: "OpenZeppelinTransparentProxy",
        },
        log: true,
    });
    console.log("AdminBox Deployed at:", demo.address, demo.newlyDeployed);
};
