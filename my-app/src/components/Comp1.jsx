import React from 'react';
import "./comp.css";
import { friends } from '../components/data/data';
import Table from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';
const Comp1 = () => {
    return (
        <div className='comp1 comp' style={{width:'500px',margin:'50px auto'}}>
            <div>친구 목록 리스트</div>
            {/* 친구 목록 표시 */}
            <div>
                <Table striped bordered hover style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>phone</th>
                            <th>address</th>
                            <th>job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map(f => (
                            <tr>
                                <td>{f.name}</td>
                                <td>{f.phone}</td>
                                <td>{f.addr}</td>
                                <td>{f.job}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
export default Comp1;