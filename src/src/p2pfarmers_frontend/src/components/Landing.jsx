"use client";

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { img } from "framer-motion/client";
import Nav from "./Navbar";
import { useState } from "react";
import { idlFactory, canisterId } from "../../../declarations/backend";
import { useAuthClient } from "../../src/index";
import { useNavigate } from "react-router-dom";
import SimpleThreeColumns from "./Features";
import BasicStatistics from "./Stats";
import SmallWithSocial from "./Footer";
import ScrollAnimationWrapper from "../styles/ScrollAnimationWrapper";
import getScrollAnimation from "../styles/getScrollAnimation";
import { createBackendActor, getIdentityProvider } from "../helper/auth";
import { authActions, useAuth } from "../lib/AuthContext";

const Illustration = (props) => {
  return (
    <img
      src="/farmer1.jpg"
      alt="Illustration"
      style={{
        width: "100%", // Makes the image take up the full width of the container
        height: "auto", // Maintains the aspect ratio of the image
        maxHeight: "80vh", // Limits the height to 60% of the viewport height
        objectFit: "contain",
        borderRadius: "10px",
        // animation: 'bounce 2s ease-in-out infinite'
      }}
    />
  );
};

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  const [processK, setProcess] = useState(0);
  const identityProvider = getIdentityProvider();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { dispatch } = useAuth();

  const handleSuccess = async () => {
    const backend = await createBackendActor(identity);
    const result = await backend.getProfile(identity.getPrincipal());
    if (processK === 1) {
      let profile = null;
      if (result.err === undefined) {
        profile = result.ok;
      }
      dispatch(authActions.login(profile));
      navigate("/productlist"); // Navigate to product list after successful login
    } else {
      if (result.ok !== undefined) {
        dispatch(authActions.login(result.ok));
        navigate("/productlist");
        return;
      }
      dispatch(authActions.login(null));
      navigate("/usertype");
    }
  };

  const { isAuthenticated, login, logout, identity } = useAuthClient({
    loginOptions: {
      identityProvider,
      onSuccess: (data) => {
        console.log(data);
        handleSuccess();
      },
      onError: (error) => {
        console.error(error);
        setIsLoggingIn(false);
        console.error("Login failed:", error);
      },
    },
    actorOptions: {
      canisterId,
      idlFactory,
    },
  });

  // Handle login success and navigate to product list
  const handleLogin = async () => {
    setProcess(1);
    setIsLoggingIn(true);
    await login();
  };
  const handleRegister = async () => {
    setProcess(2);
    setIsLoggingIn(true);
    await login();
  };

  return (
    <ScrollAnimationWrapper>
      <Container
        maxW={"full"}
        px={40}
        py={5}
        bg="rgba(0,255,0,0.1)"
        backdropFilter="blur(10px)"
      >
        <Nav />
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            w="full"
          >
            {/* Left side - Heading and Intro (2/3 width) */}
            <Flex direction="column" align="flex-start" flex="2" mt={2}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "5xl", sm: "5xl", md: "8xl" }}
                lineHeight={"110%"}
              >
                P2P{" "}
                <Text as={"span"} color={"green.400"}>
                  Farmers
                </Text>
              </Heading>
              <Text
                maxW={"4xl"}
                mt={4}
                textAlign="left"
                fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
              >
                Our platform connects farmers to global markets, ensuring fair
                compensation for sustainable farming. By cutting out middlemen,
                farmers can directly access international markets, delivering
                top-quality produce while supporting eco-friendly practices.
                Enjoy the best meals, sourced sustainably.
              </Text>
              <Stack spacing={24} direction={"row"} mt={10}>
                <Button
                  rounded={"full"}
                  px={10}
                  colorScheme={"orange"}
                  bg={"green.400"}
                  _hover={{ bg: "green.500" }}
                  onClick={handleLogin}
                  isLoading={isLoggingIn && processK === 1}
                >
                  Login
                </Button>

                <Button
                  rounded={"full"}
                  px={8}
                  bg={"yellow.400"}
                  textColor={"black"}
                  _hover={{ bg: "green.500" }}
                  onClick={handleRegister}
                  isLoading={isLoggingIn && processK === 2}
                >
                  Register
                </Button>
              </Stack>
            </Flex>

            {/* Right side - Image (1/3 width) */}
            <Flex
              flex="1"
              justify="center"
              align="center"
              mt={{ base: 6, md: 0 }}
            >
              <Illustration />
            </Flex>
          </Flex>
        </Stack>
        <BasicStatistics />

        <SimpleThreeColumns />
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Access all food{" "}
            <Text as={"span"} color={"green.400"}>
              across the globe
            </Text>
          </Heading>
          <Stack spacing={6} direction={"row"}></Stack>
          <Flex w={"full"} justify="center">
            <img src="/HugeGlobal.svg" alt="" />
          </Flex>
        </Stack>
        <SmallWithSocial />
      </Container>
    </ScrollAnimationWrapper>
  );
}
