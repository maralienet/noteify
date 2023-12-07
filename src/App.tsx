import React, { ComponentType } from 'react';
import logo from './logo.png';
import './style.scss';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        <h1>Noteify</h1>
      </header>
      <Container>
        <Row>
          <Tag color='#6978FF' text='Мысли' />
        </Row>
        <Row>
          <Col lg={6} xs={12}>
            <Note tag={Tag} tagProps={{ color: '#6978FF', text: "Мысли" }} header="На суп" text='лук \n картошка \n мясо' />
          </Col>
          <Col lg={6} xs={12}>
            <Note tag={Tag} tagProps={{ color: '#6978FF', text: "Мысли" }} header="На суп" text='лук \n картошка \n мясо' />
          </Col>
        </Row>
      </Container>
      <AddButton />
    </div>
  );
}

export default App;

const Tag = ({ color, text }: { color: string, text: string }) => {
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

interface TagProps {
  color: string;
  text: string;
}

interface NoteProps {
  tag: ComponentType<TagProps>;
  tagProps: TagProps;
  header: string;
  text: string;
}

const Note: React.FC<NoteProps> = ({ tag: Component, tagProps, header, text }) => {
  const { color } = tagProps;
  return (
    <div className="note" style={{ border: `2.5px solid ${color}` }}>
      <div className="content">
        <Component {...tagProps} />
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

const AddButton = () => {
  return (
    <div className="circle">
      <span>+</span>
    </div>
  )
}