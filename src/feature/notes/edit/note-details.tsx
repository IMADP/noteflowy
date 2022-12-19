import { IconButton } from '@chakra-ui/button';
import { Box, Center, Divider, Flex, Spacer, Stack } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { ReactElement, useEffect } from 'react';
import { BiBold, BiCodeAlt, BiItalic, BiLinkAlt, BiStrikethrough, BiUnderline } from 'react-icons/bi';
import { Note, useNotes } from '../use-notes';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';



interface NoteDetailsProps {
  note: Note;
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {
  const notes = useNotes();

  
  // effect to update the editor on external note changes
  useEffect(() => {
    editor?.commands.setContent(note.details);
  }, [note]);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: note.details,
  })

  if (!editor) {
    return null
  }


  return (
    <Box tabIndex={1} px={4} py={3} borderRadius={8} border='1px' borderColor='gray.200'>
      <Flex color='black' mr="10">
        <Stack direction='row' spacing={1}>

          <MarkButton editor={editor} title='Bold' format='bold' icon={<BiBold />} />
          <MarkButton editor={editor} title='Italic' format='italic' icon={<BiItalic />} />
          <MarkButton editor={editor} title='Underline' format='underline' icon={<BiUnderline />} />
          <MarkButton editor={editor} title='Strikethrough' format='strikethrough' icon={<BiStrikethrough />} />
          <MarkButton editor={editor} title='Code' format='code' icon={<BiCodeAlt />} />

          <Center height='1.5rem' px='2'>
            <Divider color='black' orientation='vertical' />
          </Center>

          <Tooltip hasArrow label='Code'>
            <IconButton
              onClick={() => { }}
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
      <Box color='grey' my="1">
        <EditorContent editor={editor}
            placeholder='Note contents'
            spellCheck={false} 
            onBlur={() => notes.onUpdate({ ...note, details: editor?.getHTML() || note.details})} />
      </Box>
    </Box>
  );
}

interface MarkButtonProps {
  title: string;
  format: any;
  icon: ReactElement;
  editor: Editor;
}

const MarkButton = ({ editor, title, format, icon }: MarkButtonProps) => {
  return (
    <Tooltip hasArrow label={title}>
      <IconButton
        size='xs'
        variant='outline'
        color='gray'
        aria-label={title}
        isActive={editor.isActive('bold')}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onMouseDown={() => editor.chain().focus().toggleBold().run()}
        icon={icon}
      />
    </Tooltip>
  )
}
