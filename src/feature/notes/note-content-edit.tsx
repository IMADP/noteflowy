import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Divider, Flex, Spacer, Stack } from '@chakra-ui/layout';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactElement, useEffect, useRef } from 'react';
import { BiBold, BiCode, BiCodeBlock, BiCopyAlt, BiEraser, BiItalic, BiListOl, BiListUl, BiRedo, BiStrikethrough, BiUnderline, BiUndo } from 'react-icons/bi';
import { NoteContentEditLink } from './note-content-edit-link';
import { Note, useNotes } from './use-notes';

interface NoteContentEditProps {
  note: Note;
  noteParent?: Note;
}

export const NoteContentEdit = ({ note, noteParent }: NoteContentEditProps) => {
  const notes = useNotes();
  const cancelRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    notes.onDelete(note.id);
    onClose();
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: note.content,
  })

  // effect to update the editor on external note changes
  useEffect(() => {
    const editorContent = editor?.getHTML() || '';
    const noteContent = note.content;

    // this is necessary to prevent the content from changing focus unnecessarily
    if (editorContent !== noteContent) {
      editor?.commands.setContent(note.content);
    }
  }, [note, editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box tabIndex={1} px={4} py={3} borderRadius={8} border='1px' borderColor='gray.200'>
      <Flex color='black' mr="10">
        <Stack direction='row' spacing={1}>

          <MarkButton
            title='Bold'
            icon={<BiBold />}
            active={editor.isActive('bold')}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            onClick={() => editor.chain().focus().toggleBold().run()} />

          <MarkButton
            title='Italic'
            icon={<BiItalic />}
            active={editor.isActive('italic')}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            onClick={() => editor.chain().focus().toggleItalic().run()} />

          <MarkButton
            title='Underline'
            icon={<BiUnderline />}
            active={editor.isActive('underline')}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            onClick={() => editor.chain().focus().toggleUnderline().run()} />

          <MarkButton
            title='Strikethrough'
            icon={<BiStrikethrough />}
            active={editor.isActive('strike')}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            onClick={() => editor.chain().focus().toggleStrike().run()} />

          <MarkButton
            title='Code'
            icon={<BiCode />}
            active={editor.isActive('code')}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            onClick={() => editor.chain().focus().toggleCode().run()} />

          <Center height='1.5rem' px='2'>
            <Divider color='black' orientation='vertical' />
          </Center>

          <MarkButton
            title='Bullet List'
            icon={<BiListUl />}
            active={editor.isActive('bulletList')}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            onClick={() => editor.chain().focus().toggleBulletList().run()} />

          <MarkButton
            title='Ordered List'
            icon={<BiListOl />}
            active={editor.isActive('orderedList')}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            onClick={() => editor.chain().focus().toggleOrderedList().run()} />

          <MarkButton
            title='Code Block'
            icon={<BiCodeBlock />}
            active={editor.isActive('codeBlock')}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()} />

          <Center height='1.5rem' px='2'>
            <Divider color='black' orientation='vertical' />
          </Center>

          <NoteContentEditLink editor={editor} />

          <Center height='1.5rem' px='2'>
            <Divider color='black' orientation='vertical' />
          </Center>

          <MarkButton
            title='Undo'
            icon={<BiUndo />}
            active={editor.isActive('codeBlock')}
            disabled={!editor.can().chain().focus().undo().run()}
            onClick={() => editor.chain().focus().undo().run()} />

          <MarkButton
            title='Redo'
            icon={<BiRedo />}
            active={editor.isActive('codeBlock')}
            disabled={!editor.can().chain().focus().redo().run()}
            onClick={() => editor.chain().focus().redo().run()} />

          <Center height='1.5rem' px='2'>
            <Divider color='black' orientation='vertical' />
          </Center>

          <MarkButton
            title='Clone Note'
            icon={<BiCopyAlt />}
            active={false}
            disabled={false}
            onClick={() => notes.onDuplicate(noteParent, note)} />

          <MarkButton
            title='Delete Note'
            icon={<BiEraser />}
            active={false}
            disabled={false}
            onClick={onOpen} />

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Note
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? This will delete the note and all sub-notes.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={onDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

        </Stack>
      </Flex>
      <Spacer my='3' />
      <Box color='grey' my="1">
        <EditorContent editor={editor}
          placeholder='Note contents'
          spellCheck={false}
          onBlur={() => notes.onUpdate({ ...note, content: editor?.getHTML() || note.content })}
        />
      </Box>
    </Box>
  );
}

interface MarkButtonProps {
  title: string;
  icon: ReactElement;
  active: boolean;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const MarkButton = ({ title, icon, active, disabled, onClick }: MarkButtonProps) => {
  return (
    <Tooltip hasArrow label={title}>
      <IconButton
        size='xs'
        variant='outline'
        color='gray'
        aria-label={title}
        isActive={active}
        disabled={disabled}
        onClick={onClick}
        icon={icon}
      />
    </Tooltip>
  )
}
