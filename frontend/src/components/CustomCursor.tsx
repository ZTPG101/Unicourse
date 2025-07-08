import React, { useEffect } from 'react';
import './Cursor.css';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    const cursorTwo = document.createElement('div');
    cursor.className = 'custom-cursor__cursor';
    cursorTwo.className = 'custom-cursor__cursor-two';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTwo);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorTwo.style.left = e.clientX + 'px';
      cursorTwo.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      document.body.removeChild(cursorTwo);
    };
  }, []);

  return null;
};

export default CustomCursor;