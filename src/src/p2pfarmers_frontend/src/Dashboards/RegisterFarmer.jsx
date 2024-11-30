'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  SimpleGrid,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Form1 = ({ farmerDetails, handleChange }) => {
  const textColor = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('gray.400', 'whiteAlpha.600')

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%" color={textColor}>
        Farmer Registration
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel color={textColor}>First name</FormLabel>
          <Input
            name="firstName"
            value={farmerDetails.firstName}
            onChange={handleChange}
            placeholder="First name"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Last name</FormLabel>
          <Input
            name="lastName"
            value={farmerDetails.lastName}
            onChange={handleChange}
            placeholder="Last name"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Phone</FormLabel>
          <Input
            name="phone"
            value={farmerDetails.phone}
            onChange={handleChange}
            placeholder="Phone number"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            value={farmerDetails.email}
            onChange={handleChange}
            placeholder="Email address"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
          <FormHelperText color={textColor}>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Agent ID</FormLabel>
          <Input
            name="agentId"
            value={farmerDetails.agentId}
            onChange={handleChange}
            placeholder="Agent ID"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

const FarmerForm = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(100) // Single step form, progress is 100%
  const [farmerDetails, setFarmerDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agentId: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFarmerDetails({ ...farmerDetails, [name]: value })
  }

  const bg = useColorModeValue('gray.50', 'gray.800')
  const formBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('black', 'white')

  const handleSubmit = () => {
    toast({
      title: 'Registration Complete.',
      description: 'Farmer registration is successful.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    navigate('/farmerslist') // Redirect to Farmers List after submission
  }

  return (
    <Flex minH="100vh" bg={bg} justifyContent="center" alignItems="center">
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="md"
        maxWidth={800}
        w="full"
        p={6}
        bg={formBg}
        color={textColor}
      >
        {/* Back Button at the Top */}
        <Flex justifyContent="flex-start" mb={4}>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => navigate('/farmerslist')}
          >
            Back to Farmers List
          </Button>
        </Flex>

        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated colorScheme="green" />

        <Form1 farmerDetails={farmerDetails} handleChange={handleChange} />

        <Flex justifyContent="flex-end" mt={6}>
          <Button
            w="7rem"
            colorScheme="green"
            variant="solid"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default FarmerForm
