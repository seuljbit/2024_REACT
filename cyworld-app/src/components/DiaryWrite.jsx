import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const DiaryWrite = () => {
    const navigate = useNavigate();
    const [diary, setDiary] = useState({content: ''});
    const { content } = diary;

    const contentInput = useRef(null);
    const validate = () => {
        if (content === '') {
            alert('내용을 입력해 주세요.');
            contentInput.current.focus();
            return false;
        }
        return true;
    }
       

    const onChange = (e) => {
        const { name, value } = e.target;
        setDiary({
            ...diary,
            [name]: value
        });
    };

    const onCreate = async () => {
        if (!validate()) return; 
        try {
            await axios.post('/diary/write', diary); 
            navigate('/cyhome/diary');
        } catch (error) {
            console.error("등록 오류 : ", error);
            alert('게시글 등록에 실패했습니다.');
        }
    };    

    return (
        <div className='write-box'>
            <div className="textarea">
                <textarea
                    name="content"
                    ref={contentInput}
                    value={content}
                    onChange={onChange}
                    placeholder="내용을 입력하세요"
                />
            </div>
            <div className="write-select">
                <span> 공개설정 </span>
                <select name="write-select" id="write-select">
                    <option value="전체공개"> 전체공개 </option>
                    <option value="일촌공개"> 일촌공개 </option>
                    <option value="비공개"> 비공개 </option>
                </select>
            </div>
            <div className="write-btn-area">
                <button onClick={onCreate}> 작성 </button>
                <button onClick={() => navigate('/cyhome/diary')}> 목록 </button>
            </div>
            
        </div>
    );
};

export default DiaryWrite;