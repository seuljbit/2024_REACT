import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardList } from '../components/data/data';

const BoardModify = () => {
    const { id } = useParams();
    const board = boardList.find(b => b.id === parseInt(id));
    const [title, setTitle] = useState(board.title);
    const [contents, setContents] = useState(board.contents);
    const [writer, setWriter] = useState(board.writer);
    const navigate = useNavigate();

    const onModify = () => {
        const index = boardList.findIndex(b => b.id === parseInt(id));
        boardList[index] = {
            ...boardList[index],
            title: title,
            contents: contents,
            writer: writer,
            reg_date: new Date().toISOString()
        };
        navigate(`/Detail/${id}`);
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
                <button onClick={onModify} className='writeBtn btn'> 등록 </button>
            </div>
        </div>
    );
};

export default BoardModify;