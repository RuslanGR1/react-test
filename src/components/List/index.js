import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { DataContext } from '../../context';
import { updateStorage } from '../../utils';
import { HiOutlineX } from "react-icons/hi";
import './list.css';

const List = ({ boardId, listId, deleteList }) => {

    //const { boardId, cardId, listId} = useParams();
    const { boards, setBoards } = useContext(DataContext);
    const [ checkTitle, setCheckTitle ] = useState('')
    const currentList = boards
        .find(board => board.id == boardId).lists
        .find(list => list.id == listId);

    const [formActive, setFormActive] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    function toggleStatus(e) {
        setFormActive(!formActive);
        setCardTitle('');
    }
    console.log('list in List', currentList)

    function addCard() {
        console.log('add card')
        const newCard = {
            id: Date.now(),
            title: cardTitle,
            description: '',
            type: 'checklist',
            checks: []
        }

        currentList.cards.push(newCard);
        console.log('new card', newCard);
        setBoards(boards);
        updateStorage(boards);
        setCardTitle('');
    }

    return (
        <div className="list">
            <div className="list__title">{currentList.title}</div>
            <div className="list-close" onClick={() => deleteList(listId)}><HiOutlineX /></div>
            <div className="list-check">
                {
                    currentList.cards.map(card => 
                        <Link className="list-check__item"
                            to={`/b/${boardId}/l/${currentList.id}/c/${card.id}`}
                            state={{ modal: true }}
                            key={currentList.id}>{card.title}
                            </Link>
                    )
                }
                <div
                    className="list-check__item list-check__item-add" onClick={toggleStatus}>+ Добавить карточку</div>
                <div className={formActive ? 'list-add list-add-active' : 'list-add'}>
                    <input
                        value={cardTitle}
                        onChange={e => setCardTitle(e.target.value)}
                        placeholder="Название карточки"
                        type="text"
                        className="input" />
                    <button
                        onClick={addCard}
                        className="button list-add__button">
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default List;
