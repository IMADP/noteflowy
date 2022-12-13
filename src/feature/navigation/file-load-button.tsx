import { Box, Flex, HStack } from '@chakra-ui/react';
import { useNotes } from 'feature/notes/use-notes';
import { BiFile } from 'react-icons/bi';

export const FileLoadButton = () => {
  const notes = useNotes();

  return (
    <Flex
      as="button"
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      onClick={notes.onLoad}
      transition="all 0.2s"
      _active={{ bg: 'gray.600' }}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing="3">
        <BiFile />
        <Box textAlign="start">
          <Box noOfLines={1} fontWeight="semibold">
            {notes.fileName !== null ? notes.fileName : 'Load File'}
          </Box>
          <Box fontSize="xs" color="gray.400">

          </Box>
        </Box>
      </HStack>
    </Flex>
  )
}
