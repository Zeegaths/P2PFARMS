'use client'

import React from 'react';
import SidebarWithHeader from '../Sidebar'; // Sidebar component for the sidebar content
import { Box, Avatar, Text, VStack, Flex, Heading, Button, useDisclosure } from '@chakra-ui/react';
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

  const { isOpen, onOpen, onClose } = useDisclosure();  // Use Chakra UI's useDisclosure hook for the mobile drawer state

  return (
    <Flex minH="100vh" bg="rgba(0,255,0,0.1)" backdropFilter="blur(10px)">
      {/* Sidebar (hidden on small screens, visible on md and up) */}
      <Box 
        display={{ base: 'none', md: 'block' }} // Hide sidebar on mobile, show on md and above
        width={{ base: 'full', md: '250px' }} 
        bg="rgba(0, 0, 0, 0.1)" 
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
          <Heading textAlign="center" fontWeight="bold" color="green.500">
            User Settings
          </Heading>

          {/* User Profile Section */}
          <Flex direction="column" align="center" justify="center" w="full" bg="black" p={6} borderRadius="md" boxShadow="lg">
            <Avatar src={userProfile.profilePic} size="2xl" mb={4} />
            <Text fontSize="xl" fontWeight="bold" color="green.500">{userProfile.name}</Text>
            <Text fontSize="lg" color="gray.500">{userProfile.userType}</Text>

            {/* Display reward for Farmer */}
            {userProfile.userType === "Farmer" && (
              <Text fontSize="md" color="yellow.400">Reward: {userProfile.reward} Farmers coins</Text>
            )}

            <Button 
              colorScheme="green"
              mt={4}
              onClick={() => navigate('/profile')}  // Example navigation
            >
              Edit Profile
            </Button>
          </Flex>

          {/* User Preferences Section */}
          <Box w="full" bg="black" p={6} borderRadius="md" boxShadow="lg">
            <Heading size="md" color="white" mb={4}>Preferences</Heading>
            <Button colorScheme="green" w="full" mb={2}>Change Password</Button>
            <Button colorScheme="yellow" w="full">Sign Out</Button>
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
