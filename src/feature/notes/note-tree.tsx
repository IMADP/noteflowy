import { Box, Button, Center, Divider, Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Spacer, Square, Stack, Text, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import { NoteDetails } from './note-details';
import { NoteMenu } from './menu/note-menu';
import { NoteText } from './note-text';
import { Note, useNotes } from './use-notes';
import { BiArrowFromLeft, BiArrowFromTop, BiBold, BiBullseye, BiCopyAlt, BiEraser, BiItalic, BiLinkAlt, BiStrikethrough, BiUnderline } from 'react-icons/bi';

interface NoteTreeProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteTree = ({ note, noteParent }: NoteTreeProps) => {
  const notes = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <List ml={5} mt={5}>

      <ListItem>

        <Flex color='black' mr="10">
          <Center pt='1' pr="2" bg='white'>
            <BiBullseye />
          </Center>
          <Center p='1' flex='1' bg='white'>
            <Input
              placeholder='Note text...' defaultValue={note.text}
            />
          </Center>
        </Flex>

        <Flex color='black' mr="10">
          <Box pt='2' pr="2" bg="white">
            <BiArrowFromTop style={{ visibility: 'hidden' }} />
          </Box>
          <Box p='1' flex='1' bg="white" >
            <Textarea rows={!!note.details ? 3 : 1} placeholder='Details' defaultValue={note.details} />

          </Box>
        </Flex>

        <Flex color='black' mt='1' mr="10">
          <Box pt='2' pr="2" bg="white">
            <BiArrowFromTop style={{ visibility: 'hidden' }} />
          </Box>
          <Box p='1'>

            <Stack direction='row' spacing={2}>

              <Tooltip hasArrow label='Add New Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Add another note'
                  icon={<BiArrowFromTop />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Add Child Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Add a child note'
                  icon={<BiArrowFromLeft />}
                />
              </Tooltip>

              <Center height='2rem' px='2'>
                <Divider color='black' orientation='vertical' />
              </Center>

              <Tooltip hasArrow label='Clone Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Clone Note'
                  icon={<BiCopyAlt />}
                />
              </Tooltip>

              <Center height='2rem' px='2'>
                <Divider color='black' orientation='vertical' />
              </Center>

              <Tooltip hasArrow label='Bold'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Bold'
                  icon={<BiBold />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Italic'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Italic'
                  icon={<BiItalic />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Underline'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Underline'
                  icon={<BiUnderline />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Strikethrough'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Strikethrough'
                  icon={<BiStrikethrough />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Link'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Link'
                  icon={<BiLinkAlt />}
                />
              </Tooltip>

              <Center height='2rem' px='2'>
                <Divider color='black' orientation='vertical' />
              </Center>

              <Tooltip hasArrow label='Delete Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Delete Note'
                  icon={<BiEraser />}
                />
              </Tooltip>


            </Stack>
          </Box>
        </Flex>


        {note.children.map((n: Note) => (
          <Box key={n.id} >
            <NoteTree note={n} noteParent={note} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}