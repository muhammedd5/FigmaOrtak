import { useState } from "react";
import "./App.css";

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

  function basla() {
    setEkran("quiz");
  }

  function cevapSec(secenek) {
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
  }

  function tekrarBasla() {
    setEkran("baslangic");
    setSoruNo(0);
    setSecim("");
    setPuan(0);
  }

  return (
    <div>
      {ekran === "baslangic" && (
        <div>
          <h1>
            Welcome to the <br />
            <strong>Frontend Quiz!</strong>
          </h1>

          <p>Pick a subject to get started.</p>

          <div>
            <button onClick={basla}>HTML</button>
            <button onClick={basla}>CSS</button>
            <button onClick={basla}>JavaScript</button>
            <button onClick={basla}>Accessibility</button>
          </div>
        </div>
      )}

      {ekran === "quiz" && (
        <div>
          <p>
            Soru {soruNo + 1} / {sorular.length}
          </p>

          <h2>{sorular[soruNo].soru}</h2>

          {sorular[soruNo].secenekler.map((secenek) => (
            <button
              key={secenek}
              onClick={() => cevapSec(secenek)}
              disabled={secim !== ""}
            >
              {secenek}
            </button>
          ))}
        </div>
      )}

      {ekran === "sonuc" && (
        <div>
          <h2>Quiz Bitti</h2>
          <p>Doğru Sayısı: {puan}</p>
          <button onClick={tekrarBasla}>Tekrar Oyna</button>
        </div>
      )}
    </div>
  );
}

export default App;
