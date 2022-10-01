// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "forge-std/console.sol";
// import "../src/Stake.sol";
// import "../src/Maxi.sol";


// contract MerkleTest is Test {

//     function mkaddr(string memory name) public returns (address) {
//         address addr = address(
//             uint160(uint256(keccak256(abi.encodePacked(name))))
//         );
//         vm.label(addr, name);
//         return addr;
//     }

//     function testPrint() public {
//         console.log(mkaddr("Toyosi"));
//         console.log(mkaddr("Paul"));
//         console.log(mkaddr("Dunni"));
//         console.log(mkaddr("Gbolahan"));
//         console.log(mkaddr("Jesse"));
//         console.log(mkaddr("Isaac"));
//         console.log(mkaddr("Emmanuel"));
//         console.log(mkaddr("Racheal"));
//         console.log(mkaddr("Serah"));
//         console.log(mkaddr("Iyanu"));
//         console.log(mkaddr("Sade"));
//     }
// }

// // Logs:
// //   0xa0f58fe320fa6bd30d297820e98a9406f948e418
// //   0xf7c21a5db8307d4fa5ad0421253a2b0b6ff21234
// //   0x1eee2b9bebf3904bd5b25240d8cb0ff50b640f99
// //   0xf7b9bf310f59ba8ef67a511361f4e10eb0959bf9
// //   0x69787a84ee8633d75d6ceef9b4be7afeb055f769
// //   0x433bc19736cb335a1663fe2032fff4903381b6e0
// //   0x2768595e786b0f5ed208487586b357ddc08cef54
// //   0xca45ef05397f9d82bbca16b762b0d662850023a0
// //   0x24cc84623bfd2da78db1ce7e3cae02b5abada19a
// //   0xbaf20bd091bf814bdadc5cd384c78f2e896bff2e
// //   0x4cc6d19d26a2a41829d9908697d1f0e91a3a2674