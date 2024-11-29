'use client'

import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Image,
  Text,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import SimpleSidebar from '../Sidebar';

const OrderStatus = () => {
  const [orderStatus] = useState('Order Placed'); // Removed next state management
  const steps = [
    { name: 'Order Placed', completed: ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'].includes(orderStatus) },
    { name: 'Confirmed', completed: ['Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'].includes(orderStatus) },
    { name: 'Shipped', completed: ['Shipped', 'Out for Delivery', 'Delivered'].includes(orderStatus) },
    { name: 'Out for Delivery', completed: ['Out for Delivery', 'Delivered'].includes(orderStatus) },
    { name: 'Delivered', completed: orderStatus === 'Delivered' },
  ];

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const tagColorScheme = useColorModeValue('blackAlpha', 'whiteAlpha');

  return (
    <Flex direction="row" minH="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box display={{ base: 'none', md: 'block' }} w="250px">
        <SimpleSidebar />
      </Box>

      <Box
        flex="1"
        borderWidth="1px"
        rounded="lg"
        shadow="md"
        maxWidth={800}
        p={6}
        m="10px auto"
        bg={bgColor}
      >
        <Heading w="100%" textAlign="center" fontWeight="normal" mb="5%" color="green.400">
          Order Status
        </Heading>

        {/* Steps */}
        <HStack spacing={4} justify="center" mb="6">
          {steps.map((step, index) => (
            <Tag
              key={index}
              size="lg"
              colorScheme={step.completed ? 'green' : tagColorScheme}
              variant="solid"
              borderRadius="full"
              px={4}
              py={2}
              fontWeight="bold"
              display="flex"
              alignItems="center"
            >
              <TagLeftIcon
                as={FaCheckCircle}
                color={step.completed ? 'green.400' : 'gray.400'}
                mr={2}
              />
              <TagLabel>{step.name}</TagLabel>
            </Tag>
          ))}
        </HStack>

        <Text textAlign="center" mb="4" fontSize="lg">
          Current Status: <strong>{orderStatus}</strong>
        </Text>

        {/* Order Products */}
        <Box mt={6}>
          <Heading size="md" mb={4} textAlign="center" color="green.400">
            Order Summary
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {/* Product 1 */}
            <Box>
              <Image src="cabbage.jpg" alt="Product 1" mb={4} />
              <Text textAlign="center" fontSize="lg" fontWeight="bold">Product 1</Text>
              <Text textAlign="center" fontSize="md">Price: $20.00</Text>
              <Text textAlign="center" fontSize="md" color="green.500">Total: $20.00</Text>
            </Box>

            {/* Product 2 */}
            <Box>
              <Image src="./pepper.jpg" alt="Product 2" mb={4} />
              <Text textAlign="center" fontSize="lg" fontWeight="bold">Product 2</Text>
              <Text textAlign="center" fontSize="md">Price: $15.00</Text>
              <Text textAlign="center" fontSize="md" color="green.500">Total: $15.00</Text>
            </Box>

            {/* Product 3 */}
            <Box>
              <Image src="cabbage.jpg" alt="Product 3" mb={4} />
              <Text textAlign="center" fontSize="lg" fontWeight="bold">Product 3</Text>
              <Text textAlign="center" fontSize="md">Price: $10.00</Text>
              <Text textAlign="center" fontSize="md" color="green.500">Total: $10.00</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default OrderStatus;
