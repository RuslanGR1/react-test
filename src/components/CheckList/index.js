

const Checklist = ({ currentCard }) => {
    return (
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
    )
}

export default Checklist;
