// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721, Ownable {
    
    using Strings for uint256;

    // Maximum number of tokens that can ever exist
    uint public constant MAX_TOKENS = 4200;
    
    // Number of tokens reserved initially
    uint private constant TOKENS_RESERVED = 4;
    
    // Price per token in wei
    uint public price = 80000000000000000;
    
    // Maximum number of tokens that can be minted per transaction
    uint256 public constant MAX_MINT_PER_TX = 10;

    // State variable to control the sale status
    bool public isSaleActive;

    // Total number of tokens minted so far
    uint256 public totalSupply;

    // Mapping to track number of tokens minted per wallet
    mapping(address => uint256) private mintedPerWallet;

    // Base URI for token metadata
    string public baseUri;
    
    // File extension for token URIs
    string public baseExtension = ".json";

    constructor() ERC721("Ganja Gang", "DW3") {
        // Initial base URI for token metadata stored on IPFS
        baseUri = "ipfs://bafybeih6nxuyqmrdrtewxemvvfft4bhib4uleeu7z2a7x3ujix3tkrnbta/";

        // Mint reserved tokens to contract deployer
        for(uint256 i = 1; i <= TOKENS_RESERVED; ++i) {
            _safeMint(msg.sender, i);
        }

        // Update total supply with reserved tokens
        totalSupply = TOKENS_RESERVED;
    }

    // Public function to mint NFTs
    function mint(uint256 _numTokens) external payable {
        // Ensure sale is active
        require(isSaleActive, "The sale is paused.");

        // Ensure minting within transaction limit
        require(_numTokens <= MAX_MINT_PER_TX, "You can only mint a maximum of 10 NFTs per transaction.");

        // Ensure wallet does not exceed minting limit
        require(mintedPerWallet[msg.sender] + _numTokens <= 10, "You can only mint 10 per wallet.");

        // Ensure total supply doesn't exceed maximum tokens
        uint256 curTotalSupply = totalSupply;
        require(curTotalSupply + _numTokens <= MAX_TOKENS, "MAX_TOKENS");

        // Ensure sufficient funds for minting
        require(_numTokens * price <= msg.value, "Insufficient funds. You need more ETH!");

        // Mint tokens to sender
        for(uint256 i = 1; i <= _numTokens; ++i) {
            _safeMint(msg.sender, curTotalSupply + i);
        }

        // Update minted count for sender and total supply
        mintedPerWallet[msg.sender] += _numTokens;
        totalSupply += _numTokens;
    }

    // Owner-only function to toggle sale state
    function flipSaleState() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    // Owner-only function to set base URI for token metadata
    function setBaseUri(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    // Owner-only function to set price per token
    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    // Owner-only function to withdraw contract balance
    function withdrawAll() external payable onlyOwner {
        // Calculate 100% of contract balance
        uint256 balance = address(this).balance;
        
        // Transfer 100% of balance to specified address
        uint256 balanceOne = balance * 100 / 100;
        ( bool transferOne, ) = payable(0x8922629C113eb8E04db87080Cc2006fD4f9f2e9E).call{value: balanceOne}("");
        require(transferOne, "Transfer failed.");
    }

    // Override function to return token URI
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // Ensure token exists
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
 
        // Concatenate base URI with token ID and extension
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }
 
    // Internal function to return base URI
    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }
}
