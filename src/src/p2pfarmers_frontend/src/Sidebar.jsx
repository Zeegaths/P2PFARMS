'use client'

import React from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  useColorMode,
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
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const LinkItems = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Shop', icon: FaCartArrowDown, path: '/productlist' },
  { name: 'Feed', icon: FiCompass, path: '/explore' },
  { name: 'Favourites', icon: FiStar, path: '/favorites' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

export default function SimpleSidebar() {
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
      {/* Mobile nav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      bg={useColorModeValue('white', 'black')} // Background changes with mode
      color={useColorModeValue('black', 'white')} // Text changes with mode
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex
        align="center"
        justify="space-between"
        px={4}
        mt={4}
        mb={6}
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={useColorModeValue('black', 'white')} // Text color for dark mode
        >
          P2P Farmers
        </Text>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle dark mode"
          bg="transparent"
          _hover={{
            bg: useColorModeValue('gray.100', 'gray.600'),
          }}
        />
      </Flex>

      <CloseButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onClose}
        color={useColorModeValue('black', 'white')} // Close button matches text color
      />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}

      {/* Agent button at the bottom */}
      <NavItem icon={FiUserPlus} path="/farmerslist">
        Agent
      </NavItem>
      <NavItem icon={FiUserPlus} path="/agentslist">
        Admin
      </NavItem>
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
        bg={useColorModeValue('white', 'black')} // Background for light/dark mode
        color={useColorModeValue('black', 'white')} // Text color
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'), // Hover background changes
          color: useColorModeValue('black', 'white'), // Hover text color
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={useColorModeValue('black', 'white')} // Icon color matches text
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
      color={useColorModeValue('black', 'white')} // Icon color for dark mode
      display={{ base: 'flex', md: 'none' }} // Hide on large screens
    />
  )
}
