import { useRef, useState } from 'react'
import Head from 'next/head'
import { Form } from '../../components/Form/Form'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Input } from '../../components/Form/Input'
import { Textarea } from '../../components/Form/Textarea'
import { Radio } from '../../components/Form/Radio'
import { Select } from '../../components/Form/Select'

import { CreatableInput } from '../../components/Form/CreatableInput'
import { IconInput } from '../../components/Form/IconInput'
import { IoSearch } from 'react-icons/io5'
import { FootballField } from '../../components/FootballField'
import {
  Box,
  VStack,
  Heading,
  Divider,
  Flex,
  Button,
  Icon
} from '@chakra-ui/react'
import { PlayerCard } from '../../components/PlayerCard'

type SubmitData = {
  name: string
}

const formations = [
  { id: '1', label: '4-4-2', value: '4-4-2' },
  { id: '2', label: '5-4-1', value: '5-4-1' },
  { id: '3', label: '4-5-1', value: '4-5-1' },
  { id: '4', label: '4-3-3', value: '4-3-3' },
  { id: '5', label: '4-3-2-1', value: '4-3-2-1' },
  { id: '6', label: '4-2-3-1', value: '4-2-3-1' },
  { id: '7', label: '4-5-1', value: '4-5-1' },
  { id: '8', label: '3-4-3', value: '3-4-3' },
  { id: '9', label: '3-5-2', value: '3-5-2' }
]

export default function CreateTeam(): JSX.Element {
  const formRef = useRef<FormHandles>(null)
  const [formation, setFormation] = useState(formations[0].value)

  const handleSubmit: SubmitHandler<SubmitData> = data => {
    console.log(data)
  }

  function handleFormation(): void {
    setFormation(formRef.current.getFieldValue('formation'))
  }

  return (
    <>
      <Head>
        <title>create team | bit space</title>
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
            Create your team
          </Heading>
          <Divider my="16px !important" />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
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
                  icon={<Icon as={IoSearch} w={8} h={8} color="gray.200" />}
                  placeholder="Player name"
                />
              </Flex>
              <Flex as="fieldset" gridGap="8" w="full">
                <FootballField name="players" formation={formation} />

                <PlayerCard
                  player={{
                    id: '1',
                    name: 'Francesco',
                    age: 19,
                    nationality: 'Brazil'
                  }}
                />
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
