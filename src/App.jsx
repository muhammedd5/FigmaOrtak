import { useState } from "react";
import "./App.css";
import htmlIcon from "./assets/img/htmlicon.jpeg";
import cssIcon from "./assets/img/cssicon.jpeg";
import jsIcon from "./assets/img/jsicon.jpeg";
import accessIcon from "./assets/img/people.jpeg"; 

function App() {
  const [ekran, setEkran] = useState("baslangic");
  const [soruNo, setSoruNo] = useState(0);
  const [secim, setSecim] = useState("");
  const [puan, setPuan] = useState(0);

  const sorular = [
    {
      soru: "WCAG 2.0 Level AA için minimum kontrast oranı nedir?",
      secenekler: ["4.5:1", "3:1", "2:1", "5:1"],
      dogru: "4.5:1",
    },
    {
      soru: "ARIA neyin kısaltmasıdır?",
      secenekler: [
        "Accessible Rich Internet Applications",
        "Advanced UI Rendering API",
        "Adaptive Responsive Interface Access",
        "Bilmiyorum",
      ],
      dogru: "Accessible Rich Internet Applications",
    },
  ];

  const basla = () => setEkran("quiz");

  const cevapSec = (secenek) => {
    setSecim(secenek);
    if (secenek === sorular[soruNo].dogru) {
      setPuan(puan + 1);
    }

    setTimeout(() => {
      if (soruNo + 1 < sorular.length) {
        setSoruNo(soruNo + 1);
        setSecim("");
      } else {
        setEkran("sonuc");
      }
    }, 800);
  };

  const tekrarBasla = () => {
    setEkran("baslangic");
    setSoruNo(0);
    setSecim("");
    setPuan(0);
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong>Frontend Quiz</strong>
        </div>
      </div>

      <div className="main-content">
        {ekran === "baslangic" && (
          <div className="welcome">
            <div className="questions">
                <span>Welcome to the</span>
                <strong>Frontend Quiz!</strong>
                <span>Pick a subject to get started.</span>
            </div>
            <div className="buttons">
              <button className="btn" onClick={basla}><div className="icon-box html-bg"><img src={htmlIcon} alt="HTML" /></div><span>HTML</span></button>
              <button className="btn" onClick={basla}><div className="icon-box css-bg"><img src={cssIcon} alt="CSS" /></div><span>CSS</span></button>
              <button className="btn" onClick={basla}><div className="icon-box js-bg"><img src={jsIcon} alt="JavaScript" /></div><span>JavaScript</span></button>
              <button className="btn" onClick={basla}><div className="icon-box access-bg"><img src={accessIcon} alt="Accessibility" /></div><span>Accessibility</span></button>
            </div>
          </div>
        )}
        {ekran === "quiz" && (
          <div className="quiz-section">
            <div className="questions">
              <span>Question {soruNo + 1} of {sorular.length}</span>
              <strong>{sorular[soruNo].soru}</strong>
            </div>

            <div className="buttons">
              {sorular[soruNo].secenekler.map((secenek, index) => (
                <button
                  key={index}
                  className={`btn ${secim === secenek ? 'selected' : ''}`}
                  onClick={() => cevapSec(secenek)}
                  disabled={secim !== ""}
                >
                  <div className="letter-box">{String.fromCharCode(65 + index)}</div>
                  <span>{secenek}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {ekran === "sonuc" && (
          <div className="welcome">
            <div className="questions">
                <span>Quiz Completed</span>
                <strong>You scored...</strong>
            </div>
            <div className="buttons">
                <div className="score-card">
                    <h1 style={{fontSize: '80px', color: '#313E51'}}>{puan}</h1>
                    <p>out of {sorular.length}</p>
                </div>
                <button className="submit-btn" onClick={tekrarBasla}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;