import { Box, HStack } from '@chakra-ui/react';
import { Note } from 'feature/notes/use-notes';
import { BiDisc } from 'react-icons/bi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  note: Note;
}

export const NavigationItem = ({ note }: NavigationItemProps) => {
  const paths = useLocation().pathname.split('/');
  const isNotePath = paths[1] === 'note';

  const active = isNotePath && paths[2] === note.id;
  const noteDocument = new DOMParser().parseFromString(note.content, 'text/html');
  const label = noteDocument.querySelector("h1")?.textContent;

  return (

    <Link to={`/note/${note.id}`}>

      <HStack
        as="div"
        w="full"
        px="3"
        py="2"
        cursor="pointer"
        userSelect="none"
        rounded="md"
        transition="all 0.2s"
        bg={active ? 'gray.700' : undefined}
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.600' }}
      >
        <Box fontSize="lg" color={active ? 'currentcolor' : 'gray.400'}>
          <BiDisc />
        </Box>
        <Box flex="1" fontWeight="inherit" >
          {label}
        </Box>
      </HStack>

    </Link>



  )
}
