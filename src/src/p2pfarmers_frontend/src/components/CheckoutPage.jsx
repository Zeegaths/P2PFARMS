'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cart] = useState([
    { id: 1, name: 'Product 1', price: 20, image: 'cabbage.jpg' },
    { id: 2, name: 'Product 2', price: 15, image: './pepper.jpg' },
    { id: 3, name: 'Product 3', price: 10, image: 'cabbage.jpg' },
  ]);

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const toast = useToast();
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate payment process
    toast({
      title: 'Payment Successful',
      description: `You have successfully paid $${total.toFixed(2)} using CKUSD.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/orderstatus'); // Redirect to the order status page
  };

  return (
    <Flex direction="row" minH="100vh" bg={bgColor} color={textColor}>
      <Box flex="1" p={6} m="10px auto" maxWidth={800}>
        <Heading w="100%" textAlign="center" fontWeight="normal" mb="5%" color="green.400">
          Checkout
        </Heading>

        {/* Cart Summary */}
        <Box mt={6}>
          <Heading size="md" mb={4} textAlign="center" color="green.400">
            Your Cart
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {cart.map((item) => (
              <Box key={item.id} textAlign="center" p={4} borderWidth="1px" rounded="lg" bg={bgColor}>
                <Image src={item.image} alt={item.name} mb={4} />
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <Text fontSize="md">Price: ${item.price.toFixed(2)}</Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Total */}
          <VStack mt={8}>
            <Text fontSize="lg" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Text>
            <Button colorScheme="green" onClick={handlePayment}>
              Pay with CKUSD
            </Button>
          </VStack>
        </Box>

        {/* View Orders Button */}
        <Flex justify="center" mt={8}>
          <Button colorScheme="green" variant="outline" onClick={() => navigate('/orderstatus')}>
            View Orders
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CheckoutPage;
