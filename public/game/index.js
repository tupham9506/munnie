const PASS = "2013614";

const $storage = {
  get: () => {
    return localStorage.getItem("$g");
  },
  set: () => {
    localStorage.setItem("$g", JSON.stringify($g));
  },
};

$g = initVar();

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
      $g.current = "chap1";
      $("#chap_1 .overlay").remove();
      // Pass
    } else if (chap.key_1995 || chap.key_2001) {
      $("#chap_1 .overlay").css("opacity", 0.5);
    }
  },
  chap2: function () {
    $(".chap").hide();
    $("#chap2").show();
    $g.current = "chap2";
  },
  chap3: function () {
    $(".chap").hide();
    $("#chap3").show();
    if ($g.chaps.chap2.tree_has_water) {
      $("#chap3_tree").show();
    }
    $g.current = "chap3";
  },
  chap4: function () {
    $(".chap").hide();
    $("#chap4").show();
    $g.current = "chap4";
  },
  chap5: function () {
    $(".chap").hide();
    $("#chap5").show();
    $g.current = "chap5";
    if ($g.chaps.chap2.tree_has_water) {
      $("#chap5_tree").show();
    }
  },
  chap6: function () {
    $(".chap").hide();
    $("#chap6").show();
    $g.current = "chap6";
  },
  chap7: function () {
    $(".chap").hide();
    $("#chap7").show();
    $g.current = "chap7";
  },
  chap8: function () {
    $(".chap").hide();
    $("#chap8").show();
    $g.current = "chap8";
    for (let i in $g.pass) {
      $("#chap8_message").append(
        `<p> * Thông điệp ${+i + 1}: ${
          $g.pass[i].status ? $g.pass[i].message : ""
        } </p>`
      );
    }
  },
};

function continueGame() {
  const storage = $storage.get();
  if (storage) {
    $g = { ...initVar(), ...JSON.parse(storage) };
    if ($g.chaps.chap1.key_1995 && $g.chaps.chap1.key_1995) {
      $chap.chap2();
    } else {
      $chap.chap1();
    }

    buildItemBar();
  }
  $("#home").hide();
  $("#home_dialog").dialog("close");
}

function newGame() {
  $g = initVar();
  $storage.set();
  $("#home").hide();
  $("#home_dialog").dialog("close");
}

function initVar() {
  return {
    year: "0000",
    current: "chap1",
    selected_item: null,
    pass: [
      {
        status: 0,
        key: 2,
        message:
          "Hai con người gặp nhau ở hoàn cảnh đặc biệt, ở nơi đặc biệt và có tình yêu thật đặc biệt.",
      },
      {
        status: 0,
        key: 0,
        message: "Hãy nhớ lại xem còn điều gì chúng ta đã quên không?",
      },
      {
        status: 0,
        key: 1,
        message:
          "Em như một ánh sao trên bầu trời mà anh luôn luôn phải ngước nhìn lên. Một ngày không gặp em dài như mười năm.",
      },
      {
        status: 0,
        key: 3,
        message: "Ba tháng là quá đủ để chúng ta có thể hiểu nhau và yêu nhau.",
      },
      {
        status: 0,
        key: 6,
        message: "Mặc dù anh trông thật 'Xấu', nhưng em vẫn yêu anh.",
      },
      {
        status: 0,
        key: 1,
        message: "Em có biết em là người con gái xinh đẹp nhất trên đời không?",
      },
      {
        status: 0,
        key: 4,
        message: "Em đã có câu trả lời rồi.",
      },
    ],
    chaps: {
      chap1: {
        status: 0,
        key_1995: null,
        key_2001: null,
      },
      chap2: {
        status: 0,
        tree_has_water: 0,
      },
      chap4: {
        cloud_removed: 0,
      },
    },
    items: {
      item_water_can: 0,
      item_water: 0,
      item_watermelon: 0,
    },
  };
}

function buildItemBar() {
  $("#item_bar").empty();
  for (let i in $g.items) {
    if ($g.items[i]) {
      const htmlContent = $(`#${i}`).clone();
      htmlContent.css("position", "relative");
      $(`#${i}`).remove();
      if (htmlContent) $("#item_bar").append(htmlContent);
    }
  }
}

$(document).ready(function () {
  $("#home_dialog").dialog({
    modal: "true",
  });

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
    });
  }

  $(document).on("click", "#run_year", function () {
    // Chap 1
    if ($g.year === "1995" || $g.year === "2001") {
      $chap.chap1();
      // Chap 2
      if ($g.chaps.chap1.status) $chap.chap2();
    }

    if ($g.year === "2024") {
      $chap.chap3();
    }

    if ($g.year === "2025") {
      $chap.chap4();
    }

    if ($g.year === "2035") {
      $chap.chap5();
    }

    if ($g.year === "2048") {
      $chap.chap6();
    }

    if ($g.year === "2100") {
      $chap.chap8();
    }

    $("#year_label").html(`Năm ${$g.year}`);
  });

  // Chap 2
  $("#chap2_house").on("click", function () {
    $("#chap2_house_dialog").dialog({
      modal: "true",
      height: 400,
    });
  });

  $("#item_water_can").on("click", function () {
    $g.items.item_water_can = 1;
    $storage.set();
    buildItemBar();
  });

  $(document).on("click", "#item_bar .item", function () {
    $g.selected_item = $(this).attr("id");
    $("#item_bar .item").removeClass("selected_item");
    $(this).addClass("selected_item");
  });

  $(document).on("click", "#chap2_tree", function () {
    if ($g.chaps.chap2.item_water) {
      $g.chaps.chap2.tree_has_water = 1;
      $storage.set();
    }

    if ($g.chaps.chap2.tree_has_water) {
      $("#chap2_tree_dialog").dialog({
        modal: "true",
      });
    }
  });

  // Chap 3
  $(document).on("click", "#chap3_tree", function () {
    $("#chap3_tree_dialog").dialog({
      modal: "true",
    });
    $g.pass[0].status = 1;
    $storage.set();
  });

  // Chap 4
  $(document).on("click", "#cloud_1", function () {
    if ($g.current === "chap4") {
      $("#chap4_cloud_dialog").dialog({
        modal: "true",
      });
      $g.pass[2].status = 1;
      $storage.set();
    }
  });
  $(document).on("click", "#cloud_2", function () {
    if ($g.current === "chap4") {
      $("#cloud_2").hide();
      $g.chaps.chap4.cloud_removed = 1;
      $storage.set();
    }
  });

  $(document).on("click", "#pond", function () {
    if ($g.current === "chap2") {
      if ($g.selected_item === "item_water_can") {
        $g.chaps.chap2.item_water = 1;
        $storage.set();
      }
    }
    if ($g.current === "chap4" && $g.chaps.chap4.cloud_removed) {
      $("#pass_4").show();
    }
  });

  $(document).on("click", "#pass_4", function () {
    $("#chap4_pond_dialog").dialog({
      modal: "true",
    });
    $g.pass[3].status = 1;
    $storage.set();
  });

  // Chap 5
  $(document).on("click", "#chap5_tree", function () {
    $("#chap5_tree_dialog").dialog({
      modal: "true",
      height: 200,
    });
  });

  $("#item_watermelon").on("click", function () {
    $g.items.item_watermelon = 1;
    $storage.set();
    buildItemBar();
  });

  // Chap 6
  $(document).on("click", "#chap6_tree", function () {
    $("#chap6_tree_dialog").dialog({
      modal: "true",
      height: 200,
    });
    $g.pass[5].status = 1;
    $storage.set();
  });

  $("#item_wood").on("click", function () {
    $g.items.item_wood = 1;
    $storage.set();
    buildItemBar();
  });

  $(document).on("click", "#chap5_house", function () {
    if ($g.current === "chap6") {
      if ($g.selected_item === "item_wood") {
        $("#chap6 #chap5_house").hide();
        $("#chap6_house").show();
      }
    }
  });

  $(document).on("click", "#chap6_house", function () {
    $("#chap6_house_dialog").dialog({
      modal: "true",
    });
    $g.pass[6].status = 1;
  });

  $(document).on("click", "#chap8_check", function () {
    if ($("#chap8_pass").val() == PASS) {
      $("#chap8_pass_dialog").dialog({
        modal: "true",
      });
    }
  });
});
