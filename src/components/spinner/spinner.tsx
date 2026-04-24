import { memo } from 'react';
import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

const MemoizedSpinner = memo(Spinner);
export default MemoizedSpinner;
