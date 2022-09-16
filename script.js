const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.enter-button');
const doingList = document.querySelector('.doing-list');
const doneList = document.querySelector('.done-list');

const doingNum = document.querySelector('.doing-num');
const doneNum = document.querySelector('.done-num');

const celebrate = document.querySelector('.celebrate');

let doingID = 0;
let doneID = 0;

// doing-list || done-list에 요소 추가
const plusList = (listName, listText) => {
  const li = document.createElement('li');
  li.classList.add('todo-item');

  const text = document.createElement('Text');
  text.classList.add('todo-text');
  text.innerText = listText;

  const button = document.createElement('img');
  button.setAttribute('src', './img/delete.png');
  button.classList.add('delete-button');

  li.appendChild(text);
  li.appendChild(button);

  listName.appendChild(li);

  if (listName === doingList) {
    button.addEventListener('click', deleteDoing);
    text.addEventListener('click', moveToDone);
  } else {
    button.addEventListener('click', deleteDone);
    text.addEventListener('click', moveToDoing);
  }
};

const deleteDoing = (e) => {
  const removeList = e.target.parentElement;
  removeList.remove();
  doingID--;
  doingNum.textContent = doingID;
};

const deleteDone = (e) => {
  const removeList = e.target.parentElement;
  removeList.remove();
  doneID--;
  doneNum.textContent = doneID;
};

const moveToDoing = (e) => {
  doingID++;
  doingNum.textContent = doingID;

  const doingText = e.target.parentElement.children[0].textContent;
  plusList(doingList, doingText);
  deleteDone(e);
};

const moveToDone = (e) => {
  doneID++;
  doneNum.textContent = doneID;

  const doneText = e.target.parentElement.children[0].textContent;
  plusList(doneList, doneText);
  deleteDoing(e);

  // 투두리스트 완료 시 축하
  celebrate.style.display = 'block';

  setTimeout(() => {
    celebrate.style.display = 'none';
  }, 2000);
};

const paintTodos = () => {
  doingID++;
  doingNum.textContent = doingID;

  plusList(doingList, todoInput.value);
  todoInput.value = '';
};

function handleToDoSubmit(e) {
  e.preventDefault();
  paintTodos();
}

const init = () => {
  todoForm.addEventListener('submit', handleToDoSubmit);
  todoBtn.addEventListener('click', handleToDoSubmit);
};

init();
