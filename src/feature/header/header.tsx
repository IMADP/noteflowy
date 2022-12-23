import { ButtonGroup, Container, Flex, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useNotes } from 'feature/notes/use-notes';
import { isEqual } from 'lodash';
import { useEffect, useMemo } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { EditButton } from './edit-button';
import { MoveButton } from './move-button';
import { RevertButton } from './revert-button';
import { SaveButton } from './save-button';
import { UpButton } from './up-button';

export const Header = () => {
  const notes = useNotes();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [query, setQuery] = useImmer(search === null ? '' : search);

  // cache the comparison for unsaved changes unless there are changes made
  const isUnsaved = useMemo(() => {
    return notes.fileRootNote != null && !isEqual(notes.fileRootNote, notes.rootNote);
  }, [notes.fileRootNote, notes.rootNote]);

  // this effect will reset the search bar when navigating away
  useEffect(() => {
    if (searchParams.get('search') == null) {
      setQuery('');
    }
  }, [location, searchParams, setQuery]);

  /**
   * Sets the query from the input and navigates to a search url.
   * 
   * @param {*} q 
   */
  const onChange = (q: string) => {
    setQuery(q);
    setSearchParams({ search: q });
  };

  return (
    <Container m="0" py="3" maxWidth='100%' >
      <Flex justify="space-between">

        <ButtonGroup variant="ghost" spacing="1">
          <UpButton />
          <EditButton />
          <MoveButton />
          {isUnsaved &&
            <>
              <SaveButton />
              <RevertButton />
            </>
          }
        </ButtonGroup>

        <InputGroup maxW="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={BiSearchAlt} color="muted" boxSize="5" />
          </InputLeftElement>
          <Input value={query} onChange={(e) => onChange(e.target.value)} placeholder="Search" />
        </InputGroup>

      </Flex>
    </Container>

  )
}