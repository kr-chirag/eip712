import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const demo = await hre.deployments.deploy("EIP712", {
        from: deployer,
        args: [deployer, 11155111]
    });
    console.log("EIP712 Deployed at:", demo.address, demo.newlyDeployed);
};
