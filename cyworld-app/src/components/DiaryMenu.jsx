import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiaryMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="diary-menu-box">
            <div className="diary-menu">
                <div className='entire'> <span> 전체보기 </span> </div>
                <div className='element'> <div className='diary-icon'></div> <span> 오늘의 일기 </span> </div>
                <div className='element'> <div className='diary-icon'></div> <span> 글귀 </span> </div>
            </div>
            <div className="diary-btn">
                <button onClick={() => navigate('/cyhome/diary/write')}> 글 작성 </button>
            </div>
        </div>
    );
};

export default DiaryMenu;