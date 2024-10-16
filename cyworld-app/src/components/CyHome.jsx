import React from 'react';
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Diary from './Diary';
import Photo from './Photo';
import Main from './Main';
import DiaryMenu from './DiaryMenu';
import DiaryWrite from './DiaryWrite';
import DiaryModify from './DiaryModify';
import audioFile from '../mp3/song.mp3';

const CyHome = () => {
    const location = useLocation(); // 현재 경로를 가져옴

    // 현재 경로에 따라 메뉴가 선택되도록 설정
    const getSelectedMenu = () => {
        if (location.pathname.startsWith("/cyhome/diary")) return "diary";
        if (location.pathname.startsWith("/cyhome/Photo")) return "Photo";
        return "Main"; // 기본적으로 Main 메뉴 선택
    };

    const selectedMenu = getSelectedMenu();

    // page-left의 콘텐츠를 경로에 따라 다르게 렌더링
    const renderPageLeft = () => {
        if (selectedMenu === "diary") {
            return <DiaryMenu />;
        } else if (selectedMenu === "Photo") {
            return (
                <div className="custom-left-content">
                    <p> This is a custom page-left for {selectedMenu} </p>
                </div>
            );
        } else {
            return (
                <div className="profile-box">
                    <div className="profile-photo"></div>
                    <div className="history">
                        <p> <span> <span className='em'> ▶ </span> HISTORY </span></p>
                    </div>
                    <div className="profile-name">
                        <p> 홍길동 </p>
                        <select name="select" id="select">
                            <option value="파도타기"> 파도타기 </option>
                        </select>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className='cy-home'>
            <div className="whole-box">
                <div className="homepage">
                    <div className="page-left">
                        <div className='todayArea'>
                            <span> TODAY <span className='today'>40</span> | TOTAL 1000 </span>
                        </div>
                        {renderPageLeft()}
                    </div>

                    <div className="page-right">
                        <div className="homepage-title-area">
                            <Link to="">
                                <span className='homepage-title'> 길동님의 미니홈피입니다 </span>
                            </Link>
                        </div>
                        <div className="content-box">
                            <Routes>
                                <Route index element={<Main />} />
                                <Route path="Main" element={<Main />} />
                                <Route path="diary" element={<Diary />} />
                                <Route path="diary/write" element={<DiaryWrite />} />
                                <Route path="diary/:id" element={<DiaryModify />} /> {/* 동적 id 경로 */}
                                <Route path="Photo" element={<Photo />} />
                            </Routes>
                        </div>
                    </div>
                </div>

                <div className="home-nav">
                    <Link to="">
                        <div className={`mainNav menu ${selectedMenu === 'Main' ? 'selected' : ''}`}>
                            <span> 홈 </span> 
                        </div>
                    </Link>
                    <Link to="/cyhome/diary">
                        <div className={`diaryNav menu ${selectedMenu === 'diary' ? 'selected' : ''}`}>
                            <span> 다이어리 </span> 
                        </div>
                    </Link>
                    <Link to="/cyhome/Photo">
                        <div className={`photoNav menu ${selectedMenu === 'Photo' ? 'selected' : ''}`}>
                            <span> 사진첩 </span> 
                        </div>
                    </Link>
                    <Link to="">
                        <div className="visitorNav menu"> <span> 방명록 </span> </div>
                    </Link>
                    <Link to="">
                        <div className="settingNav menu"> <span> 설정 </span> </div>
                    </Link>
                </div>
            </div>

            <div className="sub-window">
                <div className="audio-controls">
                    <div className="music_title_area">
                        <div className="music_title">
                            <div>
                                <div className="cd-icon"> </div>
                                <span> 프리스타일 - Y (Please Tell me Why) </span> 
                            </div>
                        </div>
                    </div>
                    <audio controls autoplay loop>
                        <source src={audioFile} type="audio/mpeg" />
                    </audio>
                </div>
            </div>
        </div>
    );
};

export default CyHome;