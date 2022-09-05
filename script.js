
$(function () {
    let taglist = [];
    let charlist = [];
    let weaponlist = ['ar','arcana','axe','bat','bow','camera','crossbow','dagger','dualswords','glove','guitar','hammer','nunchaku','pistol','rapier','shuriken','spear','sr','throw','tonfa','twohandedsword','vf','whip'];
    let augmentslist = ['adrenaline','ampdrone','bitterretribution','diamondshard','frailty','frenzy','healdrone','healingfactor','heavykneepads','ironclad','oblivion','redsprite','runitback','sentinel','vamp']
    $.ajax({
        // 読み込みの設定
        type: "GET",
        url: "character.json", // ファイルパス（相対パス）
        dataType: "json", // ファイル形式
        async: false // 非同期通信フラグ
    }).then(
        function (json) {
            // 読み込み成功時の処理
            console.log("読み込みに成功しました");
            console.log(json);
            charlist = Object.keys(json);
            charlist.forEach(function ( name ) {
                //console.log(name);
                //console.log('<input class="character" type="checkbox" name="character" value='+name+'>'+json[name]["name"]+'<br>');
                $('.'+name+'').append('<style>.'+name+'::before{background-image: url(./icon/'+name+'.png);}</style>');   
                $('#selecter').append('<div class="col-sm-2 selectcol"><input class="character" type="checkbox" name="" value='+name+'>'+json[name]["name"]+'</div>');  
            })
            $('#selecter').hide();
            taglist = json;
            weaponlist.forEach(function ( name ) {
                console.log('<style>.'+name+'::before{background-image: url(./weapon/'+name+'.png);}</style>')
                $('.'+name+'').append('<style>.'+name+'::before{background-image: url(./weapon/'+name+'.png);}</style>');  
            })
            augmentslist.forEach(function ( name ) {
                console.log('<style>.'+name+'::before{background-image: url(./weapon/'+name+'.png);}</style>')
                $('.'+name+'').append('<style>.'+name+'::before{background-image: url(./augments/'+name+'.png);}</style>');  
            })
            
        },
        function () {
            // 読み込み失敗時の処理
            console.log("読み込みに失敗しました");
        }
    );
    

    //CSSにキャラアイコンをつける
    const showlist = (list) =>{
        $('.desc').hide();
        if ( list.length != 0 ){
            list.forEach(function( name ) {
                taglist[name]["tags"].forEach(function (tags) {
                    $('.'+tags).show();
                    console.log(tags);
                });
            });
        }else{
            //全部表示
            $('.desc').show();
            $('.patch').show();
        }
    };
    $('#showtoggle').on('click',()=>{
        $('#selecter').slideToggle();
            if ($('#tbutton').hasClass('sticky-top')){
                console.log('off');
                $('#tbutton').removeClass('sticky-top');
            }else{
                console.log('on');
                $('#tbutton').addClass('sticky-top');
            
        }
    })
    $('#selecter').change(function() {
        let list = [];
        $('.character:checked').each(function() {
            var r = $(this).val();
            list.push(r);
        })
        showlist(list);
    })
    $("#patchlist").load("list.html");
});

