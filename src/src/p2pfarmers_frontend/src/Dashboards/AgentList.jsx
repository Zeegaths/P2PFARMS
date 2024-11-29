'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Spinner,
  Badge,
  Button,
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
import AdminSidebar from './AdminSidebar'

const AgentsList = () => {
  const toast = useToast()

  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [agentId, setAgentId] = useState('12345') // Example agentId
  const [selectedAgent, setSelectedAgent] = useState(null) // State to hold the selected agent details
  const [isModalOpen, setIsModalOpen] = useState(false) // State to control modal visibility

  const bg = useColorModeValue('gray.50', 'gray.800')
  const tableBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('black', 'white')

  useEffect(() => {
    // Fetch the agents list based on the agentId
    fetchAgentsByAgent(agentId)
  }, [agentId])

  const fetchAgentsByAgent = async (agentId) => {
    setLoading(true)

    // Simulating an API call for fetching agents data for a specific agent
    setTimeout(() => {
      const agentsData = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', registeredDate: '2024-01-01', total: '$1500', status: 'Pending', phone: '123-456-7890', address: '123 Main St' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', registeredDate: '2024-02-15', total: '$2000', status: 'Pending', phone: '234-567-8901', address: '456 Oak Rd' },
        { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alicesmith@example.com', registeredDate: '2024-03-01', total: '$1800', status: 'Suspended', phone: '345-678-9012', address: '789 Pine Ave' },
      ]
      setAgents(agentsData)
      setLoading(false)
    }, 1000)
  }

  const handleStatusChange = (agent, newStatus) => {
    // Update agent status
    const updatedAgents = agents.map((a) =>
      a.id === agent.id ? { ...a, status: newStatus } : a
    )
    setAgents(updatedAgents)

    toast({
      title: `Agent ${agent.firstName} ${agent.lastName} status updated.`,
      description: `New status: ${newStatus}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedAgent(null)
  }

  return (
    <>
      <Box display="flex" bg={bg} color={textColor} minH="100vh">
        {/* Sidebar */}
        <Box display={{ base: 'none', md: 'block' }} w="250px">
          <AdminSidebar />
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
            Agents List
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
                  <Th>Registered Date</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {agents.map((agent) => (
                  <Tr key={agent.id}>
                    <Td>{agent.firstName}</Td>
                    <Td>{agent.lastName}</Td>
                    <Td>{agent.email}</Td>
                    <Td>{agent.registeredDate}</Td>
                    <Td>{agent.total}</Td>
                    <Td>
                      <Badge colorScheme={agent.status === 'Approved' ? 'green' : agent.status === 'Suspended' ? 'red' : 'yellow'}>
                        {agent.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => handleStatusChange(agent, 'Approved')}
                        isDisabled={agent.status === 'Approved'}
                      >
                        Approve
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleStatusChange(agent, 'Suspended')}
                        isDisabled={agent.status === 'Suspended'}
                        ml={2}
                      >
                        Suspend
                      </Button>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleViewDetails(agent)}
                        ml={2}
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

      {/* Modal to view agent details */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agent Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAgent && (
              <>
                <Text><strong>Full Name:</strong> {selectedAgent.firstName} {selectedAgent.lastName}</Text>
                <Text><strong>Email:</strong> {selectedAgent.email}</Text>
                <Text><strong>Phone:</strong> {selectedAgent.phone}</Text>
                <Text><strong>Address:</strong> {selectedAgent.address}</Text>
                <Text><strong>Registered Date:</strong> {selectedAgent.registeredDate}</Text>
                <Text><strong>Total:</strong> {selectedAgent.total}</Text>
                <Text><strong>Status:</strong> {selectedAgent.status}</Text>
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

export default AgentsList
