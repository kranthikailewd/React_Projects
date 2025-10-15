import './index.css'

const TodoItem = props => {
  const {todoDetails, onClickDelete} = props
  const {id, title} = todoDetails
  const deleteButton = () => {
    onClickDelete(id)
  }
  return (
    <li className="todo_container">
      <p className="todo_title">{title}</p>
      <button className="todo_del_button" type="button" onClick={deleteButton}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
