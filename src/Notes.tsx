import React from "react";
import Tag, { TagProps } from './Tag';

interface NotesProps {
    header?: string;
    text: string;
    tagProps: TagProps;
}

class Notes extends React.Component<NotesProps> {
    render() {
        const { header, text, tagProps } = this.props;
        return (
            <div className="note" style={{ border: `2.5px solid ${tagProps.color}` }}>
                <div className="content">
                    <Tag {...tagProps} />
                    {header && <h5>{header}</h5>}
                    <p>{text}</p>
                </div>
                <div className="menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="26" viewBox="0 0 6 26" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#D9D9D9" />
                        <circle cx="3" cy="13" r="3" fill="#D9D9D9" />
                        <circle cx="3" cy="23" r="3" fill="#D9D9D9" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default Notes;