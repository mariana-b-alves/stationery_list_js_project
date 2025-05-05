// DEFINE GLOBAL VARIABLES
const showForm = document.getElementById('showForm');
const addButton = document.getElementById('addButton');
const itemInput = document.getElementById('itemInput');
const form = document.getElementById('form');
const ul = document.querySelector('ul');
let deletedItem = null;
ul.addEventListener('click', removeItem, false);
document.addEventListener('keydown', returnItem, false);

// HIDES THE FORM AT THE BEGINNING
form.className = "hide";

// EVENTS
showForm.addEventListener('click', () => {
    form.className = "show";          // SHOWS FORM
    showForm.className = "hide";      // HIDES THE BUTTON
    itemInput.focus();                // ADD INPUT FOCUS
});

document.addEventListener('remove', returnItem, false);

// ACTIVATES DRAG AND DROP FOR THE EXISTING ITEMS ON THE LIST
ul.querySelectorAll('li').forEach(enableDragAndDrop);


// ADD ITEM TO LIST
addButton.addEventListener('click', (e) => {
    e.preventDefault(); // PREVENTS PAGE'S SUBMIT

    const newItem = itemInput.value.trim();
    if (newItem) {
        const li = document.createElement('li');
        li.textContent = newItem;
        enableDragAndDrop(li);
        ul.appendChild(li);
        itemInput.value = "";
        itemInput.focus();
    }
});

function removeItem(e){
    //TARGET EVENT WITH THE NAME "ITEM"
    let item = e.target;

    //REMOVE ITEM IF IT HAS THE CLASS NAME DONE
    if(item.className === 'done'){
        deletedItem = item;
        item.remove();

    //ADD CLASS NAME "DONE" IF THE ITEM DOESN'T HAVE IT ALREADY
    } else {
        item.className = 'done';
        ul.append(item);
    }

    updateNumItems();

}

    function returnItem(e) {
        
    const isCtrlZ = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z';
    const isEsc = e.key === 'Escape';
    
    // IF THE ITEM WAS DELETED AND WE CLICKED THE ESC OR CTRL+Z BTNS
    if (deletedItem && (isCtrlZ || isEsc)) {
        ul.prepend(deletedItem);
        deletedItem = null;
    }
}

let draggedItem = null;

function enableDragAndDrop(li) {
    li.setAttribute('draggable', true);

    li.addEventListener('dragstart', (e) => {
        draggedItem = li;
        li.style.opacity = '0.5';
    });

    li.addEventListener('dragend', (e) => {
        draggedItem = null;
        li.style.opacity = '1';
    });

    li.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    li.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem && draggedItem !== li) {
            // CHANGES ELEMENTS POSITIONS
            const allItems = Array.from(ul.children);
            const draggedIndex = allItems.indexOf(draggedItem);
            const targetIndex = allItems.indexOf(li);

            if (draggedIndex < targetIndex) {
                ul.insertBefore(draggedItem, li.nextSibling);
            } else {
                ul.insertBefore(draggedItem, li);
            }
        }
    });
}
    
     
