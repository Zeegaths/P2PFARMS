'use client'

import { useState, useEffect } from 'react'
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, Spinner, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'  // Make sure this import is correct
import AgentSidebar from '../Dashboards/AgentSidebar'

const PermissionedUsers = () => {
  const toast = useToast()
  const [principalId, setPrincipalId] = useState("")
  const [permissionedUsers, setPermissionedUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // Using useColorModeValue for text colors to switch between light and dark modes
  const headingColor = useColorModeValue('black', 'white')
  const formLabelColor = useColorModeValue('black', 'white')
  const inputColor = useColorModeValue('black', 'white')

  useEffect(() => {
    // Initialize with some permissioned users
    setPermissionedUsers([
      { id: 1, principalId: 'P12345' },
      { id: 2, principalId: 'P67890' },
    ])
  }, [])

  const handleAddPrincipalId = () => {
    if (principalId === "") {
      toast({
        title: 'Error',
        description: 'Principal ID cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const newPrincipal = { id: permissionedUsers.length + 1, principalId }
    setPermissionedUsers([...permissionedUsers, newPrincipal])
    setPrincipalId("")

    toast({
      title: 'Success',
      description: `Principal ID ${principalId} added successfully!`,
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
          color="white"
        >
          <Heading textAlign="center" fontWeight="normal" mb="2%" color="yellow.400">
            Permissioned Users List
          </Heading>

          {/* Input for adding Principal ID */}
          <FormControl mb={4}>
            <FormLabel color={formLabelColor}>Enter Principal ID</FormLabel>
            <Input 
              value={principalId}
              onChange={(e) => setPrincipalId(e.target.value)}
              placeholder="Enter Principal ID"
              color={inputColor}
            />
            <Button 
              mt={2} 
              colorScheme="teal" 
              leftIcon={<FaCheckCircle />} // Using FaCheckCircle correctly here
              onClick={handleAddPrincipalId}
            >
              Add Principal ID
            </Button>
          </FormControl>

          {/* Displaying the list of permissioned users */}
          {loading ? (
            <Box textAlign="center" mt="20px">
              <Spinner size="xl" />
            </Box>
          ) : (
            <Table variant="simple" size="md" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Principal ID</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {permissionedUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.principalId}</Td>
                    <Td>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        leftIcon={<FaCheckCircle />} // Using FaCheckCircle here too
                        onClick={() => {
                          toast({
                            title: `Principal ID Details`,
                            description: `You selected Principal ID: ${user.principalId}`,
                            status: 'info',
                            duration: 3000,
                            isClosable: true,
                          })
                        }}
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
    </>
  )
}

export default PermissionedUsers
