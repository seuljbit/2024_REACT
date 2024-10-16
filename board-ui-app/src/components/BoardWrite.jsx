import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boardList } from '../components/data/data';

const BoardWrite = () => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [writer, setWriter] = useState('');
    const navigate = useNavigate();

    const onCreate = () => {
        const newBoard = {
            id: boardList.length + 1,
            title: title,
            contents: contents,
            writer: writer,
            reg_date: new Date().toISOString(),
        };
        boardList.unshift(newBoard);
        navigate('/');
    };

    return (
        <div className='inner'>
            <div className="titleArea">
                <div className="subtitle">
                    <span> 새 글 작성 </span>
                </div>
            </div>

            <div className='writecontents contents'>
                <div className='write-top'>
                    <input
                        id='title'
                        className='write-title'
                        type="text" 
                        placeholder="제목을 입력해 주세요." 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <input 
                        id='writer'
                        className='write-writer'
                        type="text" 
                        placeholder="작성자명을 입력하세요." 
                        value={writer} 
                        onChange={(e) => setWriter(e.target.value)} 
                    />
                </div>

                <div className="write-bottom">
                    <textarea 
                        id='text'
                        placeholder="내용을 입력하세요." 
                        value={contents} 
                        onChange={(e) => setContents(e.target.value)} 
                    />
                </div>
            </div>

            <div>
                <button onClick={onCreate} className='writeBtn btn'> 등록 </button>
            </div>
        </div>
    );
};

export default BoardWrite;