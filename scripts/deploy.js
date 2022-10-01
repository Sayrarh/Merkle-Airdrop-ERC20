const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");

// helpers
async function main() {

    const Ramney = await ethers.getContractFactory("Ramney");
    const ramney = await Ramney.deploy();
    await ramney.deployed();
    console.log("Ramney token is deployed to:", ramney.address);

    const Merkle = await ethers.getContractFactory("Merkle");
    const merkle = await Merkle.deploy(ramney.address);
    await  merkle.deployed();
    console.log("Contract address is:", merkle.address);

    const addr2 = "0x9a3a60f5aee7aef1fb0d4da8534452a2e2a89d46";

    const proof = [
      "0xa585e30aaeb5ead2e9104606807a9601249e97b8d12f53b0db33c380d8232692",
      "0xf72370848fc5c87649f87e83c31248cd1d1dde11878aa823a94b52c34d67bdb7",
      "0x22bab27f5682135792ad43281e384a991567dbf75ba228e29bf2ff9dec08ffc5",
      "0xba76c39476a5d594b85a1f06b1b882175764bc1249357adc063e4b48ba097a7e"
        ]

    await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [addr2]
        });
    const addrSigner = await ethers.getSigner(addr2);
    console.log(addrSigner);

    await helpers.setBalance(addrSigner.address, 100n ** 18n)


    const interact = await ethers.getContractAt("Merkle",merkle.address );
    const tokenInteract = await ethers.getContractAt("Ramney", ramney.address);
    const amt = ethers.utils.parseUnits("10");
   
    const claim = await interact.connect(addrSigner).claimToken(proof, amt);
    console.log(claim);

    const balance =  await tokenInteract.balanceOf(addrSigner.address);
    console.log("balance of signer:", balance );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});