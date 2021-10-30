$$.ready(function() {
    //关闭新手教程
    $$.params.showTutorial = false;
    addFormTop();
    addFooter();
})

function addFormTop() {
    var title_content = $("#title_content").text();
    var form_top_title = $(".xdTitleRow").text();
    var imgLogo = $(".xdTitleRow").find("img");
    var title_description = $("#title_description").text();
    var formTop = $("<div class='formTop'><div class='form_layout'>" +
        "<div class='form_top_t'></div>" +
        "<p class='form_top_title'></p>" +
        "<p class='form_top_description'><p>" +
        "<div class='form_milestone_container'></div>" +
        "</div></div>");
    $("#header_holder").after(formTop);
    var intervalW = setInterval(function() {
        if ($("#master_footer").size() > 0 && $("#form_holder").size() > 0 && $("#form_holder").width() > 0) {
            clearInterval(intervalW);
            var formWidth = $("#form_holder").width();
            $(".form_layout").css("width", formWidth + "px");
            var titleSpan = $("<span>" + title_content + "</span>");
            if (imgLogo.size() > 0) {
                $(".form_top_t").append(imgLogo.eq(0));
            }
            $(".form_top_t").append(titleSpan);

            $(".form_top_title").html(form_top_title);
            $(".form_top_description").html(title_description);
            addToolButton();
            addCommandButton();
        }
    }, 100)
    var intervalCount = 0;
    var milestoneInterval = setInterval(function() {
        intervalCount++;
        var form_milestone_holder = $(".form_milestone_holder");
        if (form_milestone_holder.size() > 0 && form_milestone_holder.find("li").size() > 0) {
            clearInterval(milestoneInterval);
            addMilestone();
        } else {
            if (intervalCount > 200) {
                clearInterval(milestoneInterval);
            }
        }
    }, 100)
}

function addMilestone() {
    var form_milestone_holder = $("#form_milestone_holder");
    if (form_milestone_holder.size() > 0) {
        $("#renderContent_holder").css("paddingTop", "90px");
        var milestoneUl = $("<ul class='milestone_ul'></ul>");
        $(".form_milestone_container").append(milestoneUl);
        var mileLis = $(".form_milestone_view").find("li.form_milestone_step");
        if (mileLis.size() > 0) {
            var wid = 100 / (mileLis.size()) + "%";
            for (var i = 0; i < mileLis.size(); i++) {
                var mileLi = mileLis.eq(i);
                var content_name = mileLi.find(".content_name").html();
                var newli = $("<li style='width:" + wid + "'>" +
                    "<span class='span_xian'></span>" +
                    "<span class='status_span'></span>" +
                    "<p class='content_name_p'><span>" + content_name + "</span></p>" +
                    "</li>");
                if (i == 0) {
                    newli.addClass("first");
                }
                if (i == (mileLis.size() - 1)) {
                    newli.addClass("last");
                }
                if (mileLi.hasClass("green")) {
                    newli.addClass("finshed");
                } else {
                    newli.find(".status_span").html(i + 1);
                }
                if (mileLi.hasClass("blue")) {
                    newli.addClass("nowDoing");
                }
                if (mileLi.hasClass("gray")) {
                    newli.addClass("nodo");
                }
                $(".milestone_ul").append(newli);
            }
        }
    }
}

function addToolButton() {
    var toolBtns = $("#form_command_bar").find("li.tool_button").not(".hide");
    var formWidth = $("#form_holder").width();
    if (toolBtns.length > 0) {
        var toolBar = $("<ul class='toolBar'></ul>");
        toolBar.css({ "marginLeft": formWidth + 10 + "px" });
        $("#form_holder").append(toolBar);
        toolBtns.each(function(index, item) {
                var toolBtn = $(item);
                var small_tip = $(item).find(".toolbar_button_tip").text();
                var newli = $("<li><p class='icon_p'></p><div class='tool_tip'><span class='zjt'></span>" + small_tip + "</div></li>");
                if (toolBtn.find(".disabled").size() > 0) {
                    newli.addClass("disabled");
                }
                var icl = toolBtn.find("i");
                newli.find(".icon_p").append(icl);
                if (index == 0) {
                    toolBar.append(newli);
                } else {
                    $(".toolBar").find("li").eq(0).before(newli);
                }
                newli.click(function() {
                    $(toolBtn).find("a.tool_button").click();
                })
            })
            //		var toTop=$("<li><p class='icon_p'><i class='i-icon-publish'></i></p></li>");
        var toTop = $("<div class='toTop'></div>");
        toolBar.append(toTop);
        toTop.click(function() {
            $("#toTop").click();
        })

    }
    //添加回到顶部
    //	var toTop=$("<div class='toTop'></div>");
    //	toTop.css({"marginLeft":formWidth+10+"px"});
    //	$("#form_holder").append(toTop);
}

function addCommandButton() {
    var commandBtns = $("#form_command_bar").find("li.command_button").not(".btn-group");
    var commandC = $("<div class='commandC'></div>")
    $("#render_holder").append(commandC);
    if (commandBtns.size() > 0) {
        var formWidth = $("#form_holder").width();
        var commandBar = $("<ul class='commandBar'></ul>");
        commandBar.css({ "width": formWidth + "px" });
        var a = $(".commandC").eq(0).offset().top;
        if (a < ($(window).scrollTop() + $(window).height())) {
            $(".commandC").append(commandBar);
        } else {
            var btnFixedContain = $("<div class='btnFixedContain'></div>");
            $("body").append(btnFixedContain);
            $(".btnFixedContain").append(commandBar);
        }
        $(document).scroll(function() {
                var a = $(".commandC").eq(0).offset().top;
                if (a < ($(window).scrollTop() + $(window).height())) {
                    $(".commandC").append($(".commandBar"));
                    $(".btnFixedContain").remove();
                } else {
                    if ($(".btnFixedContain").size() == 0) {
                        var btnFixedContain = $("<div class='btnFixedContain'></div>");
                        $("body").append(btnFixedContain);
                        $(".btnFixedContain").append($(".commandBar"));
                    }
                }
            })
            //当数量小于4的时候直接显示
        if (commandBtns.size() <= 4) {
            commandBtns.each(function(index, item) {
                var newLi = $("<li class='command_li'>" + $(item).html() + "</li>");
                newLi.addClass("color" + index);
                newLi.click(function() {
                    $(item).click();
                })
                $(".commandBar").append(newLi);
            })
        } else {
            //当数量大于4的时候显示前三个，第四个为更多操作
            commandBtns.each(function(index, item) {
                if (index < 3) {
                    var newLi = $("<li class='command_li'>" + $(item).html() + "</li>");
                    newLi.addClass("color" + index);
                    newLi.click(function() {
                        $(item).click();
                    })
                    $(".commandBar").append(newLi);
                }
            })
            var moreLi = $("<li class='moreCommand command_li'><a class='command_button_content'><nobr>更多操作<span class='jt_t'></span></nobr></a><ul class='moreCommand_ul'><span class='xjt'></span></ul></li>");
            moreLi.addClass("color3");
            $(".commandBar").append(moreLi);
            $(".moreCommand").click(function() {
                $(".moreCommand").find(".moreCommand_ul").toggleClass("moreCommandHide");
                $(".moreCommand").find(".jt_t").toggleClass("jt_b");
            })
            commandBtns.each(function(index, item) {
                if (index >= 3) {
                    var newLi_01 = $("<li>" + $(item).html() + "</li>");
                    newLi_01.click(function() {
                        $(item).click();
                    })
                    $(".moreCommand_ul").append(newLi_01);
                }
            })
        }

    }

}

function addFooter() {
    var footerText = $("#master_footer").text();
    var newFooter = $("<div class='footer_new'>" + footerText + "</div>");
    $("#master_footer").empty().append(newFooter);
}

$(function() {
    $(document).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var render_holder_t = $("#render_holder").offset().top;
        if (scrollTop > render_holder_t) {
            $(".toolBar").addClass("toFixed");
        } else {
            $(".toolBar").removeClass("toFixed");
        }
    })
})