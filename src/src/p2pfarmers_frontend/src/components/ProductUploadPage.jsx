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
  Input,
  Textarea,
  Flex,
  useColorModeValue,
  useDisclosure,
  VStack,
  Select,
  IconButton,
} from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import SidebarWithHeader from '../Sidebar';

function ProductUploadPage() {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    currency: 'USD', // Default currency
  });

  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (increment) => {
    setNewProduct((prev) => ({
      ...prev,
      price: Math.max(0, prev.price + increment), // Prevent negative prices
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file); // Convert image to Base64 string
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.description || !newProduct.image) {
      alert('Please fill in all fields.');
      return;
    }
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', price: 0, description: '', image: '', currency: 'USD' });
    onClose();
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box
        width={{ base: 'full', md: '250px' }}
        bg={bgColor}
        color={textColor}
        flexShrink={0}
        borderRightWidth="1px"
        borderRightColor={borderColor}
      >
        <SidebarWithHeader />
      </Box>

      {/* Product List */}
      <Box flex="1" p={4} overflowY="auto">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Product List
          </Text>
          <Button onClick={onOpen} bg="green.400" color="white" _hover={{ bg: 'green.500' }}>
            Add New Product
          </Button>
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
                <Text color="gray.500">
                  {product.price} {product.currency}
                </Text>
                <Text mt={2} fontSize="sm">
                  {product.description}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Add Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor} color={textColor}>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <Text fontSize="xl" fontWeight="bold">
                Add New Product
              </Text>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                bg={bgColor}
                borderColor={borderColor}
              />
              <Flex alignItems="center" w="full">
                <IconButton
                  aria-label="Decrease Price"
                  icon={<FaArrowDown />}
                  onClick={() => handlePriceChange(-1)}
                  size="sm"
                  mr={2}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  bg={bgColor}
                  borderColor={borderColor}
                  flex="1"
                />
                <IconButton
                  aria-label="Increase Price"
                  icon={<FaArrowUp />}
                  onClick={() => handlePriceChange(1)}
                  size="sm"
                  ml={2}
                />
              </Flex>
              <Select
                name="currency"
                value={newProduct.currency}
                onChange={handleInputChange}
                bg={bgColor}
                borderColor={borderColor}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="NGN">NGN</option>
              </Select>
              <Textarea
                placeholder="Product Description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                bg={bgColor}
                borderColor={borderColor}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                bg={bgColor}
                borderColor={borderColor}
              />
              {newProduct.image && (
                <Image src={newProduct.image} alt="Preview" boxSize="150px" objectFit="cover" />
              )}
              <Button
                onClick={handleAddProduct}
                bg="green.400"
                color="white"
                _hover={{ bg: 'green.500' }}
                w="full"
              >
                Add Product
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ProductUploadPage;
