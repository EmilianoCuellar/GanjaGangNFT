import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import ganjaGangNFT from './GanjaGangNFT.json';

const ganjaGangNFTAddress = "0x0e233a2925C60D57A75b53a53BAFaB87D9f99aC3";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [mintCount, setMintCount] = useState(0); // Initialize mint count to 0
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    ganjaGangNFTAddress,
                    ganjaGangNFT.abi,
                    signer
                );

                const maxMintAmount = 10;
                if (mintAmount > maxMintAmount) {
                    console.error('Exceeds maximum mint amount');
                    return;
                }

                const mintValue = ethers.utils.parseEther((0.08 * mintAmount).toString());

                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: mintValue,
                    gasLimit: 2000000,
                });

                // Update mint count
                setMintCount(prevCount => prevCount + mintAmount);

                console.log('Minting response:', response);
            } catch (error) {
                console.error('Error while minting:', error);
            }
        } else {
            console.error('Ethereum provider not available');
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        const maxMintAmount = 10;
        if (mintAmount < maxMintAmount) {
            setMintAmount(mintAmount + 1);
        }
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="420px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" fontFamily="Bebas Neue" textShadow="0 5px #000000" textColor="white" align="center" >Ganja Gang</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="Bebas Neue"
                        textShadow="0 2px 2px #000000"
                        textColor="white" 
                        align="center"
                    >
                        The gang stays Dazed! Building on Web3 through cannabis and entertainment.
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                backgroundColor="#FF69B4"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number"
                                value={mintAmount}
                            />
                            <Button
                                backgroundColor="#FF69B4"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>

                        <Flex justify="center" align="center" marginTop="10px">\
                        <Button
                            backgroundColor="#FF69B4"
                            borderRadius="8px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="Bebas Neue"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleMint}
                        >
                            MINT NOW
                        </Button>
                        </Flex>

                        <Text
                            marginTop="20px"
                            fontSize="28px"
                            fontFamily="Bebas Neue"
                            color="#FFFFFF"
                            align="center"
                            textShadow="0 5px #000000"
                        >
                            Minted: {mintCount} / 4200
                        </Text>
                    </div>
                ) : (
                    <Text
                        marginTop="40px"
                        fontSize="25px"
                        letterSpacing="-5.5%"
                        fontFamily="Bebas Neue"
                        textShadow="0 3px #000000"
                        color="#FFFFFF"
                        align="center"
                    >
                        Connect to Mint.
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;