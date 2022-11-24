import { DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

function UpButton({ parentUrl }) {
  const showLink = parentUrl !== null;
  
  return (
    <>
      {showLink ?
        <Link to={parentUrl}>
          <button>
            <DoubleArrowUpIcon />
          </button>
        </Link>
        :
        <button >
          <DoubleArrowUpIcon color='lightGray' />
        </button>

      }
    </>
  );
}

export default UpButton;
