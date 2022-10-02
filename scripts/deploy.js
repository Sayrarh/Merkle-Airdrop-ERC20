const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");
//import data from "../gen_files/merkleproof.json";
const data  = require("../gen_files/merkleproof.json")
const userDetails =  require("../gen_files/claimlist.json");

    // helpers
    async function main() {
    const claimer = Object.keys(data)[4];
    console.log(claimer)
    const proof = data[claimer].proof
    const amount = userDetails[claimer].amount


    const Ramney = await ethers.getContractFactory("Ramney");
    const ramney = await Ramney.deploy();
    await ramney.deployed();
    console.log("Ramney token is deployed to:", ramney.address);

    const Merkle = await ethers.getContractFactory("Merkle");
    const merkle = await Merkle.deploy(ramney.address);
    await  merkle.deployed();
    console.log("Contract address is:", merkle.address);


    await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [claimer]
        });
    const addrSigner = await ethers.getSigner(claimer);
    //console.log(addrSigner);

    //set balance for the signer to be able to pay for gas
    await helpers.setBalance(addrSigner.address, 100n ** 18n)


    const interact = await ethers.getContractAt("Merkle",merkle.address );
    const tokenInteract = await ethers.getContractAt("Ramney", ramney.address);


    const transfer = await tokenInteract.transferOut(merkle.address, 20000)
    console.log("transfer: ",  transfer);

    const bal = await tokenInteract.balanceOf(merkle.address)
    console.log("balance of address: ", bal)
   
    const claim = await interact.connect(addrSigner).claimToken(proof, amount);
    console.log("claiming: ", claim);

    const balance =  await tokenInteract.balanceOf(addrSigner.address);
    console.log("balance of signer:",  balance );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});