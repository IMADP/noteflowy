import { theme } from '@chakra-ui/pro-theme';
import { Box, ChakraProvider, Divider, Flex, Stack } from '@chakra-ui/react';
import { Header } from 'feature/header/header';
import { Navigation } from 'feature/navigation/navigation';
import { NoteRoot } from 'feature/notes/note-root';
import { NotesProvider } from 'feature/notes/use-notes';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider theme={theme}>
          <NotesProvider>
            <Box height="100vh" overflow="hidden" position="relative">
              <Flex h="full" id="app-container">
                <Navigation />
                <Stack flex="1" overflow="auto" spacing="0">
                  <Header />
                  <Divider />
                  <NoteRoot />
                </Stack>
              </Flex>
            </Box>
          </NotesProvider>
        </ChakraProvider>
      </DndProvider>
    </Router>
  </React.StrictMode>
);
