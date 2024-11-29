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
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import AgentSidebar from '../Dashboards/AgentSidebar'

const AllFarmers = () => {
  const toast = useToast()

  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFarmer, setSelectedFarmer] = useState(null) // State to hold selected farmer details
  const [isModalOpen, setIsModalOpen] = useState(false) // State to control modal visibility

  // Dynamic light/dark mode colors
  const bg = useColorModeValue('gray.50', 'gray.800')
  const tableBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('black', 'white')

  useEffect(() => {
    // Fetch all farmers data
    fetchFarmers()
  }, [])

  const fetchFarmers = async () => {
    setLoading(true)

    // Simulating an API call for fetching all farmers data
    setTimeout(() => {
      const farmersData = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          registeredDate: '2024-01-01',
          total: '$1500',
          agentId: 'A12345',
          location: 'California, USA',
          farmName: 'Doe Family Farm',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@example.com',
          registeredDate: '2024-02-15',
          total: '$2000',
          agentId: 'A12346',
          location: 'Texas, USA',
          farmName: 'Doe Organic Farms',
        },
        {
          id: 3,
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alicesmith@example.com',
          registeredDate: '2024-03-01',
          total: '$1800',
          agentId: 'A12347',
          location: 'Florida, USA',
          farmName: 'Smith Greenhouse',
        },
      ]
      setFarmers(farmersData)
      setLoading(false)
    }, 1000)
  }

  const handleFarmerClick = (farmer) => {
    setSelectedFarmer(farmer)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFarmer(null)
  }

  return (
    <>
      <Box display="flex" bg={bg} color={textColor} minH="100vh">
        {/* Sidebar */}
        <Box display={{ base: 'none', md: 'block' }} w="250px">
          <AgentSidebar />
        </Box>

        <Box
          flex="1"
          maxWidth="1200px"
          p={6}
          m="10px"
          bg={tableBg}
          shadow="md"
          rounded="lg"
        >
          <Heading textAlign="center" fontWeight="normal" mb="2%">
            All Farmers
          </Heading>

          {loading ? (
            <Box textAlign="center" mt="20px">
              <Spinner size="xl" />
            </Box>
          ) : (
            <Table variant="simple" size="md" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Farm Name</Th>
                  <Th>Location</Th>
                  <Th>Registered Date</Th>
                  <Th>Total</Th>
                  <Th>Agent ID</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {farmers.map((farmer) => (
                  <Tr key={farmer.id}>
                    <Td>{farmer.firstName}</Td>
                    <Td>{farmer.lastName}</Td>
                    <Td>{farmer.email}</Td>
                    <Td>{farmer.farmName}</Td>
                    <Td>{farmer.location}</Td>
                    <Td>{farmer.registeredDate}</Td>
                    <Td>{farmer.total}</Td>
                    <Td>{farmer.agentId}</Td>
                    <Td>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        leftIcon={<FaCheckCircle />}
                        onClick={() => handleFarmerClick(farmer)}
                      >
                        View Details
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>

      {/* Modal to view farmer details */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Farmer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFarmer && (
              <>
                <Text>
                  <strong>Full Name:</strong> {selectedFarmer.firstName} {selectedFarmer.lastName}
                </Text>
                <Text>
                  <strong>Email:</strong> {selectedFarmer.email}
                </Text>
                <Text>
                  <strong>Location:</strong> {selectedFarmer.location}
                </Text>
                <Text>
                  <strong>Farm Name:</strong> {selectedFarmer.farmName}
                </Text>
                <Text>
                  <strong>Registered Date:</strong> {selectedFarmer.registeredDate}
                </Text>
                <Text>
                  <strong>Total:</strong> {selectedFarmer.total}
                </Text>
                <Text>
                  <strong>Agent ID:</strong> {selectedFarmer.agentId}
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AllFarmers
