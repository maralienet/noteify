import React from "react";
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
    return (
      <div className="circle">
        <span>+</span>
      </div>
    )
  }

export default Notes;