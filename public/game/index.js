const $storage = {
  get: () => {
    return localStorage.getItem("$g");
  },
  set: () => {
    localStorage.setItem("$g", JSON.stringify($g));
  },
};

$chap = {
  chap1: function () {
    const chap = $g.chaps.chap1;

    if ($g.year === "1995") {
      chap.key_1995 = 1;
    }

    if ($g.year === "2001") {
      chap.key_2001 = 1;
    }
    if (chap.key_1995 && chap.key_2001) {
      // Pass
      chap.status = 1;
      $g.current = "chap2";
      $storage.set();
      $("#chap_1 .overlay").remove();
      // Pass
    } else if (chap.key_1995 || chap.key_2001) {
      $("#chap_1 .overlay").css("opacity", 0.5);
    }
  },
  chap2: function () {
    $(".chap").hide();
    $("#chap2").show();

    const chap = $g.chaps.chap2;
    if ($g.year === "2024") {
    }
  },
};

let $g = {
  year: "0000",
  current: "chap1",
  chaps: {
    chap1: {
      status: 0,
      key_1995: null,
      key_2001: null,
    },
    chap2: {
      status: 0,
    },
  },
};

const storage = $storage.get();
if (storage) {
  $g = JSON.parse(storage);
  process();
}

for (let i = 0; i < 4; i++) {
  $("#year-container").append(`<div class="swiper" index="${i}">
      <div class="swiper-wrapper">
        ${(() => {
          let html = "";
          for (let j = 0; j <= 9; j++) {
            html += `<div class="swiper-slide">${j}</div>`;
          }
          return html;
        })()}
      </div>
    </div>`);
}

const swipers = new Swiper(".swiper", {
  direction: "vertical",
  loop: true,
});

for (let swiper of swipers) {
  swiper.on("slideChange", function () {
    const newIndex = $(this.el).attr("index");
    const value = this.realIndex;

    const array = $g.year.split("");
    array[newIndex] = value;
    $g.year = array.join("");
    process();
  });
}

function process() {
  for (let i in $g.chaps) {
    if (!$g.chaps[i].status) {
      $chap[i]();
      $storage.set();
    }

    if (i === $g.current) break;
  }
}

function run() {}
