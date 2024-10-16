import React, {useRef, useState} from 'react';
import Store from '../component/Store';
import CreateStore from './CreateStore';

const StoreList = () => {
    const nextId = useRef(1);

    const [ stores, setStores ] = useState ([]);

    const [ inputs, setInputs ] = useState({
        storeName : '',
        storeItem : ''
    });

    const { storeName, storeItem } = inputs;

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
        const store = {
            id: nextId.current, // 고유 ID
        storeName, // 현재 inputs 상태에서 storeName을 가져옴
        storeItem // 현재 inputs 상태에서 storeItem을 가져옴
        };

        setStores(stores.concat(store)); // 새로운 상점을 기존 목록에 추가

        setInputs({
            storeName : '',
            storeItem : ''
        })

        nextId.current += 1; // ref() : 재랜더링 x
        console.log(stores);
    };

    return (
        <div className='StoreList'>
            <CreateStore storeName={storeName} storeItem={storeItem} onChange={onChange} onCreate={onCreate}/>
            {
                stores.map(s=> (
                    <Store store={s} key={s.id}/>
                ))
            }
        </div>
    );
};

export default StoreList;