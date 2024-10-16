import React from 'react';
import { boardList } from '../components/data/data';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import '../components/board-style.css';

const BoardList = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

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
                                <td> <Link to={`/Detail/${b.id}`}> {b.title} </Link> </td>
                                <td> {b.writer} </td>
                                <td> {b.reg_date.substring(0, b.reg_date.indexOf("T"))} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="listbtn btnarea">
                <button className='writingBtn btn' onClick={() => navigate('/Write')}> <span> 글쓰기 </span> </button>
            </div>
        </div>
    );
};

export default BoardList;