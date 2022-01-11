import React, {useContext} from 'react';
import PropTypes from "prop-types";
import Context from '../context';

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid grey',
    borderRadius: '4px',
    marginBottom: '.5rem'
  },
  input: {
    marginRight: '1rem'
  }
}


function TodoItem({todo, index, onChange}){
  const {removeTodo: removeTodo} = useContext(Context);
  const classes = [];

  if (todo.complited){
    classes.push('done');
  }
  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input 
        style={styles.input} 
        type="checkbox"
        checked={todo.complited}
        onChange={() => onChange(todo.id)}
        />
        <strong>{ index + 1 }</strong>
        &nbsp;
        {todo.title}
      </span>
      <button className='rm' 
              onClick={/* () => removeTodo(todo.id) */ removeTodo.bind(null, todo.id)}>
        &times;
        </button>      
    </li>
  );
};
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired
}
export default TodoItem;