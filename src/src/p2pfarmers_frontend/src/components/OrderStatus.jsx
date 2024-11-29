'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  FormHelperText,
  useToast,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Image,
  Text
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import SimpleSidebar from '../Sidebar'

const OrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState("Order Placed");
  const [progress, setProgress] = useState(20);
  const toast = useToast();

  const steps = [
    { name: "Order Placed", completed: orderStatus === "Order Placed" || orderStatus === "Confirmed" || orderStatus === "Shipped" || orderStatus === "Out for Delivery" || orderStatus === "Delivered" },
    { name: "Confirmed", completed: orderStatus === "Confirmed" || orderStatus === "Shipped" || orderStatus === "Out for Delivery" || orderStatus === "Delivered" },
    { name: "Shipped", completed: orderStatus === "Shipped" || orderStatus === "Out for Delivery" || orderStatus === "Delivered" },
    { name: "Out for Delivery", completed: orderStatus === "Out for Delivery" || orderStatus === "Delivered" },
    { name: "Delivered", completed: orderStatus === "Delivered" },
  ];

  const handleNextStatus = () => {
    switch (orderStatus) {
      case "Order Placed":
        setOrderStatus("Confirmed");
        setProgress(40);
        break;
      case "Confirmed":
        setOrderStatus("Shipped");
        setProgress(60);
        break;
      case "Shipped":
        setOrderStatus("Out for Delivery");
        setProgress(80);
        break;
      case "Out for Delivery":
        setOrderStatus("Delivered");
        setProgress(100);
        break;
      case "Delivered":
        toast({
          title: "Order Delivered",
          description: "Your order has been successfully delivered.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        break;
      default:
        setOrderStatus("Order Placed");
        setProgress(20);
    }
  };

  return (
    <Flex direction="row" minH="100vh" bg="rgba(0, 255, 0, 0.1)">
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
        as="form"
        bg="white"
        color="black"
      >
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="5%" color="yellow.400">
          Order Status
        </Heading>

        {/* Steps */}
        <HStack spacing={4} justify="center" mb="6">
          {steps.map((step, index) => (
            <Tag
              key={index}
              size="lg"
              colorScheme={step.completed ? 'green' : 'gray'}
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
        <Box mt={6} p={4} borderWidth="1px" rounded="lg" boxShadow="md" bg="rgba(0, 255, 0, 0.1)">
          <Heading size="md" mb={4} textAlign="center" color="yellow.400">
            Order Summary
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {/* Product 1 */}
            <Box borderWidth="1px" p={4} rounded="lg" bg="white">
              <Image src="https://via.placeholder.com/150" alt="Product 1" mb={4} />
              <Text textAlign="center" fontSize="lg" fontWeight="bold">Product 1</Text>
              <Text textAlign="center" fontSize="md">Price: $20.00</Text>
              <Text textAlign="center" fontSize="md" color="green.500">Total: $20.00</Text>
            </Box>

            {/* Product 2 */}
            <Box borderWidth="1px" p={4} rounded="lg" bg="white">
              <Image src="https://via.placeholder.com/150" alt="Product 2" mb={4} />
              <Text textAlign="center" fontSize="lg" fontWeight="bold">Product 2</Text>
              <Text textAlign="center" fontSize="md">Price: $15.00</Text>
              <Text textAlign="center" fontSize="md" color="green.500">Total: $15.00</Text>
            </Box>

            {/* Product 3 */}
            <Box borderWidth="1px" p={4} rounded="lg" bg="white">
              <Image src="https://via.placeholder.com/150" alt="Product 3" mb={4} />
              <Text textAlign="center" fontSize="lg" fontWeight="bold">Product 3</Text>
              <Text textAlign="center" fontSize="md">Price: $10.00</Text>
              <Text textAlign="center" fontSize="md" color="green.500">Total: $10.00</Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Next Button */}
        <Flex justify="center" mt="6">
          <Button
            onClick={handleNextStatus}
            colorScheme="green"
            variant="solid"
            w="7rem"
            disabled={orderStatus === "Delivered"}
          >
            {orderStatus === "Delivered" ? "Completed" : "Next"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default OrderStatus;
