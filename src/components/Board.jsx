import { useParams } from "react-router";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from './../context';
import { updateStorage } from './../utils';
import List from './List';
import Swal from 'sweetalert2';

const Board = () => {

    const { boardId } = useParams();
    const {boards, setBoards} = useContext(DataContext);
    const currBoard = boards.find(board => board.id === parseInt(boardId))
    const [currentBoard, setCurrentBoard] = useState(currBoard);
    const [currentList, setCurrentList] = useState(currentBoard.lists);
    const navigate = useNavigate();

    const [listTitle, setListTitle] = useState('');

    function addList(e) {
        e.preventDefault();

        if (!listTitle) return;
        const newList = {
            id: Date.now(),
            title: listTitle,
            cards: []
        }
        console.log('curr list', currentBoard.lists)

        currentBoard.lists = [...currentBoard.lists, newList];
        setCurrentBoard(currentBoard);
        console.log('curr list', currentBoard.lists)
        setBoards(boards);
        updateStorage(boards);
        setListTitle('');
    }

    function deleteList(listId) {
        console.log('delete', listId)
        const newList = currentBoard.lists.filter(el => el.id != listId)
        currentBoard.lists = [...newList];
        setCurrentList(newList);
        console.log(' curr lists', currentBoard.lists)
        setCurrentBoard({...currentBoard, lists: currentList});
        setBoards(boards);
        setCurrentBoard(currentBoard);
        updateStorage(boards);
    }

    function deleteBoard(e) {
        e.stopPropagation();
        Swal.fire({
            title: 'Вы действительно хотите удалить доску?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Да',
            denyButtonText: `Пожалуй, нет`,
          }).then((result) => {
            if (result.isConfirmed) {
              const filteredBoards = boards.filter(tBoard => tBoard.id !== currentBoard.id);
              setBoards(filteredBoards)

              Swal.fire('Доска удалена!', '', 'success')
              navigate("../", { replace: true });
            } 
          })
    }

    return (
        <section className="list-section">
            <div className="container">
                <div className="row list-section__wrapper">
                    <h1 className="list-section__title">
                        Доска {currentBoard.title}
                    </h1>
                </div>
                <div className="row">
                    <div>
                        <div className="board-input-group">
                            <input
                                type="text"
                                className="input"
                                placeholder="Название колонки"
                                aria-label=""
                                aria-describedby="basic-addon1"
                                value={listTitle}
                                onChange={e => setListTitle(e.target.value)}
                                />
                            <button
                                onClick={addList}
                                className="button"
                                >
                                    Добавить
                            </button>
                            <button className="button" onClick={deleteBoard}>Удалить доску</button>
                        </div>
                    </div>
                </div>
                <div className="list-container">
                    {
                        currentBoard.lists.map(list => {
                            return <List key={list.id}
                                boardId={currentBoard.id}
                                listId={list.id} 
                                deleteList={deleteList}
                                />
                        })
                    }
                </div>
            </div>
        </section>
    )
};

export default Board;
