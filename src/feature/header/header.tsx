import { ButtonGroup, Container, Flex, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { EditButton } from './edit-button';
import { MoveButton } from './move-button';
import { UpButton } from './up-button';

export const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [query, setQuery] = useImmer(search === null ? '' : search);

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