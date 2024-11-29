'use client';

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Nav from './Navbar';
import { useState } from 'react';
import { idlFactory, canisterId } from '../../../declarations/backend';
import { useAuthClient } from '../../src/index';
import { useNavigate } from 'react-router-dom';
import SimpleThreeColumns from './Features';
import BasicStatistics from './Stats';
import SmallWithSocial from './Footer';
import { createBackendActor, getIdentityProvider } from '../helper/auth';
import { authActions, useAuth } from '../lib/AuthContext';

// Import the scroll animation function
import getScrollAnimation from '../styles/getScrollAnimation';

const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);
const MotionButton = motion(Button);

const Illustration = () => {
  const scrollAnimation = getScrollAnimation();

  return (
    <motion.img
      src="/farmer1.jpg"
      alt="Illustration"
      initial={scrollAnimation.offscreen}
      whileInView={scrollAnimation.onscreen()}
      viewport={{ once: true, amount: 0.5 }}
      style={{
        width: '100%',
        height: 'auto',
        maxHeight: '80vh',
        objectFit: 'contain',
        borderRadius: '10px',
      }}
    />
  );
};

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  const identityProvider = getIdentityProvider();
  const { dispatch } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const scrollAnimation = getScrollAnimation();

  const { isAuthenticated, login, logout, identity } = useAuthClient({
    loginOptions: {
      identityProvider,
    },
    actorOptions: {
      canisterId,
      idlFactory,
    },
  });

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await login();
      if (isAuthenticated) {
        const backend = await createBackendActor(identity);
        const result = await backend.getProfile(identity.getPrincipal());
        if (result.ok) {
          dispatch(authActions.login(result.ok));
          navigate('/productlist');
        } else {
          dispatch(authActions.login(null));
          navigate('/usertype');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoggingIn(true);
      await login();
      if (isAuthenticated) {
        navigate('/usertype');
      }
    } catch (error) {
      console.error('Register failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Container
      maxW={'full'}
      px={40}
      py={5}
      bg="rgba(0,255,0,0.1)"
      backdropFilter="blur(10px)"
    >
      <Nav />
      <MotionStack
        initial={scrollAnimation.offscreen}
        whileInView={scrollAnimation.onscreen()}
        viewport={{ once: true, amount: 0.5 }}
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        {/* Main Content */}
        <MotionFlex
          initial={scrollAnimation.offscreen}
          whileInView={scrollAnimation.onscreen({ duration: 0.6, delay: 0.2 })}
          viewport={{ once: true, amount: 0.3 }}
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          w="full"
        >
          {/* Left Side */}
          <MotionFlex
            direction="column"
            align="flex-start"
            flex="1"
            mt={2}
            initial={scrollAnimation.offscreen}
            whileInView={scrollAnimation.onscreen()}
            viewport={{ once: true, amount: 0.3 }}
          >
            <MotionHeading
              fontWeight={600}
              fontSize={{ base: '5xl', sm: '5xl', md: '8xl' }}
              lineHeight={'110%'}
            >
              P2P{' '}
              <MotionText as={'span'} color={'green.400'}>
                Farmers
              </MotionText>
            </MotionHeading>
            <MotionText
              maxW={'4xl'}
              mt={4}
              textAlign="left"
              fontSize={{ base: '2xl', sm: '2xl', md: '2xl' }}
            >
              Our platform connects farmers to global markets, ensuring fair
              compensation for sustainable farming. By cutting out middlemen,
              farmers can directly access international markets, delivering
              top-quality produce while supporting eco-friendly practices.
              Enjoy the best meals, sourced sustainably.
            </MotionText>
            <Stack spacing={24} direction={'row'} mt={10}>
              <MotionButton
                rounded={'full'}
                px={10}
                bg={'green.400'}
                _hover={{ bg: 'green.500' }}
                whileHover={{ scale: 1.05 }}
                onClick={handleLogin}
                isLoading={isLoggingIn}
              >
                Login
              </MotionButton>
              <MotionButton
                rounded={'full'}
                px={8}
                bg={'yellow.400'}
                textColor={'black'}
                _hover={{ bg: 'yellow.500' }}
                whileHover={{ scale: 1.05 }}
                onClick={handleRegister}
                isLoading={isLoggingIn}
              >
                Register
              </MotionButton>
            </Stack>
          </MotionFlex>

          {/* Right Side */}
          <MotionFlex flex="1" justify="center" align="center" mt={{ base: 6, md: 0 }}>
            <Illustration />
          </MotionFlex>
        </MotionFlex>
      </MotionStack>

      {/* Statistics and Features */}
      <BasicStatistics />
      <SimpleThreeColumns />

      {/* Are you a Farmer Section */}
      <MotionStack
        align={'center'}
        textAlign={'center'}
        spacing={6}
        py={{ base: 16, md: 24 }}
        bg="rgba(0, 255, 0, 0.1)"
        borderRadius="lg"
        shadow="md"
        p={8}
        mt={10}
      >
        <MotionHeading fontWeight={700} fontSize={{ base: '2xl', md: '4xl' }}>
          Are you a Farmer?
        </MotionHeading>
        <MotionText fontSize={'lg'} maxW={'2xl'}>
          Join our platform to connect directly with international markets or find local
          agents who can assist you.
        </MotionText>
        <Button
          rounded={'full'}
          px={6}
          bg={'green.400'}
          color={'white'}
          _hover={{ bg: 'green.500' }}
          onClick={() => window.open('https://maps.google.com', '_blank')}
        >
          Find an Agent Near You
        </Button>
      </MotionStack>

      {/* Footer */}
      <SmallWithSocial />
    </Container>
  );
}
