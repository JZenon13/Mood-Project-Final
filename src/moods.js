//////// DOM Selectors /////////////
const searchBar = document.getElementById("searchBar");
const searchBtn = document.querySelector("#searchBtn");
const pastEntriesId = document.getElementById("pastEntries");
const logForm = document.querySelector("#short-diary");
const assScore = document.getElementById("assScore");
const pastQuizesTag = document.getElementById("pastQuizes");
//////// DOMContentLoaded ///////////
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .then((response) => response.json())
    .then((quotes) => renderSwansonQuotes(quotes));
  fetch("https://favqs.com/api/qotd")
    .then((response) => response.json())
    .then((quotes) => renderQuotesOfTheDay(quotes));
  fetch("https://movie-quote-api.herokuapp.com/v1/quote/")
    .then((response) => response.json())
    .then((quotes) => renderMovieQuotes(quotes));

  fetch("http://localhost:3000/entries")
    .then((response) => response.json())
    .then((moodEntryArr) => {
      pastEntries(moodEntryArr);
      searchFor(moodEntryArr);
      pastQuizes(moodEntryArr);
    });
});

/////// Search Functionality /////////
const searchFor = (moodEntryArr) => {
  searchBar.addEventListener("keyup", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const searchableEntries = moodEntryArr.filter((feelings) => {
      return (
        feelings.day.toLowerCase().includes(searchValue) ||
        feelings.entry.toLowerCase().includes(searchValue)
      );
    });
    searchBtn.addEventListener("click", (e) =>
      displaySearchItems(e, searchableEntries)
    );
  });
};

function displaySearchItems(e, searchableEntries) {
  pastEntriesId.innerHTML = "";
  pastEntries(searchableEntries);
}
//////////// Render Functions /////////////
const pastEntries = (moodEntryArr) => {
  moodEntryArr.map((entry) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.innerText = entry.blurb;
    const h4 = document.createElement("h4");
    h4.innerText = entry.day;
    const p = document.createElement("p");
    p.innerText = entry.entry;
    card.append(h3, h4, p);
    pastEntriesId.append(card);
  });
};

const pastQuizes = (moodEntryArr) => {
  moodEntryArr.map((entry) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = "";
    const h4 = document.createElement("h4");
    h4.innerText = `Date: ${entry.date}`;
    const h5 = document.createElement("h5");
    h5.innerText = `Quiz Score: ${entry.quiz}`;
    card.append(h4, h5);
    pastQuizesTag.append(card);
  });
};
/////////// Render Quotes /////////////
const renderSwansonQuotes = (quotes) => {
  let quoteTxt = document.getElementById("quotes-1");
  quoteTxt.innerText = `${quotes}-Ron Swanson`;
};

const renderQuotesOfTheDay = (quotes) => {
  let quoteTxt = document.getElementById("quotes-2");
  quoteTxt.innerText = `${quotes.quote.body}-${quotes.quote.author}`;
};

const renderMovieQuotes = (quotes) => {
  let quoteTxt = document.getElementById("quotes-3");
  quoteTxt.innerText = `${quotes.quote}-${quotes.show}`;
};
////////// Audio Buttons //////////
let audioButtonSearch = document.querySelector(".audio-button-Search");
audioButtonSearch.addEventListener("click", function () {
  var audio = document.getElementById("audio-Search");

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

const logEntry = document.querySelector("#short-diary");
logEntry.addEventListener("click", function () {
  var audio = document.getElementById("audio-Wow");

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

let audioButtonTreasure = document.querySelector("#log-button");
audioButtonTreasure.addEventListener("click", function () {
  var audio = document.getElementById("audio-Treasure");

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

/////////// Emoji Changer ///////////
function emojiClicker() {
  const emoBtn = document.querySelector("#emojiOne");
  let audioYay = document.getElementById("audio-yay");
  let audioAww = document.getElementById("audio-aww");
  let face1 = document.getElementById("emojiPic1");
  if (face1.src.match("emoji_a.png")) {
    {
      face1.src = "emoji_1.png";
      emoBtn.innerText = "Tell a sad story";
      audioYay.play();
    }
  } else {
    {
      face1.src = "emoji_a.png";
      emoBtn.innerText = "Compliment them!";
      audioAww.play();
    }
  }
}
function emojiClicker2() {
  const emoBtn = document.querySelector("#emojiTwo");
  let face2 = document.getElementById("emojiPic2");
  let audioYay = document.getElementById("audio-yay");
  let audioAww = document.getElementById("audio-aww");
  if (face2.src.match("emoji_b.png")) {
    {
      face2.src = "emoji_2.png";
      emoBtn.innerText = "Tell a sad story";
      audioYay.play();
    }
  } else {
    {
      face2.src = "emoji_b.png";
      emoBtn.innerText = "Compliment them!";
      audioAww.play();
    }
  }
}

/////////// Event Listeners ///////////

logForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBlurb = (document.querySelector("#blurb").innerText =
    e.target.blurb.value);
  const newDay = (document.querySelector("#DOTW").innerText =
    e.target.DOTW.value);
  const newEntry = (document.querySelector("#entry").innerText =
    e.target.entry.value);
  logForm.reset();
  newEntryFetch(newBlurb, newDay, newEntry);
});

assScore.addEventListener("submit", (e) => {
  e.preventDefault();
  const score = (document.querySelector("#score").innerText = parseInt(
    e.target.score.value
  ));
  const date = (document.querySelector("#start").innerText =
    e.target.start.value);
  assScore.reset();
  newAssFetch(date, score);
});

function newEntryFetch(newBlurb, newDay, newEntry) {
  fetch("http://localhost:3000/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      blurb: newBlurb,
      day: newDay,
      entry: newEntry,
    }),
  })
    .then((response) => response.json())
    .then((data) => pastEntries([data]));
}

function newAssFetch(date, score) {
  fetch("http://localhost:3000/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      date: date,
      quiz: score,
    }),
  })
    .then((response) => response.json())
    .then((data) => pastQuizes([data]));
}
