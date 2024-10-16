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
    user: 'cyworldUser', 
    password: 'cyworld',
    port:'3306',
    database:'cyworld' 
});

app.listen(PORT, ()=> { // express 접속
    console.log(`server connecting on : http://localhost:${PORT}`);
});

//db 연결
db.connect((err) => {
    if (!err) {
        console.log("success");
    } else {
        console.log("MySQL connection fail:", err.message);
    }
});

// --------------- DB에서 값 가져오기 ---------------

// '/' => root 연결 시 보여지는 기본화면 설정
app.get('/', (req, res) => {
    res.send("React Server Connect Success !!");
});

// 일촌평 가져오기
app.get('/comments', (req, res) => {
    const sql = "SELECT * FROM comments WHERE content IS NOT NULL";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);  // 에러 로그 출력
            return res.status(500).send('Database query failed');
        }
        console.log('Query results:', results);  // 쿼리 결과 로그 출력
        res.json(results);
    });
});


// 새로운 일촌평으로 content가 NULL인 항목 업데이트
app.post('/update-comment', (req, res) => {
    console.log('Request received:', req.body);  

    const { content } = req.body;
    const sql = "UPDATE comments SET content = ? WHERE content IS NULL LIMIT 1";
    
    db.query(sql, [content], (err, result) => {
        if (err) {
            console.error('Error updating comment:', err); 
            return res.status(500).send(err);
        }
        res.send('Comment updated successfully!');
    });
});

app.get('/diary', (req, res) => {
    const sql = "SELECT * FROM diary ORDER BY id DESC"; 
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/diary/:id', (req, res) => {
    const { id } = req.params; // URL의 id 파라미터
    const sql = `SELECT * FROM diary WHERE id = ?`;

    db.query(sql, [id], (err, data) => {
        if (!err && data.length > 0) {
            res.status(200).json(data[0]); // 다이어리 데이터를 클라이언트로 응답
        } else if (!err && data.length === 0) {
            res.status(404).send('다이어리를 찾을 수 없습니다.'); // 데이터가 없을 경우
        } else {
            console.log("SQL 쿼리 오류:", err);
            res.status(500).send('다이어리를 불러오는 중 오류가 발생했습니다.');
        }
    });
});

// 다이어리 등록 
app.post('/diary/write', (req, res) => {
    const { content } = req.body;
    const sql = 'INSERT INTO diary (content) VALUES (?)';
    db.query(sql, [content], (err, data) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log(err);
            res.status(500).send('전송 오류');
        }
    });
});

// 다이어리 수정
app.put('/diary/:id', (req, res) => {
    const { date, content } = req.body; // 요청 데이터 확인
    const { id } = req.params; // URL의 id 파라미터

    const sql = `UPDATE diary SET date = ?, content = ? WHERE id = ?`;
    db.query(sql, [date, content, id], (err, data) => {
        if (!err) {
            console.log("수정 성공", data);
            res.sendStatus(200);
        } else {
            console.log("SQL 쿼리 오류:", err);
            res.status(500).send('게시글 수정 중 오류가 발생했습니다.');
        }
    });
});

app.delete('/diary/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM diary WHERE id = ?`;

    db.query(sql, [id], (err, data) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log(err);
            res.status(500).send('게시글 삭제 중 오류가 발생했습니다.');
        }
    });
});

// 댓글 목록 불러오기
app.get('/diary/:id/comments', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM diary_comments WHERE diary_id = ? ORDER BY diary_comment_date DESC`;

    db.query(sql, [id], (err, data) => {
        if (!err) {
            res.status(200).json(data);
        } else {
            console.log("댓글 불러오기 오류:", err);
            res.status(500).send('댓글을 불러오는 중 오류가 발생했습니다.');
        }
    });
});

// 댓글 작성
app.post('/diary/:id/comments', (req, res) => {
    const { id } = req.params; // 다이어리 ID
    const { diary_comment_name, diary_comment } = req.body; // 작성자 이름과 댓글 내용

    const sql = `INSERT INTO diary_comments (diary_id, diary_comment_name, diary_comment) VALUES (?, ?, ?)`;

    db.query(sql, [id, diary_comment_name, diary_comment], (err, data) => {
        if (!err) {
            res.status(201).send('댓글이 성공적으로 추가되었습니다.');
        } else {
            console.log("댓글 추가 오류:", err);
            res.status(500).send('댓글 추가 중 오류가 발생했습니다.');
        }
    });
});

app.delete('/diary/:diaryId/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    const sql = `DELETE FROM diary_comments WHERE id = ?`;

    db.query(sql, [commentId], (err, data) => {
        if (!err) {
            res.sendStatus(200);
        } else {
            console.log(err);
            res.status(500).send('댓글 삭제 중 오류가 발생했습니다.');
        }
    });
});