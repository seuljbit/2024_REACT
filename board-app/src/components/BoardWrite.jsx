import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        title: '',
        writer: '',
        content: ''
    });
    const { title, writer, content } = board;

    const titleInput = useRef(null);
    const writerInput = useRef(null);
    const contentInput = useRef(null);

    const validate = () => {
        let message = '';
        let focusSet = false; // 첫 번째로 빈 필드에만 포커스가 설정되도록 관리

        if (title === '') {
            message += '제목';
            if (!focusSet) {
                titleInput.current.focus();
                focusSet = true; // 포커스가 설정되면 true로 변경
            }
        }
        if (writer === '') {
            message += message ? ', 작성자명' : '작성자명';
            if (!focusSet) {
                writerInput.current.focus();
                focusSet = true;
            }
        }
        if (content === '') {
            message += message ? ', 내용' : '내용';
            if (!focusSet) {
                contentInput.current.focus();
                focusSet = true;
            }
        }
        if (message) {
            alert(`${message}을 입력해 주세요.`);
            return false;
        }
        return true;
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setBoard({
            ...board,
            [name]: value
        });
    };    

    const onReset = () => {
        setBoard({
            title: '',
            writer: '',
            content: ''
        });
        titleInput.current.focus(); // 초기화 후 제목 입력란에 포커스
    };

    const onCreate = async () => {
        if (!validate()) return;
        try {
            await axios.post('/write', board); // 서버에 게시글 정보 전송
            navigate('/'); // 데이터 전송 후 목록으로 이동
        } catch (error) {
            console.error("등록 오류 : ", error);
            alert('게시글 등록에 실패했습니다.');
        }
    };

    return (
        <div className='inner'>
            <div className="titleArea">
                <div className="subtitle"> <span> 새 글 작성 </span> </div>
            </div>

            <div className='writecontents contents'>
                <div className='write-top'>
                    <input
                        ref={titleInput}
                        id='title'
                        className='write-title'
                        name="title"
                        type="text" 
                        placeholder="제목을 입력해 주세요." 
                        value={title}
                        onChange={onChange}
                    />
                    <input 
                        ref={writerInput}
                        id='writer'
                        className='write-writer'
                        name="writer"
                        type="text" 
                        placeholder="작성자명을 입력하세요." 
                        value={writer} 
                        onChange={onChange}
                    />
                </div>

                <div className="write-bottom">
                    <textarea 
                        ref={contentInput}
                        id='text'
                        name="content"
                        placeholder="내용을 입력하세요." 
                        value={content} 
                        onChange={onChange}
                    />
                </div>
            </div>

            <div> <button onClick={onCreate} className='createBtn btn'> 등록 </button> </div>
            <div> <button onClick={onReset} className='resetBtn btn'> 초기화 </button> </div>
        </div>
    );
};

export default BoardWrite;