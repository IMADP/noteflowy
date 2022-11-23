import { useRef } from 'react';
import Editable from '../../ui/Editable';
import './Details.css';

function Details({ details, initialEditing = false, onChange, onClickOutside }) {
  const textareaRef = useRef(null);

  return (
    <div className="Details">
      <Editable
        text={details}
        childRef={textareaRef}
        initialEditing={initialEditing}
        onClickOutside={onClickOutside}
        type="textarea"
      >
        <textarea
          ref={textareaRef}
          name="details"
          value={details}
          onChange={onChange}
        />
      </Editable>
    </div>
  )
}

export default Details;
