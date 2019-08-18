function $childNode(o) {
    return window.frames[o]
}
function animationHover(o, e) {
    o = $(o), o.hover(function () {
        o.addClass("animated " + e)
    }, function () {
        window.setTimeout(function () {
            o.removeClass("animated " + e)
        }, 2e3)
    })
}
function WinMove() {
    var o = "[class*=col]", e = ".ibox-title", i = "[class*=col]";
    $(o).sortable({
        handle: e,
        connectWith: i,
        tolerance: "pointer",
        forcePlaceholderSize: !0,
        opacity: .8
    }).disableSelection()
}
var $parentNode = window.parent.document;
if ($(".tooltip-demo").tooltip({
    selector: "[data-toggle=tooltip]",
    container: "body"
}), $(".modal").appendTo("body"), $("[data-toggle=popover]").popover(), $(".collapse-link").click(function () {
    var o = $(this).closest("div.ibox"), e = $(this).find("i"), i = o.find("div.ibox-content");
    i.slideToggle(200), e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"), o.toggleClass("").toggleClass("border-bottom"), setTimeout(function () {
        o.resize(), o.find("[id^=map-]").resize()
    }, 50)
}), $(".close-link").click(function () {
    var o = $(this).closest("div.ibox");
    o.remove()
}), top == this) {
}

function clickRow(obj) {
    $("#detailBody").children("tr").attr("style", "font-family: Consolas");
    $(obj).attr("style", "font-family: Consolas; background-color: #b0d877;");
}

$("#showtr").click(function () {
    console.log(object)
    $("#panel").slideToggle("slow");
});

function details(obj) {
    if ($(obj).text() == '展开') {
        $(obj).text("收缩");
        $(obj).removeClass("btn-primary");
        $(obj).addClass("btn-danger");
        $(obj).parent().parent().next().children().children().slideDown()
    } else if ($(obj).text() == '收缩') {
        $(obj).text("展开");
        $(obj).parent().parent().next().children().children().slideUp()
        $(obj).removeClass("btn-danger");
        $(obj).addClass("btn-primary");
    }

}

$(function () {
    document.title=resultData["testName"]+'_测试报告';
    $("#title").text(document.title);
    $("#testName").text(resultData["testName"]);
    $("#testPass").text(resultData["testPass"]);
    $("#testFail").text(resultData["testFail"]);
    $("#testSkip").text(resultData["testSkip"]);
    $("#testAll").text(resultData["testAll"]);
    $("#beginTime").text(resultData["beginTime"]);
    $("#totalTime").text(resultData["totalTime"]);
    $("#filterAll").text(resultData["testAll"]);
    $("#filterOk").text(resultData["testPass"]);
    $("#filterFail").text(resultData["testFail"]);
    $("#filterSkip").text(resultData["testSkip"]);
    var classNames = [];
    var results = [];
    $.each(resultData["testResult"], function (i, n) {
        if (classNames.indexOf(n["className"]) == -1) {
            classNames.push(n["className"]);
        }
        if (results.indexOf(n["status"]) == -1) {
            results.push(n["status"]);
        }
    });

    $.each(classNames, function (i, n) {
        $("#filterClass").append("<option value='" + n + "' hassubinfo='true'>" + n + "</option>");
    });
    $.each(results, function (i, n) {
        $("#filterResult").append("<option value='" + n + "' hassubinfo='true'>" + n + "</option>");
    });

    $("#filterClass").chosen({ search_contains: true });
    $("#filterResult").chosen({ search_contains: true });

    function generateResult(className, caseResult) {
        $("#detailBody").children().remove();
        var filterAll = 0;
        var filterOk = 0;
        var filterFail = 0;
        var filterSkip = 0;
        $.each(resultData["testResult"], function (i, n) {
            if ((className == "" || n["className"] == className) && (caseResult == "" || n["status"] == caseResult)) {
                filterAll += 1;
                var status = "";
                if (n["status"] == '成功') {
                    filterOk += 1;
                    status = "<td><span class='text-navy'>成功</span></td>";
                } else if (n["status"] == '失败') {
                    filterFail += 1;
                    status = "<td><span class='text-danger'>失败</span></td>";
                } else if (n["status"] == '跳过') {
                    filterSkip += 1;
                    status = "<td><span class='text-warning'>跳过</span></td>";
                } else {
                    status = "<td><span>" + n["status"] + "</span></td>";
                }
                let detailLog2 = ''
                let logs = n["log"]
                $.each(logs, function (i, j) {
                    detailLog2 = detailLog2 + "<p>" + j + "</p>";
                });

                var tr = "<tr style='font-family: Consolas'>" +
                    "<td>" + (i + 1) + "</td>" +
                    "<td>" + n["className"] + "</td>" +
                    "<td>" + n["methodName"] + "</td>" +
                    "<td>" + n["description"] + "</td>" +
                    "<td>" + n["spendTime"] + "</td>" +
                    status + "<td><button type='button' id='showtr' onclick='details(this)' buttonIndex='" + i + "' class='btn btn-primary btn-xs' style='margin-bottom: 0px'>展开</button></td></tr>" +
                    "<tr><td colspan='7'><div style='display:none; font-family: Consolas; font-size:12px; padding: 10px 10px 0px 70px; border-bottom: 1px solid #eee; text-indent: -60px;'>" + detailLog2 + "</div></td></tr>"

                $("#detailBody").append(tr);
            }
        });
        $("#filterAll").text(filterAll);
        $("#filterOk").text(filterOk);
        $("#filterFail").text(filterFail);
        $("#filterSkip").text(filterSkip);
    }

    generateResult("", "");

    $("#filterClass").on('change', function () {
        var className = $("#filterClass").val();
        var caseResult = $("#filterResult").val();
        generateResult(className, caseResult);
    });

    $("#filterResult").on('change', function () {
        var className = $("#filterClass").val();
        var caseResult = $("#filterResult").val();
        generateResult(className, caseResult);
    });

    //$(".chosen-select").trigger("chosen:updated");

    function pie() {
        var option = {
            title: {
                text: '结果概览',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['失败', '跳过', '成功']
            },
            series: [
                {
                    name: '运行结果',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: resultData["testFail"], name: '失败' },
                        { value: resultData["testSkip"], name: '跳过' },
                        { value: resultData["testPass"], name: '成功' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        var chart = echarts.init(document.getElementById("echarts-map-chart"));
        chart.setOption(option);
    }

    pie();
});