// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AxiomResolver {
    address public platformOwner;
    mapping(string => address) public registryAddresses;

    constructor() {
        platformOwner = msg.sender;
    }

    function setRegistry(string memory extension, address registry) external {
        registryAddresses[extension] = registry;
    }

    function getRegistry(string memory extension) external view returns (address) {
        return registryAddresses[extension];
    }
}
