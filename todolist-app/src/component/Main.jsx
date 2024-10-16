import React from 'react';
import '../component/todolistCss.css'

const Main = ({ todo, onRemove, onToggle }) => {
    const todoStyle = {
        cursor: 'pointer',
        fontWeight: todo.active ? 'bold' : 'normal'
    };

    return (
        <div className='mainBox'>
            <div className="main">
                <div className="box">
                    <div className='textBox'>
                        <input 
                            type="checkbox" 
                            className='checkbox'
                            checked={todo.active || false} 
                            onChange={() => onToggle(todo.id)} // onClick -> onChange로 수정
                        />
                        <p style={todoStyle}> <span className='todoselecttext'> {todo.todoselect}) </span> <span> {todo.todotext} </span> </p>
                    </div>
                    <button onClick={() => onRemove(todo.id)}> X </button>
                </div>
            </div>
        </div>
    );
};

export default Main;
