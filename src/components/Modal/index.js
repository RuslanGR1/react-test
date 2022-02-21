import React, {
    useContext,
    useState
} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { updateStorage } from "../../utils";
import { DataContext } from './../../context';
import './modal.css';


const Modal = ({ isModal }) => {
  const { boardId, cardId, listId} = useParams();
  const { boards, setBoards } = useContext(DataContext);
  const [ checkTitle, setCheckTitle ] = useState('')
  const currentCard = boards
    .find(board => board.id == boardId).lists
    .find(list => list.id == listId).cards
    .find(card => card.id == cardId);
  const navigate = useNavigate();

  function onCheckboxChange(e) {
    let checks = currentCard.checks;
    let check = checks.find(tCheck => {
        return tCheck.id === parseInt(e.target.value);
    });
    check.checked = check.checked ? false : true;
    currentCard.checks.find(check => check.id == e.target.value)
      .checled = check.checked ? false : true;
    setBoards(boards);
    updateStorage(boards);
  }

  function addCheck(e) {
    e.preventDefault();
    if (checkTitle) {
        let newCheck = {
            id: Date.now(),
            checked: false,
            title: checkTitle
        }
        currentCard.checks = [...currentCard.checks, newCheck];
        setBoards(boards);
        updateStorage(boards);
        setCheckTitle('');
    } 
  }

  return (
    <div className="mymodal__wrapper"
      onClick={() => navigate(-1)}>
      <div className="mymodal" onClick={e => e.stopPropagation()}>
        <p className="mymodal__title">{currentCard.title}</p>
        <div className="mymodal-description__wrapper">
        </div>
        <p className="mymodal__description">{currentCard.description}</p>
        <ul className="mymodal-list">
          {
              currentCard.checks.map(tCheck => (
                  <div class="form-check check-list">
                      <input 
                          className="form-check-input"
                          type="checkbox"
                          value={tCheck.id}
                          id="flexCheckChecked"
                          checked={tCheck.checked} 
                          onChange={onCheckboxChange}    
                      />
                      <label className="form-check-label check-list__lable" for="flexCheckChecked">
                          {tCheck.title}
                      </label>
                  </div>
              ))
          }
          <li>
            <div>
              <input 
                type="text"
                placeholder="Добавить элемент"
                className="input mymodal-input"
                value={checkTitle}
                onChange={e => setCheckTitle(e.target.value)} />
              <button className="button" onClick={addCheck}>Add check</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Modal;
