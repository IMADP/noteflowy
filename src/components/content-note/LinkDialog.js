import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import './LinkDialog.css';


const LinkDialog = ({children, note, onUpdate}) => {
    const [url, setUrl] = useState('https://');

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Add URL</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Set the URL this note will link to
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <input className="Input" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </fieldset>
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="Button green" onClick={() => onUpdate({...note, link: url })}>Save changes</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton2" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default LinkDialog;