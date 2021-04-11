import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface ProfileProps {
  showProfileData: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>
            Maycon dos Reis
          </Text>
          <Text color="gray.300" fontSize="small">
            mayconrr13@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Maycon dos Reis Rosário" src="https://github.com/mayconrr13.png" />
    </Flex>
  )
}
