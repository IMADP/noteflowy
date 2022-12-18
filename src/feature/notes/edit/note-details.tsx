import { IconButton } from '@chakra-ui/button';
import { Box, Center, Divider, Flex, Stack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BiArrowFromTop, BiArrowFromLeft, BiCopyAlt, BiBold, BiItalic, BiUnderline, BiStrikethrough, BiLinkAlt, BiEraser, BiCodeAlt } from 'react-icons/bi';
import {
  BaseEditor,
  Descendant,
  createEditor,
  Editor,
  Transforms
} from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { Note, useNotes } from '../use-notes';

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface NoteDetailsProps {
  note: Note;
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {
  const notes = useNotes();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [details, setDetails] = useState<Descendant[]>(note.details);

  useEffect(() => {
    editor.children = note.details;
    editor.onChange();
  }, [note]);

  const renderElement = useCallback((props: any) => {
      switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'bold':
        return <BoldElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  
  return (
    <Slate editor={editor} value={details} onChange={(v) => setDetails(v)} >
      <Box tabIndex={1} px={4} py={3} borderRadius={8} border='1px' borderColor='gray.200'>
        <Flex color='black' mr="10">
          <Stack direction='row' spacing={1}>

          <Tooltip hasArrow label='Bold'>
              <IconButton
              onClick={() => {
                const [match] = Editor.nodes(editor, {
                  match: n => Editor.isBlock(editor, n) && n.type === 'code'
                })
                // Toggle the block type depending on whether there's already a match.
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: n => Editor.isBlock(editor, n) }
                )
              }}
                size='xs'
                variant='outline'
                color='gray'
                aria-label='Bold'
                icon={<BiBold />}
              />
            </Tooltip>

            <Tooltip hasArrow label='Italic'>
              <IconButton
                size='xs'
                variant='outline'
                color='gray'
                aria-label='Italic'
                icon={<BiItalic />}
              />
            </Tooltip>

            <Tooltip hasArrow label='Underline'>
              <IconButton
                size='xs'
                variant='outline'
                color='gray'
                aria-label='Underline'
                icon={<BiUnderline />}
              />
            </Tooltip>

            <Tooltip hasArrow label='Strikethrough'>
              <IconButton
                size='xs'
                variant='outline'
                color='gray'
                aria-label='Strikethrough'
                icon={<BiStrikethrough />}
              />
            </Tooltip>

            <Center height='1.5rem' px='2'>
              <Divider color='black' orientation='vertical' />
            </Center>

            <Tooltip hasArrow label='Code'>
              <IconButton
              onClick={() => {
                const [match] = Editor.nodes(editor, {
                  match: n => Editor.isBlock(editor, n) && n.type === 'code'
                })
                // Toggle the block type depending on whether there's already a match.
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: n => Editor.isBlock(editor, n) }
                )
              }}
                size='xs'
                variant='outline'
                color='gray'
                aria-label='Bold'
                icon={<BiCodeAlt />}
              />
            </Tooltip>

            <Tooltip hasArrow label='Link'>
              <IconButton
                size='xs'
                variant='outline'
                color='gray'
                aria-label='Link'
                icon={<BiLinkAlt />}
              />
            </Tooltip>


          </Stack>
        </Flex>
        <Divider my='2' />
        <Box color='grey'>
          <Editable renderElement={renderElement}
            spellCheck={false} onBlur={() => notes.onUpdate({ ...note, details })} />
        </Box>
      </Box>
    </Slate>
  );
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const BoldElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <strong>{props.children}</strong>
    </pre>
  )
}

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}