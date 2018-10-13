var $msg = $('.messages')
var $msgContent = $('.messages-content');
var loading_html = '<div class="bubble loading robot"><div class="img"><img src="../vendor/img/ml_1272.png"></div><p><span><i></i><i></i><i></i></span></p></div>';

var accessToken = "15a075595bf64652947ade551e4e38c4";
var baseUrl = "https://api.api.ai/v1/";

function returnAsJsonObject(source) {
    return typeof (source) === 'string' ? JSON.parse(source) : source;
}

// function jsonpCallback(data){
//     console.log(data)
// }

function send() {
    var text = $(".msg-input").val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        // dataType: "jsonp",
        // jsonpCallback: "jsonpCallback",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({
            query: text,
            lang: "zh-TW",
            sessionId: "somerandomthing"
        }),
        success: function (data) {
            console.log(data)
            console.log(data.result.fulfillment.speech)
            anwserView(data.result.fulfillment.speech)
        },
        error: function () {
            console.log('NONONO')
        }
    });
}

function updateScrollbar() {
    $msgContent.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        scrollEasing: "easeIn",
        timeout: 0
    });
}


function welcome() {
    var $msgContent = $('.messages-content');
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    var user_html = '<div class="bubble robot"><p>Hello 你今天好嗎？</p></div>'
    setTimeout(function () {
        $(user_html).appendTo($('.bubleContent')).addClass('new');
        updateScrollbar()
    }, 500)
}


function insertMsg() {
    var msg = $('.msg-input').val();
    var $msgContent = $('.messages-content');

    if ($.trim(msg) == '') {
        return false;
    }

    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');

    var user_html = '<div class="bubble user"><p>' + msg + '</p></div>';
    $(user_html).appendTo($('.bubleContent')).addClass('new');
    updateScrollbar();

}

function btnMsg(text) {
    var $msgContent = $('.messages-content');
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');

    var user_html = '<div class="bubble user"><p>' + text + '</p></div>';
    $(user_html).appendTo($('.bubleContent')).addClass('new');
    updateScrollbar();
}

function anwserView(data) {
    var $msgContent = $('.messages-content');
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    var user_html = '<div class="bubble robot"><p>' + data + '</p></div>'
    setTimeout(function () {
        $(user_html).appendTo($('.bubleContent')).addClass('new');
        updateScrollbar()
    }, 500)
}

function init() {
    $('.messages-content').mCustomScrollbar({
        mouseWheelPixels: 100
    });


    $('.msg-send').on('click', function () {
        insertMsg();
        send()
        $(this).val('')
    })

    $('.msg-input').on('keydown', function (e) {
        if (e.which === 13) {
            insertMsg();
            send()
            $(this).val('')
            return false;
        }
    })


}

$(function () {
    init()
})