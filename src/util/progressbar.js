import React, { useState } from 'react';
import '../style/progressbar.css';

export default function Progressbar({count}) {
  const [filled, setFilled] = useState(0);

  const handleRunClick = () => {
    if (filled !== 100) {
        setFilled(prev => prev + 20);
    }
    // Increase the progress by 20%
    

    // If the progress reaches 100%, reset it to 0

    
  };

  return (
    <div>
        
      <div className="progressbar div-with-lines fire-animation" style={{ backgroundColor: 'white' }}>
        <div className='flame'
          style={{
            height: '100%',
            width: `${filled}%`,
            backgroundColor: 'red',
            transition: 'width 0.5s',
          }}
        ></div>

        <span className="progressPercent">{filled/20}🔥</span>
      </div>
      <button className="btn" onClick={handleRunClick}>
        Run
      </button>
    </div>
  );
}
