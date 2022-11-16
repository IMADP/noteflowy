// https://blog.logrocket.com/building-inline-editable-ui-in-react/
import React, { useState, useEffect } from "react";

/**
 * Component accept text, placeholder values and also pass what type of Input - input, textarea, etc.
 *  so that we can use it for styling accordingly.
 */
const Editable = ({
    text,
    type,
    placeholder,
    children,
    childRef,
    initialEditing = false,
    ...props
  }) => {
  // State to either show the plain value, or the editable element like input, textarea, etc.
  const [isEditing, setEditing] = useState(initialEditing);

  // Focus on reference element (input, textarea, etc.) if isEditing is true.
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  /**
   * Set up document-wide event listener for clicking outside of the editable element.
   * The returned function here will tear down this event listener when the component
   * is "unmounted".
   */
  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  });

  /**
   * @TODO Consider what to do with this handler. Maybe hitting the
   * "Enter" key completes editing. Maybe "Shift" + "Enter" does?
   */
  const handleKeyDown = (event, type) => {};

  // Check if user clicked outside the input or textarea.
  const handleClickOutside = (e) => {
    if (childRef && childRef.current && !childRef.current.contains(e.target)) {
      setEditing(false);
    }
  }

  /**
   * It will display a label is `isEditing` is false
   * It will display the children (input or textarea) if `isEditing` is true
   * when input `onBlur`, we will set the default non edit mode
   * Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
   */
  return (
    <span {...props}>
      {isEditing ? (
        <span
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </span>
      ) : (
        <span
          onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder}
          </span>
        </span>
      )}
    </span>
  );
};

export default Editable;
