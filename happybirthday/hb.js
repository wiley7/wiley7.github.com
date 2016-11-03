hb = {};

hb.vm = {
    init: function() {
        hb.vm.step = 1; // 初始化step为1，猜数字：1，展示图片：2，优酷视频：3
        hb.vm.gsanswer = "1296";
        hb.vm.gsinput = m.prop('');
        hb.vm.gshistory = [];
        hb.vm.gshistorytext = m.prop('');
    },

    viewStep1: function() {
        // view step 1
        return m('div', {id: "step1area"}, [
                m('h2', 'LET\'S PLAY !'),
                m('h5', 'guess numbers in birthday !'),
                m('hr'),
                m('div', [
                    m('input', {
                        placeholder: "Enter 4 numbers",
                        class : "form-control",
                        type:'text', 
                        id: 'gsinput',
                        value: hb.vm.gsinput(),
                        oninput: m.withAttr("value", hb.vm.gsinputvalid),
                    }),
                ]),
                m('br'),
                m('div', {class: "container-fluid"}, [
                    m('div', {class: "row"}, [
                        m('div', {class:"col-xs-5", id: "ownarea"}, [
                            m('h4', 'Your History'),
                        ]),
                        m('div', {class:"col-xs-5 col-md-offset-1", id: "cmparea"}, [
                            m('h4', 'My History'),
                        ]),
                    ]),
                ]),
                m('div', {id: "gsresult"}, [
                ]),
        ]);
    },

    gsinputvalid: function(value) {
        hb.vm.gsinput(value);
        if (hb.vm.gsinput().length < 4) {
            return true;
        }
        var ret = getValueGuessResult(value, hb.vm.gsanswer);
        if (ret == '4A0B') {
            $('#gsresult').html("<br/><br/><font color=yellow>&nbsp&nbspCongratulations! </font>");
            $('#ownarea').css("backgroundColor","#336633")
            $('#cmparea').css("backgroundColor","#663333")
            setTimeout("hb.vm.gotorem()", 3000);
        } else {
            hb.vm.gsinput('');
        }
        ret = value + ' ' + ret;
        hb.vm.gshistory.push(ret);
        hb.vm.showarea(ret);
    },

    showarea: function(guess) {
        var ownhistory = $('#ownarea').html();;
        ownhistory = ownhistory + "<br/>" + guess;
        $('#ownarea').html(ownhistory);
        var cmphistory = $('#cmparea').html();
        cmphistory = cmphistory + "<br/>" + hb.vm.randGuessRet();
        $('#cmparea').html(cmphistory);
    },

    randGuessRet: function() {
        var prefix = "**** ";
        var a = [0,1,2,3,4,5,6,7,8,1];
        shuffle(a);
        var guess = a.slice(6).join('');
        var ret = getValueGuessResult(guess, hb.vm.gsanswer);
        return prefix + ret;
    },

    gotorem: function() {
        hb.vm.step = 2;
        m.redraw(true);
        setTimeout("hb.vm.gotopay()", 5000);
    },

    gotopay: function() {
        hb.vm.step = 3;
        m.redraw(true);
    },

    viewStep2: function() {
        // view step 1
        return m('div',{id: "step2area"}, [
                m('div', {class:"container"}, [
                    m('div', {class:"balloon"}, [
                        m('div', [
                            m('span', '老'),
                        ]),
                        m('div', [
                            m('span', '婆'),
                        ]),
                        m('div', [
                            m('span', '生'),
                        ]),
                        m('div', [
                            m('span', '日'),
                        ]),
                        m('div', [
                            m('span', '快'),
                        ]),
                        m('div', [
                            m('span', '乐'),
                        ]),
                    ]),
                ]),
        ]);
    },

    viewStep3: function() {
        setTimeout("hb.vm.doplay()", 100);
        //hb.vm.doplay();
        return m('div',{id: "step3area"}, [
                m('br'),
                m('br'),
                m('label', "还记得刚刚玩的游戏吗？"),
                m('br'),
                m('br'),
                m('br'),
                m('br'),
                m('div', {id:"container"}),
        ])
    },

    doplay: function() {
        $('#container').html("<iframe height=100% width=100% src='http://player.youku.com/embed/XMTc3OTQzOTU2NA==' frameborder=0 'allowfullscreen'></iframe>");
    }
}

hb.view = function() {
    if (hb.vm.step == 1) {
        return hb.vm.viewStep1();
    }
    if (hb.vm.step == 2) {
        return hb.vm.viewStep2();
    }
    if (hb.vm.step == 3) {
        return hb.vm.viewStep3();
    }
}

hb.controller = function() {
    hb.vm.init();
}

function getValueGuessResult(value, answer) {
    if (value == answer) {
        //hb.vm.doplay();
        return "4A0B";
    }
    var census = countBovine(answer, value);
    var text = showScore(census.bulls, census.cows);
    return text;
}

function showScore(nBulls, nCows) {
    return nBulls + 'A' + nCows + 'B';
}

function showFinalResult(guesses) {
    print('You win!!! Guesses needed: ' + guesses);
}

function countBovine(num, guess) {
    var count = {bulls:0, cows:0};
    for (var i = 0; i < num.length; i++) {
        var digPresent = guess.search(num[i]) != -1;
        if (num[i] == guess[i]) count.bulls++;
        else if (digPresent) count.cows++;
    }
    return count;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
