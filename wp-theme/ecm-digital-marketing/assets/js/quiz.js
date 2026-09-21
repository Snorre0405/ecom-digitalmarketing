/* ECM — "Er ECM noget for dig?"-testen
   Simpel klient-side quiz. Ingen data sendes nogen steder, og resultatet
   lover IKKE optagelse — kun en tilbagemelding på interesser og arbejdsform. */
(function () {
  "use strict";

  var QUESTIONS = [
    {
      q: "Du scroller på TikTok eller Instagram, og en annonce fanger dig. Hvad tænker du typisk?",
      options: [
        { t: "“Den er godt lavet — jeg vil se, hvordan de har bygget historien.”", type: "kreativ" },
        { t: "“Hvorfor fik lige jeg den her? Den ramte overraskende præcist.”", type: "data" },
        { t: "Jeg tænker mest over, hvor jeg kan købe det — og hopper videre.", type: "bred" },
      ],
    },
    {
      q: "Hvilken opgavetype tiltrækker dig mest lige nu?",
      options: [
        { t: "At finde på indhold, visuals og en historie, folk vil stoppe op for.", type: "kreativ" },
        { t: "At grave i tal og finde ud af, hvorfor noget virker — eller ikke gør.", type: "data" },
        { t: "Lidt af det hele — jeg keder mig, hvis jeg kun laver én slags opgave.", type: "bred" },
      ],
    },
    {
      q: "Du skal løse en opgave i en gruppe. Hvilken rolle falder dig mest naturligt?",
      options: [
        { t: "Jeg kommer med idéerne og det visuelle udtryk.", type: "kreativ" },
        { t: "Jeg holder styr på struktur, data og om vi rent faktisk når målet.", type: "data" },
        { t: "Jeg binder tingene sammen og sørger for, at helheden hænger sammen.", type: "bred" },
      ],
    },
    {
      q: "Hvor vigtigt er det for dig at forstå tal og statistik — ikke bare synes, noget “ser rigtigt ud”?",
      options: [
        { t: "Det er ikke det, der driver mig — men jeg vil gerne blive bedre til det.", type: "kreativ" },
        { t: "Meget vigtigt — jeg stoler mest på noget, jeg kan måle.", type: "data" },
        { t: "Vigtigt nok til at bruge det som værktøj — uden at det skal fylde det hele.", type: "bred" },
      ],
    },
    {
      q: "Du følger et brand, du synes gør det godt på sociale medier. Hvad interesserer dig mest?",
      options: [
        { t: "Æstetikken, tonen og hvordan de fortæller deres historie.", type: "kreativ" },
        { t: "Hvordan de bruger annoncer og data til at ramme præcis mig.", type: "data" },
        { t: "Hele forretningen bag — fra webshop til levering til kundeservice.", type: "bred" },
      ],
    },
    {
      q: "Har du en drøm om selv at bygge noget en dag — en butik, et brand, et projekt?",
      options: [
        { t: "Ja — og det skal helst være noget kreativt og visuelt.", type: "kreativ" },
        { t: "Måske — men så vil jeg først forstå, hvordan det hele hænger sammen forretningsmæssigt.", type: "data" },
        { t: "Ja, klart — jeg vil gerne kunne det hele selv, fra idé til drift.", type: "bred" },
      ],
    },
    {
      q: "Hvordan har du det med at lære nye digitale værktøjer (fx annonceplatforme, analytics, en webshop-platform)?",
      options: [
        { t: "Fint, så længe det tjener en kreativ idé.", type: "kreativ" },
        { t: "Det er noget af det, jeg glæder mig mest til — jeg kan lide systemer.", type: "data" },
        { t: "Jeg er nysgerrig på det meste og lærer gerne flere ting på én gang.", type: "bred" },
      ],
    },
    {
      q: "Hvad frustrerer dig mest lige nu i forhold til dine egne sociale medier eller projekter?",
      options: [
        { t: "At jeg ved, hvordan det skal se ud — men ikke hvordan jeg får det til at virke.", type: "kreativ" },
        { t: "At jeg ikke forstår, hvorfor noget virker for andre og ikke for mig.", type: "data" },
        { t: "At jeg har mange idéer, men ikke ved, hvor jeg skal starte.", type: "bred" },
      ],
    },
  ];

  var RESULTS = {
    kreativ: {
      tag: "Resultat · Den kreative strateg",
      title: "Du har blikket for det, der fanger — og ECM kan give dig værktøjerne bag",
      desc: "Du er tiltrukket af content, visuel identitet og de historier, brands fortæller. På ECM lærer du at koble den sans med strategi, data og forretningsforståelse, så det du skaber, også rent faktisk virker — ikke kun ser godt ud.",
    },
    data: {
      tag: "Resultat · Den analytiske bygger",
      title: "Du kan lide at forstå hvorfor — det er kernen i digital marketing og e-commerce",
      desc: "Du tiltrækkes af data, struktur og at forstå mekanikken bag det, der virker. På ECM får du det kombineret med kreative og forretningsmæssige fag, så du lærer at omsætte tal til beslutninger — ikke bare til rapporter.",
    },
    bred: {
      tag: "Resultat · Den brede digitale altmuligmand",
      title: "Du vil forstå hele forretningen — og det er præcis det, ECM er bygget til",
      desc: "Du er nysgerrig bredt: kreativt, teknisk og forretningsmæssigt på samme tid. ECM samler marketing, e-commerce, design og data i én uddannelse, så du kan blive den, der forstår og forbinder det hele.",
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("quizRoot");
    if (!root) return;

    var stepsEl = document.getElementById("quizSteps");
    var progressBar = document.getElementById("quizProgressBar");
    var progressLabel = document.getElementById("quizProgressLabel");
    var resultEl = document.getElementById("quizResult");
    var formEl = document.getElementById("quizForm");

    var current = 0;
    var answers = new Array(QUESTIONS.length).fill(null);

    render();

    function render() {
      stepsEl.innerHTML = "";
      QUESTIONS.forEach(function (item, qi) {
        var step = document.createElement("div");
        step.className = "quiz-step" + (qi === current ? " is-active" : "");
        step.setAttribute("data-index", qi);

        var label = document.createElement("div");
        label.className = "q-label";
        label.textContent = "Spørgsmål " + (qi + 1) + " af " + QUESTIONS.length;
        step.appendChild(label);

        var h = document.createElement("h2");
        h.textContent = item.q;
        step.appendChild(h);

        var opts = document.createElement("div");
        opts.className = "quiz-options";
        opts.setAttribute("role", "radiogroup");
        opts.setAttribute("aria-label", item.q);

        item.options.forEach(function (opt, oi) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "quiz-option";
          btn.setAttribute("role", "radio");
          var selected = answers[qi] === oi;
          btn.setAttribute("aria-pressed", selected ? "true" : "false");
          btn.setAttribute("aria-checked", selected ? "true" : "false");

          var letter = document.createElement("span");
          letter.className = "letter";
          letter.textContent = String.fromCharCode(65 + oi);
          btn.appendChild(letter);

          var txt = document.createElement("span");
          txt.textContent = opt.t;
          btn.appendChild(txt);

          btn.addEventListener("click", function () {
            answers[qi] = oi;
            render();
            if (qi === current && qi < QUESTIONS.length - 1) {
              setTimeout(function () {
                current = qi + 1;
                render();
                focusStep();
              }, 220);
            } else if (qi === current && qi === QUESTIONS.length - 1) {
              setTimeout(showResult, 220);
            }
          });

          opts.appendChild(btn);
        });

        step.appendChild(opts);

        var nav = document.createElement("div");
        nav.className = "quiz-nav";

        var backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.className = "btn btn-ghost";
        backBtn.textContent = "← Forrige";
        backBtn.disabled = qi === 0;
        backBtn.addEventListener("click", function () {
          current = Math.max(0, qi - 1);
          render();
          focusStep();
        });
        nav.appendChild(backBtn);

        var nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "btn btn-primary";
        nextBtn.textContent = qi === QUESTIONS.length - 1 ? "Se resultat →" : "Næste →";
        nextBtn.addEventListener("click", function () {
          if (answers[qi] === null) return;
          if (qi < QUESTIONS.length - 1) {
            current = qi + 1;
            render();
            focusStep();
          } else {
            showResult();
          }
        });
        nav.appendChild(nextBtn);

        step.appendChild(nav);
        stepsEl.appendChild(step);
      });

      var pct = Math.round(((current + 1) / QUESTIONS.length) * 100);
      progressBar.style.width = pct + "%";
      progressLabel.textContent = "Spørgsmål " + (current + 1) + " af " + QUESTIONS.length;
    }

    function focusStep() {
      var active = stepsEl.querySelector('.quiz-step[data-index="' + current + '"] h2');
      if (active) active.setAttribute("tabindex", "-1"), active.focus();
    }

    function showResult() {
      var tally = { kreativ: 0, data: 0, bred: 0 };
      answers.forEach(function (ai, qi) {
        if (ai === null) return;
        var type = QUESTIONS[qi].options[ai].type;
        tally[type]++;
      });
      var winner = Object.keys(tally).reduce(function (a, b) { return tally[a] >= tally[b] ? a : b; });
      var result = RESULTS[winner];

      formEl.style.display = "none";
      resultEl.classList.add("is-active");
      resultEl.querySelector(".result-tag").textContent = result.tag;
      resultEl.querySelector("h2").textContent = result.title;
      resultEl.querySelector(".desc").textContent = result.desc;
      resultEl.setAttribute("tabindex", "-1");
      resultEl.focus();
    }

    var restartBtn = document.getElementById("quizRestart");
    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        answers = new Array(QUESTIONS.length).fill(null);
        current = 0;
        formEl.style.display = "";
        resultEl.classList.remove("is-active");
        render();
      });
    }
  });
})();
