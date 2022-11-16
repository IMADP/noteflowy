import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './NoteDeleteDialog.css';

const NoteDeleteDialog = ({ children, note, onDelete }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      {children}
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">Are you sure?</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          This will delete the note and subnotes.
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="Button red" onClick={() => onDelete(note.id)}>Yes, delete note</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default NoteDeleteDialog;