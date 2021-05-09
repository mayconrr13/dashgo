import { Flex, Box, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

import { RiAddLine, RiPencilLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'

import { useUsers } from '../../services/hooks/useUsers'
import { useState } from 'react'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'

export default function UserList() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isLoading, isFetching, error } = useUsers(currentPage)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['users', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 //10minutes
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading
              size="lg"
              fontWeight="normal"
            >
              Usuário

              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" mr="4" />}
            </Heading>

            <NextLink href="/users/create">
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} />}>
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          { isLoading ? (
            <Flex justify="center" >
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center" >
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4","6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink"></Checkbox>
                  </Th>
                  <Th>Usuário</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>}
                  {isWideVersion && <Th w={8}></Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data.users.map(user => {
                  return (
                    <Tr key={user.id} >
                      <Td px={["4", "4","6"]}>
                        <Checkbox colorScheme="pink"></Checkbox>
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold" >{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300" >{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      
                        {isWideVersion && (
                          <Td>
                            <Button 
                              as="a" 
                              size="sm" 
                              fontSize="sm" 
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                    </Tr>
                  )
                })}
              </Tbody>
              </Table>

              <Pagination
                totalCountofRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}

        </Box>        
      </Flex>
    </Box>
  )
}
