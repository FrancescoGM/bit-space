import Head from 'next/head'

import { useHome } from '../hooks/useHome'

import { Link } from '../components/Link'
import { Loading } from '../components/Loading'
import { TeamList } from '../components/TeamList'
import { ListAverageAge } from '../components/ListAverageAge'
import { CardPopularPlayer } from '../components/CardPopularPlayer'

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

const { mostPopularPlayer, lessPopularPlayer } = {
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
      name: 'Francesco Gonzalez Muller',
      age: 26,
      nationality: 'Brazil'
    },
    average: '89%'
  }
}

export default function Home(): JSX.Element {
  const { data } = useHome()

  const isWideVersion = useBreakpointValue({
    xl: true,
    base: false
  })

  if (!data) {
    return <Loading />
  }

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
          d={isWideVersion === undefined || isWideVersion ? 'grid' : 'flex'}
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
              <Link
                nextLinkProps={{ href: '/team/create' }}
                chakraLinkProps={{ 'aria-label': 'Create team button' }}
              >
                +
              </Link>
            </Flex>
            <Divider color="gray.200" my="16px" />
            <TeamList teams={data.teams} />
          </GridItem>
          <GridItem
            as="aside"
            w="full"
            h="full"
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
              <ListAverageAge
                title="Highest avg age"
                data={data.averageAgeTeams.most}
              />
              <ListAverageAge
                title="Lowest avg age"
                data={data.averageAgeTeams.less}
              />
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
