import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 날짜 포맷 함수
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

const DiaryModify = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [diary, setDiary] = useState({ content: '' });
    const { content } = diary;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDiary = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/diary/${id}`); // 다이어리 ID로 데이터 요청
                setDiary(response.data);
            } catch (error) {
                setError('다이어리를 불러오는 데 실패했습니다.');
                console.error("불러오기 오류 : ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDiary(); // 컴포넌트가 마운트될 때 다이어리 데이터 불러오기
    }, [id]);

    const contentInput = useRef(null);

    // 유효성 검사
    const validate = () => {
        if (!content.trim()) {
            alert('내용을 입력해 주세요.');
            contentInput.current.focus();
            return false;
        }
        return true;
    };

    // 입력 변경 시 상태 업데이트
    const onChange = (e) => {
        const { name, value } = e.target;
        setDiary({
            ...diary,
            [name]: value
        });
    };

    // 수정 요청 처리
    const onModify = async () => {
        if (!validate()) return;
        try {
            const currentDate = formatDate(new Date());
            await axios.put(`/diary/${id}`, {
                date: currentDate,
                content: diary.content
            }); // 서버로 수정 요청
            navigate('/cyhome/diary'); // 수정 후 다이어리 목록으로 이동
        } catch (error) {
            console.error("수정 오류 : ", error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                <button onClick={onModify}> 수정 </button>
                <button onClick={() => navigate('/cyhome/diary')}> 목록 </button>
            </div>
        </div>
    );
};

export default DiaryModify;