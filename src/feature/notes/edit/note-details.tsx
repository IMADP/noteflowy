import { IconButton } from '@chakra-ui/button';
import { Box, Center, Divider, Flex, Spacer, Stack } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { BiBold, BiCodeAlt, BiItalic, BiLinkAlt, BiStrikethrough, BiUnderline } from 'react-icons/bi';
import {
  BaseEditor, createEditor, Descendant, Editor, Transforms
} from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react';
import { Note, useNotes } from '../use-notes';

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = { text: string, bold?: boolean; italic?: boolean }

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

  // editor initialization
  const renderLeaf = useCallback((props: LeafProps) => <Leaf {...props} />, [])
  const renderElement = useCallback((props: ElementProps) => <Element {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [details, setDetails] = useState<Descendant[]>(note.details);

  // effect to update the editor on external note changes
  useEffect(() => {
    editor.children = note.details;
    editor.onChange();
  }, [note]);

  return (
    <Slate editor={editor} value={details} onChange={(v) => setDetails(v)} >
      <Box tabIndex={1} px={4} py={3} borderRadius={8} border='1px' borderColor='gray.200'>
        <Flex color='black' mr="10">
          <Stack direction='row' spacing={1}>

            <MarkButton title='Bold' format='bold' icon={<BiBold />} />
            <MarkButton title='Italic' format='italic' icon={<BiItalic />} />
            <MarkButton title='Underline' format='underline' icon={<BiUnderline />} />
            <MarkButton title='Strikethrough' format='strikethrough' icon={<BiStrikethrough />} />
            <MarkButton title='Code' format='code' icon={<BiCodeAlt />} />

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
        <Spacer my='3' />
        <Box color='grey'>
          <Editable renderLeaf={renderLeaf}
            renderElement={renderElement}
            autoFocus={true}
            placeholder='Note contents'
            spellCheck={false} onBlur={() => notes.onUpdate({ ...note, details })} />
        </Box>
      </Box>
    </Slate>
  );
}

const toggleMark = (editor: BaseEditor & ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor: BaseEditor & ReactEditor, format: string) => {
  const marks = Editor.marks(editor);
  console.log(marks);
  return marks ? (marks as any)[format] === true : false
}

interface MarkButtonProps {
  title: string;
  format: any;
  icon: ReactElement;
}

const MarkButton = ({ title, format, icon }: MarkButtonProps) => {
  const editor = useSlate();

  return (
    <Tooltip hasArrow label={title}>
      <IconButton
        size='xs'
        variant='outline'
        color='gray'
        aria-label={title}
        isActive={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
        icon={icon}
      />
    </Tooltip>
  )
}

interface ElementProps {
  attributes: any;
  children: any;
  element: any;
}

const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'code':
      return (
        <pre style={style} {...attributes}>
          {children}
        </pre>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

interface LeafProps {
  attributes: any;
  children: any;
  leaf: any;
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}