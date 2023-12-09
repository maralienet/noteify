import React, { useState, FormEvent, FC } from "react";
import { Tag } from './Tag';
import { Col } from 'react-bootstrap';

import notes from './data/notes.json';

var count = 1;
class Notes extends React.Component {
    render() {
        if ((notes as any[]).length > 0) {
            return (
                (notes as any[]).map((el) => (
                    <Col lg={6} xs={12}>
                        <div className="note" style={{ border: `2.5px solid ${el.tagProps && el.tagProps.color}` }} key={count++}>
                            <div className="content">
                                <Tag {...el.tagProps} />
                                {el.header && <h5>{el.header}</h5>}
                                <p>{el.text}</p>
                            </div>
                            <div className="menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="26" viewBox="0 0 6 26" fill="none">
                                    <circle cx="3" cy="3" r="3" fill="#D9D9D9" />
                                    <circle cx="3" cy="13" r="3" fill="#D9D9D9" />
                                    <circle cx="3" cy="23" r="3" fill="#D9D9D9" />
                                </svg>
                            </div>
                        </div>
                    </Col>
                ))
            );
        }
        else {
            return (
                <div className="noNotes">
                    <h2>Заметок нет</h2>
                </div>
            );
        }
    }
}

export const AddNote = () => {
    const [isOpen, setIsOpen] = useState(false);
    let isOp = isOpen;
    return (
        <>
            <div className="circle" onClick={() => setIsOpen(!isOp)}>
                <span>+</span>
            </div>
            {isOpen && <NoteForm onClose={() => setIsOpen(false)} />}
        </>
    )
}
interface NoteFormProps {
    onClose: () => void;
}

export const NoteForm: FC<NoteFormProps> = ({ onClose }) => {
    const [tagProps, setTagProps] = useState('');
    const [text, setText] = useState('');
    const [header, setTHeader] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        var note = { header: header, text: text, tagProps:tagProps };

        fetch('http://localhost:3001/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Успешно добавлена заметка:', data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });


        onClose();
    };

    return (
        <div className="divNoteAdd">
            <form onSubmit={handleSubmit}>
                <h5>Добавление заметки</h5>
                <input type="text" value={tagProps} onChange={(e) => setTagProps(e.target.value)} />

                <input type="text" placeholder="Заголовок" value={header} onChange={(e) => setTHeader(e.target.value)} required />

                <textarea value={text} placeholder="Текст" onChange={(e) => setText(e.target.value)} />
                
                <button type="submit">Добавить</button>
            </form>
        </div>

    );
};


export default Notes;