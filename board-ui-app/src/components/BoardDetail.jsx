import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardList } from '../components/data/data';

const BoardDetail = () => {
    // 특정 조건을 만족하는 요소의 index를 찾는 함수 findIndex()
    // boardList.findIndex(b => b.id == Number(id))
    // params는 String으로 값을 가져옴 ==> 따라서 Number로 형변환
    // 굳이 findIndex를 사용하는 이유는 id의 값과 index(boradList의 index)가 맞지 않기 때문
    
    const { id } = useParams();
    const board = boardList.find(b => b.id === parseInt(id));
    const navigate = useNavigate(); 
    
    return (
        <div className='inner'>
            <div className="contents">
                {board ? (
                    <>
                        <div className="titleArea">
                            <span> {board.title} </span>
                        </div>
                        <div className="detail">
                            <p> 작성자 : {board.writer} </p>
                            <p> {board.reg_date.substring(0, board.reg_date.indexOf("T"))} </p>
                        </div>
                        <div className="boardContent">
                            <p> {board.contents} </p>
                        </div>
                    </>
                ) : (
                    <p>게시글을 찾을 수 없습니다.</p>
                )}
            </div>

            <div className='detailBtnArea'>
                <div className="left-area">
                    <button className='writingBtn btn' onClick={() => navigate(`/Write/${board.id}`)}> 글쓰기 </button>
                    <button className='modifyBtn btn' onClick={() => navigate(`/Modify/${board.id}`)}> 수정 </button>
                    <button className='removeBtn btn'> 삭제 </button>
                </div>
                <div className="right-area">
                    <button className='listBtn btn' onClick={() => navigate('/')}> 목록 </button>
                </div>
                
                
            </div>
        </div>
    );
};

export default BoardDetail;