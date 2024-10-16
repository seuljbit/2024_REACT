import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formatDate = (dateString) => {
        return dateString.substring(0, dateString.indexOf("T"));
    };

    // 목록 가져오기
    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/comments');  
            setComments(response.data);  // 데이터 상태 업데이트
        } catch (error) {
            setError('댓글을 불러오는 데 실패했습니다.');
            console.error(error);
        } finally {
            setLoading(false);  // 로딩 완료
        }
    };

    // 처음 렌더링될 때 댓글 목록 불러오기
    useEffect(() => {
        fetchComments();
    }, []);

    // 새로운 일촌평 생성
    const createComment = async () => {
        if (!newComment.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/update-comment', { content: newComment });  // 서버에 새 데이터 전송
            setNewComment('');  // 입력란 초기화
            fetchComments();  // 댓글 목록 새로고침
        } catch (error) {
            setError('일촌평을 작성하는 데 실패했습니다.');
            console.error(error);
        } finally {
            setLoading(false);  // 로딩 완료
        }
    };

    return (
        <div className='main-area'>
            <div className="miniroom">
                <div className="areaTitle">
                    <span> Mini Room </span>
                </div>
                <div className="miniroomimg"> </div>
            </div>
            <div className="comments">
                <div className="areaTitle">
                    <span> 일촌평 </span>
                </div>
                <div className='comments-inputArea'>
                    <span> 일촌평 </span>
                    <input
                        type="text"
                        placeholder='일촌과 나누고 싶은 이야기를 남겨보세요~!'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={createComment} disabled={loading}> {loading ? '저장 중...' : '확인'} </button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="comments-list">
                    <ul>
                        {comments.length > 0 && comments.map(comment => (
                            <li key={comment.id}>
                                <span className='content'>{comment.content} </span>
                                (<span className='name' id='name'>{comment.name} </span>
                                <span className='sub-name'>{comment.sub_name}</span>)
                                <span className='reg_date'> {formatDate(comment.reg_date)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;