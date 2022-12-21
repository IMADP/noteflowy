import instructionNotes from 'instructions';
import { FileHandle } from 'node:fs/promises';
import { createContext, useContext, useEffect } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from 'uuid';
import { clone, filterNote, findCurrentNote, findNote, findParentUrl, visitNoteTree } from "./note-util";

/**
 * Note
 * 
 */
export interface Note {
  id: string;
  children: Array<Note>,
  title: string;
  content: string;
  root?: boolean;
  index: number;
}

/**
 * NotesContextType
 * 
 */
interface NotesContextType {
  fileName: string | null;
  rootNote: Note;
  currentNote: Note;
  currentNoteParent: Note | undefined;
  parentUrl: string | null;
  search: string | null;
  isEdit: boolean;
  onLoad: () => void;
  onAdd: (parent: Note) => void;
  onAddSubNote: (parent: Note) => void;
  onUpdate: (note: Note) => void;
  onOrder: (note: Note, up: boolean) => void;
  onMove: (sourceId: string, parentId: string) => void;
  onDuplicate: (parent: Note | undefined, note: Note) => void;
  onDelete: (id: string) => void;
  onToggleEdit: () => void;
}

const defaultRootNote: Note = {
  id: uuidv4(),
  title: 'Root',
  content: '',
  index: 0,
  root: true,
  children: [{
    id: uuidv4(),
    title: 'Note Title',
    content: '',
    index: 0,
    root: false,
    children: []
  }]
};

const NotesContext = createContext<NotesContextType>(null!);
export const useNotes = () => useContext(NotesContext);

/**
 * NotesProvider
 * 
 * @param children 
 * @returns NotesProvider
 */
export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileHandle, setFileHandle] = useImmer<FileHandle | null>(null);
  const [rootNote, setRootNote] = useImmer<Note>(instructionNotes);
  const [isEdit, setEdit] = useImmer<boolean>(false);

  // use location path to determine the current note
  const location = useLocation();
  const paths = location.pathname.split('/');
  const noteResult = findCurrentNote(paths, rootNote);
  const currentNoteParent = noteResult.parent;

  // search params are optionally used to filter the note tree
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');
  const search = searchParam == null ? null : decodeURI(searchParam);
  const currentNote = filterNote(search, noteResult.note);

  // find the parent url for upwards navigation
  const parentUrl = findParentUrl(currentNoteParent, paths, search);

  /**
   * This effect will save the notes state to a file on change.
   * 
   */
  useEffect(() => {

    // do nothing if there is no file loaded
    if (fileHandle == null) {
      return;
    }

    // create an async function to write to a file
    const writeData = async () => {
      const writable = await (fileHandle as any).createWritable();
      await writable.write(JSON.stringify(rootNote));
      await writable.close();
    }

    writeData();
  }, [fileHandle, rootNote]);

  /**
   * Loads a file and parses the notes data.
   * 
   */
  const onLoad = () => {
    const onLoadAsync = async () => {

      // get the file handle and parse the root note
      const [fileHandle] = await (window as any).showOpenFilePicker();
      const file = await fileHandle.getFile();
      const contents = await file.text();
      const root = Object.keys(contents).length > 0 ? JSON.parse(contents) : defaultRootNote;

      setRootNote(root); 
      setFileHandle(fileHandle);
    }
    onLoadAsync();
  };

  /**
   * Adds a new note to the note list.
   * 
   * @param {*} note 
   */
  const onAdd = (parent: Note) => {
    setRootNote((draftRootNote) => {
      const results = findNote(draftRootNote, parent.id);

      if (results) {
        const draftNote = results.note;

        draftNote.children.push({
          id: uuidv4(),
          children: [],
          title: '',
          content: '',
          index: draftNote.children.length
        });
      }
    })
  };

  /**
   * Adds a sub note to a parent note.
   * 
   * @param {*} parent 
   */
  const onAddSubNote = (parent: Note) => {
    setRootNote((draftRootNote) => {
      const results = findNote(draftRootNote, parent.id);

      if (results) {
        const note = results.note;

        note.children.push({
          id: uuidv4(),
          children: [],
          title: '',
          content: '',
          index: note.children.length
        });
      }

    })
  };

  /**
   * Updates the note contents.
   * 
   * @param {*} note 
   */
  const onUpdate = (note: Note) => {
    setRootNote((draftRootNote) => {
      const results = findNote(draftRootNote, note.id);

      if (results) {
        const draftNote = results.note;
        draftNote.title = note.title;
        draftNote.content = note.content;
      }

    })
  };

  /**
   * Orders a note by moving it up or down.
   * 
   * @param {*} note 
   */
  const onOrder = (note: Note, up: boolean) => {
    setRootNote((draftRootNote) => {
      const results = findNote(draftRootNote, note.id);

      if (results) {
        const draftNote = results.note;
        draftNote.index = up ? note.index - 1.5 : note.index + 1.5;

        // resort and reindex as whole numbers
        const draftNoteParent = results.parent || draftRootNote;
        draftNoteParent.children = draftNoteParent.children.sort((a, b) => a.index - b.index);
        draftNoteParent.children.forEach((c, i) => c.index = i);
      }

    })
  };

  /**
   * Moves a note from one parent to another.
   * 
   * @param {*} sourceId 
   * @param {*} parentId 
   */
  const onMove = (sourceId: string, parentId: string) => {
    setRootNote((draftRootNote) => {

      // do nothing if source and destination are the same
      if (sourceId === parentId) {
        return;
      }

      // find the source note and target note
      const sourceResults = findNote(draftRootNote, sourceId);
      const targetResults = findNote(draftRootNote, parentId);

      // remove from original parent and add to new parent
      if (sourceResults && sourceResults.parent && targetResults) {
        sourceResults.parent.children = sourceResults.parent.children.filter(n => n.id !== sourceId);
        sourceResults.parent.children = sourceResults.parent.children.sort((a, b) => a.index - b.index);
        sourceResults.parent.children.forEach((c, i) => c.index = i);

        targetResults.note.children.push(sourceResults.note);
        targetResults.note.children = targetResults.note.children.sort((a, b) => a.index - b.index);
        targetResults.note.children.forEach((c, i) => c.index = i);
      }

    })
  };

  /**
   * Duplicates a note and all sub notes.
   * 
   * @param {*} parent 
   * @param {*} note 
   */
  const onDuplicate = (parent: Note | undefined, note: Note) => {

    // deep clone the note and all sub notes
    const duplicateNote = clone(note);

    // update note and sub notes with new ids
    visitNoteTree(duplicateNote, (child) => {
      child.id = uuidv4();
    })

    setRootNote((draftRootNote) => {
      // find the parent and add to the list of children
      const results = findNote(draftRootNote, parent === undefined ? rootNote.id : parent.id);

      if (results) {
        const parentNote = results.note;
        parentNote.children.push(duplicateNote);
        parentNote.children = parentNote.children.sort((a, b) => a.index - b.index);
        parentNote.children.forEach((c, i) => c.index = i);
      }

    })
  };

  /**
   * Deletes a note by id.
   * 
   * @param {*} id 
   */
  const onDelete = (id: string) => {
    setRootNote((draftRootNote) => {
      // look for a child note and remove it from its parent
      visitNoteTree(draftRootNote, (child, parent) => {
        if (parent && child.id === id) {
          parent.children = parent.children.filter(childNote => childNote.id !== id);
          parent.children = parent.children.sort((a, b) => a.index - b.index);
          parent.children.forEach((c, i) => c.index = i);
        }
      });

    })
  };

  /**
   * Sets the edit flag.
   * 
   */
  const onToggleEdit = () => {
    setEdit(!isEdit);
  };

  let value = {
    fileName: fileHandle == null ? null : (fileHandle as any).name,
    rootNote,
    currentNote,
    currentNoteParent,
    parentUrl,
    search,
    isEdit,
    onLoad,
    onAdd,
    onAddSubNote,
    onUpdate,
    onOrder,
    onMove,
    onDuplicate,
    onDelete,
    onToggleEdit
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
