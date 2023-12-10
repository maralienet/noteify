import React from 'react';
import logo from './logo.png';
import './style.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { Tags, AddTag } from './Tag';
import Notes, { AddNote } from './Notes';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        <h1>Noteify</h1>
      </header>
      <Container>
        <Row>
          <Tags />
          <AddTag />
        </Row>
        <Row>
          <Notes />
        </Row>
      </Container>
      <AddNote />
    </div>
  );
}

export default App;
