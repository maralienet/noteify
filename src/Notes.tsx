import React, { useState, FormEvent, FC, useEffect } from "react";
import { Tag } from './Tag';
import { Col } from 'react-bootstrap';

import edit from './edit.png';
import deleted from './delete.png';

import notes from './data/notes.json';
import tags from './data/tags.json';

interface NoteState {
    isMenuOpen: boolean;
    noteId: string | null;
    isOnEditing: { [key: string]: boolean };
}
var count = 1;
class Notes extends React.Component<{}, NoteState> {

    state: NoteState = {
        isMenuOpen: false,
        noteId: null,
        isOnEditing: {}
    };

    handleDelete = (noteId: string) => {
        fetch(`http://localhost:3001/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Успешно удалена заметка:', data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    };

    openEdit = (id: string) => {
        this.setState(prevState => ({
            isOnEditing: { ...(prevState.isOnEditing || {}), [id]: !(prevState.isOnEditing && prevState.isOnEditing[id]) }
        }));
    }

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
                                <button className="edit" onClick={() => this.openEdit(el.id)}><img src={edit} /></button>
                                <button className="delete" onClick={() => this.handleDelete(el.id)}><img src={deleted} /></button>
                            </div>
                            {this.state.isOnEditing[el.id] && <NoteFormChange onClose={() => this.openEdit(el.id)} noteId={el.id}/>}
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
        var noteId = (notes as any[])[(notes as any[]).length - 1]["id"];

        var note = {
            id: noteId + 1,
            header: header,
            text: text,
            tagProps: { color: tagProps.split(',')[0], text: tagProps.split(',')[1] }
        };

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
    }

    return (
        <div className="divNoteAdd">
            <form onSubmit={handleSubmit}>
                <h5>Добавление заметки</h5>

                <select className='Select' onChange={(e) => setTagProps(e.target.value)}>
                    {(tags as any[]).map((el) => (
                        <option className='Select__option' value={[el.color, el.text]} key={el.text}>
                            {el.text}
                        </option>
                    ))}
                </select >

                <input type="text" placeholder="Заголовок" value={header} onChange={(e) => setTHeader(e.target.value)} />

                <textarea value={text} placeholder="Текст" onChange={(e) => setText(e.target.value)} required />

                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

interface NoteFormChangeProps {
    onClose: () => void;
    noteId: string;
}
export const NoteFormChange: FC<NoteFormChangeProps> = ({ onClose, noteId }) => {
    const [tagProps, setTagProps] = useState('');
    const [text, setText] = useState('');
    const [header, setTHeader] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/notes/${noteId}`)
            .then(response => response.json())
            .then(data => {
                setTHeader(data.header);
                setText(data.text);
                setTagProps(`${data.tagProps.color},${data.tagProps.text}`);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }, [noteId]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        var note = {
            id: noteId,
            header: header,
            text: text,
            tagProps: { color: tagProps.split(',')[0], text: tagProps.split(',')[1] }
        };

        fetch(`http://localhost:3001/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Успешно обновлена заметка:', data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
        onClose();
    }

    return (
        <div className="divNoteAdd">
            <form onSubmit={handleSubmit}>
                <h5>Изменение заметки</h5>


                <select className='Select' onChange={(e) => setTagProps(e.target.value)}>
                    {(tags as any[]).map((el) => (
                        <option className='Select__option' value={[el.color, el.text]} key={el.text}>
                            {el.text}
                        </option>
                    ))}
                </select >

                <input type="text" placeholder="Заголовок" value={header} onChange={(e) => setTHeader(e.target.value)} />

                <textarea value={text} placeholder="Текст" onChange={(e) => setText(e.target.value)} required />

                <button type="submit">Изменить</button>
            </form>
        </div>
    );
};


export default Notes;