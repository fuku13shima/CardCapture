/*****変数宣言*****/
//カードデータ
class Card {
    constructor(type , num , imglink) {
        //マーク
        this.type = type;
        //カード番号
        this.num = num;
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

//各フラグ（
let win_flg = false;

/*****メイン処理*****/
/***画面読み込み時処理***/
window.onload = function onLoad() {
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
            console.log(tmp_num + "\n" + imgurl);
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

                cpu_deck[cpu_cnt] = new Card(tmp_type , tmp_num , imgurl);
                cpu_cnt++;
                // console.log(test_draw.cards[i].code.charAt(0));
            } else {
                player_deck[player_cnt] = new Card(tmp_type , tmp_num , imgurl);
                // console.log(player_deck[player_cnt]);
                // console.log(player_cnt);
                player_cnt++;
            }

        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    console.log(player_deck[0]);

    //手札４枚出す
    const player_cards = document.getElementById("player_cards");
    for (let i = 0; i < 4; i++) {
        console.log(player_deck[i]);
        console.log(player_deck[i].num + " " + player_deck[i].type + "\n" + player_deck[i].imglink);
             
        //imgタグ生成l
        const image = document.createElement("img");
        image.setAttribute('id' , i);
        image.src = player_deck[i].imglink;
        // image.src = "https://deckofcardsapi.com/static/img/3C.png";

        //仮
        // let tmp = player_deck[i].num + player_deck[i].type;
        // image.src = "https://deckofcardsapi.com/static/img/" + tmp + ".png";


        player_cards.appendChild(image);
        // draw_card();
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


/***「敵からの捕獲」時処理***/
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


/***投了ボタン押下時処理***/
function give_up() {
    console.log("投了しました");
}



/*****関数******/
/***山札からカードを引く***/
function draw_card() {
    console.log("カードを引きました");
}

/***選択カードの情報取得***/
function pickup_card() {
    console.log("選択カード情報を取得しました");

}

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