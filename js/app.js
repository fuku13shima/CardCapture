/*****変数宣言*****/
//目標値
let target = 0;

//カードデータ
class Card {
    constructor(type , num) {
        //マーク
        this.type = type;
        //カード番号
        this.num = num;
    }
}

//トランプマーク配列
//いらない気がする
//const card_type = ["spade", "diamond" , "heart" , "club"];

//敵山札 , 敵手札配列
const cpu_cards = [];

//プレイヤー山札 , プレイヤー手札配列
const player_cards = [];

//各フラグ（
let win_flg = false;



/*****メイン処理*****/
/***画面読み込み時処理***/
window.onload = function onLoad() {
    newgame();
}

function newgame(){
    console.log("ゲームスタート！");

//山札作成
    //カードを分ける

    //カードシャッフル
    shuffle();
    
//手札４枚出す
    for(let i = 0 ; i < 4 ; i++){
        draw_card();
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
function player_get(){
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
function cpu_capture(){
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
function sacrifice(){
    console.log("生贄フェーズ");
//プレイヤーカード選択時
    //絵札Aチェック
    card_check();

    //敵の捕獲場所に移動
    send_card();
}


/***投了ボタン押下時処理***/
function give_up(){
    console.log("投了しました");
}



/*****関数******/
/***カードをシャッフルする***/
function shuffle(){
    console.log("カードをシャッフルしました");
}

/***山札からカードを引く***/
function draw_card(){
    console.log("カードを引きました");
}

/***選択カードの情報取得***/
function pickup_card(){
    console.log("選択カード情報を取得しました");

}

//担当：武田
/***絵札Aチェック***/
function card_check(){
    console.log("絵札Aのチェックをしました");
}

/***敵山札にカードを戻す***/
function return_cpu_deck(){
    console.log("カードを山札に戻しました");
}

/***敵の捕獲場所にカードを送る***/
function send_card(){
    console.log("カードを敵の捕獲場所に送りました");
}