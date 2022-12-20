import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useNotes } from 'feature/notes/use-notes'
import { Key } from 'react'
import { BiDisc, BiNotepad } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { FileLoadButton } from './file-load-button'
import { NavigationItem } from './navigation-item'

export const Navigation = () => {
  const notes = useNotes();
  const paths = useLocation().pathname.split('/');
  const isNotePath = paths[1] === 'note';

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
              {notes.rootNote.children && notes.rootNote.children.map((note: { id: Key | null | undefined; text: string }) => (
                <Link key={note.id} to={`/note/${note.id}`}>
                  <NavigationItem active={isNotePath && paths[2] === note.id} icon={<BiDisc />} label={note.text.replace(/&(nbsp|amp|quot|lt|gt);/g, " ").replace(/<[^>]+>/g, '')} />
                </Link>
              ))}
            </Stack>
          </Box>

        </Stack>
        <Box>
          <Stack spacing="1">
            <NavigationItem subtle disabled icon={<BiNotepad />} label="Noteflowy v2.5" />
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}