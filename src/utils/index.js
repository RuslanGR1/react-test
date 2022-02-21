

export function updateStorage(newBoards) {
    localStorage.setItem('boards', JSON.stringify(newBoards));
}
