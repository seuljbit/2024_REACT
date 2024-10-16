// 설치한 라이브러리 변수로 받아오기
const express = require('express'); // 웹 서버를 구축하고 경로, 요청/응답을 쉽게 처리할 수 있는 웹 프레임워크
const bodyParser = require('body-parser'); // 클라이언트에서 전송된 요청의 본문 데이터를 해석
const mysql = require('mysql');
const cors = require('cors'); // 다른 도메인 또는 포트에서 오는 요청을 허용하는 설정을 도와주는 라이브러리

const app = express(); //express 사용하기 위한 app 생성
const PORT = 5000; //express 사용할 서버포트 설정

// app.use(미들웨어) : Express 애플리케이션에 미들웨어를 등록하는 역할
// 미들웨어 : 서버에 요청이 도달했을 때, 요청을 처리하기 전에 실행되는 <함수>
app.use(cors()); // 모든 도메인에서의 요청 허용
app.use(bodyParser.json()); // JSON 형식의 요청 바디를 해석

const db = mysql.createConnection({
    host : 'localhost',
    user: 'react', 
    password: 'mysql',
    port:'3306',
    database:'db_react' 
});

app.listen(PORT, ()=> { // express 접속
    console.log(`server connecting on : http://localhost:${PORT}`);
});

//db 연결
db.connect((err) => {
    if (!err) {
        console.log("success");
    } else {
        console.log("fail");
    }
});

// --------------- DB에서 값 가져오기 ---------------

// '/' => root 연결 시 보여지는 기본화면 설정
app.get('/', (req, res) => {
    res.send("React Server Connect Success !!");
});

// 게시물 목록 가져오기
app.get('/list', (req, res) => {
    console.log('/list');
    const sql = 'select * from board order by id desc';
    db.query(sql, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.status(500).send('전송 오류');
        }
    });
});

// 게시글 하나 가져오기 : id에 해당하는 값
app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    console.log(`/detail/${id}`);

    const sql = 'select * from board where id = ?';
    db.query(sql, [id], (err, data) => {
        if (!err) {
            if (data.length > 0) {
                res.send(data[0]); 
            } else {
                res.status(404).send('게시글을 찾을 수 없습니다.');
            }
        } else {
            console.log(err);
            res.status(500).send('전송 오류');
        }
    });
});

// board 등록
app.post('/write', (req, res) => {
    const { title, writer, content } = req.body;

    const sql = `insert into board (title, writer, content) values (?, ?, ?)`;
    db.query(sql, [title, writer, content], (err, data) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log(err);
            res.status(500).send('전송 오류');
        }
    });
});

// 게시글 수정
app.put('/detail/:id', (req, res) => {
    const { title, writer, content, reg_date } = req.body; // 요청 데이터 확인
    const id = req.params.id; // URL의 id 파라미터

    const sql = `UPDATE board SET title = ?, writer = ?, content = ?, reg_date = ? WHERE id = ?`;
    db.query(sql, [title, writer, content, reg_date, id], (err, data) => {
        if (!err) {
            console.log("수정 성공", data);
            res.sendStatus(200);
        } else {
            console.log("SQL 쿼리 오류:", err);
            res.status(500).send('게시글 수정 중 오류가 발생했습니다.');
        }
    });
});

// 게시글 삭제
app.delete('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM board WHERE id = ?`;

    db.query(sql, [id], (err, data) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log(err);
            res.status(500).send('게시글 삭제 중 오류가 발생했습니다.');
        }
    });
});
