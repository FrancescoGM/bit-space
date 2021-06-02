import Head from 'next/head'
import { Link } from '../components/Link'
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react'
import { TeamList } from '../components/TeamList'
import { ListAverageAge } from '../components/ListAverageAge'
import { CardPopularPlayer } from '../components/CardPopularPlayer'

const { teams, highestAvgAge, mostPopularPlayer, lessPopularPlayer } = {
  teams: [
    {
      id: '1',
      title: 'Real Madrid',
      description: 'Ream Madrid Squad'
    }
  ],
  highestAvgAge: [
    {
      id: '1',
      name: 'Barcelona',
      average: '30.5'
    },
    {
      id: '2',
      name: 'Barcelona',
      average: '30.5'
    },
    {
      id: '3',
      name: 'Barcelona',
      average: '30.5'
    },
    {
      id: '4',
      name: 'Barcelona',
      average: '30.5'
    },
    {
      id: '5',
      name: 'Barcelona',
      average: '30.5'
    }
  ],
  mostPopularPlayer: {
    player: {
      id: 70740,
      name: 'Cristian Miguel Riveros Núñez',
      age: 39,
      nationality: 'Paraguay'
    },
    average: '100%'
  },
  lessPopularPlayer: {
    player: {
      id: 70740,
      name: 'Cristian Miguel Riveros Núñez',
      age: 39,
      nationality: 'Paraguay'
    },
    average: '89%'
  }
}

export default function Home(): JSX.Element {
  const isWideVersion = useBreakpointValue({
    xl: true,
    base: false
  })

  return (
    <>
      <Head>
        <title>bit space</title>
      </Head>
      <Box as="main" px="4">
        <Grid
          h={830}
          maxW={1250}
          gap={50}
          mx="auto"
          mt="4.5rem"
          pb="4"
          d={isWideVersion ? 'grid' : 'flex'}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
        >
          <GridItem
            as="section"
            w="full"
            maxW={600}
            h="full"
            p="5"
            borderRadius="12"
            colSpan={1}
            rowSpan={2}
            bg="white"
            boxShadow="0px 0px 20px #00000055"
          >
            <Flex as="header" w="full" justify="space-between" align="center">
              <Heading as="h2" color="pink.500" fontSize="1.625rem">
                My Teams
              </Heading>
              <Link nextLinkProps={{ href: '/team/create' }}>+</Link>
            </Flex>
            <Divider color="gray.200" my="16px" />
            <TeamList teams={teams} />
          </GridItem>
          <GridItem
            as="aside"
            w="full"
            maxW={600}
            p="5"
            borderRadius="12"
            colSpan={1}
            boxShadow="0px 0px 20px #00000055"
            bg="white"
          >
            <Heading
              as="h2"
              color="pink.500"
              fontSize="1.625rem"
              fontWeight="bold"
            >
              Top 5
            </Heading>
            <Divider my="20px" />
            <SimpleGrid columns={2} spacing="26px">
              <ListAverageAge title="Highest avg age" data={highestAvgAge} />
              <ListAverageAge title="Lowest avg age" data={highestAvgAge} />
            </SimpleGrid>
          </GridItem>
          <GridItem as="aside" w="full" h="full" maxW={600} colSpan={1}>
            <CardPopularPlayer
              lessPopularPlayer={lessPopularPlayer}
              mostPopularPlayer={mostPopularPlayer}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
