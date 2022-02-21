import { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Modal from "./components/Modal";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Board from './components/Board';
import Roadmap from './components/Roadmap';
import Navigation from './components/Navigation';
import { DataContext } from './context';
import { updateStorage } from './utils';

import './main.css';


function App() {
  const location = useLocation();
  const {boards, setBoards} = useContext(DataContext);
  const [previousLocation, setPreviousLocation] = useState(location);
  // function addBoard(title) {
  //   boards.push({
  //     id: Date.now(),
  //     title,
  //     lists: []
  //   })
  // }

  // const data = [
  //   {id: 1, list: []},
  //   {id: 2, list: []},
  //   {id: 3, list: [2, 4, 5]},
  // ]

  // const Element = () => {
  //   const needed = data.filter(el => el.id === id);
  //   el.list.push(4);
  // }

  useEffect(() => {
    setBoards(JSON.parse(localStorage.getItem('boards')))
    console.log('boards downloaded')
  }, []);

  useEffect(() => {
    updateStorage(boards);
    console.log('boards updated')
  }, [boards]);

  useEffect(() => {
    if (!(location.state && location.state.modal)) {
      setPreviousLocation(location);
    }
  }, [location]);

  const isModal = (
    location.state &&
    location.state.modal &&
    previousLocation !== location
  );

  return (
    <>
      <Navigation />
      <Routes  location={isModal ? previousLocation : location}>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contacts" element={<Contact />} />
        <Route exact path="/roadmap" element={<Roadmap />} />

        <Route path="/b/:boardId" element={<Board/>} />
        <Route path="/b/:boardId/l/:listId/c/:cardId" element={<Modal isModal={isModal}/>} />
      </Routes>
      <Routes>
        {isModal
          ? <Route path="/b/:boardId/l/:listId/c/:cardId" element={<Modal isModal={isModal}/>} />
          : null
        }
      </Routes>
    </>
  );
}

{/* <Routes  location={isModal ? previousLocation : location}>
<Route exact path="/about" element={<About />} />
<Route exact path="/" element={<Home />} />
<Route path="/b/:id" element={<Board/>} />
<Route exact path="/contact" element={<Contact />} />
<Route exact path="/b/:boardId/l/:listId/c/:cardId" element={<Modal isModal={isModal}/>} />
</Routes>
<Routes>
{isModal
  ? <Route exact path="/b/:boardId/l/:listId/c/:cardId" element={<Modal isModal={isModal}/>} />
  : null
}
</Routes> */}


export default App;
