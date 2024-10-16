function Test() {
    // return 밖 영역의 주석
    // jsx의 태그는 반드시 닫혀있어야 함 => 안 닫으면 error 발생
    // ex) <input  />, <br  />

    const name = 'React Test Component';
    const style = {
        color : "white",
        backgroundColor : "black",
        fontSize : "48px",
        padding : "16px"
    }
    return (
        <div className="test">
            {/* return 안 영역의 주석 */}
            {/* `${변수명}` => {변수명} : 백팁 없고 중괄호 안에 작성 */}
            <div style={style}> {name} </div>
        </div>
    );
}

export default Test;