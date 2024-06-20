import React from 'react';
import { Box, Button, Flex, Image, Link, } from '@chakra-ui/react';
import Instagram from "./assets 2/social-media-icons/instagram.png";
import Twitter from "./assets 2/social-media-icons/twitter.png";
import Discord from "./assets 2/social-media-icons/discord.png";
import Email from "./assets 2/social-media-icons/email.png";

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/* Left Side - Social Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.instagram.com">
                    <Image src={Instagram} boxSize="24px" margin="0 25px" />
                </Link>
                <Link href="https://twitter.com/ganjagangNFT">
                    <Image src={Twitter} boxSize="24px" margin="0 25px" />
                </Link>
                <Link href="https://discord.gg/SjXehVVnMP">
                    <Image src={Discord} boxSize="24px" margin="0 25px" />
                </Link>
                <Link href="mailto:dazedweb3@gmail.com">
                    <Image src={Email} boxSize="24px" margin="0 25px" />
                </Link>
            </Flex>

                {/* Connect Wallet */}
                {isConnected ? (
                    <Box margin="0 15px" 
                    backgroundColor="HotPink"
                        borderRadius="8px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                    >
                        Connected
                    </Box>
                ) : (
                    <Button
                        backgroundColor="HotPink"
                        borderRadius="8px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="Bebas Neue"
                        fontSize="15px"
                        padding="10px"
                        margin="0 15px"
                        onClick={connectAccount}
                    >
                        Connect Wallet
                    </Button>
                )}
            </Flex>
    );
};

export default NavBar;
