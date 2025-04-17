import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const demo = await hre.deployments.deploy("ERC20", {
        from: deployer,
        proxy: {
            execute: {
                init: {
                    methodName: "initialize",
                    args: [],
                },
            },
            proxyContract: "OpenZeppelinTransparentProxy",
        },
        log: true,
    });

    console.log("ERC20 Deployed at:", demo.address, demo.newlyDeployed);
};
