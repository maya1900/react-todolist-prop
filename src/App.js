import React, {useCallback, useEffect, useState} from "react";
import './App.css';
import MyHeader from "./components/Header";
import AddInput from "./components/addInput";
import TodoItem from "./components/todoItem";
import CheckModal from "./components/modal/CheckModal";
import EditModal from "./components/modal/EditModal";
import NoDataTip from "./components/noDataTip";

function App() {
  const [isInputShow, setInputShow] = useState(false),
    [isShowCheckModal, setShowCheckModal] = useState(false),
    [isShowEditModal, setShowEditModal] = useState(false),
    [todoList, setTodoList] = useState([]),
    [currentData, setCurrentData] = useState({});

  // 先初始化
  useEffect(() => {
    const todoData = JSON.parse(sessionStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, [])

  // 再修改
  useEffect(() => {
    sessionStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])

  const addItem = useCallback(value => {
    const dataItem = { id: new Date().getTime(), content: value, completed: false }
    setTodoList(todoList => [...todoList, dataItem])
    setInputShow(false)
  }, [])

  const delItem = useCallback((id) => {
    setTodoList(todoList => todoList.filter(item => item.id !== id))
  }, [])

  const openCheckModal = useCallback(id => {
    _setCurrentData(id)
    setShowCheckModal(true)
  }, [todoList])

  const openEditModal = useCallback(id => {
    _setCurrentData(id)
    setShowEditModal(true)
  }, [todoList])

  const submitEdit = useCallback((newData, id) => {
    setTodoList( todoList => {
      setShowEditModal(false)
      return todoList.map(item => {
        if (item.id === id) {
          item = newData
        }
        return item;
      })
    })
  }, [])

  const completeItem = useCallback(id => {
    setTodoList(todoList => {
      return todoList.map(item => {
        if (item.id === id) {
          item.completed = !item.completed
        }
        return item
      })
    })
  }, [])

  function _setCurrentData (id) {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
  }

  return (
    <div className="App">
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        closeModal={() => setShowCheckModal(false)}
        data={currentData}
      />
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      />
      <MyHeader openInput={ () => setInputShow(!isInputShow) }/>
      <AddInput
        isInputShow={ isInputShow }
        addItem={addItem}
      />

      {
        !todoList || todoList.length === 0
        ?
          (<NoDataTip/>)
        :
          (
            <ul className="todo-list">
              {
                todoList.map((item, index) => {
                  return (
                    <TodoItem
                      data={item}
                      key={index}
                      delItem={delItem}
                      openCheckModal={openCheckModal}
                      openEditModal={openEditModal}
                      completeItem={completeItem}
                    />
                  )
                })
              }
            </ul>
          )
      }
    </div>
  );
}

export default App;
