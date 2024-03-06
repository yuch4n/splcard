$(window).on('load', function() {
    $.ajax({
        type: "GET",
        url: "/js/splatoon_data.json",
        dataType: "json",
        success: function(data) {
            // Splatoon1
            data.splatoon1.udemae.forEach(function(ude) {
                $('#splatoon1 #udemae').append($('<option>').val(ude).text(ude));
            })
            data.splatoon1.buki.forEach(function(bu) {
                $('#splatoon1 #buki').append($('<option>').val(bu).text(bu));
            })
            $('#splatoon1 #buki').append($('<option disabled>').text('▼ ブキ分類'));
            data.splatoon1.bukitype.forEach(function(bu) {
                $('#splatoon1 #buki').append($('<option>').val(bu).text(bu));
            })
            $('#splatoon1 #buki').append($('<option disabled>').text('▼ その他'));
            data.splatoon1.bukiother.forEach(function(bu) {
                $('#splatoon1 #buki').append($('<option>').val(bu).text(bu));
            })
            // Splatoon2
            data.splatoon2.udemae.forEach(function(ude) {
                $('#splatoon2 #udemae_area').append($('<option>').val(ude).text(ude));
                $('#splatoon2 #udemae_yagura').append($('<option>').val(ude).text(ude));
                $('#splatoon2 #udemae_hoko').append($('<option>').val(ude).text(ude));
                $('#splatoon2 #udemae_asari').append($('<option>').val(ude).text(ude));
            })
            $('#splatoon2 #buki').append($('<option>').val('').text(''));
            data.splatoon2.buki.forEach(function(bu) {
                $('#splatoon2 #buki').append($('<option>').val(bu).text(bu));
            })
            $('#splatoon2 #buki').append($('<option disabled>').text('▼ ブキ分類'));
            data.splatoon2.bukitype.forEach(function(bu) {
                $('#splatoon2 #buki').append($('<option>').val(bu).text(bu));
            })
            $('#splatoon2 #buki').append($('<option disabled>').text('▼ その他'));
            data.splatoon2.bukiother.forEach(function(bu) {
                $('#splatoon2 #buki').append($('<option>').val(bu).text(bu));
            })
            loadFormData();
        }
    });

    $('#make1').on('click', function() {
        var name = $('#splatoon1 #name').val();
        var rank = $('#splatoon1 #rank').val();
        var udemae = $('#splatoon1 #udemae').val();
        var buki = $('#splatoon1 #buki').val();
        var nnid = $('#splatoon1 #nnid').val();
        var skype = $('#splatoon1 #skype').val();
        var free = $('#splatoon1 #free').val();
        var free_size = $('#splatoon1 #free_size').val();
        if(!free_size) free_size = '24';

        var canvas = document.getElementById('card');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = '/images/splatoon_card.png';
        var cardfile = img.src.split('/')[4];
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            var dialog_width = $('#card-dialog').innerWidth()*0.83;
            if(canvas.width > dialog_width) $('#card').css('width', dialog_width);
            $.ajax({
                type: "GET",
                url: "/js/card.json",
                dataType: "json",
                success: function(data) {
                    ctx.font = "32px ''";
                    ctx.fillStyle = 'black';
                    ctx.fillText(name, data[cardfile].name.x, data[cardfile].name.y);
                    ctx.textAlign = 'center';
                    ctx.fillText(rank, data[cardfile].rank.x, data[cardfile].rank.y);
                    ctx.fillText(udemae, data[cardfile].udemae.x, data[cardfile].udemae.y);
                    ctx.textAlign = 'left';
                    ctx.font = "26px ''";
                    var ary = multilineText(ctx, buki, 400);
                    var line_height = 30;
                    var buki_y = data[cardfile].buki.y;
                    if(ary.length>1) buki_y -= line_height/2;
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].buki.x, buki_y+(i*line_height-0));
                    }
                    //ctx.fillText(buki, data[cardfile].buki.x, data[cardfile].buki.y);
                    ctx.font = "32px ''";
                    ctx.fillText(nnid, data[cardfile].nnid.x, data[cardfile].nnid.y);
                    ctx.font = "26px ''";
                    var ary = multilineText(ctx, skype, 400);
                    var line_height = 30;
                    var skype_y = data[cardfile].skype.y;
                    if(ary.length>1) skype_y -= line_height/2;
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].skype.x, skype_y+(i*line_height-0));
                    }
                    //ctx.fillText(skype, data[cardfile].skype.x, data[cardfile].skype.y);
                    ctx.font = free_size+"px ''";
                    var ary = multilineText(ctx, free, 400);
                    var line_height = (free_size-0)+4;
                    var free_y = data[cardfile].free.y-(24-(free_size-0));
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].free.x, free_y+(i*line_height-0));
                    }
                }
            });
            $('#card-dialog').modal('show');
        };
        saveFormData();
        saveTab('splatoon1');
    });

    $('#make2').on('click', function() {
        var name = $('#splatoon2 #name').val();
        var name_color = $('#name_color').colorpicker('getValue');
        var rank = $('#splatoon2 #rank').val();
        var rank_color = $('#rank_color').colorpicker('getValue');
        var udemae_area = $('#splatoon2 #udemae_area').val();
        var udemae_yagura = $('#splatoon2 #udemae_yagura').val();
        var udemae_hoko = $('#splatoon2 #udemae_hoko').val();
        var udemae_asari = $('#splatoon2 #udemae_asari').val();
        var udemae_area_Splus_gauge = $('#splatoon2 #udemae_area_Splus_gauge').text();
        var udemae_yagura_Splus_gauge = $('#splatoon2 #udemae_yagura_Splus_gauge').text();
        var udemae_hoko_Splus_gauge = $('#splatoon2 #udemae_hoko_Splus_gauge').text();
        var udemae_asari_Splus_gauge = $('#splatoon2 #udemae_asari_Splus_gauge').text();
        var udemae_color = $('#udemae_color').colorpicker('getValue');
        var buki = $('#splatoon2 #buki').val();
        var buki_color = $('#buki_color').colorpicker('getValue');
        var nnid = $('#splatoon2 #nnid').val();
        var nnid_color = $('#nnid_color').colorpicker('getValue');
        var skype = $('#splatoon2 #skype').val();
        var skype_color = $('#skype_color').colorpicker('getValue');
        var playtime = $('#splatoon2 #playtime').val();
        var playtime_color = $('#playtime_color').colorpicker('getValue');
        var free = $('#splatoon2 #free').val();
        var free_size = $('#splatoon2 #free_size').val();
        if(!free_size) free_size = '24';
        var free_color = $('#free_color').colorpicker('getValue');
        var favrule = [];
        $('#splatoon2 #favrule input').each(function() {
            if($(this).prop('checked')) favrule.push($(this).attr('value'));
        });
        var favrule_color = $('#favrule_color').colorpicker('getValue');
        var cardcolor = $('#splatoon2 input[name=cardcolor]:checked').val();
        if(!cardcolor) cardcolor = 'gray';

        var canvas = document.getElementById('card');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = '/images/splatoon2_card.png';
        var cardfile = img.src.split('/')[4];
        img.src = img.src.replace(new RegExp('\.png$'),'_'+cardcolor+'.png');
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            var dialog_width = $('#card-dialog').innerWidth()*0.83;
            if(canvas.width > dialog_width) $('#card').css('width', dialog_width);
            $.ajax({
                type: "GET",
                url: "/js/card.json",
                dataType: "json",
                success: function(data) {
                    ctx.shadowOffsetX = 3;
                    ctx.shadowOffsetY = 3;
                    ctx.shadowBlur = 6;

                    var font = '';
                    if($('#name_bold').prop('checked')) font+="bold ";
                    if($('#name_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"24px ''";
                    ctx.fillStyle = name_color;
                    $('#name_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    ctx.fillText(name, data[cardfile].name.x, data[cardfile].name.y);

                    var font = '';
                    if($('#rank_bold').prop('checked')) font+="bold ";
                    if($('#rank_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"24px ''";
                    ctx.fillStyle = rank_color;
                    $('#rank_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    ctx.fillText(rank, data[cardfile].rank.x, data[cardfile].rank.y);

                    var font = '';
                    if($('#udemae_bold').prop('checked')) font+="bold ";
                    if($('#udemae_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"24px ''";
                    ctx.fillStyle = udemae_color;
                    $('#udemae_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    ctx.textAlign = 'center';
                    ctx.fillText(udemae_area, data[cardfile].udemae_area.x, data[cardfile].udemae_area.y);
                    ctx.fillText(udemae_yagura, data[cardfile].udemae_yagura.x, data[cardfile].udemae_yagura.y);
                    ctx.fillText(udemae_hoko, data[cardfile].udemae_hoko.x, data[cardfile].udemae_hoko.y);
                    ctx.fillText(udemae_asari, data[cardfile].udemae_asari.x, data[cardfile].udemae_asari.y);
                    ctx.font = font+"16px ''";
                    ctx.fillText(udemae_area_Splus_gauge, data[cardfile].udemae_area_Splus_gauge.x, data[cardfile].udemae_area_Splus_gauge.y);
                    ctx.fillText(udemae_yagura_Splus_gauge, data[cardfile].udemae_yagura_Splus_gauge.x, data[cardfile].udemae_yagura_Splus_gauge.y);
                    ctx.fillText(udemae_hoko_Splus_gauge, data[cardfile].udemae_hoko_Splus_gauge.x, data[cardfile].udemae_hoko_Splus_gauge.y);
                    ctx.fillText(udemae_asari_Splus_gauge, data[cardfile].udemae_asari_Splus_gauge.x, data[cardfile].udemae_asari_Splus_gauge.y);

                    ctx.textAlign = 'left';
                    var font = '';
                    if($('#buki_bold').prop('checked')) font+="bold ";
                    if($('#buki_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"20px ''";
                    ctx.fillStyle = buki_color;
                    $('#buki_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    var ary = multilineText(ctx, buki, 300);
                    var line_height = 24;
                    var buki_y = data[cardfile].buki.y;
                    if(ary.length>1) buki_y -= line_height/2;
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].buki.x, buki_y+(i*line_height-0));
                    }
                    //ctx.fillText(buki, data[cardfile].buki.x, data[cardfile].buki.y);

                    var font = '';
                    if($('#skype_bold').prop('checked')) font+="bold ";
                    if($('#skype_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"20px ''";
                    ctx.fillStyle = skype_color;
                    $('#skype_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    var ary = multilineText(ctx, skype, 300);
                    var line_height = 24;
                    var skype_y = data[cardfile].skype.y;
                    if(ary.length>1) skype_y -= line_height/2;
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].skype.x, skype_y+(i*line_height-0));
                    }
                    //ctx.fillText(skype, data[cardfile].skype.x, data[cardfile].skype.y);

                    var font = '';
                    if($('#playtime_bold').prop('checked')) font+="bold ";
                    if($('#playtime_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"20px ''";
                    ctx.fillStyle = playtime_color;
                    $('#playtime_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    var ary = multilineText(ctx, playtime, 280);
                    var line_height = 24;
                    var playtime_y = data[cardfile].playtime.y;
                    if(ary.length>1) playtime_y -= line_height/2;
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].playtime.x, playtime_y+(i*line_height-0));
                    }
                    //ctx.fillText(playtime, data[cardfile].playtime.x, data[cardfile].playtime.y);

                    var font = '';
                    if($('#nnid_bold').prop('checked')) font+="bold ";
                    if($('#nnid_italic').prop('checked')) font+="italic ";
                    ctx.font = font+"20px ''";
                    ctx.fillStyle = nnid_color;
                    $('#nnid_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    ctx.fillText(nnid, data[cardfile].nnid.x, data[cardfile].nnid.y);

                    var font = '';
                    if($('#free_bold').prop('checked')) font+="bold ";
                    if($('#free_italic').prop('checked')) font+="italic ";
                    ctx.fillStyle = free_color;
                    ctx.font = font+free_size+"px ''";
                    $('#free_shadow').prop('checked') ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
                    var ary = multilineText(ctx, free, 420);
                    var line_height = (free_size-0)+4;
                    var free_y = data[cardfile].free.y-(24-(free_size-0));
                    for(var i=0; i<ary.length; i++) {
                        ctx.fillText(ary[i], data[cardfile].free.x, free_y+(i*line_height-0));
                    }

                    ctx.shadowColor='rgba(0,0,0,0)';
                    ctx.lineWidth = data[cardfile].favrule_linewidth;
                    ctx.strokeStyle = favrule_color;
                    favrule.forEach(function(rule) {
                        ctx.beginPath();
                        ctx.arc(data[cardfile].favrule[rule].x, data[cardfile].favrule[rule].y, data[cardfile].favrule_radius, 0, Math.PI*2, false);
                        ctx.stroke();
                    });
                }
            });
            $('#card-dialog').modal('show');
        };
        saveFormData();
        saveTab('splatoon2');
    });

    $('form#download button').on('click', function() {
        var canvas = document.getElementById('card');
        var image = canvas.toDataURL("image/png");
        $('#dataURL').val(image);
        $('form#download').submit();
        toastr.info('ダウンロード開始までお待ちください');
    });

    $('#tweetdlg').on('click', function() {
        $('#tweet-dialog').modal('show');
    });

    $('form#tweet button.btn-info').on('click', function() {
        var canvas = document.getElementById('card');
        var image = canvas.toDataURL("image/png");
        $('form#tweet input#dataURL').val(image);
        $('form#tweet').submit();
    });

    $('#tweet-dialog textarea').on('keyup', function() {
        var limit = 140;
        $('#tweet-dialog .count').text(limit-$('#tweet-dialog textarea').val().length);
        if($('#tweet-dialog textarea').val().length > limit) {
            $('form#tweet button.btn-info').prop('disabled',true);
            $('#tweet-dialog .count').css('color','red');
        } else {
            $('form#tweet button.btn-info').prop('disabled',false);
            $('#tweet-dialog .count').css('color','navy');
        }
    });

    $('#splatoon2 select[id^=udemae_]').on('change', function() {
        if($(this)[0].value == 'S+') {
            $('#Splusgauge-dialog .modal-body input').prop('name',$(this)[0].id);
            var sli = $('#Splusgauge-dialog input').slider();
            sli.slider('setValue', 0);
            $('#Splusgauge-dialog #gaugeval').text('0');
            $('#Splusgauge-dialog').modal('show');
        } else {
            $('span#'+$(this)[0].id+'_Splus_gauge').empty();
            $('span#'+$(this)[0].id+'_Splus_gauge').hide();
        }
    });

    $('#splatoon2 span.badge').on('click', function() {
        $('#Splusgauge-dialog .modal-body input').prop('name',$(this).prev()[0].id);
        var sli = $('#Splusgauge-dialog input').slider();
        sli.slider('setValue', $(this).text());
        $('#Splusgauge-dialog #gaugeval').text($(this).text());
        $('#Splusgauge-dialog').modal('show');
    });

    $('#Splusgauge-dialog button.btn-info').on('click', function() {
        var name = $('#Splusgauge-dialog input')[0].name;
        var value = $('#Splusgauge-dialog input')[0].value;
        $('#splatoon2 span#'+name+'_Splus_gauge').show();
        $('#splatoon2 span#'+name+'_Splus_gauge').text(value);
    });

    $('#Splusgauge-dialog button.btn-warning').on('click', function() {
        var name = $('#Splusgauge-dialog input')[0].name;
        $('#splatoon2 span#'+name+'_Splus_gauge').empty();
        $('#splatoon2 span#'+name+'_Splus_gauge').hide();
    });

    $('#Splusgauge-dialog input').on('change', function() {
        $('#Splusgauge-dialog #gaugeval').text($(this).slider('getValue'));
    });

    $('a[href="#changelog"]').on('click', function(event) {
        event.preventDefault();
        $('#changelog-dialog').modal('show');
    });

    $('#name_color,#rank_color,#udemae_color,#buki_color,#skype_color,#playtime_color,#nnid_color,#free_color').colorpicker({
        format: 'rgb',
        useAlpha:false
    });
    $('#favrule_color').colorpicker({
        format: 'rgba',
        useAlpha:true
    });

    $('#splatoon2 #buki_inputmethod').on('click', function() {
        if($('#splatoon2 #buki').prop('tagName')=='SELECT') {
          $('#splatoon2 #buki').replaceWith('<input type="text" class="form-control" id="buki" value="" />');
          $('#splatoon2 #buki_inputmethod').children('span').removeClass('glyphicon-pencil');
          $('#splatoon2 #buki_inputmethod').children('span').addClass('glyphicon-list');
        } else {
          $('#splatoon2 #buki').replaceWith('<select class="form-control" id="buki"></select>');
          $('#splatoon2 #buki_inputmethod').children('span').removeClass('glyphicon-list');
          $('#splatoon2 #buki_inputmethod').children('span').addClass('glyphicon-pencil');
          $.ajax({
              type: "GET",
              url: "/js/splatoon_data.json",
              dataType: "json",
              success: function(data) {
                  // Splatoon2
                  $('#splatoon2 #buki').append($('<option>').val('').text(''));
                  data.splatoon2.buki.forEach(function(bu) {
                      $('#splatoon2 #buki').append($('<option>').val(bu).text(bu));
                  })
                  $('#splatoon2 #buki').append($('<option disabled>').text('▼ ブキ分類'));
                  data.splatoon2.bukitype.forEach(function(bu) {
                      $('#splatoon2 #buki').append($('<option>').val(bu).text(bu));
                  })
                  $('#splatoon2 #buki').append($('<option disabled>').text('▼ その他'));
                  data.splatoon2.bukiother.forEach(function(bu) {
                      $('#splatoon2 #buki').append($('<option>').val(bu).text(bu));
                  })
              }
          });
        }
    })
    $('#splatoon1 #buki_inputmethod').on('click', function() {
        if($('#splatoon1 #buki').prop('tagName')=='SELECT') {
          $('#splatoon1 #buki').replaceWith('<input type="text" class="form-control" id="buki" value="" />');
          $('#splatoon1 #buki_inputmethod').children('span').removeClass('glyphicon-pencil');
          $('#splatoon1 #buki_inputmethod').children('span').addClass('glyphicon-list');
        } else {
          $('#splatoon1 #buki').replaceWith('<select class="form-control" id="buki"></select>');
          $('#splatoon1 #buki_inputmethod').children('span').removeClass('glyphicon-list');
          $('#splatoon1 #buki_inputmethod').children('span').addClass('glyphicon-pencil');
          $.ajax({
              type: "GET",
              url: "/js/splatoon_data.json",
              dataType: "json",
              success: function(data) {
                  // Splatoon2
                  $('#splatoon1 #buki').append($('<option>').val('').text(''));
                  data.splatoon1.buki.forEach(function(bu) {
                      $('#splatoon1 #buki').append($('<option>').val(bu).text(bu));
                  })
                  $('#splatoon1 #buki').append($('<option disabled>').text('▼ ブキ分類'));
                  data.splatoon1.bukitype.forEach(function(bu) {
                      $('#splatoon1 #buki').append($('<option>').val(bu).text(bu));
                  })
                  $('#splatoon1 #buki').append($('<option disabled>').text('▼ その他'));
                  data.splatoon1.bukiother.forEach(function(bu) {
                      $('#splatoon1 #buki').append($('<option>').val(bu).text(bu));
                  })
              }
          });
        }
    })

    loadTab();

    $('[rel=popover]').popover();

    /*
    $('#favrule input').on('focus', function() {
        console.log(this);
        $(this).blur();
        $(this).parent('label').blur();
        //$(this).prop('checked',false).parent('label').removeClass('active');
    });
    */

    $('#reset').on('click', function() {
        $('html,body').animate({scrollTop:0});
    })
});

$(document).ready(function() {
});

function multilineText(context, text, width) {
    var len = text.length;
    var strArray = [];
    var tmp = "";
    if( len < 1 ) return strArray;
    for(var i=0; i<len; i++) {
        var c = text.charAt(i);
        if(c == "\n"){
            strArray.push(tmp);
            tmp = "";
            continue;
        }
        if (context.measureText(tmp+c).width <= width) {
            tmp += c;
        } else {
            strArray.push(tmp);
            tmp = c;
        }
    }
    if(tmp.length > 0) strArray.push( tmp );
    return strArray;
}

function loadFormData() {
    if(('localStorage' in window) && (window.localStorage !== null)) {
        var formData = JSON.parse(window.localStorage.getItem('formData'));
        if(formData) {
            if('splatoon2' in formData) {
                var form = formData.splatoon2;
                form.name ? $('#splatoon2 #name').val(form.name):0;
                form.name_color ? $('#name_color').colorpicker('setValue',form.name_color):$('#name_color ').colorpicker('setValue','rgb(0,0,0)');
                form.name_bold ? $('#name_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.name_italic ? $('#name_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.name_shadow ? $('#name_shadow').prop('checked',true).parent('label').addClass('active'):0;
                form.rank ? $('#splatoon2 #rank').val(form.rank):0;
                form.rank_color ? $('#rank_color').colorpicker('setValue',form.rank_color):$('#rank_color ').colorpicker('setValue','rgb(0,0,0)');
                form.rank_bold ? $('#rank_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.rank_italic ? $('#rank_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.rank_shadow ? $('#rank_shadow').prop('checked',true).parent('label').addClass('active'):0;
                form.udemae_area ? $('#splatoon2 #udemae_area').val(form.udemae_area):0;
                form.udemae_area_Splus_gauge ? $('#splatoon2 #udemae_area_Splus_gauge').text(form.udemae_area_Splus_gauge):0;
                form.udemae_yagura ? $('#splatoon2 #udemae_yagura').val(form.udemae_yagura):0;
                form.udemae_yagura_Splus_gauge ? $('#splatoon2 #udemae_yagura_Splus_gauge').text(form.udemae_yagura_Splus_gauge):0;
                form.udemae_hoko ? $('#splatoon2 #udemae_hoko').val(form.udemae_hoko):0;
                form.udemae_hoko_Splus_gauge ? $('#splatoon2 #udemae_hoko_Splus_gauge').text(form.udemae_hoko_Splus_gauge):0;
                form.udemae_asari ? $('#splatoon2 #udemae_asari').val(form.udemae_asari):0;
                form.udemae_asari_Splus_gauge ? $('#splatoon2 #udemae_asari_Splus_gauge').text(form.udemae_asari_Splus_gauge):0;
                form.udemae_color ? $('#udemae_color').colorpicker('setValue',form.udemae_color):$('#udemae_color ').colorpicker('setValue','rgb(0,0,0)');
                form.udemae_bold ? $('#udemae_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.udemae_italic ? $('#udemae_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.udemae_shadow ? $('#udemae_shadow').prop('checked',true).parent('label').addClass('active'):0;
                if(form.buki_inputmethod=='INPUT') {
                    $('#splatoon2 #buki').replaceWith('<input type="text" class="form-control" id="buki" value="" />');
                    $('#splatoon2 #buki_inputmethod').children('span').removeClass('glyphicon-pencil');
                    $('#splatoon2 #buki_inputmethod').children('span').addClass('glyphicon-list');
                }
                form.buki ? $('#splatoon2 #buki').val(form.buki):0;
                form.buki_color ? $('#buki_color').colorpicker('setValue',form.buki_color):$('#buki_color ').colorpicker('setValue','rgb(0,0,0)');
                form.buki_bold ? $('#buki_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.buki_italic ? $('#buki_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.buki_shadow ? $('#buki_shadow').prop('checked',true).parent('label').addClass('active'):0;
                form.nnid ? $('#splatoon2 #nnid').val(form.nnid):0;
                form.nnid_color ? $('#nnid_color').colorpicker('setValue',form.nnid_color):$('#nnid_color ').colorpicker('setValue','rgb(0,0,0)');
                form.nnid_bold ? $('#nnid_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.nnid_italic ? $('#nnid_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.nnid_shadow ? $('#nnid_shadow').prop('checked',true).parent('label').addClass('active'):0;
                form.skype ? $('#splatoon2 #skype').val(form.skype):0;
                form.skype_color ? $('#skype_color').colorpicker('setValue',form.skype_color):$('#skype_color ').colorpicker('setValue','rgb(0,0,0)');
                form.skype_bold ? $('#skype_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.skype_italic ? $('#skype_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.skype_shadow ? $('#skype_shadow').prop('checked',true).parent('label').addClass('active'):0;
                form.playtime? $('#splatoon2 #playtime').val(form.playtime):0;
                form.playtime_color ? $('#playtime_color').colorpicker('setValue',form.playtime_color):$('#playtime_color ').colorpicker('setValue','rgb(0,0,0)');
                form.playtime_bold ? $('#playtime_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.playtime_italic ? $('#playtime_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.playtime_shadow ? $('#playtime_shadow').prop('checked',true).parent('label').addClass('active'):0;
                form.free ? $('#splatoon2 #free').val(form.free):0;
                form.free_size? $('#splatoon2 #free_size').val(form.free_size):0;
                form.free_color ? $('#free_color').colorpicker('setValue',form.free_color):$('#free_color ').colorpicker('setValue','rgb(0,0,0)');
                form.free_bold ? $('#free_bold').prop('checked',true).parent('label').addClass('active'):0;
                form.free_italic ? $('#free_italic').prop('checked',true).parent('label').addClass('active'):0;
                form.free_shadow ? $('#free_shadow').prop('checked',true).parent('label').addClass('active'):0;
                if(Array.isArray(form.favrule)) {
                    form.favrule.forEach(function(rule) {
                        $('#splatoon2 #favrule input[value="'+rule+'"]').prop('checked',true).parent('label').addClass('active');

                    });
                }
                form.favrule_color ? $('#favrule_color').colorpicker('setValue',form.favrule_color):$('#favrule_color ').colorpicker('setValue','rgba(255,0,0,0.7)');
                form.cardcolor ? $('#splatoon2 input[name=cardcolor][value="'+form.cardcolor+'"]').prop('checked',true).parent('label').addClass('active'):$('#splatoon2 input[name=cardcolor][value="gray"]').prop('checked',true).parent('label').addClass('active');
            }
            if('splatoon1' in formData) {
                var form = formData.splatoon1;
                form.name ? $('#splatoon1 #name').val(form.name):0;
                form.rank ? $('#splatoon1 #rank').val(form.rank):0;
                form.udemae ? $('#splatoon1 #udemae').val(form.udemae):0;
                if(form.buki_inputmethod=='INPUT') {
                    $('#splatoon1 #buki').replaceWith('<input type="text" class="form-control" id="buki" value="" />');
                    $('#splatoon1 #buki_inputmethod').children('span').removeClass('glyphicon-pencil');
                    $('#splatoon1 #buki_inputmethod').children('span').addClass('glyphicon-list');
                }
                form.buki ? $('#splatoon1 #buki').val(form.buki):0;
                form.nnid ? $('#splatoon1 #nnid').val(form.nnid):0;
                form.skype ? $('#splatoon1 #skype').val(form.skype):0;
                form.free ? $('#splatoon1 #free').val(form.free):0;
                form.free_size ? $('#splatoon1 #free_size').val(form.free_size):0;
            }
        } else {
            $('#splatoon2 input[name=cardcolor][value="gray"]').prop('checked',true).parent('label').addClass('active');
            $('#name_color').colorpicker('setValue','rgb(0,0,0)');
            $('#rank_color').colorpicker('setValue','rgb(0,0,0)');
            $('#udemae_color').colorpicker('setValue','rgb(0,0,0)');
            $('#buki_color').colorpicker('setValue','rgb(0,0,0)');
            $('#nnid_color').colorpicker('setValue','rgb(0,0,0)');
            $('#skype_color').colorpicker('setValue','rgb(0,0,0)');
            $('#playtime_color').colorpicker('setValue','rgb(0,0,0)');
            $('#free_color').colorpicker('setValue','rgb(0,0,0)');
            $('#favrule_color').colorpicker('setValue','rgba(255,0,0,0.7)');
        }
    }
}

function saveFormData() {
    if(('localStorage' in window) && (window.localStorage !== null)) {
        var formData = {"splatoon2":{},"splatoon1":{}};
        // Splatoon2
        formData.splatoon2.name = $('#splatoon2 #name').val();
        formData.splatoon2.name_color = $('#name_color').colorpicker('getValue');
        if($('#name_bold').prop('checked')) formData.splatoon2.name_bold = true;
        if($('#name_italic').prop('checked')) formData.splatoon2.name_italic = true;
        if($('#name_shadow').prop('checked')) formData.splatoon2.name_shadow = true;
        formData.splatoon2.rank = $('#splatoon2 #rank').val();
        formData.splatoon2.rank_color = $('#rank_color').colorpicker('getValue');
        if($('#rank_bold').prop('checked')) formData.splatoon2.rank_bold = true;
        if($('#rank_italic').prop('checked')) formData.splatoon2.rank_italic = true;
        if($('#rank_shadow').prop('checked')) formData.splatoon2.rank_shadow = true;
        formData.splatoon2.udemae_area = $('#splatoon2 #udemae_area').val();
        formData.splatoon2.udemae_area_Splus_gauge = $('#splatoon2 #udemae_area_Splus_gauge').text();
        formData.splatoon2.udemae_yagura = $('#splatoon2 #udemae_yagura').val();
        formData.splatoon2.udemae_yagura_Splus_gauge = $('#splatoon2 #udemae_yagura_Splus_gauge').text();
        formData.splatoon2.udemae_hoko = $('#splatoon2 #udemae_hoko').val();
        formData.splatoon2.udemae_hoko_Splus_gauge = $('#splatoon2 #udemae_hoko_Splus_gauge').text();
        formData.splatoon2.udemae_asari = $('#splatoon2 #udemae_asari').val();
        formData.splatoon2.udemae_asari_Splus_gauge = $('#splatoon2 #udemae_asari_Splus_gauge').text();
        formData.splatoon2.udemae_color = $('#udemae_color').colorpicker('getValue');
        if($('#udemae_bold').prop('checked')) formData.splatoon2.udemae_bold = true;
        if($('#udemae_italic').prop('checked')) formData.splatoon2.udemae_italic = true;
        if($('#udemae_shadow').prop('checked')) formData.splatoon2.udemae_shadow = true;
        formData.splatoon2.buki_inputmethod = $('#splatoon2 #buki').prop('tagName');
        formData.splatoon2.buki = $('#splatoon2 #buki').val();
        formData.splatoon2.buki_color = $('#buki_color').colorpicker('getValue');
        if($('#buki_bold').prop('checked')) formData.splatoon2.buki_bold = true;
        if($('#buki_italic').prop('checked')) formData.splatoon2.buki_italic = true;
        if($('#buki_shadow').prop('checked')) formData.splatoon2.buki_shadow = true;
        formData.splatoon2.nnid = $('#splatoon2 #nnid').val();
        formData.splatoon2.nnid_color = $('#nnid_color').colorpicker('getValue');
        if($('#nnid_bold').prop('checked')) formData.splatoon2.nnid_bold = true;
        if($('#nnid_italic').prop('checked')) formData.splatoon2.nnid_italic = true;
        if($('#nnid_shadow').prop('checked')) formData.splatoon2.nnid_shadow = true;
        formData.splatoon2.skype = $('#splatoon2 #skype').val();
        formData.splatoon2.skype_color = $('#skype_color').colorpicker('getValue');
        if($('#skype_bold').prop('checked')) formData.splatoon2.skype_bold = true;
        if($('#skype_italic').prop('checked')) formData.splatoon2.skype_italic = true;
        if($('#skype_shadow').prop('checked')) formData.splatoon2.skype_shadow = true;
        formData.splatoon2.playtime= $('#splatoon2 #playtime').val();
        formData.splatoon2.playtime_color = $('#playtime_color').colorpicker('getValue');
        if($('#playtime_bold').prop('checked')) formData.splatoon2.playtime_bold = true;
        if($('#playtime_italic').prop('checked')) formData.splatoon2.playtime_italic = true;
        if($('#playtime_shadow').prop('checked')) formData.splatoon2.playtime_shadow = true;
        formData.splatoon2.free = $('#splatoon2 #free').val();
        formData.splatoon2.free_size = $('#splatoon2 #free_size').val();
        formData.splatoon2.free_color = $('#free_color').colorpicker('getValue');
        if($('#free_bold').prop('checked')) formData.splatoon2.free_bold = true;
        if($('#free_italic').prop('checked')) formData.splatoon2.free_italic = true;
        if($('#free_shadow').prop('checked')) formData.splatoon2.free_shadow = true;
        var favrule = [];
        $('#splatoon2 #favrule input').each(function() {
            if($(this).prop('checked')) favrule.push($(this).attr('value'));
        });
        formData.splatoon2.favrule = favrule;
        formData.splatoon2.favrule_color = $('#favrule_color').colorpicker('getValue');
        formData.splatoon2.cardcolor = $('#splatoon2 input[name=cardcolor]:checked').val();

        // Splatoon
        formData.splatoon1.name = $('#splatoon1 #name').val();
        formData.splatoon1.rank = $('#splatoon1 #rank').val();
        formData.splatoon1.udemae = $('#splatoon1 #udemae').val();
        formData.splatoon1.buki_inputmethod = $('#splatoon1 #buki').prop('tagName');
        formData.splatoon1.buki = $('#splatoon1 #buki').val();
        formData.splatoon1.nnid = $('#splatoon1 #nnid').val();
        formData.splatoon1.skype = $('#splatoon1 #skype').val();
        formData.splatoon1.free = $('#splatoon1 #free').val();
        formData.splatoon1.free_size = $('#splatoon1 #free_size').val();
        // Save
        window.localStorage.setItem('formData', JSON.stringify(formData));
    }
}

function loadTab() {
    if(('localStorage' in window) && (window.localStorage !== null)) {
        var tab = window.localStorage.getItem('tab');
        if(tab) $('.nav-tabs a[href="#'+tab+'"]').tab('show');
            else $('.nav-tabs a[href="#splatoon2"]').tab('show');
    } else {
        $('.nav-tabs a[href="#splatoon2"]').tab('show');
    }
}

function saveTab(tab) {
    if(('localStorage' in window) && (window.localStorage !== null)) {
        window.localStorage.setItem('tab', tab);
    }
}

toastr.options = {
    "positionClass": "toast-top-left"
};
