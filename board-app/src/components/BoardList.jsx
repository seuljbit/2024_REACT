import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardList = () => {
    const navigate = useNavigate();
    const [ boardList, setBoardList ] = useState([]);

    // get
    // post : 데이터를 보낼 때 (반드시 써야 함)
    const getBoardData = async () => {
        try {
            const boards = await axios.get('/list'); 
            console.log(boards);
            setBoardList(boards.data);
        } catch (error) {
            console.error("데이터 불러오기 실패 :", error);
        }
    }

    useEffect(() => {
        getBoardData();
    },[])

    if (boardList.length > 0) {
        return (
            <div className='boardList'>
                <div className='tablearea'>
                    <table>
                        <thead>
                            <tr>
                                <th className='tableid'> Number </th>
                                <th className='tabletitle'> Title </th>
                                <th className='tablewriter'> Writer </th>
                                <th className='tabledate'> Date </th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardList.map(b => (
                                <tr key={b.id}>
                                    <td> {b.id} </td>
                                    <td> <Link to={`/detail/${b.id}`}> {b.title} </Link> </td>
                                    <td> {b.writer} </td>
                                    <td> {b.reg_date.substring(0, b.reg_date.indexOf("T"))} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="listbtn btnarea">
                    <button className='writingBtn btn' onClick={() => navigate('/write')}> <span> 글쓰기 </span> </button>
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default BoardList;