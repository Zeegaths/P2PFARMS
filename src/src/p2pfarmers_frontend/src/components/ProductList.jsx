import React, { useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Flex,
  IconButton,
  Tooltip,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../Sidebar';
import Simple from './Products';

function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Fresh cabbage',
      price: '$20.00/kg',
      priceInUSDC: 20,
      image: '/cabbage.jpg',
    },
    {
      id: 2,
      name: 'Nigerian Pepper',
      price: '$45.00/kg',
      priceInUSDC: 45,
      image: '/pepper.jpg',
    },
  ];

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleExpand = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };
  
  const handleTracking = () => {
    navigate('/checkout')
  }

  const handleNavigateToUpload = () => {
    navigate('/upload'); // Navigate to the upload page
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '250px' }} bg={bgColor} color={textColor} flexShrink={0} borderRightWidth="1px" borderRightColor={borderColor}>
        <SidebarWithHeader />
      </Box>

      {/* Product List */}
      <Box flex="1" p={4} overflowY="auto">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
       
          <Button
            bg="green.400"
            color="white"
            _hover={{ bg: 'green.500' }}
            onClick={handleNavigateToUpload}
          >
            Upload Product
          </Button>

          <Tooltip label="View Cart" aria-label="View Cart Tooltip">
            <IconButton
              icon={<FaShoppingCart />}
              variant="outline"
              onClick={handleTracking}
              aria-label="View Cart"
            />
          </Tooltip>
        </Flex>

        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              bg={bgColor}
              color={textColor}
              borderColor={borderColor}
              shadow="md"
            >
              <Box textAlign="center">
                <Image src={product.image} alt={product.name} boxSize="150px" objectFit="cover" mx="auto" mb={4} />
                <Text fontWeight="bold" fontSize="lg">
                  {product.name}
                </Text>
                <Text color="gray.500">{product.price}</Text>
                <Flex justifyContent="center" mt={4}>
                  <Button variant="outline" size="sm" onClick={() => handleExpand(product)}>
                    View Details
                  </Button>
                  <Tooltip label="Add to Cart" aria-label="Add to Cart Tooltip">
                    <IconButton
                      icon={<FaShoppingCart />}
                      variant="outline"
                      size="sm"
                      ml={2}
                      onClick={() => handleAddToCart(product)}
                      aria-label="Add to Cart"
                    />
                  </Tooltip>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Modal for full-page product display */}
      {selectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent bg={bgColor} color={textColor}>
            <ModalCloseButton />
            <ModalBody>
              <Simple />
              <Button mt={4} onClick={onClose}>
                Back to Product List
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Cart Modal */}
      <Modal isOpen={isCartOpen} onClose={onCartClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor} color={textColor}>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              {cart.length === 0 ? (
                <Text>Your cart is empty.</Text>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <Flex key={index} justifyContent="space-between" w="full" p={2} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                      <Text>{item.name}</Text>
                      <Text>{item.price}</Text>
                    </Flex>
                  ))}
                  <Button w="full" mt={4}>
                    Checkout
                  </Button>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ProductList;
