import { Button, IconButton } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';
import { Editor } from '@tiptap/react';
import { useCallback, useRef } from 'react';
import { BiLinkAlt } from 'react-icons/bi';


interface NoteContentEditorLinkProps {
  editor: Editor;
}

export const NoteContentEditorLink = ({ editor }: NoteContentEditorLinkProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const isActive = editor.isActive('link');
  const unsetLink = () => editor.chain().focus().unsetLink().run();

  const setLink = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;

    // cancelled
    if (url === null) {
      onClose();
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      onClose();
      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    onClose();
  }, [editor]);

  return (
    <>

      <Tooltip hasArrow label='Link'>
        <IconButton
          size='xs'
          variant='outline'
          color='gray'
          aria-label='Link'
          isActive={isActive}
          onClick={isActive ? unsetLink : onOpen}
          icon={<BiLinkAlt />}
        />
      </Tooltip>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={setLink}>
            <ModalHeader>Add a URL</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input name='url' ref={initialRef} defaultValue='https://' />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
