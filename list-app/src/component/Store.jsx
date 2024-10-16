import React from 'react';

const Store = (props) => {
    const store = props.store;
    return (
        <div className='store'>
            <h3> {store.id}. {store.storeName}({store.storeItem}) </h3>
        </div>
    );
};

export default Store;