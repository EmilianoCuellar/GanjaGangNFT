import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

const About = () => {
  const [visibleIndex, setVisibleIndex] = useState(0); // To track which image is currently visible

  const handleScroll = () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const imageOffsets = [0, windowHeight, 2 * windowHeight]; // Add more offsets for additional images
    let newIndex = 0;

    for (let i = 0; i < imageOffsets.length; i++) {
      if (scrolled >= imageOffsets[i]) {
        newIndex = i;
      }
    }

    setVisibleIndex(newIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* First background image */}
      <div
        
      >
    <Text fontSize="15px" color="white" textAlign="center">
    About Ganja Gang: NFT Collection Bridging the Cannabis Industry with Web3

Welcome to Ganja Gang, a revolutionary NFT collection that's blazing a trail in the intersection of the cannabis industry and the decentralized world of Web3. Our mission is to cultivate a vibrant and inclusive community that embraces the spirit of innovation, creativity, and collaboration. Through strategic partnerships, immersive metaverse experiences, and cutting-edge Web3 applications, we're redefining the future of cannabis and blockchain integration.

Empowering the Cannabis Industry in the Metaverse:
Ganja Gang isn't just a collection of NFTs; it's a movement. We're partnering with influential artists and industry leaders who share our vision of reshaping the cannabis narrative in the digital realm. By harnessing the power of NFTs, we're bringing cannabis culture to life in unprecedented ways. From virtual events and gatherings to interactive art showcases, Ganja Gang is your passport to a dynamic metaverse where imagination knows no bounds.

Innovative Web3 Applications to Overcome Industry Challenges:
The cannabis industry faces its fair share of challenges, and Ganja Gang is here to spark change. Our utilization of Web3 applications is aimed at addressing these hurdles head-on. By leveraging blockchain technology, we're enhancing transparency, traceability, and accountability throughout the entire cannabis supply chain. From seed to sale, Ganja Gang is sowing the seeds of transformation.

Introducing DazedCoin: Your Gateway to the Future:
At the heart of Ganja Gang lies DazedCoin, our proprietary cryptocurrency built on a green blockchain. DazedCoin isn't just a token; it's a lifestyle. Holding DazedCoin opens doors to a world of exclusive opportunities and benefits within our community. From curated NFT airdrops and limited-edition merchandise to VIP meetups and access to our metaverse store and lounge, DazedCoin holders are at the forefront of a groundbreaking movement.

Unveiling a Future of Possibilities:
By joining Ganja Gang, you're becoming part of a pioneering movement that merges the cannabis industry with the limitless potential of Web3. As a holder of our unique NFTs, you're not only gaining ownership of digital masterpieces, but you're also becoming an integral part of a thriving ecosystem. Get ready to collaborate with the best in the industry, explore the metaverse like never before, and seize the opportunity to shape the evolution of cannabis culture.

Experience the Future, Today:
Ganja Gang invites you to embark on a journey that transcends boundaries, defies conventions, and reimagines the synergy between cannabis and Web3. Together, we're cultivating a new era of innovation, empowerment, and community. Join us and be among the first to hold DazedCoin, unlocking a world of possibilities that await within the Ganja Gang universe.

Light up your digital horizons with Ganja Gang – where art, technology, and cannabis converge.

  </Text>
      </div>

      <div
        style={{
          backgroundImage: 'url(/assets 2/background/Dazed Web3 Roadmap.png)',
          // ...other styles
          display: visibleIndex === 1 ? 'block' : 'none',
        }}
      >
      </div>
    </div>
  );
};

export default About;
