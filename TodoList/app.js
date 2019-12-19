const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

//add to do to list
const generateItem = todo => {
    
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;

        list.innerHTML += html;

};


//submit new to do via pressing enter
addForm.addEventListener('submit', e => {

    e.preventDefault();

    const todo = addForm.add.value.trim();
    
    if(todo.length){
        generateItem(todo);
        addForm.reset();
    }
});


//remove to do from list
list.addEventListener('click', e => {

    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }

});

//filter and search to do list
const filterToDo = (term) => {
    
    //takes an HTML list, converts to an array and then filters for all keystrokes that match the term (search box)
    Array.from(list.children)
    .filter((todo) => !todo.textContent.includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    //does the opposite of above to help display the "filtered" to dos by matching keystrokes
    Array.from(list.children)
    .filter((todo) => todo.textContent.includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

//keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim();
    filterToDo(term);
});