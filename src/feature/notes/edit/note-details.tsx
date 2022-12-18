import { Box } from '@chakra-ui/layout';
import { useEffect, useMemo, useState } from 'react'
import {
  BaseEditor,
  Descendant,
  createEditor,
  Editor
} from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { Note, useNotes } from '../use-notes';

type CustomElement = { type: 'paragraph'; children: CustomText[] }
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

  return (
    <Slate editor={editor} value={details} onChange={(v) => setDetails(v)} >
      <Box tabIndex={1} px={4} py={2} borderRadius={8} border='1px' borderColor='gray.200'>
        <Editable onBlur={() => notes.onUpdate({ ...note, details })} />
      </Box>
    </Slate>
  );
}
