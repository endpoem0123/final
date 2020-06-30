let max = 0
let min = 1
// choose a game mode
$(".Difficulty").on('change', function () {
    var value = $(this).val();

    $('.row-input').attr('readonly', 'readonly');
    $('.column-input').attr('readonly', 'readonly');
    if (value == "classical 3X3") {
        $(".row-input").val(3);
        $(".column-input").val(3);
        $(".v_cond-input").val(3);

    } else if (value == "classical 4X4") {
        $(".row-input").val(4);
        $(".column-input").val(4);
        $(".v_cond-input").val(4);

    }
})

//勝利條件的合法性
$(".v_cond-input").on('change', function () {
    var v_con = $(this).val();
    var c = $(".column-input").val();
    if (v_con > c) {
        alert('請重新選擇您的victory condition！');
        $(".v_cond-input").val(c);
    } else if (v_con < 3) {
        alert('請重新選擇您的victory condition！');
        $(".v_cond-input").val(c);
    }
})

//選擇遊戲模式 另外localstorage寫在html中
function game() {
    var form = document.getElementById("Gmode");
    var gamemode = form.mode.value;
    localStorage.setItem("game mode", gamemode);
    var v = document.getElementsByClassName("v_cond-input box")[0].value;
    localStorage.setItem("v_cond", v);

    if (gamemode == "classical 3X3") {
        location.href = "./game3.html"

    } else if (gamemode == "classical 4X4") {
        location.href = "./game4.html"
    }
}