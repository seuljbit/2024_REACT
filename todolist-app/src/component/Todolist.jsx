import React, {useRef, useState, useMemo} from 'react';
import Create from './Create';
import Main from '../component/Main';
import '../component/todolistCss.css'

const Todolist = () => {
    const nextId = useRef(1);
    
    const [ todolist, setToDo ] = useState ([]);

    const [ inputs, setInputs ] = useState({
        todotext : '',
        todoselect : '',
        active: false
    });
    const { todotext, todoselect } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        // 변경되지 않은 대상값을 공백처리 => 기존값 유지
        setInputs({
            ...inputs, // 기존 inputs 값을 가지고 와서 복사
            [name] : value // 현재 변경된 값을 key:value 형태로 set
        });
        console.log(inputs);
    }

    const onCreate = () => {
        const todo = {
            id : nextId.current,
            todoselect : todoselect,
            todotext
        };
        
        setToDo(todolist.concat(todo));
    
        setInputs({
            todotext : '',
            todoselect : ''
        })

        nextId.current += 1;
        console.log(todolist);
    }


    const onRemove = (id) => {
        setToDo(todolist.filter(todo => todo.id !== id));
    }

    const onToggle = (id) => {
        setToDo(
            todolist.map(todo => (
                todo.id === id ? {
                    ...todo,
                    active : !todo.active
                } : todo
            ))
        );
    }

    const countActiveUser = (todolist) => {
        // user.active가 true인 사용자를 세어서 리턴
        // let count = 0;
        // users.forEach(user => {
        //     if (user.active === true) {
        //         count++;
        //     }
        // });
        // console.log(count);
        console.log("active User count")
        return todolist.filter(todo => todo.active).length;
    }

    const count = useMemo(() => countActiveUser(todolist), [todolist]);


    return (
        <div className='inner'>
            <Create todotext={todotext} todoselect={todoselect} onChange={onChange} onCreate={onCreate}/>
            
            {
                todolist.map(t => (
                    <Main
                        todo={t}
                        key = {t.id}
                        onRemove={onRemove}
                        onToggle={onToggle}
                        count={count}
                    />
                ))
            }
            <div className='result'> <span className='text'> 완료 : {count} / {todolist.length} </span> </div>
        </div>
    );
};

export default Todolist;