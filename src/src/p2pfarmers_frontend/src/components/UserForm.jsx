'use client'

import { useState } from 'react'
import SimpleSidebar from '../Sidebar'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  InputRightElement,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Form1 = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // Dynamic colors for light and dark mode
  const textColor = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('gray.400', 'whiteAlpha.600')

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%" color={textColor}>
        User Registration
      </Heading>
      <Flex direction="column" justify="center" align="center">
        <FormControl mb="4" w="full" maxWidth="400px">
          <FormLabel htmlFor="first-name" color={textColor} fontWeight="normal">
            First name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="First name"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl mb="4" w="full" maxWidth="400px">
          <FormLabel htmlFor="last-name" color={textColor} fontWeight="normal">
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
        </FormControl>

        <FormControl mb="4" w="full" maxWidth="400px">
          <FormLabel htmlFor="email" color={textColor} fontWeight="normal">
            Email address
          </FormLabel>
          <Input
            id="email"
            type="email"
            borderColor={borderColor}
            _focus={{ borderColor: 'green.400' }}
            color={textColor}
          />
          <FormHelperText color={textColor}>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl mb="4" w="full" maxWidth="400px">
          <FormLabel htmlFor="password" color={textColor} fontWeight="normal">
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              borderColor={borderColor}
              _focus={{ borderColor: 'green.400' }}
              color={textColor}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>
    </>
  )
}

export default function UserForm() {
  const toast = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  // Dynamic background and text colors for light and dark mode
  const bg = useColorModeValue('gray.50', 'gray.800')
  const formBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('black', 'white')

  return (
    <Flex minH="100vh" bg={bg} justifyContent="center" alignItems="center">
      {/* Centered Form */}
      <Box
        w={{ base: 'full', md: '500px' }}
        borderWidth="1px"
        rounded="lg"
        shadow="md"
        p={6}
        bg={formBg}
        color={textColor}
      >
        <Progress hasStripe value={progress} mb="5%" isAnimated colorScheme="green" size="lg" />
        {step === 1 ? <Form1 /> : null}

        <ButtonGroup mt="5%" w="100%" justifyContent="space-between">
          {step > 1 && (
            <Button
              onClick={() => {
                setStep(step - 1)
                setProgress(progress - 33.33)
              }}
              colorScheme="blue"
            >
              Back
            </Button>
          )}
          {step === 1 && (
            <Button
              w="7rem"
              onClick={() => {
                setStep(step + 1)
                setProgress(progress + 33.33)
              }}
              colorScheme="green"
              variant="solid"
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button
              w="7rem"
              colorScheme="green"
              variant="solid"
              onClick={() => {
                toast({
                  title: 'Account created.',
                  description: "We've created your account for you.",
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
                navigate('/productlist')
              }}
            >
              Submit
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Flex>
  )
}
