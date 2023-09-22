import React, { useState } from "react";
import "./App.css";
import EventData from "./EventData";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const fetchNameInfo = () => {
    if (name.trim() === "") {
      setError("이름을 입력하세요.");
      return;
    }

    // 이름 정보를 가져오는 요청
    axios
      .get(`https://api.example.com/getInfo?name=${name}`)
      .then((response) => {
        setInfo(response.data);
        setError("");
      })
      .catch((error) => {
        setInfo("");
        setError("이름 정보를 가져오는 중 오류가 발생했습니다.");
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>서울시 집수리 시공업체 정보</h1>
      </header>
      <label htmlFor="nameInput">이름 입력:</label>
      <input
        type="text"
        id="nameInput"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={fetchNameInfo}>정보 가져오기</button>
      <EventData />
      <div>
        {error && <p className="error">{error}</p>}
        {info && <p>이름: {name}</p>}
        {info && <p>정보: {info}</p>}
      </div>
    </div>
  );
}

export default App;
