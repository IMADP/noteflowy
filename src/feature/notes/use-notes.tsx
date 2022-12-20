import instructionNotes from 'instructions';
import { FileHandle } from 'node:fs/promises';
import { createContext, useContext, useEffect } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from 'uuid';
import { clone, filterNote, findCurrentNote, findNote, findParentUrl, visitNoteTree } from "./notes-util";

/**
 * Note
 * 
 */
export interface Note {
  id: string;
  children: Array<Note>,
  text: string;
  details: string;
  link?: string | null;
  root?: boolean;
  collapsed?: boolean;
  completed?: boolean;
  edit?: boolean;
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
  onLoad: () => void;
  onAdd: (parent: Note) => void;
  onAddSubNote: (parent: Note) => void;
  onUpdate: (note: Note) => void;
  onUpdateAll: (note: Note, updateAction: (note: Note) => void) => void;
  onMove: (sourceId: string, parentId: string) => void;
  onDuplicate: (parent: Note | undefined, note: Note) => void;
  onDelete: (id: string) => void;
}

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
      let [fileHandle] = await (window as any).showOpenFilePicker();
      const file = await fileHandle.getFile();
      const contents = await file.text();
      var data = Object.keys(contents).length > 0 ? JSON.parse(contents) : { root: true, children: [] };
      setFileHandle(fileHandle);
      setRootNote(data);
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
          text: '',
          details: ""
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
          text: '',
          details: ""
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
        draftNote.text = note.text;
        draftNote.details = note.details;
        draftNote.collapsed = note.collapsed;
        draftNote.completed = note.completed;
        draftNote.edit = note.edit;
        draftNote.link = note.link;
      }

    })
  };

  /**
   * Updates all notes and sub notes.
   * 
   * @param {*} notes 
   * @param {*} collapsed 
   */
  const onUpdateAll = (note: Note, updateAction: (note: Note) => void) => {
    setRootNote((draftRootNote) => {
      const results = findNote(draftRootNote, note.id);

      if (results) {
        const draftNote = results.note;

        visitNoteTree(draftNote, (n) => {
          updateAction(n);
        })
      }

    })
  }

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
        targetResults.note.children.push(sourceResults.note);
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
        }
      });

    })
  };
  
  let value = {
    fileName: fileHandle == null ? null : (fileHandle as any).name,
    rootNote,
    currentNote,
    currentNoteParent,
    parentUrl,
    search,
    onLoad,
    onAdd,
    onAddSubNote,
    onUpdate,
    onUpdateAll,
    onMove,
    onDuplicate,
    onDelete
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
