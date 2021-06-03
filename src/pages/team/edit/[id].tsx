import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import * as yup from 'yup'
import { IoSearch } from 'react-icons/io5'
import { FormHandles, SubmitHandler } from '@unform/core'

import { usePlayer } from '../../../context/PlayerContext'

import { Form } from '../../../components/Form/Form'
import { Input } from '../../../components/Form/Input'
import { Textarea } from '../../../components/Form/Textarea'
import { Radio } from '../../../components/Form/Radio'
import { Select } from '../../../components/Form/Select'
import { CreatableInput } from '../../../components/Form/CreatableInput'
import { IconInput } from '../../../components/Form/IconInput'
import { FootballField } from '../../../components/FootballField'
import { CardList } from '../../../components/CardList'

import {
  Box,
  VStack,
  Heading,
  Divider,
  Flex,
  Button,
  Icon,
  useToast
} from '@chakra-ui/react'
import { formatYupError } from '../../../utils/formatYupError'
import { api } from '../../../services/api'
import { useRouter } from 'next/router'
import { formations, formTeamScheme } from '../create'
import { Team } from '../../../models/Team'
import { GetServerSideProps } from 'next'
import { useFetch } from '../../../hooks/useFetch'

type SubmitData = {
  name: string
  description: string
  website: string
  formation: string
  players: string[][]
  tags: string[]
}

type EditTeam = Team & { id: string }

interface EditTeamProps {
  team: EditTeam
}

export default function EditTeam({ team }: EditTeamProps): JSX.Element {
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()
  const { id } = router.query

  const { data } = useFetch<EditTeam>(`/team/${id}`)

  const [formation, setFormation] = useState(team.formation)
  const { searchPlayers, clearPlayers, clearData, addPlayers } = usePlayer()

  let debouncePlayer: NodeJS.Timeout

  const toast = useToast({
    status: 'success',
    duration: 3000,
    isClosable: true,
    position: 'top-right'
  })

  useEffect(() => {
    if (data) {
      clearData()
      addPlayers(team.players.flat(2))
    }
  }, [])

  const handleSubmit: SubmitHandler<SubmitData> = async data => {
    try {
      const res = await formTeamScheme.validate(data, { abortEarly: false })

      const response = await api.post(`team/edit/${router.query.id}`, res)
      toast({
        title: response.data.message
      })
      router.push('/')
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        formRef.current.setErrors(formatYupError(error))
      }
    }
  }

  function handleFormation(): void {
    clearData()
    formRef.current.setFieldValue('players', [[], [], [], []])
    setFormation(formRef.current.getFieldValue('formation'))
    formRef.current.setErrors({ players: null })
  }

  function handleChangePlayer(event: ChangeEvent<HTMLInputElement>): void {
    clearTimeout(debouncePlayer)

    debouncePlayer = setTimeout(async () => {
      const name = event.target.value
      if (name.length === 0) return clearPlayers()
      if (name.length >= 4) return searchPlayers(name)
    }, 500)
  }

  return (
    <>
      <Head>
        <title>edit team | bit space</title>
      </Head>

      <Box as="main" px="4">
        <VStack
          w="full"
          maxW={1250}
          mx="auto"
          minH="400"
          mt="4.375rem"
          p="7"
          borderRadius="12px"
          bg="white"
          boxShadow="0px 0px 20px #00000055"
        >
          <Heading as="h1" mr="auto" fontSize="2xl" color="pink.500">
            Edit your team
          </Heading>
          <Divider my="16px !important" />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={team}
            w="full"
            d="flex"
            flexDirection="column"
            gridGap="46px"
          >
            <Heading
              as="legend"
              mx="auto"
              mb="12"
              fontSize="2xl"
              color="gray.200"
              textTransform="uppercase"
            >
              Team information
            </Heading>
            <Flex as="fieldset" gridGap="8">
              <Input
                name="name"
                label="Team name"
                placeholder="Insert team name"
              />
              <Input
                name="website"
                label="Team website"
                placeholder="https://myteam.com"
              />
            </Flex>
            <Flex as="fieldset" gridGap="8">
              <Textarea name="description" label="Description" />
              <Flex w="full" direction="column" gridGap="8">
                <Radio
                  name="type"
                  label="Team type"
                  options={[
                    { id: 'fantasy', label: 'Fantasy', value: 'fantasy' },
                    { id: 'real', label: 'Real', value: 'real' }
                  ]}
                />
                <CreatableInput name="tags" label="Tags" />
              </Flex>
            </Flex>
            <Flex direction="column" gridGap="46px">
              <Heading
                as="fieldset"
                textTransform="uppercase"
                color="gray.200"
                fontSize="2xl"
                mt="5"
                mx="auto"
              >
                Configure squad
              </Heading>
              <Flex as="fieldset" gridGap="8" w="full">
                <Select
                  name="formation"
                  label="Formation"
                  options={formations}
                  onChange={() => handleFormation()}
                />
                <IconInput
                  name="player"
                  label="Search player"
                  onChange={handleChangePlayer}
                  icon={<Icon as={IoSearch} w={8} h={8} color="gray.200" />}
                  placeholder="Player name"
                />
              </Flex>
              <Flex as="fieldset" gridGap="8" w="full">
                <FootballField name="players" formation={formation} />

                <CardList />
              </Flex>
            </Flex>
            <Button
              type="submit"
              maxW={581}
              variant="unstyled"
              color="white"
              bg="linear-gradient(to right bottom, #ed2786, #f92b71, #ff395b, #ff4b45, #ff5f2d)"
            >
              Save
            </Button>
          </Form>
        </VStack>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  const { data } = await api.get(`/team/${id}`)

  return {
    props: {
      team: data
    }
  }
}
