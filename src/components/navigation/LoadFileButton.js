
function LoadFileButton({ fileHandle, onLoad }) {
    return (
        <button className='Button' onClick={onLoad}>
            {fileHandle !== null ? fileHandle.name : 'Load File'}
        </button>
    );
}

export default LoadFileButton;
