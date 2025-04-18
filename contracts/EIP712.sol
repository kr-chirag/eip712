// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract EIP712 is Initializable, OwnableUpgradeable {
    struct Account {
        string name;
        uint256 amount;
    }

    bytes32 public constant ACCOUNT_TYPEHASH =
        keccak256("Account(string name,uint256 amount)");
    bytes32 public constant DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );
    string public constant name = "EIP712";

    bytes32 public DOMAIN_SEPARATOR;
    string public version;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address initialOwner,
        uint256 chainId,
        string memory version_
    ) public initializer {
        __Ownable_init(initialOwner);
        version = version_;
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                DOMAIN_TYPEHASH,
                keccak256(bytes(name)),
                keccak256(bytes(version)),
                chainId,
                address(this)
            )
        );
    }

    function hashStruct(Account memory account) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    ACCOUNT_TYPEHASH,
                    keccak256(bytes(account.name)),
                    account.amount
                )
            );
    }

    function recoverSigner(
        Account memory account,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view returns (address) {
        bytes32 hash = hashStruct(account);
        bytes32 hash2 = keccak256(
            abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hash)
        );
        return ecrecover(hash2, v, r, s);
    }
}
