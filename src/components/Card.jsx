import { useState } from "react";

const Card = ({ card }) => {

    const [currentCard, setCard] = useState(card);
    const [checkTitle, setCheckTitle] = useState('');

    function onCheckboxChange(e) {
        let checks = currentCard.checks;
        let check = checks.find(tCheck => {
            return tCheck.id == e.target.value;
        });
        check.checked = check.checked ? false : true;
        setCard({...currentCard, checks});
    }

    function addCheck(e) {
        e.preventDefault();
        if (checkTitle) {
            let newCheck = {
                id: Date.now(),
                checked: false,
                title: checkTitle
            };
            setCheckTitle('');
            card.checks = [...card.checks, newCheck];
            setCard({
                ...currentCard,
                checks: [...currentCard.checks, newCheck]
            });
        } 
    }

    return (
        <>
            <div>{currentCard.title}</div>
            <ul>
                {
                    currentCard.checks.map(tCheck => (
                        <div class="form-check">
                            <input 
                                className="form-check-input"
                                type="checkbox"
                                value={tCheck.id}
                                id="flexCheckChecked"
                                checked={tCheck.checked} 
                                onChange={onCheckboxChange}    
                            />
                            <label className="form-check-label" for="flexCheckChecked">
                                {tCheck.title}
                            </label>
                        </div>
                    ))
                }
            </ul>
            <div className="row">
                <div className="col-md-4">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button
                                className="btn btn-outline-primary"
                                onClick={addCheck}>
                                    Add check
                            </button>
                        </div>
                        <input 
                            type="text"
                            className="form-control"
                            value={checkTitle}
                            onChange={e => setCheckTitle(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
