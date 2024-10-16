import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const BoardDetail = () => {
    const { id } = useParams(); 
    const [board, setBoard] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        return dateString.substring(0, dateString.indexOf("T"));
    };

    // 서버에서 특정 id의 게시글을 가져오는 함수
    const getBoardDetail = useCallback(async () => {
        setLoading(true); // 로딩 시작
        try {
            const response = await axios.get(`/detail/${id}`); // id에 해당하는 게시글 가져옴
            setBoard(response.data);
        } catch (error) {
            setError("게시글을 불러오는 데 실패했습니다.");
            console.error("불러오기 오류 : ", error);
        } finally {
            setLoading(false); // 로딩 완료
        }
    }, [id]);

    useEffect(() => {
        getBoardDetail(); 
    }, [getBoardDetail]);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 상태 표시
    }
    if (error) {
        return <div>{error}</div>; // 오류 메시지 표시
    }
    if (!board) {
        return <p> 게시글을 찾을 수 없습니다. </p>; // 게시글이 없을 때 표시
    }

    // 게시글 삭제 함수
    const onDelete = async () => {
        const confirmDelete = window.confirm('삭제된 글은 복구할 수 없습니다.\n삭제하시겠습니까?');
        if (!confirmDelete) return; // 사용자가 취소를 누르면 중단

        try {
            await axios.delete(`/detail/${id}`);
            navigate('/'); // 삭제 후 목록 페이지로 이동
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생 : ", error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    return (
        <div className='inner'>
            <div className="contents">
                <div className="titleArea"> <span> {board.title} </span> </div>
                <div className="detail">
                    <p> 작성자 : {board.writer} </p>
                    <p> {formatDate(board.reg_date)} </p> 
                </div>
                <div className="boardContent"> <p> {board.content} </p> </div>
            </div>

            <div className='detailBtnArea'>
                <div className="left-area">
                    <button className='writingBtn btn' onClick={() => navigate(`/write/${board?.id}`)}> 글쓰기 </button>
                    <button className='modifyBtn btn' onClick={() => navigate(`/modify/${board?.id}`)}> 수정 </button>
                    <button className='removeBtn btn' onClick={onDelete}> 삭제 </button>
                </div>
                <div className="right-area">
                    <button className='listBtn btn' onClick={() => navigate('/')}> 목록 </button> 
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;