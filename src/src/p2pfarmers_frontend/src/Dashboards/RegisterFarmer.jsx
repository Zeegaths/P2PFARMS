'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  SimpleGrid,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import AgentSidebar from '../Dashboards/AgentSidebar'

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

const Form2 = ({ farmerDetails, handleChange }) => {
  const textColor = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('gray.400', 'whiteAlpha.600')

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%" color={textColor}>
        Farmer Details
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel color={textColor}>Farm Name</FormLabel>
          <Input
            name="farmName"
            value={farmerDetails.farmName}
            onChange={handleChange}
            placeholder="Farm Name"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Farm Address</FormLabel>
          <Input
            name="farmAddress"
            value={farmerDetails.farmAddress}
            onChange={handleChange}
            placeholder="Farm Address"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>City</FormLabel>
          <Input
            name="city"
            value={farmerDetails.city}
            onChange={handleChange}
            placeholder="City"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>State / Province</FormLabel>
          <Input
            name="state"
            value={farmerDetails.state}
            onChange={handleChange}
            placeholder="State / Province"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Country</FormLabel>
          <Input
            name="country"
            value={farmerDetails.country}
            onChange={handleChange}
            placeholder="Country"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Postal Code</FormLabel>
          <Input
            name="postalCode"
            value={farmerDetails.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

const Form3 = () => {
  const textColor = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('gray.400', 'whiteAlpha.600')

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" color={textColor}>
        Passport Photo
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl>
          <FormLabel color={textColor}>Passport Photo</FormLabel>
          <Input
            type="file"
            name="passportPhoto"
            accept="image/*"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

export default function FarmerForm() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)
  const [farmerDetails, setFarmerDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agentId: '',
    farmName: '',
    farmAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    passportPhoto: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFarmerDetails({ ...farmerDetails, [name]: value })
  }

  const bg = useColorModeValue('gray.50', 'gray.800')
  const formBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('black', 'white')

  return (
    <>
      <Flex direction="row" minH="100vh" bg={bg}>
        {/* Sidebar */}
        <Box display={{ base: 'none', md: 'block' }} w="250px">
          <AgentSidebar />
        </Box>

        <Box
          flex="1"
          borderWidth="1px"
          rounded="lg"
          shadow="md"
          maxWidth={800}
          p={6}
          m="10px"
          as="form"
          bg={formBg}
          color={textColor}
        >
          <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated colorScheme="green" />
          {step === 1 ? <Form1 farmerDetails={farmerDetails} handleChange={handleChange} /> : null}
          {step === 2 ? <Form2 farmerDetails={farmerDetails} handleChange={handleChange} /> : null}
          {step === 3 ? <Form3 /> : null}

          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1)
                    setProgress(progress - 33.33)
                  }}
                  isDisabled={step === 1}
                  colorScheme="green"
                  variant="solid"
                  w="7rem"
                  mr="5%">
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 3}
                  onClick={() => {
                    setStep(step + 1)
                    if (step === 3) {
                      setProgress(100)
                    } else {
                      setProgress(progress + 33.33)
                    }
                  }}
                  colorScheme="green"
                  variant="outline">
                  Next
                </Button>
              </Flex>
              {step === 3 ? (
                <Button
                  w="7rem"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => {
                    toast({
                      title: 'Registration Complete.',
                      description: "Farmer registration is successful.",
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    })
                  }}>
                  Submit
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  )
}
