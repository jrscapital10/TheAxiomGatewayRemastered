// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";

interface IAxiomResolver {
    function setRegistry(string memory extension, address registry) external;
}

contract AxiomFactory {
    address public immutable anchorImplementation;
    IAxiomResolver public resolver;

    constructor(address _anchorImplementation, address _resolverAddress) {
        anchorImplementation = _anchorImplementation;
        resolver = IAxiomResolver(_resolverAddress);
    }

    function deployRegistry(string memory extension, address owner) external returns (address) {
        address clone = Clones.clone(anchorImplementation);
        (bool success, ) = clone.call(abi.encodeWithSignature("initialize(address)", owner));
        require(success, "Initialization failed");
        
        resolver.setRegistry(extension, clone);
        
        return clone;
    }
}
