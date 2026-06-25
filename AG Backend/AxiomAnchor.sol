// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AxiomAnchor {
    // This creates a digital phonebook that maps 
    // a "name" to a "wallet address".
    mapping(string => address) public domainOwners;
    address public owner;
    bool private initialized;

    function initialize(address _owner) public {
        require(!initialized, "Already initialized");
        owner = _owner;
        initialized = true;
    }

    // This lets a user "register" a domain.
    function registerDomain(string memory domain) public {
        // This ensures nobody can overwrite a domain that is already taken.
        require(domainOwners[domain] == address(0), "Domain already taken!");
        
        // This sets the person who called the function as the owner.
        domainOwners[domain] = msg.sender;
    }
    
    // This allows the system to check who owns a specific domain.
    function getOwner(string memory domain) public view returns (address) {
        return domainOwners[domain];
    }
}
