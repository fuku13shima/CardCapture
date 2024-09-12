/*****変数宣言*****/
let selectedCard = null;  // グローバル変数に選択したカード情報を保存
let selectedCard_type = null;  // グローバル変数に選択したカードのタイプを保存
let selectedCard_num = null;  // グローバル変数に選択したカードのタイプを保存
let PictureCard_judge;


//カードデータ
class Card {
    constructor(cards_id, type, num, imglink) {
        this.cards_id = cards_id;
        //マーク
        this.type = type;
        selectedCard_type = type;
        //カード番号
        this.num = num;
        selectedCard_num = num;
        this.imglink = imglink;
    }
}

let tmp_num;
let tmp_type;
let imgurl;

//敵山札 , 敵手札配列
let cpu_deck = [];
let cpu_hand_cards = [];

//プレイヤー山札 , プレイヤー手札配列
let player_deck = [];
let player_hand_cards = [];
//プレイヤー合計値
let player_sum = 0;

let click_cards = [];
let cur_cards = [];
let click_cnt = 0;
let type_flg = true;

//各フラグ（
let win_flg = false;

/*****メイン処理*****/
/***画面読み込み時処理***/
window.onload = function onLoad() {
    check();
    newgame();
}

async function newgame() {
    console.log("ゲームスタート！");
    try {
        //山札作成
        const new_deck_url = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const new_deck = await new_deck_url.json();
        const id = new_deck.deck_id;
        // console.log(new_deck);

        let url = "https://www.deckofcardsapi.com/api/deck/" + id + "/draw/?count=52";
        const draw_url = await fetch(url);
        const test_draw = await draw_url.json();
        // console.log(test_draw);

        //カードを分ける
        let player_cnt = 0;
        let cpu_cnt = 0;
        for (let i = 0; i < 52; i++) {
            tmp_num = test_draw.cards[i].code.charAt(0);
            tmp_type = test_draw.cards[i].code.charAt(1);
            imgurl = test_draw.cards[i].image;
            // console.log(tmp_num + "\n" + imgurl);
            // console.log(test_draw.cards[i].code.charAt(0));
            // console.log(test_draw.cards[i].code.charAt(1));

            if (tmp_num !== "2" && tmp_num !== "3" && tmp_num !== "4") {
                switch (tmp_num) {
                    case "0":
                        tmp_num = "10";
                        break;

                    case "J":
                        tmp_num = "11";
                        break;

                    case "Q":
                        tmp_num = "12";
                        break;

                    case "K":
                        tmp_num = "13";
                        break;

                    case "A":
                        tmp_num = "14";
                        break;
                }

                cpu_deck[cpu_cnt] = new Card(test_draw.cards[i].code, tmp_type, tmp_num, imgurl);
                cpu_cnt++;
                // console.log(test_draw.cards[i].code.charAt(0));
            } else {
                player_deck[player_cnt] = new Card(test_draw.cards[i].code, tmp_type, tmp_num, imgurl);
                console.log(player_deck[player_cnt]);
                // console.log(player_cnt);
                player_cnt++;
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }


    //プレイヤー手札４枚出す
    const player_cards = document.getElementById("player_cards");
    for (let i = 0; i < 4; i++) {
        console.log("プレイヤードロー 残り：" + player_deck.length);
        console.log(player_deck);

        //プレイヤー手札
        const div = document.createElement("div");
        let div_id = "div" + player_deck[i].cards_id;
        div.setAttribute('id', div_id);
        //imgタグ生成
        const image = document.createElement("img");
        image.setAttribute('id', player_deck[i].cards_id);
        image.setAttribute('class', i);
        image.style.width = "120px";  // 幅を300pxに変更
        image.style.height = "180px"; // 高さを300pxに変更
        image.src = player_deck[i].imglink;
        player_cards.appendChild(div);
        div.appendChild(image);
        

        player_deck.shift();
        /*絵札test */
        // check();

        //選択カードの情報取得
        pickup_card(image);
    }


    //CPU手札４枚出す
    const cpu_cards = document.getElementById("cpu_cards");
    for (let i = 0; i < 4; i++) {
        console.log("cpuドロー 残り：" + cpu_deck.length);
        console.log(cpu_deck);//全てのカードを取得している(配列)
        //CPU手札
        const div = document.createElement("div");
        let div_id = "div" + cpu_deck[i].cards_id;
        div.setAttribute('id', div_id);
        //imgタグ生成
        const image = document.createElement("img");
        image.setAttribute('id', cpu_deck[i].cards_id);
        image.setAttribute('class', i);
        image.style.width = "120px";  // 幅を300pxに変更
        image.style.height = "180px"; // 高さを300pxに変更
        image.src = cpu_deck[i].imglink;
        cpu_cards.appendChild(div);
        div.appendChild(image);
        
        cpu_deck.shift();
        //選択カードの情報取得
        pickup_card(image);
    }

    //敵カード絵札Aチェック
    //敵山札にカードを戻す
    return_cpu_deck();

    //カード補充
    // if(){
    //     draw_card(); 
    // }

}


/***「獲得」時処理***/
function player_get() {
    console.log("獲得フェーズ");
    //敵カード選択時

    //マーク、数値取得
    pickup_card();

    //プレイヤーカード選択時

    //マーク、数値取得
    pickup_card();

    //複数選択時処理

    //マーク、数値比較

    //捨て札置き場に捨てる


}

/***「敵からの捕獲」時処理(試作)***/
const menu_button = document.getElementById('menu_button');
const select_button = document.getElementById('select_button');
const dialog2 = document.getElementById('myDialog2');
const dialog3 = document.getElementById('myDialog3');
let flug = 0;

showButton2.addEventListener('click', function (){
    dialog2.show();
    menu_button.style.display = "none";
    select_button.style.display = "block"
    flug = 1;
});

/***「生贄」時処理(試作)***/
 const showButton3 = document.querySelector('#showButton3');

 showButton3.addEventListener('click', function () {
   dialog3.show();
   select_button.style.display = 'block';
   menu_button.style.display = 'none';
   flug = 2;//生贄ボタンか、捕獲ボタンかの識別
 });

 //「キャンセル」ボタンクリック時
 let cancel = document.getElementById('cancel');
 cancel.addEventListener('click', function () {
    if (flug === 1) {
        dialog2.close();
    } else {
        dialog3.close();
    }
    select_button.style.display = 'none';
    menu_button.style.display = 'block';
  });

  //「決定」ボタンクリック時
 let decision = document.getElementById('decision');
 decision.addEventListener('click', function () {
    if (flug === 1) {
        dialog2.close();
    } else {
        dialog3.close();
    }
    select_button.style.display = 'none';
    menu_button.style.display = 'block';
    console.log(selectedCard);//クリックしたカードを表示
    console.log(check(cpu_deck[3].num, cpu_deck[3].type));//絵札か確認してもらう
    //console.log(PictureCard_judge);
    if(check(pu_deck[3].num, cpu_deck[3].type)){
        alert('相手の右端のカードが絵札、またはAのため敵からの捕獲ができません');
    }else{
        send_card();

    }
  });

/***「敵からの捕獲」時処理(決定クリック時)***/
function cpu_capture() {
    console.log("敵からの捕獲フェーズ");
    //敵カード絵札Aチェック
    card_check();

    //プレイヤーカード選択時

    //敵の捕獲場所に移動
    send_card();

    //敵山札にカードを戻す
    return_cpu_deck();
}


/***「生贄」時処理***/
function sacrifice() {
    console.log("生贄フェーズ");
    //プレイヤーカード選択時
    //絵札Aチェック
    card_check();

    //敵の捕獲場所に移動
    send_card();
}


/***投了確認***/
 //各要素を変数に代入
 const dialog = document.querySelector('#myDialog');
 const okButton = document.querySelector('#myDialog .button.ok');
 const cancelButton = document.querySelector('#myDialog .button.cancel');
 const showButton = document.querySelector('#showButton');



 //「ダイアログを開く」ボタンがクリックされたらダイアログを開く
 showButton.addEventListener('click', function () {
   dialog.show();
 });
 okButton.addEventListener('click', function () {
    location.href = "index.html"
  });
 //「cancel」ボタンがクリックされたらダイアログを閉じる
 cancelButton.addEventListener('click', function () {
   dialog.close();
 });



/***投了ボタン押下時処理***/
function give_up() {
    console.log("投了しました");
}



/*****関数******/
/***山札からカードを引く***/
function draw_card() {
    console.log("カードを引きました");
}

/***絵札A0を数値に変換***/
function trance_num(tmp_num){
    switch (tmp_num) {
        case "0":
            tmp_num = "10";
            break;

        case "J":
            tmp_num = "11";
            break;

        case "Q":
            tmp_num = "12";
            break;

        case "K":
            tmp_num = "13";
            break;

        case "A":
            tmp_num = "14";
            break;
    }

    return tmp_num;

}

/***選択カードの情報取得***/
function pickup_card(image) {
    //カード選択時
    image.addEventListener('click', (e) => {
        let cnt = click_cards.length;

        console.log(e.target.id);//クリックしたカード
        const click_card = e.target.id;
        selectedCard = click_card;
        let card_found = false;  
        let card_index = -1;     
        let type_flg = true;     

        for (let i = 0; i < click_cards.length; i++) {
            if (click_cards[i].cards_id === click_card) {
                card_found = true;
                card_index = i;
                break;
            }
        }

        let tmp_num = trance_num(click_card.charAt(0));
        cur_cards[0] = new Card(click_card, click_card.charAt(1), tmp_num, "");

        const select_card = document.getElementById(click_card);
        let tmp = "div" + click_card;
        let div_id_tmp = document.getElementById(tmp);

        if (card_found) {
            div_id_tmp.style.backgroundColor = "transparent";  
            player_sum -= Number(click_cards[card_index].num);  
            click_cards.splice(card_index, 1);  
        } else {
            if (cnt > 0) {
                for (let i = 0; i < cnt; i++) {
                    if (click_cards[i].type !== cur_cards[0].type) {
                        type_flg = false;
                        break;
                    }
                }
            }

            if (type_flg) {
                console.log("マーク一致");
                div_id_tmp.style.backgroundColor = "red"; 
                click_cards.push(cur_cards[0]);  
                player_sum += Number(cur_cards[0].num);  
            } else {
                console.log("マーク不一致");
                for (let j = 0; j < click_cards.length; j++) {
                    let reset_tmp = "div" + click_cards[j].cards_id;
                    let reset_div = document.getElementById(reset_tmp);
                    reset_div.style.backgroundColor = "transparent";  
                }
                click_cards.splice(0);  
                click_cards.push(cur_cards[0]);  
                player_sum = Number(cur_cards[0].num);  
                div_id_tmp.style.backgroundColor = "red";  
            }
        }

        console.log(click_cards);
        console.log( player_sum);
    });
}









//担当：武田
/***絵札Aチェック***/
function check(num, type) {
    // プレイヤーの手札の数値を表示
    console.log("チェック中のカードの数値: " + num + type);

    if(num > 10){
        console.log("このカードは絵札です")
        PictureCard_judge = true;
        return PictureCard_judge;
    }else{
        console.log("このカードは絵札ではありません")
        PictureCard_judge = false;
        return PictureCard_judge;
    }
    function card_check(num) {
        return ['11', '12', '13', '14'].includes(value);
        console.log("絵札Aのチェックをしました");
    }
}


// function pickup_card() {
//     console.log("選択カード情報を取得しました");
// }

//担当：武田
/***絵札Aチェック***/
function card_check() {
    console.log("絵札Aのチェックをしました");
}

/***敵山札にカードを戻す***/
function return_cpu_deck() {
    console.log("カードを山札に戻しました");
}

/***敵の捕獲場所にカードを送る***/
function send_card() {
    console.log("カードを敵の捕獲場所に送りました");
}