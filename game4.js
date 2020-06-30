var turn = 0;
var Owc = 0;
var Xwc = 0;
var v_cond = 4;

$().ready(function () {
    gamemode = localStorage.getItem("game mode");
    alert("現在遊戲模式：" + gamemode);
    v_cond = localStorage.getItem("v_cond");
    alert("先將" + v_cond + '個連一線者勝利');
})

function playRound(objDest) {
    if (objDest.getElementsByClassName('state')[0].innerText == 0 && turn == 0) {
        var Eimg = objDest.getElementsByClassName('pic')[0];
        var Oimg = document.createElement("img");
        Oimg.setAttribute('src', './img/O.png');
        Oimg.setAttribute('alt', 'O');
        Oimg.setAttribute('class', 'pic');
        var TargetDiv = objDest.getElementsByClassName('state')[0];
        TargetDiv.innerText = 'O';
        objDest.replaceChild(Oimg, Eimg);
        turn = 1;

        var TXimg = document.createElement("img");
        TXimg.setAttribute('src', './img/TX.png');
        TXimg.setAttribute('alt', 'turns：X');
        TXimg.setAttribute('class', 'tpic');

        var TOimg = document.getElementsByClassName('tpic')[0];
        document.getElementsByClassName("turns")[0].replaceChild(TXimg, TOimg);


    } else if (objDest.getElementsByClassName('state')[0].innerText == 0 && turn == 1) {
        var Ximg = document.createElement("img");
        var Eimg = objDest.getElementsByClassName('pic')[0];
        var TargetDiv = objDest.getElementsByClassName('state')[0];
        TargetDiv.innerText = 'X';
        Ximg.setAttribute('src', './img/X.png');
        Ximg.setAttribute('alt', 'X');
        Ximg.setAttribute('class', 'pic');
        objDest.replaceChild(Ximg, Eimg);
        turn = 0;

        var TOimg = document.createElement("img");
        TOimg.setAttribute('src', './img/TO.png');
        TOimg.setAttribute('alt', 'turns：O');
        TOimg.setAttribute('class', 'tpic');

        var TXimg = document.getElementsByClassName('tpic')[0];
        document.getElementsByClassName("turns")[0].replaceChild(TOimg, TXimg);
    } else {
        alert("方塊已經被佔用了!");
    }

    if (checkRow()) {
        if (turn == 0) {
            setTimeout(alert("playerII Win！"), 5000);

            clearTable();
            Xwc += 1;
            console.log(document.getElementsByClassName('Xwc')[0]);
            var grade = document.getElementsByClassName('Xwc')[0];
            grade.innerText = "playerII：" + Xwc;
        } else if (turn == 1) {
            setTimeout(alert("playerI Win！"), 5000);

            clearTable();
            Owc += 1;
            console.log(document.getElementsByClassName('Owc')[0]);
            var grade = document.getElementsByClassName('Owc')[0];
            grade.innerText = "playerI：" + Owc;


        }
    } else if (tableIsFull()) {
        setTimeout(alert("平手"), 5000);
        clearTable();
    }

}

function clearTable() {
    for (i = 0; i <= 3; i++)
        for (j = 0; j <= 3; j++) {
            var Eimg = document.createElement("img");
            Eimg.setAttribute('src', './img/E.png');
            Eimg.setAttribute('alt', 'E');
            Eimg.setAttribute('class', 'pic');
            var OXimg = eval("ttt" + i + j).getElementsByClassName('pic')[0];
            eval("ttt" + i + j).replaceChild(Eimg, OXimg);
        }
    for (i = 0; i <= 3; i++) {
        eval("ttt" + i + "0" + ".getElementsByClassName('state')[0]" + ".innerHTML = 0;");
        eval("ttt" + i + "1" + ".getElementsByClassName('state')[0]" + ".innerHTML = 0;");
        eval("ttt" + i + "2" + ".getElementsByClassName('state')[0]" + ".innerHTML = 0;");
        eval("ttt" + i + "3" + ".getElementsByClassName('state')[0]" + ".innerHTML = 0;");
    }
}

function checkRow() {
    if (v_cond == 4) {
        for (i = 0; i <= 3; i++) {
            // 列
            if (
                eval("compare1(" + "ttt" + i + "0" + "," + "ttt" + i + "1" + "," + "ttt" + i + "2" + "," + "ttt" + i + "3" + ")")
            )
                return true;

            // 對角線
            if (
                eval("compare1(ttt00,ttt11,ttt22,ttt33) || compare1(ttt03,ttt12,ttt21,ttt30)")
            )
                return true;

            // 欄
            if (
                eval("compare1(" + "ttt" + "0" + i + "," + "ttt" + "1" + i + "," + "ttt" + "2" + i + "," + "ttt" + "3" + i + ")")
            )
                return true;
        }
        return false;
    } else if (v_cond == 3) {
        for (i = 0; i <= 2; i++) {
            // 列
            if (
                eval("compare(" + "ttt" + i + "0" + "," + "ttt" + i + "1" + "," + "ttt" + i + "2" + ")")
            )
                return true;

            // 對角線
            if (
                eval("compare(" + "ttt" + "0" + i + "," + "ttt" + "1" + "1" + "," + "ttt" + "2" + (2 - i) + ")")
            )
                return true;

            // 欄
            if (
                eval("compare(" + "ttt" + "0" + i + "," + "ttt" + "1" + i + "," + "ttt" + "2" + i + ")")
            )
                return true;
        }


        for (i = 0; i <= 2; i++) {
            // 列
            if (
                eval("compare(" + "ttt" + i + "1" + "," + "ttt" + i + "2" + "," + "ttt" + i + "3" + ")")
            )
                return true;

            // 對角線
            if (
                eval("compare(" + "ttt" + "0" + (i + 1) + "," + "ttt" + "1" + "2" + "," + "ttt" + "2" + (3 - i) + ")")
            )
                return true;

            // 欄
            if (
                eval("compare(" + "ttt" + "0" + (i + 1) + "," + "ttt" + "1" + (i + 1) + "," + "ttt" + "2" + (i + 1) + ")")
            )
                return true;
        }

        for (i = 0; i <= 2; i++) {
            // 列
            if (
                eval("compare(" + "ttt" + (i + 1) + "0" + "," + "ttt" + (i + 1) + "1" + "," + "ttt" + (i + 1) + "2" + ")")
            )
                return true;

            // 對角線
            if (
                eval("compare(" + "ttt" + "1" + i + "," + "ttt" + "2" + "1" + "," + "ttt" + "3" + (2 - i) + ")")
            )
                return true;

            // 欄
            if (
                eval("compare(" + "ttt" + "1" + i + "," + "ttt" + "2" + i + "," + "ttt" + "3" + i + ")")
            )
                return true;
        }

        for (i = 0; i <= 2; i++) {
            // 列
            if (
                eval("compare(" + "ttt" + (i + 1) + "1" + "," + "ttt" + (i + 1) + "2" + "," + "ttt" + (i + 1) + "3" + ")")
            )
                return true;

            // 對角線
            if (
                eval("compare(" + "ttt" + "1" + (i + 1) + "," + "ttt" + "2" + "2" + "," + "ttt" + "3" + (3 - i) + ")")
            )
                return true;

            // 欄
            if (
                eval("compare(" + "ttt" + "1" + (i + 1) + "," + "ttt" + "2" + (i + 1) + "," + "ttt" + "3" + (i + 1) + ")")
            )
                return true;
        }
        return false;

    }
}

function tableIsFull() {
    for (i = 0; i <= 3; i++)
        for (j = 0; j <= 3; j++)
            if (eval("ttt" + i + j).getElementsByClassName('state')[0].innerText == 0) return false;
    return true;
}

function compare(obj0, obj1, obj2) {
    if (
        obj0.getElementsByClassName('state')[0].innerText != 0 &&
        obj1.getElementsByClassName('state')[0].innerText != 0 &&
        obj2.getElementsByClassName('state')[0].innerText != 0
    ) {
        if (
            obj0.getElementsByClassName('state')[0].innerText == obj1.getElementsByClassName('state')[0].innerText &&
            obj1.getElementsByClassName('state')[0].innerText == obj2.getElementsByClassName('state')[0].innerText
        )
            return true;
    }

    return false;
}

function compare1(obj0, obj1, obj2, obj3) {
    if (
        obj0.getElementsByClassName('state')[0].innerText != 0 &&
        obj1.getElementsByClassName('state')[0].innerText != 0 &&
        obj2.getElementsByClassName('state')[0].innerText != 0 &&
        obj3.getElementsByClassName('state')[0].innerText != 0
    ) {
        if (
            obj0.getElementsByClassName('state')[0].innerText == obj1.getElementsByClassName('state')[0].innerText &&
            obj1.getElementsByClassName('state')[0].innerText == obj2.getElementsByClassName('state')[0].innerText &&
            obj2.getElementsByClassName('state')[0].innerText == obj3.getElementsByClassName('state')[0].innerText
        )
            return true;
    }

    return false;
}

function prepage() {
    location.href = "./index.html"
}