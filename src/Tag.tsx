import React from "react";

export interface TagProps {
    color: string;
    text: string;
  }
  
  const Tag: React.FC<TagProps> = ({ color, text }) => {
    return (
      <div className="tag">
        <div className="inner">
          <div className="flag">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M10 16V0H0V16L5 10.5085L10 16Z" fill={color} />
            </svg>
          </div>
          <div className="name">
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }

export default Tag;