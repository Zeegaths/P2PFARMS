'use client'

import React from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import {
  FiHome,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiUserPlus, // For the agent icon
} from 'react-icons/fi'
import { FaCartArrowDown } from 'react-icons/fa'

// Sidebar links
const LinkItems = [
  { name: 'Farmers', icon: FiUserPlus, path: '/farmerslist' },
  { name: 'New Farmer', icon: FiUserPlus, path: '/addfarmer' },
  { name: 'Profile', icon: FiUserPlus, path: '/settings' },
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Shop', icon: FaCartArrowDown, path: '/productlist' },
  { name: 'Feed', icon: FiCompass, path: '/explore' },
  { name: 'Favourites', icon: FiStar, path: '/favorites' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

export default function AgentSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bg={useColorModeValue('white', 'black')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Main content */}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'black')} // Background dynamically changes
      color={useColorModeValue('black', 'white')} // Text color dynamically changes
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={useColorModeValue('black', 'white')} // Title text color
        textAlign="center"
        mt="4"
        mb="6">
        Agent Panel
      </Text>

      <CloseButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onClose}
        color={useColorModeValue('black', 'white')} // Close button color
      />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Box
      as="a"
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={useColorModeValue('white', 'black')} // Background matches mode
        color={useColorModeValue('black', 'white')} // Text color matches mode
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'), // Hover effect dynamically changes
          color: useColorModeValue('black', 'white'),
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={useColorModeValue('black', 'white')} // Icon color matches mode
            _groupHover={{
              color: useColorModeValue('black', 'white'), // Icon hover color
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <IconButton
      variant="outline"
      onClick={onOpen}
      aria-label="open menu"
      icon={<FiMenu />}
      color={useColorModeValue('black', 'white')} // Menu button color
      display={{ base: 'flex', md: 'none' }} // Hide on larger screens
    />
  )
}
