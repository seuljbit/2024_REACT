import React from 'react';

const CreateStor = ({storeName, storeItem, onChange, onCreate}) => {
    return (
        <div className='createStore'>
            <input
                type="text"
                name='storeName'
                placeholder='가게명'
                onChange={onChange}
                value={storeName}
            /> <span> </span>
            <input
                type="text"
                name='storeItem'
                placeholder='주 메뉴'
                onChange={onChange}
                value={storeItem}
            /> <span> </span>
            <button onClick={onCreate}> CREATE </button>
        </div>
    );
};

export default CreateStor;