import React, { useState } from 'react';
import { Box, Button, Text, VStack, Flex, Image, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import SidebarWithHeader from '../Sidebar';

const Favorites = () => {
  // Sample favorited posts
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      text: "Harvesting my first organic pepper. It's been a great journey!",
      userName: "Farmer John",
      datePosted: "2024-11-10 12:00",
      profilePic: '/farmer1.jpg',
      image: '/pepper.jpg', // Image for the post
      favorites: 10,
    },
    {
      id: 2,
      text: "Experimenting with new irrigation systems, hoping to improve water efficiency.",
      userName: "Farmer Emily",
      datePosted: "2024-11-09 09:30",
      profilePic: '/farmer2.jpg',
      image: '/cabbage.jpg', // Image for the post
      favorites: 8,
    },
  ]);

  // Dynamic colors
  const bgColor = useColorModeValue('white', 'black');
  const sectionBgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const buttonBg = useColorModeValue('gray.200', 'gray.700');
  const buttonHoverBg = useColorModeValue('gray.300', 'gray.600');

  return (
    <Flex minH="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '0px' }} bg={bgColor} flexShrink={0}>
        <SidebarWithHeader />
      </Box>

      {/* Main content */}
      <Box flex="1" p={8} overflowY="auto">
        <VStack
          align="center"
          spacing={8}
          maxW="800px"
          mx="auto"
          p={8}
          borderRadius="lg"
          boxShadow="md"
          bg={sectionBgColor}
        >
          <Text textAlign="center" fontWeight="bold" fontSize="4xl" color={textColor}>
            Your Favorited Posts
          </Text>

          {/* Displaying favorited posts */}
          <VStack w="full" spacing={4}>
            {favorites.map((post) => (
              <Box
                key={post.id}
                w="full"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg={sectionBgColor}
                boxShadow="md"
                borderColor={borderColor}
              >
                <Flex align="center" mb={2}>
                  <Box
                    bgImage={`url(${post.profilePic})`}
                    bgSize="cover"
                    bgPosition="center"
                    w="30px"
                    h="30px"
                    borderRadius="full"
                    mr={3}
                  />
                  <Text fontWeight="bold" color={textColor}>{post.userName}</Text>
                  <Text fontSize="sm" color={secondaryTextColor} ml={2}>
                    {post.datePosted}
                  </Text>
                </Flex>
                <Text color={textColor} fontSize="md">{post.text}</Text>
                {post.image && (
                  <Box mt={2}>
                    <Image src={post.image} alt="Post Image" boxSize="100%" objectFit="cover" />
                  </Box>
                )}
                <Flex justify="flex-end" mt={4}>
                  <Button
                    leftIcon={<FaHeart />}
                    bg={buttonBg}
                    color={textColor}
                    _hover={{ bg: buttonHoverBg }}
                    isDisabled
                  >
                    {post.favorites} Favorites
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Favorites;
