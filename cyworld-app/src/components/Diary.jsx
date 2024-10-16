import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Diary = () => {
    const [diary, setDiary] = useState([]);  // diary 데이터 상태
    const [comments, setComments] = useState({}); // 댓글 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
    const itemsPerPage = 5;  // 페이지당 항목 수
    const navigate = useNavigate();

    const today = new Date();  // 현재 날짜 생성

    
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayOfWeek = daysOfWeek[today.getDay()];

    const formatDate = (dateString) => {
        return dateString.substring(0, dateString.indexOf("T"));
    };

    // 다이어리 목록
    const getDiaryList = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/diary');
            setDiary(response.data);
            response.data.forEach(entry => getComments(entry.id)); // 각 항목의 댓글 불러오기
        } catch (error) {
            setError('다이어리를 불러오는 데 실패했습니다.');
            console.error("불러오기 오류: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 페이지 이동을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = diary.slice(indexOfFirstItem, indexOfLastItem);

    // 다이어리 항목 삭제
    const deleteDiary = async (id) => {
        const confirmDelete = window.confirm('삭제된 글은 복구할 수 없습니다.\n삭제하시겠습니까?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`/diary/${id}`); 
            setDiary((prevDiary) => prevDiary.filter(entry => entry.id !== id));
        } catch (error) {
            console.error("삭제 오류: ", error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    // 댓글 목록
    const getComments = async (diaryId) => {
        try {
            const response = await axios.get(`/diary/${diaryId}/comments`);
            setComments(prevComments => ({
                ...prevComments,
                [diaryId]: response.data
            }));
        } catch (error) {
            console.error("댓글 불러오기 오류:", error);
        }
    };

    // 댓글 추가 함수
    const addComment = async (diaryId, name, comment) => {
        if (!name || !comment) {
            alert('작성자와 댓글 내용을 모두 입력해주세요.');
            return;
        }
        try {
            await axios.post(`/diary/${diaryId}/comments`, { diary_comment_name: name, diary_comment: comment });
            getComments(diaryId);  // 댓글 추가 후 새로 불러오기
            setNewComments(prevState => ({
                ...prevState,
                [diaryId]: { name: '', comment: '' }  // 댓글 입력창 비우기
            }));
        } catch (error) {
            console.error("댓글 추가 오류:", error);
            alert('댓글 추가에 실패했습니다.');
        }
    };

    // 댓글 삭제
    const deleteComment = async (diaryId, commentId) => {
        const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`/diary/${diaryId}/comments/${commentId}`); 
            setComments(prevComments => ({
                ...prevComments,
                [diaryId]: prevComments[diaryId].filter(comment => comment.id !== commentId)
            }));
        } catch (error) {
            console.error("댓글 삭제 오류: ", error);
            alert('댓글 삭제에 실패했습니다.');
        }
    };

    // 각 다이어리 항목별로 댓글 입력 상태 관리
    const [newComments, setNewComments] = useState({});

    const onChange = (e, diaryId, field) => {
        setNewComments(prevState => ({
            ...prevState,
            [diaryId]: {
                ...prevState[diaryId],
                [field]: e.target.value
            }
        }));
    };

    useEffect(() => {
        getDiaryList();
    }, [getDiaryList]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!diary || diary.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <div className='diary-box'>
            <div className="calendar">
                <div className="calendar-left">
                    <span className='date'>{month} . {day}</span>
                    <span className='week'> {dayOfWeek} </span>
                </div>
                <div className="calendar-right">
                    <div className="calendar-right-top">
                        <span className="day1">1</span>
                        <span className="day2">2</span>
                        <span className="day3">3</span>
                        <span className="day4">4</span>
                        <span className="day5">5</span>
                        <span className="day6">6</span>
                        <span className="day7">7</span>
                        <span className="day8">8</span>
                        <span className="day9">9</span>
                        <span className="day10">10</span>
                        <span className="day11">11</span>
                        <span className="day12">12</span>
                        <span className="day13">13</span>
                        <span className="day14">14</span>
                        <span className="day15">15</span>
                    </div>
                    <div className="calendar-right-bottom">
                        <span className="day16">16</span>
                        <span className="day17">17</span>
                        <span className="day18">18</span>
                        <span className="day19">19</span>
                        <span className="day20">20</span>
                        <span className="day21">21</span>
                        <span className="day22">22</span>
                        <span className="day23">23</span>
                        <span className="day24">24</span>
                        <span className="day25">25</span>
                        <span className="day26">26</span>
                        <span className="day27">27</span>
                        <span className="day28">28</span>
                        <span className="day29">29</span>
                        <span className="day30">30</span>
                    </div>
                </div>
            </div>

            <div className="diary-area">
                {currentItems.map((entry) => (
                    <div key={entry.id} className="diary-content">
                        <div className="diary-entry">
                            <div className="diary-date">
                                <span>{formatDate(entry.date)}</span>
                            </div>
                            <div className="diary-text">
                                <span>{entry.content}</span>
                            </div>
                        </div>

                        <div className="diary-comments">
                            <div className="diary-comments-input">
                                <div className="name-input">
                                    <span> 이 름 </span>
                                    <input
                                        type="text"
                                        name='name'
                                        value={newComments[entry.id]?.name || ""}
                                        onChange={(e) => onChange(e, entry.id, 'name')}
                                    />
                                </div>
                                <div className="comment-input">
                                    <span> 댓 글 </span>
                                    <input
                                        type="text"
                                        name='comment'
                                        value={newComments[entry.id]?.comment || ""}
                                        onChange={(e) => onChange(e, entry.id, 'comment')}
                                    />
                                    <button
                                        onClick={() =>
                                            addComment(entry.id,
                                            newComments[entry.id]?.name,
                                            newComments[entry.id]?.comment)}
                                        > 확인
                                    </button>
                                </div>
                            </div>

                            <div className="diary-comments-list">
                                {comments[entry.id]?.map(comment => (
                                    <div key={comment.id}>
                                        <span className='diary_comment_name'>{comment.diary_comment_name} </span>
                                        <span> {comment.diary_comment}</span> ({formatDate(comment.diary_comment_date)})
                                        <button onClick={() => deleteComment(entry.id, comment.id)}> X </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="diary-btn-area">
                            <span onClick={() => navigate(`/cyhome/diary/${entry.id}`)}> 수정 </span>
                            <span> | </span>
                            <span onClick={() => deleteDiary(entry.id)}> 삭제 </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {Array.from({ length: Math.ceil(diary.length / itemsPerPage) }, (_, i) => (
                    <span key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Diary;