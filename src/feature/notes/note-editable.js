import React from 'react';
import ReactContentEditable from 'react-contenteditable';

/**
 * https://github.com/lovasoa/react-contenteditable/issues/161
 * 
 * This component is taken to fix all the wacky bugs associated with using this component
 * and react, which doesn't work well with hooks and contenteditable. I don't know how to convert it to .tsx
 * 
 * @param {*} param0 
 * @returns 
 */
export default function NoteEditable({
  onChange,
  onInput,
  onBlur,
  onKeyPress,
  onKeyDown,
  ...props
}) {
  const onChangeRef = React.useRef(onChange);
  const onInputRef = React.useRef(onInput);
  const onBlurRef = React.useRef(onBlur);
  const onKeyPressRef = React.useRef(onKeyPress);
  const onKeyDownRef = React.useRef(onKeyDown);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React.useEffect(() => {
    onInputRef.current = onInput;
  }, [onInput]);
  React.useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);
  React.useEffect(() => {
    onKeyPressRef.current = onKeyPress;
  }, [onKeyPress]);
  React.useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  return (
    <ReactContentEditable
      {...props}
      onChange={
        onChange
          ? (...args) => {
              if (onChangeRef.current) {
                onChangeRef.current(...args);
              }
            }
          : undefined
      }
      onInput={
        onInput
          ? (...args) => {
              if (onInputRef.current) {
                onInputRef.current(...args);
              }
            }
          : undefined
      }
      onBlur={
        onBlur
          ? (...args) => {
              if (onBlurRef.current) {
                onBlurRef.current(...args);
              }
            }
          : undefined
      }
      onKeyPress={
        onKeyPress
          ? (...args) => {
              if (onKeyPressRef.current) {
                onKeyPressRef.current(...args);
              }
            }
          : undefined
      }
      onKeyDown={
        onKeyDown
          ? (...args) => {
              if (onKeyDownRef.current) {
                onKeyDownRef.current(...args);
              }
            }
          : undefined
      }
    />
  );
}
