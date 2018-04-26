/*************************************** DELETE NEWS */
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 39) document.getElementById('page_next').click();
    else if (event.keyCode === 37) document.getElementById('page_prev').click();
});

$(function () {
    $('#add_problem_dropdown').dropdown();
});
function delete_success(news_id) {
    window.location.href = '/admin/notice';
}
function delete_news(news_id) {
    $.ajax({
        url: "/api/news/delete",
        type: 'POST',
        data: {
            "news_id": news_id,
            "_csrf": document.head.getAttribute('data-csrf-token')
        },
        async: true,
        success: function (data) {
            error_code = data.error_code;
            switch (error_code) {
                case 0:
                    delete_success(data.session_id);
                    return;
                default:
                    alert("未知错误");
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
            show_error("未知错误");
            $("#login").text("登录");
        }
    });
}
function delete_confirm(news_id) {
    var r = confirm("确定删除" + news_id + "吗?");
    if (r == true) {
        delete_news(news_id);
    }
}
/*************************************** TOP NEWS */
function top_news(news_id) {
    $.ajax({
        url: "/api/news/top",
        type: 'POST',
        data: {
            "news_id": news_id,
            "checked": $("#isTop"+news_id).is(":checked"),
            "_csrf": document.head.getAttribute('data-csrf-token')
        },
        async: true,
        success: function (data) {
            error_code = data.error_code;
            switch (error_code) {
                case 0:
                    delete_success(data.session_id);
                    return;
                default:
                    alert("未知错误");
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
            show_error("未知错误");
            $("#login").text("登录");
        }
    });
}
/*************************************** PUBLIC NEWS */
function public_news(news_id) {
    $.ajax({
        url: "/api/news/public",
        type: 'POST',
        data: {
            "news_id": news_id,
            "checked": $("#isPublic"+news_id).is(":checked"),
            "_csrf": document.head.getAttribute('data-csrf-token')
        },
        async: true,
        success: function (data) {
            error_code = data.error_code;
            switch (error_code) {
                case 0:
                    delete_success(data.session_id);
                    return;
                default:
                    alert("未知错误");
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
            show_error("未知错误");
            $("#login").text("登录");
        }
    });
}

