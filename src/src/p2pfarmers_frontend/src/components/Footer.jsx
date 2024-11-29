'use client'

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Button,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa'
import ScrollAnimationWrapper from '../styles/ScrollAnimationWrapper'
import { ReactNode } from 'react'

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue('')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2024 P2P Farms. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'https://twitter.com'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Discord'} href={'https://discord.com'}>
            <FaDiscord />
          </SocialButton>
          <SocialButton label={'Telegram'} href={'https://telegram.org'}>
            <FaTelegram />
          </SocialButton>
        </Stack>
        <Button
          colorScheme="green"
          variant="solid"
          size="lg"
          mt={4}
          onClick={() => window.location.href = '#learn-more'}>
          Learn More
        </Button>
      </Container>
    </Box>
  )
}
