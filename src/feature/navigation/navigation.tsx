import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { Note, useNotes } from 'feature/notes/use-notes'
import { BiNotepad } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { FileLoadButton } from './file-load-button'
import { NavigationItem } from './navigation-item'

export const Navigation = () => {
  const notes = useNotes();

  return (
    <Box w="72" bg="gray.900" color="white" fontSize="sm">
      <Flex h="full" direction="column" px="4" py="4">
        <FileLoadButton />
        <Stack spacing="8" flex="1" overflow="auto" pt="8">

          <Box>
            <Link to="/">
              <Text
                px="3"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="widest"
                color="gray.500"
                mb="3"
              >
                Notes
              </Text>
            </Link>
            <Stack spacing="1">
              {notes.rootNote.children && notes.rootNote.children.map((note: Note) => (
                <NavigationItem key={note.id} note={note} />
              ))}
            </Stack>
          </Box>

        </Stack>
        <Box>
          <Stack spacing="1">
            <HStack as="div" w="full" px="3" py="2" cursor="" userSelect="none" rounded="md"
              transition="all 0.2s" bg={undefined} _hover={{}} _active={{}} >
              <Box fontSize="lg" color={'gray.400'}>
                <BiNotepad />
              </Box>
              <Box flex="1" fontWeight="inherit" color='gray.400'>
                Noteflowy v1.0
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}