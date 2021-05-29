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
  Text
} from '@chakra-ui/react'
import { FaPen, FaTrash } from 'react-icons/fa'

type Team = {
  id: string
  title: string
  description: string
}

interface TeamListProps {
  teams: Team[]
}

export function TeamList(props: TeamListProps): JSX.Element {
  const [teams, setTeams] = useState(props.teams)

  function handleDeleteTeam(id: string): void {
    setTeams(teams => teams.filter(team => team.id !== id))
  }

  return (
    <Table variant="unstyled" mt="0px !important">
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
            <Td w={210} pl="16px" borderRadius="4px" fontWeight="medium">
              {team.title}
            </Td>
            <Td fontWeight="medium">{team.description}</Td>
            <Td borderRadius="4px" px="2" pr="16px">
              <NextLink href={`/team/edit/${team.id}`}>
                <a aria-label="edit team">
                  <Icon as={FaPen} color="pink.500" mr="3" />
                </a>
              </NextLink>
              <button
                aria-label="delete team"
                type="button"
                onClick={() => handleDeleteTeam(team.id)}
              >
                <Icon as={FaTrash} color="pink.500" />
              </button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
// <table className={styles.table}>
//   <thead>
//     <tr>
//       <th>
//         <span>Name</span>
//         <Divider orientation="vertical" />
//       </th>
//       <th>Description</th>
//       <th />
//     </tr>
//   </thead>
//   <tbody>
//     {teams.map(team => (
//       <tr key={team.id}>
//         <td>{team.title}</td>
//         <td>{team.description}</td>
//         <td>
//           <Icon as={FaPen} color="pink.500" mr="3" />
//           <Icon as={FaTrash} color="pink.500" />
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
// <Table variant="unstyled">
//   <Thead>
//     <Tr>
//       <Th
//         w={210}
//         h={35}
//         p="0"
//         pl="16px"
//         d="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         color="black"
//       >
//         <Text
//           as="span"
//           fontWeight="bold"
//           fontSize="lg"
//           textTransform="none"
//           letterSpacing="normal"
//         >
//           Name
//         </Text>
//         <Divider orientation="vertical" />
//       </Th>
//       <Th
//         h={35}
//         fontWeight="bold"
//         fontSize="lg"
//         textTransform="none"
//         letterSpacing="normal"
//       >
//         Description
//       </Th>
//       <Th align="right" w="70px" pr="16px" />
//     </Tr>
//   </Thead>
//   <Tbody>
//     {teams.map(team => (
//       <Tr
//         key={team.id}
//         transition="0.3s"
//         _hover={{
//           bg: 'pink.100',
//           color: 'pink.500'
//         }}
//       >
//         <Td pl="16px" borderRadius="4px" fontWeight="medium">
//           {team.title}
//         </Td>
//         <Td fontWeight="medium">{team.description}</Td>
//         <Td borderRadius="4px" px="2" pr="16px">
//           <Icon as={FaPen} color="pink.500" mr="3" />
//           <Icon as={FaTrash} color="pink.500" />
//         </Td>
//       </Tr>
//     ))}
//   </Tbody>
// </Table>
