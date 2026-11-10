(function () {
  var QUESTIONS = [
    { q: "A car travels 20 km in the morning and 15 km in the afternoon. How many kilometers does it travel in total?",
      o: ["30 km", "35 km", "40 km", "25 km"], a: 1,
      e: "Add the two distances: 20 + 15 = 35 km." },
    { q: "A school has 4 classrooms. Each classroom has 28 students. On Monday, 15 students are absent. How many students are present at school?",
      o: ["97", "112", "87", "102"], a: 0,
      e: "First multiply: 4 × 28 = 112 students. Then subtract the absent students: 112 − 15 = 97." },
    { q: "Sarah buys 3 notebooks for $4 each. How much does she pay?",
      o: ["$7", "$12", "$15", "$9"], a: 1,
      e: "Multiply the number of notebooks by the price: 3 × $4 = $12." },
    { q: "A farmer has 48 apples and puts them equally into 6 baskets. How many apples are in each basket?",
      o: ["6", "7", "8", "9"], a: 2,
      e: "Share equally with division: 48 ÷ 6 = 8 apples in each basket." },
    { q: "A train travels 60 km per hour for 3 hours. How far does it travel?",
      o: ["120 km", "150 km", "180 km", "200 km"], a: 2,
      e: "Distance = speed × time. So 60 × 3 = 180 km." },
    { q: "Tom has $50. He buys a book for $18 and a pen for $7. How much money does he have left?",
      o: ["$25", "$30", "$35", "$20"], a: 0,
      e: "Add what he spends: $18 + $7 = $25. Then subtract: $50 − $25 = $25." },
    { q: "A school organizes 5 groups with 12 students in each group. How many students are there in total?",
      o: ["50", "55", "60", "65"], a: 2,
      e: "Multiply the groups by the students in each group: 5 × 12 = 60." }
  ];
  var KEY_TEXT = ["35 km", "97 students", "$12", "8 apples", "180 km", "$25", "60 students"];
  var L = ["A", "B", "C", "D"];

  var STUDENTS = [
    { n: 1, title: "Excellent Answer", lv: "excellent", on: 5,
      ans: "4 × 28 = 112. 112 − 15 = 97 students.",
      ai: "Excellent work! You correctly multiplied the number of classrooms by the number of students and then subtracted the absent students. Your answer is correct. Keep it up!",
      t: "Both calculations are correct: 4 × 28 = 112 and 112 − 15 = 97. Next step to try: write a full sentence, such as “97 students are present at school.”" },
    { n: 2, title: "Good Answer", lv: "good", on: 4,
      ans: "112 − 15 = 97.",
      ai: "Correct answer! You found the total number of students and subtracted those who were absent. Try to include the multiplication step to make your solution clearer.",
      t: "The answer is correct, but the number 112 appears without a reason. Hint: write 4 × 28 = 112 first, so a reader can see where 112 comes from." },
    { n: 3, title: "Average Answer", lv: "average", on: 3,
      ans: "4 + 28 = 32. 32 − 15 = 17 students.",
      ai: "You correctly noticed that you need to subtract the absent students, but you used addition instead of multiplication. Remember that each classroom has 28 students. You should multiply 4 by 28 first.",
      t: "Good idea to subtract the absent students. Hint: “4 classrooms with 28 students each” means 28 + 28 + 28 + 28. Multiplication is a fast way to add equal groups. Then 112 − 15 = 97." },
    { n: 4, title: "Weak Answer", lv: "weak", on: 2,
      ans: "112 + 15 = 127 students.",
      ai: "You correctly calculated the total number of students in the school, but you added the absent students. Since they are not present, you need to subtract 15 from 112.",
      t: "You found 112 correctly. Hint: ask yourself, “Are the absent students at school?” No, so they leave the group. Leaving means subtract: 112 − 15 = 97." },
    { n: 5, title: "Incorrect Answer", lv: "incorrect", on: 1,
      ans: "28 − 15 = 13 students.",
      ai: "You correctly subtracted the absent students from 28, but you forgot that there are 4 classrooms. First calculate the total number of students in all classrooms, then subtract 15.",
      t: "The subtraction is correct, but 28 is only one classroom. Hint: find the whole school first with 4 × 28 = 112. Then subtract the 15 absent students to get 97." }
  ];

  var qList = document.getElementById("qList");
  var form = document.getElementById("quizForm");
  var submitBtn = document.getElementById("submitBtn");
  var retakeBtn = document.getElementById("retakeBtn");
  var warn = document.getElementById("warn");
  var result = document.getElementById("result");
  var submitted = false;

  QUESTIONS.forEach(function (item, i) {
    var card = document.createElement("div");
    card.className = "card q";
    card.id = "q" + i;
    var html = '<fieldset><legend><span class="q-num">' + (i + 1) + '</span><span>' + item.q + '</span></legend><div class="opts">';
    item.o.forEach(function (txt, j) {
      html += '<label class="opt"><input type="radio" name="q' + i + '" id="q' + i + 'o' + j + '" value="' + j + '"><span class="body"><span class="letter">' + L[j] + '</span><span class="txt">' + txt + '</span><span class="tag"></span></span></label>';
    });
    html += '</div></fieldset><div class="fb"></div>';
    card.innerHTML = html;
    qList.appendChild(card);
  });

  var keyBody = document.getElementById("keyBody");
  QUESTIONS.forEach(function (item, i) {
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + (i + 1) + "</td><td class='k'>" + L[item.a] + " – " + KEY_TEXT[i] + "</td>";
    keyBody.appendChild(tr);
  });

  function answeredCount() {
    var c = 0;
    QUESTIONS.forEach(function (_, i) { if (form.querySelector('input[name="q' + i + '"]:checked')) c++; });
    return c;
  }
  function updateProgress() {
    var c = answeredCount();
    document.getElementById("progLabel").textContent = c + " of 7 answered";
    document.getElementById("progFill").style.width = (c / 7 * 100) + "%";
    document.getElementById("progBar").setAttribute("aria-valuenow", c);
    if (c === 7) warn.textContent = "";
  }
  form.addEventListener("change", updateProgress);

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (submitted) return;
    var c = answeredCount();
    if (c < 7) {
      warn.textContent = "Please answer all 7 questions first. You have answered " + c + ".";
      for (var k = 0; k < 7; k++) {
        if (!form.querySelector('input[name="q' + k + '"]:checked')) { document.getElementById("q" + k).scrollIntoView({ block: "center" }); break; }
      }
      return;
    }
    warn.textContent = "";
    var score = 0;
    QUESTIONS.forEach(function (item, i) {
      var picked = parseInt(form.querySelector('input[name="q' + i + '"]:checked').value, 10);
      var card = document.getElementById("q" + i);
      card.classList.add("done");
      var opts = card.querySelectorAll(".opt");
      opts.forEach(function (lab, j) {
        lab.querySelector("input").disabled = true;
        if (j === item.a) { lab.classList.add("is-correct"); lab.querySelector(".tag").textContent = "Correct answer"; }
        else if (j === picked) { lab.classList.add("is-wrong"); lab.querySelector(".tag").textContent = "Your answer"; }
      });
      var ok = picked === item.a;
      if (ok) score++;
      card.querySelector(".fb").innerHTML =
        '<div class="q-status ' + (ok ? "ok" : "no") + '">' + (ok ? "Correct" : "Not correct. The right answer is " + L[item.a] + ") " + KEY_TEXT[i] + ".") + '</div>' +
        '<div class="explain"><strong>Why?</strong>' + item.e + '</div>';
    });
    submitted = true;
    submitBtn.hidden = true;
    retakeBtn.hidden = false;
    document.getElementById("scoreNum").innerHTML = score + '<small> / 7</small>';
    var title, text;
    if (score === 7) { title = "Perfect score!"; text = "You answered every question correctly. Great work."; }
    else if (score >= 5) { title = "Great job!"; text = "You understand most of these problems. Read the explanations for the ones you missed."; }
    else if (score >= 3) { title = "Good try!"; text = "You are on the right way. Read each explanation and try the quiz again."; }
    else { title = "Keep practicing!"; text = "Read the explanations below each question, then retake the quiz."; }
    document.getElementById("scoreTitle").textContent = title;
    document.getElementById("scoreText").textContent = text;
    document.getElementById("scoreFill").style.width = (score / 7 * 100) + "%";
    result.hidden = false;
    result.scrollIntoView({ block: "center", behavior: "smooth" });
  });

  retakeBtn.addEventListener("click", function () {
    form.reset();
    submitted = false;
    QUESTIONS.forEach(function (_, i) {
      var card = document.getElementById("q" + i);
      card.classList.remove("done");
      card.querySelector(".fb").innerHTML = "";
      card.querySelectorAll(".opt").forEach(function (lab) {
        lab.classList.remove("is-correct", "is-wrong");
        lab.querySelector(".tag").textContent = "";
        lab.querySelector("input").disabled = false;
      });
    });
    result.hidden = true;
    retakeBtn.hidden = true;
    submitBtn.hidden = false;
    warn.textContent = "";
    updateProgress();
    document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
  });

  // Student feedback cards
  var grid = document.getElementById("stuGrid");
  STUDENTS.forEach(function (s) {
    var segs = "";
    for (var i = 1; i <= 5; i++) segs += '<i class="' + (i <= s.on ? "on" : "") + '"></i>';
    var el = document.createElement("article");
    el.className = "card stu lv-" + s.lv;
    el.innerHTML =
      '<div class="stu-head"><h3>Student ' + s.n + ' – ' + s.title + '</h3></div>' +
      '<div class="level"><div class="segs" aria-hidden="true">' + segs + '</div><span class="name">Performance level: ' + s.title.replace(" Answer", "") + '</span></div>' +
      '<div class="blk ans"><div class="lab"><svg class="icon" style="width:16px;height:16px"><use href="#i-book"/></svg>Student answer</div><p>' + s.ans + '</p></div>' +
      '<div class="blk ai"><div class="lab"><svg class="icon" style="width:16px;height:16px"><use href="#i-spark"/></svg>AI feedback</div><p>' + s.ai + '</p></div>' +
      '<div class="blk teacher"><div class="lab"><svg class="icon" style="width:16px;height:16px"><use href="#i-teacher"/></svg>Teacher’s review and improvement</div><p>' + s.t + '</p></div>' +
      '<span class="reviewed"><svg class="icon"><use href="#i-check"/></svg>AI feedback reviewed and corrected by a human teacher</span>';
    grid.appendChild(el);
  });

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      var text = src.textContent.replace(/^[“"]|[”"]$/g, "").trim();
      var note = btn.parentElement.querySelector(".copy-note");
      function fallback() {
        var range = document.createRange(); range.selectNodeContents(src);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        note.textContent = "Text selected. Press Ctrl+C or Copy.";
      }
      try {
        navigator.clipboard.writeText(text).then(function () {
          note.textContent = "Copied!";
          setTimeout(function () { note.textContent = ""; }, 2000);
        }, fallback);
      } catch (e) { fallback(); }
    });
  });

  // Reflection word count
  var words = document.getElementById("reflectText").textContent.trim().split(/\s+/).length;
  document.getElementById("wordCount").textContent = words + " words";

  // Mobile menu
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });

  // Active nav link
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var ids = links.map(function (a) { return a.getAttribute("href").slice(1); });
  function onScroll() {
    var y = window.scrollY + 120, cur = ids[0];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) cur = id;
    });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
