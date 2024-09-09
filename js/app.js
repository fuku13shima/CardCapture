/*****変数宣言*****/
//カードデータ
class Card {
    constructor(cards_id, type, num, imglink) {
        this.cards_id = cards_id;
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
//プレイヤー合計値
let player_sum = 0;

let click_cards = [];
let click_cnt = 0;

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
        //imgタグ生成
        const image = document.createElement("img");
        image.setAttribute('id', player_deck[i].cards_id);
        image.setAttribute('class', i);
        image.style.width = "120px";  // 幅を300pxに変更
        image.style.height = "200px"; // 高さを300pxに変更
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
    // const cpu_cards = document.getElementById("cpu_cards");
    for (let i = 0; i < 4; i++) {
        console.log("cpuドロー 残り：" + cpu_deck.length);
        console.log(cpu_deck);
        //プレイヤー手札
        //imgタグ生成
        // const image = document.createElement("img");
        // image.setAttribute('id' , cpu_deck[i].num + cpu_deck[i].type);
        // image.src = cpu_deck[i].imglink;
        // cpu_cards.appendChild(image);
        cpu_deck.shift();
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
function pickup_card(image){
    //カード選択時
    image.addEventListener('click', (e) => {
        console.log(e.target.id);
        const click_card = e.target.id;
        // click_cards[click_cnt] = click_card;
        let click_flg = false;
        for (let k = 0; k < click_cards.length; k++) {
            console.log(click_cards[k].charAt(1) + " : " + click_card.charAt(1));
            if (click_cards[k] == click_card || click_cards[k].charAt(1) !== click_card.charAt(1)) {
                click_flg = true;
                break;
            }
        }

        const select_card = document.getElementById(click_card);
        if (click_flg == false) {
            console.log("選択！");
            click_cards[click_cnt] = click_card;
            select_card.style.backgroundColor = "red";

            let tmp = Number(click_card.charAt(0));
            player_sum += tmp;
            console.log(player_sum);
            click_cnt++;
        } else {
            console.log("選択解除！");
            click_cards.shift();
            select_card.style.backgroundColor = "transparent";

            let tmp = Number(click_card.charAt(0));
            player_sum -= tmp;
            console.log(player_sum);
            click_cnt--;
        }


    })

}

/***同一マーク判定***/
// function type_check(click_cards){
    
// }





//担当：武田
/***絵札Aチェック***/
function check() {
    console.log("絵札Aのチェックをしました");
    /*if (isFaceCardOrAce(num)) {
        document.getElementById('result').innerText = `${card}は絵札またはAです！`;
    } else {
        document.getElementById('result').innerText = `${cardValue}は絵札でもAでもありません。`;
    }
    function card_check(num) {
        return ['11', '12', '13', '14'].includes(value);
        console.log("絵札Aのチェックをしました");
    }*/
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