import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 자바스크립트 날짜를 MySQL 형식으로 변환하는 함수
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const BoardModify = () => {
    const { id } = useParams(); // URL에서 id 가져오기
    const navigate = useNavigate();
    
    const [boardData, setBoardData] = useState({
        title: '',
        content: '',
        writer: ''
    });
    const { title, content, writer } = boardData;

    // 데이터 가져오기 (서버에서 게시글 데이터를 가져옴)
    useEffect(() => {
        const getBoard = async () => {
            try {
                const response = await axios.get(`/detail/${id}`); // 서버에서 데이터 가져오기
                setBoardData({
                    title: response.data.title,
                    content: response.data.content,
                    writer: response.data.writer
                });
            } catch (error) {
                console.error('게시글 데이터를 불러오는데 실패했습니다:', error);
                alert('게시글 데이터를 불러오는데 오류가 발생했습니다.');
            }
        };
        getBoard();
    }, [id]); // 컴포넌트가 처음 렌더링될 때만 실행

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
    
    // 입력 값 변경 핸들러
    const onChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value
        });
    };

    // 게시글 수정 함수
    const onModify = async () => {
        if (!validate()) return;
        try {
            const currentDate = formatDate(new Date()); // 날짜 형식을 MySQL 형식으로 변환
            await axios.put(`/detail/${id}`, {
                title: title,
                content: content,
                writer: writer,
                reg_date: currentDate // 수정된 날짜 전달
            });
            navigate(`/detail/${id}`); // 수정 완료 후 상세 페이지로 이동
        } catch (error) {
            console.error('게시글 수정 중 오류가 발생했습니다:', error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    return (
        <div className='inner'>
            <div className="titleArea">
                <div className="subtitle">
                    <span> 글 수정 </span>
                </div>
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

            <div>
                <button onClick={onModify} className='writeBtn btn'> 수정 완료 </button>
            </div>
        </div>
    );
};

export default BoardModify;