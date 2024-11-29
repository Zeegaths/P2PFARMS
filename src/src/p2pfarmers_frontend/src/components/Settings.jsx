'use client'

import React from 'react';
import SidebarWithHeader from '../Sidebar'; // Sidebar component for the sidebar content
import { Box, Avatar, Text, VStack, Flex, Heading, Button, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Settings = () => {
  // Placeholder data for the farmer profile
  const userProfile = {
    name: "Esther Murimi",
    userType: "Farmer",
    profilePic: '/farmer1.jpg', // URL for the profile picture
    reward: 50, // Reward for farmers (can be updated dynamically)
  };

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure(); // Use Chakra UI's useDisclosure hook for the mobile drawer state

  // Dynamic colors based on mode
  const bgColor = useColorModeValue('white', 'black');
  const sectionBgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const buttonBg = useColorModeValue('gray.200', 'gray.700');
  const buttonHoverBg = useColorModeValue('gray.300', 'gray.600');

  return (
    <Flex minH="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar (hidden on small screens, visible on md and up) */}
      <Box
        display={{ base: 'none', md: 'block' }} // Hide sidebar on mobile, show on md and above
        width={{ base: 'full', md: '250px' }}
        bg={bgColor}
        flexShrink={0}
      >
        <SidebarWithHeader />
      </Box>

      {/* Main content */}
      <Box
        flex="1"
        p={4}
        overflowY="auto"
        maxW="900px" // Set the width of the main content to 900px
        mx="auto" // Center the content
      >
        <VStack spacing={6} align="center">
          <Heading textAlign="center" fontWeight="bold" color={textColor}>
            User Settings
          </Heading>

          {/* User Profile Section */}
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="full"
            bg={sectionBgColor}
            p={6}
            borderRadius="md"
            boxShadow="lg"
          >
            <Avatar src={userProfile.profilePic} size="2xl" mb={4} />
            <Text fontSize="xl" fontWeight="bold" color={textColor}>{userProfile.name}</Text>
            <Text fontSize="lg" color={secondaryTextColor}>{userProfile.userType}</Text>

            {/* Display reward for Farmer */}
            {userProfile.userType === "Farmer" && (
              <Text fontSize="md" color={secondaryTextColor}>
                Reward: {userProfile.reward} Farmers coins
              </Text>
            )}

            <Button
              bg={buttonBg}
              color={textColor}
              _hover={{ bg: buttonHoverBg }}
              mt={4}
              onClick={() => navigate('/profile')} // Example navigation
            >
              Edit Profile
            </Button>
          </Flex>

          {/* User Preferences Section */}
          <Box w="full" bg={sectionBgColor} p={6} borderRadius="md" boxShadow="lg">
            <Heading size="md" color={textColor} mb={4}>Preferences</Heading>
            <Button
              bg={buttonBg}
              color={textColor}
              _hover={{ bg: buttonHoverBg }}
              w="full"
              mb={2}
            >
              Change Password
            </Button>
            <Button
              bg={buttonBg}
              color={textColor}
              _hover={{ bg: buttonHoverBg }}
              w="full"
            >
              Sign Out
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* Mobile sidebar (hamburger menu) */}
      <Box display={{ base: 'block', md: 'none' }} flexShrink={0}>
        {/* Trigger the sidebar as a drawer for mobile */}
        <SidebarWithHeader onOpen={onOpen} />
      </Box>
    </Flex>
  );
};

export default Settings;
