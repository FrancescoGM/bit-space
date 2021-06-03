import { useState } from 'react'
import NextLink from 'next/link'
import {
  Icon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Text,
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useToast,
  ModalBody,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { theme } from '../styles/theme'
import { api } from '../services/api'

export type TeamListTeam = {
  id: string
  name: string
  description: string
}

interface TeamListProps {
  teams: TeamListTeam[]
}

export function TeamList(props: TeamListProps): JSX.Element {
  const [teams, setTeams] = useState(props.teams)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const toast = useToast({
    status: 'error',
    isClosable: true,
    duration: 3000,
    position: 'top-right'
  })

  function handleClose(): void {
    setSelectedTeam(null)
    onClose()
  }

  function handleDelete(): void {
    api
      .delete(`/team/delete/${selectedTeam.id}`)
      .then(({ data }) => {
        setTeams(teams => teams.filter(team => team.id !== selectedTeam.id))
        setSelectedTeam(null)
        onClose()
        toast({ title: data.message, status: 'success' })
      })
      .catch(() => {
        toast({ title: 'Error when trying to delete the team' })
      })
  }

  function handleOpen(team: TeamListTeam): void {
    setSelectedTeam(team)
    onOpen()
  }

  return (
    <>
      <Table
        variant="unstyled"
        mt="0px !important"
        pr="2"
        css={{
          '&::-webkit-scrollbar': {
            width: '8px'
          },

          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colors.gray['200'],
            borderRadius: '20px'
          }
        }}
      >
        <Thead>
          <Tr>
            <Th
              w={210}
              h={35}
              mb="4"
              p="0"
              pl="16px"
              d="flex"
              justifyContent="space-between"
              alignItems="center"
              color="black"
            >
              <Text
                as="span"
                fontWeight="bold"
                fontSize="lg"
                textTransform="none"
                letterSpacing="normal"
              >
                Name
              </Text>
              <Divider orientation="vertical" />
            </Th>
            <Th
              h={35}
              mb="4"
              fontWeight="bold"
              fontSize="lg"
              textTransform="none"
              letterSpacing="normal"
            >
              Description
            </Th>
            <Th mb="4" align="right" w="70px" pr="16px" />
          </Tr>
        </Thead>
        <Tbody>
          {teams.map(team => (
            <Tr
              key={team.id}
              w={210}
              transition="0.3s"
              _hover={{
                bg: 'pink.100',
                color: 'pink.500'
              }}
            >
              <Td
                w={210}
                pl="16px"
                borderRadius="4px"
                fontWeight="medium"
                isTruncated
              >
                {team.name}
              </Td>
              <Td fontWeight="medium" isTruncated>
                {team.description}
              </Td>
              <Td borderRadius="4px" px="2" pr="16px">
                <NextLink href={`/team/edit/${team.id}`}>
                  <a aria-label="edit team">
                    <Icon as={FaPen} color="pink.500" mr="3" />
                  </a>
                </NextLink>
                <button
                  aria-label="delete team"
                  type="button"
                  onClick={() => handleOpen(team)}
                >
                  <Icon as={FaTrash} color="pink.500" />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar Time?</ModalHeader>
          <ModalBody>
            Você deseja mesmo deletar o time{' '}
            {selectedTeam ? selectedTeam.name : ''}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Não
            </Button>
            <Button colorScheme="whatsapp" mr={3} onClick={handleDelete}>
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
