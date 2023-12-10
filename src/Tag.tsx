import React, { useState, FormEvent, FC } from 'react';
import tags from './data/tags.json';

export interface TagProps {
  color: string;
  text: string;
}

export const Tag: React.FC<TagProps> = ({ color, text }) => {
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

var count = 1;
export const Tags = () => {
  return (
    <>
      {(tags as any[]).map((el) => (
        <Tag color={el.color} text={el.text} key={count++} />
      ))}
    </>
  );
}

export const AddTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  let isOp = isOpen;
  return (
    <>
      <div className='addTag' onClick={() => setIsOpen(!isOp)}>
        <span>+</span>
      </div>
      {isOpen && <TagForm onClose={() => setIsOpen(false)} />}
    </>
  )
}

interface TagFormProps {
  onClose: () => void;
}

export const TagForm: FC<TagFormProps> = ({ onClose }) => {
  const [color, setColor] = useState('#000000');
  const [text, setText] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    var tag = { color: color, text: text };
    
    fetch('http://localhost:3001/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Успешно добавлен тег:', data);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });


    onClose();
  };

  return (
    <div className="divTagAdd">
      <form onSubmit={handleSubmit}>
        <h5>Добавление тега</h5>
        <label htmlFor='text'>
          Название:
        </label>
        <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} required />

        <label htmlFor='color'>
          Цвет:
        </label>
        <input type="color" name='color' value={color} onChange={(e) => setColor(e.target.value)} />
        <button type="submit">Добавить</button>
      </form>
    </div>

  );
};