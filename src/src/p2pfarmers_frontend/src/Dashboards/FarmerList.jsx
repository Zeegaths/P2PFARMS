'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Spinner,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa'
import AgentSidebar from './AgentSidebar'

const FarmersList = () => {
  const toast = useToast()

  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [agentId, setAgentId] = useState('12345') // Example agentId
  const [selectedFarmer, setSelectedFarmer] = useState(null) // Farmer selected for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false) // Edit modal state

  // Color adjustments for light and dark mode
  const headingColor = useColorModeValue('black', 'white')
  const tableHeaderColor = useColorModeValue('gray.700', 'gray.100')
  const tableTextColor = useColorModeValue('black', 'white')
  const buttonColor = useColorModeValue('teal', 'teal')

  useEffect(() => {
    // Fetch the farmers list based on the agentId
    fetchFarmersByAgent(agentId)
  }, [agentId])

  const fetchFarmersByAgent = async (agentId) => {
    setLoading(true)

    // Simulating an API call for fetching farmers data for a specific agent
    setTimeout(() => {
      const farmersData = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', registeredDate: '2024-01-01', total: '$1500' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', registeredDate: '2024-02-15', total: '$2000' },
        { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alicesmith@example.com', registeredDate: '2024-03-01', total: '$1800' },
      ]
      setFarmers(farmersData)
      setLoading(false)
    }, 1000)
  }

  const handleEditClick = (farmer) => {
    setSelectedFarmer(farmer)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (farmerId) => {
    const updatedFarmers = farmers.filter((farmer) => farmer.id !== farmerId)
    setFarmers(updatedFarmers)

    toast({
      title: 'Farmer Removed',
      description: 'The farmer has been successfully removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleEditSubmit = () => {
    // Update farmer details
    const updatedFarmers = farmers.map((farmer) =>
      farmer.id === selectedFarmer.id ? selectedFarmer : farmer
    )
    setFarmers(updatedFarmers)
    setIsEditModalOpen(false)

    toast({
      title: 'Farmer Updated',
      description: 'The farmer details have been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <Box display="flex">
        {/* Sidebar */}
        <Box display={{ base: 'none', md: 'block' }} w="250px">
          <AgentSidebar />
        </Box>

        <Box
          flex="1"
          maxWidth="1200px"
          p={6}
          m="10px"
          as="form"
          bg="rgba(0, 255, 0, 0.1)" // More transparent green background for the form
          color={tableTextColor} // Dynamic text color for light/dark mode
        >
          <Heading textAlign="center" fontWeight="normal" mb="2%" color={headingColor}>
            Farmers Registered Under Agent {agentId}
          </Heading>

          {loading ? (
            <Box textAlign="center" mt="20px">
              <Spinner size="xl" />
            </Box>
          ) : (
            <Table variant="simple" size="md" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th color={tableHeaderColor}>First Name</Th>
                  <Th color={tableHeaderColor}>Last Name</Th>
                  <Th color={tableHeaderColor}>Email</Th>
                  <Th color={tableHeaderColor}>Registered Date</Th>
                  <Th color={tableHeaderColor}>Total</Th>
                  <Th color={tableHeaderColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {farmers.map((farmer) => (
                  <Tr key={farmer.id}>
                    <Td>{farmer.firstName}</Td>
                    <Td>{farmer.lastName}</Td>
                    <Td>{farmer.email}</Td>
                    <Td>{farmer.registeredDate}</Td>
                    <Td>{farmer.total}</Td>
                    <Td>
                      <Button
                        colorScheme={buttonColor}
                        size="sm"
                        leftIcon={<FaCheckCircle />}
                        onClick={() => handleEditClick(farmer)}
                        mr={2}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        leftIcon={<FaTrash />}
                        onClick={() => handleDeleteClick(farmer.id)}
                      >
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>

      {/* Edit Modal */}
      {selectedFarmer && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Farmer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>First Name</FormLabel>
                <Input
                  value={selectedFarmer.firstName}
                  onChange={(e) =>
                    setSelectedFarmer({ ...selectedFarmer, firstName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  value={selectedFarmer.lastName}
                  onChange={(e) =>
                    setSelectedFarmer({ ...selectedFarmer, lastName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={selectedFarmer.email}
                  onChange={(e) =>
                    setSelectedFarmer({ ...selectedFarmer, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Total</FormLabel>
                <Input
                  value={selectedFarmer.total}
                  onChange={(e) =>
                    setSelectedFarmer({ ...selectedFarmer, total: e.target.value })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                onClick={handleEditSubmit}
              >
                Save
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)} ml={3}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default FarmersList
