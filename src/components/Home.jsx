import { Link } from "react-router-dom";
import { useState, useContext, useMemo } from 'react';
import { DataContext } from './../context';
import { updateStorage } from './../utils';

const Home = () => {
    const [title, setTitle] = useState('');
    const { boards, setBoards } = useContext(DataContext);
    //const value = useMemo(() => {boards, setBoards}, [boards, setBoards])


    function addBoard(e) {
        e.preventDefault();
        const newBoard = {
            id: Date.now(),
            title,
            lists: []
        }
        setBoards([...boards, newBoard]);
        updateStorage(boards);
        //console.log('boards', boards)
        //localStorage.setItem('boards', JSON.stringify(boards));
        setTitle('');
        //console.log('boards add boards', boards)
    }

    return (
    <section className="boards-section">
        <div className="container">
            <h1 className="boards-section__title">Главная страница</h1>
            <div>
                <input placeholder="название доски" className="input" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <button className="button" onClick={addBoard}>Создать доску</button>
            </div>
            <div className="boards-list">
                {
                    boards.map(board => (
                        <Link key={board.id}
                            className="board"
                            to={`/b/${board.id}`}>
                                <p>{board.title}</p>
                        </Link>
                    ))
                }
            </div>    
        </div>
    </section>
  )
}

export default Home;
