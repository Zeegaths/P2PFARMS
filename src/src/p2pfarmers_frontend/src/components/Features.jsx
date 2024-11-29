'use client';

import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  Flex,
  Img,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import ScrollAnimationWrapper from '../styles/ScrollAnimationWrapper';

const Feature = ({ title, text, image }) => {
  // Dynamic colors for light and dark modes
  const bg = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)');
  const shadow = useColorModeValue(
    '0 4px 30px rgba(0, 128, 0, 0.6)', // Darker green shadow in light mode
    '0 4px 30px rgba(255, 255, 255, 0.2)' // White shadow in dark mode
  );
  const textColor = useColorModeValue('gray.800', 'white.600');
  const titleColor = useColorModeValue('green.500', 'yellow.400');

  return (
    <Stack
      spacing={4}
      bg={bg} // Glass background
      backdropFilter="blur(10px)" // Adds the blur effect
      borderRadius="20px"
      boxShadow={shadow} // Dynamic shadow
      p={6}
      align="center"
    >
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={useColorModeValue('gray.200', 'gray.800')}
        mb={4}
        overflow="hidden" // Ensures the image fits the rounded shape
      >
        <Img
          src={image}
          alt={title}
          boxSize="full"
          objectFit="cover" // Adjust to cover the full container
        />
      </Flex>
      <Text fontWeight={600} color={titleColor} textAlign="center">
        {title}
      </Text>
      <Text color={textColor} textAlign="center">
        {text}
      </Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  // Heading colors for light and dark modes
  const headingColor = useColorModeValue('green.500', 'green.400');

  return (
    <ScrollAnimationWrapper>
      <Box p={6}>
        <Heading
          color={headingColor}
          as="h2"
          size="lg"
          mb={6}
          textAlign="center"
          fontSize={{ base: '2xl', sm: '3xl', md: '7xl' }}
        >
          What We Offer
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            title={'Global Access'}
            text={
              'Connect with farmers from all over the world and purchase fresh produce directly from the source, ensuring quality and sustainability.'
            }
            image="/food2.png"
          />
          <Feature
            title={'Fair Pricing'}
            text={
              'Support farmers by paying fair prices for their products. Our platform ensures transparency and fairness in every transaction. Agents and products are thoroughly tested.'
            }
            image="/onion.jpg"
          />
          <Feature
            title={'DHL Delivery'}
            text={
              'Enjoy reliable and fast delivery of your food purchases through our partnership with DHL, bringing farm-fresh products directly to your door.'
            }
            image="/pepper.jpg"
          />
        </SimpleGrid>
      </Box>
    </ScrollAnimationWrapper>
  );
}
