var spldata = {};
var carddata = {};

const initPopover = ()=> {
  let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  let popoverList = popoverTriggerList.map((popoverTriggerEl)=> {
    return new bootstrap.Popover(popoverTriggerEl)
  });
}

const webfontLoad = (font_family)=> {
  if(font_family!="''"&&font_family!="ikamodoki,paintball"&&font_family!=null) {
    WebFont.load({
      custom: {
        families: [font_family],
        urls: ['../css/font_'+font_family+'.css']
      }/*,
      fontloading: function(familyName, fvd) {
        console.log('fontloading', familyName, fvd);
      },
      fontactive: function(familyName, fvd) {
        console.log('fontactive', familyName, fvd);
      },
      active: function() {
        console.log('active');
      }
      */
    });
  }
}

const loadTab = ()=> {
  let triggerTabList = [].slice.call(document.querySelectorAll("#myTab button"));
  triggerTabList.forEach((triggerEl)=> {
    let tabTrigger = new bootstrap.Tab(triggerEl);
    triggerEl.addEventListener("click", (event)=> {
      event.preventDefault();
      tabTrigger.show();
    });
  });

  if(('localStorage' in window) && (window.localStorage !== null)) {
    let tab = window.localStorage.getItem('tab');
    let triggerEl;

    if(tab) {
      triggerEl = document.querySelector('#myTab #'+tab+'-tab');
      bootstrap.Tab.getInstance(triggerEl).show();
    } else {
      triggerEl = document.querySelector('#myTab #splatoon3-tab');
      bootstrap.Tab.getInstance(triggerEl).show();
    }
  } else {
    triggerEl = document.querySelector('#myTab #splatoon3-tab');
    bootstrap.Tab.getInstance(triggerEl).show();
  }
}

const multilineText = (context, text, width)=> {
  let len = text.length;
  let strArray = [];
  let tmp = "";
  if( len < 1 ) return strArray;
  for(let i=0; i<len; i++) {
    let c = text.charAt(i);
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

const appendSelectOption = (elem, text, val, disabled=false)=> {
  let select = document.querySelector(elem);
  let option = document.createElement('option');
  option.text = text;
  option.value= val;
  if(disabled) option.disabled = true;
  select.appendChild(option);
}

const loadSplatoonData = ()=> {
  fetch('./js/splatoon_data.json', {
    method: 'GET',
  }).then((response) => {
    return response.json();
  }).then((data)  => {
    spldata = data;
    // Splatoon1
    ['udemae','buki'].forEach((sel)=> {
      data.splatoon1[sel].forEach((op)=> {
        appendSelectOption('#nav-splatoon1 select[name="'+sel+'"]', op, op);
      })
    });
    appendSelectOption('#nav-splatoon1 select[name="buki"]', '▼ ブキ分類', '', true);
    data.splatoon1.bukitype.forEach((bt)=> {
      appendSelectOption('#nav-splatoon1 select[name="buki"]', bt, bt);
    });
    appendSelectOption('#nav-splatoon1 select[name="buki"]', '▼ その他', '', true);
    data.splatoon1.bukiother.forEach((bo)=> {
      appendSelectOption('#nav-splatoon1 select[name="buki"]', bo, bo);
    });
    data.fonts.forEach((font)=> {
      appendSelectOption('#nav-splatoon1 select[name="font_family"]', font.name, font.filename);
      webfontLoad(font.filename);
    })
    // Splatoon2
    data.splatoon2.udemae.forEach((u)=> {
      ['udemae_area','udemae_yagura','udemae_hoko','udemae_asari'].forEach((ut)=> {
        appendSelectOption('#nav-splatoon2 select[name="'+ut+'"]', u, u);
      });
    })
    data.splatoon2.buki.forEach((b)=> {
      appendSelectOption('#nav-splatoon2 select[name="buki"]', b, b);
    });
    appendSelectOption('#nav-splatoon2 select[name="buki"]', '▼ ブキ分類', '', true);
    data.splatoon2.bukitype.forEach((bt)=> {
      appendSelectOption('#nav-splatoon2 select[name="buki"]', bt, bt);
    });
    appendSelectOption('#nav-splatoon2 select[name="buki"]', '▼ その他', '', true);
    data.splatoon2.bukiother.forEach((bo)=> {
      appendSelectOption('#nav-splatoon2 select[name="buki"]', bo, bo);
    });
    data.fonts.forEach((font)=> {
      appendSelectOption('#nav-splatoon2 select[name="font_family"]', font.name, font.filename);
    })
    // Splatoon3
    data.splatoon3.udemae.forEach((u)=> {
      appendSelectOption('#nav-splatoon3 select[name="udemae"]', u, u);
    })
    data.splatoon3.buki.forEach((b)=> {
      appendSelectOption('#nav-splatoon3 select[name="buki"]', b, b);
    });
    appendSelectOption('#nav-splatoon3 select[name="buki"]', '▼ ブキ分類', '', true);
    data.splatoon3.bukitype.forEach((bt)=> {
      appendSelectOption('#nav-splatoon3 select[name="buki"]', bt, bt);
    });
    appendSelectOption('#nav-splatoon3 select[name="buki"]', '▼ その他', '', true);
    data.splatoon3.bukiother.forEach((bo)=> {
      appendSelectOption('#nav-splatoon3 select[name="buki"]', bo, bo);
    });
    data.fonts.forEach((font)=> {
      appendSelectOption('#nav-splatoon3 select[name="font_family"]', font.name, font.filename);
    })

    //console.log(data);
    loadFormData();
  }).catch((error) => {
    console.log(error);
  });

  fetch('./js/card.json', {
    method: 'GET',
  }).then((response) => {
    return response.json();
  }).then((data)  => {
    carddata = data;
  }).catch((error) => {
    console.log(error);
  });
}

const changeBukiInputMethod = ()=> {
  document.querySelectorAll('button[name="buki_inputmethod"]').forEach((buki_btn)=> {
    buki_btn.addEventListener('click', ()=> {
      let ver = buki_btn.closest('div[id^=nav-splatoon').id.replace(/^nav-/, '');
      let buki_input = buki_btn.closest('div[class*=input-group').querySelector('[name=buki]');
      //console.log(ver);
      if(buki_input.tagName == 'SELECT') {
        buki_btn.innerHTML = '<i class="bi bi-list-ul"></i> リスト選択';
        let change = document.createElement('input');
        change.setAttribute('type', 'text');
        change.setAttribute('class', 'form-control');
        change.setAttribute('name', 'buki');
        change.setAttribute('value', '');
        buki_input.parentNode.replaceChild(change, buki_input);
      } else {
        buki_btn.innerHTML = '<i class="bi bi-pencil"></i> 自由入力';
        let change = document.createElement('select');
        change.setAttribute('class', 'form-select');
        change.setAttribute('name', 'buki');
        buki_input.parentNode.replaceChild(change, buki_input);
        spldata[ver].buki.forEach((bu)=> {
          appendSelectOption('#nav-'+ver+' select[name="buki"]', bu, bu);
        })
        appendSelectOption('#nav-'+ver+' select[name="buki"]', '▼ ブキ分類', '', true);
        spldata[ver].bukitype.forEach((bt)=> {
          appendSelectOption('#nav-'+ver+' select[name="buki"]', bt, bt);
        });
        appendSelectOption('#nav-'+ver+' select[name="buki"]', '▼ その他', '', true);
        spldata[ver].bukiother.forEach((bo)=> {
          appendSelectOption('#nav-'+ver+' select[name="buki"]', bo, bo);
        });
      }
    })
  });
}

const makeCardSplatoon1 = ()=> {
  // Make card (Splatoon1)
  const formElemSpl1 = document.querySelector('#form_splatoon1');
  if(formElemSpl1) {
    formElemSpl1.addEventListener('submit', (event) => {
      event.preventDefault();
      new FormData(formElemSpl1);
    });
    formElemSpl1.addEventListener('formdata', (event) => {
      let formDataSpl1 = event.formData;
      let fdata = {};
      for (let value of formDataSpl1.entries()) {
        fdata[value[0]] = value[1];
      }
      //console.log(fdata);

      let canvas = document.getElementById('card');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      img.src = '../images/splatoon_card.png';
      let cardfile = img.src.split('/')[4];
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let dialog_width = window.innerWidth*0.83;
        if(canvas.width > dialog_width) document.querySelector('#card').style.width = dialog_width+'px';
        ctx.font = "32px "+fdata.font_family;
        ctx.fillStyle = 'black';
        ctx.fillText(fdata.name, carddata[cardfile].name.x, carddata[cardfile].name.y);
        ctx.textAlign = 'center';
        ctx.fillText(fdata.rank, carddata[cardfile].rank.x, carddata[cardfile].rank.y);
        ctx.fillText(fdata.udemae, carddata[cardfile].udemae.x, carddata[cardfile].udemae.y);
        ctx.textAlign = 'left';
        ctx.font = "26px "+fdata.font_family;
        var ary = multilineText(ctx, fdata.buki, 400);
        var line_height = 30;
        var buki_y = carddata[cardfile].buki.y;
        if(ary.length>1) buki_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].buki.x, buki_y+(i*line_height-0));
        }
        //ctx.fillText(buki, data[cardfile].buki.x, data[cardfile].buki.y);
        ctx.font = "32px "+fdata.font_family;
        ctx.fillText(fdata.nnid, carddata[cardfile].nnid.x, carddata[cardfile].nnid.y);
        ctx.font = "26px "+fdata.font_family;
        var ary = multilineText(ctx, fdata.skype, 400);
        var line_height = 30;
        var skype_y = carddata[cardfile].skype.y;
        if(ary.length>1) skype_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].skype.x, skype_y+(i*line_height-0));
        }
        //ctx.fillText(skype, data[cardfile].skype.x, data[cardfile].skype.y);
        ctx.font = fdata.free_size+"px "+fdata.font_family;
        var ary = multilineText(ctx, fdata.free, 400);
        var line_height = (fdata.free_size-0)+4;
        var free_y = carddata[cardfile].free.y-(24-(fdata.free_size-0));
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].free.x, free_y+(i*line_height-0));
        }
      };
      saveFormData(fdata, 'splatoon1');
      saveTab('splatoon1');
    });
  }
  // end of Make card (Splatoon1)
}

const makeCardSplatoon2 = ()=> {
  // Make card (Splatoon2)
  const formElemSpl2 = document.querySelector('#form_splatoon2');
  if(formElemSpl2) {
    formElemSpl2.addEventListener('submit', (event) => {
      event.preventDefault();
      new FormData(formElemSpl2);
    });
    formElemSpl2.addEventListener('formdata', (event) => {
      let formDataSpl2 = event.formData;
      let fdata = {};
      for (let value of formDataSpl2.entries()) {
        fdata[value[0]] = value[1];
      }
      //console.log(fdata);

      let canvas = document.getElementById('card');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      img.src = '../images/splatoon2_card.png';
      var cardfile = img.src.split('/')[4];
      img.src = img.src.replace(new RegExp('\.png$'),'_'+fdata.cardcolor+'.png');
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let dialog_width = window.innerWidth*0.83;
        if(canvas.width > dialog_width) document.querySelector('#card').style.width = dialog_width+'px';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 6;


        // name
        var font = '';
        if(fdata.name_bold) font+="bold ";
        if(fdata.name_italic) font+="italic ";
        ctx.font = font+"24px "+fdata.font_family;
        ctx.fillStyle = fdata.name_color;
        fdata.name_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillText(fdata.name, carddata[cardfile].name.x, carddata[cardfile].name.y);

        // rank
        var font = '';
        if(fdata.rank_bold) font+="bold ";
        if(fdata.rank_italic) font+="italic ";
        ctx.font = font+"24px "+fdata.font_family;
        ctx.fillStyle = fdata.rank_color;
        fdata.rank_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillText(fdata.rank, carddata[cardfile].rank.x, carddata[cardfile].rank.y);

        // udemae
        var font = '';
        ctx.textAlign = 'center';
        if(fdata.udemae_bold) font+="bold ";
        if(fdata.udemae_italic) font+="italic ";
        ctx.font = font+"24px "+fdata.font_family;
        ctx.fillStyle = fdata.udemae_color;
        fdata.udemae_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillText(fdata.udemae_area, carddata[cardfile].udemae_area.x, carddata[cardfile].udemae_area.y);
        ctx.fillText(fdata.udemae_yagura, carddata[cardfile].udemae_yagura.x, carddata[cardfile].udemae_yagura.y);
        ctx.fillText(fdata.udemae_hoko, carddata[cardfile].udemae_hoko.x, carddata[cardfile].udemae_hoko.y);
        ctx.fillText(fdata.udemae_asari, carddata[cardfile].udemae_asari.x, carddata[cardfile].udemae_asari.y);

        // buki
        var font = '';
        ctx.textAlign = 'left';
        if(fdata.buki_bold) font+="bold ";
        if(fdata.buki_italic) font+="italic ";
        ctx.font = font+"18px "+fdata.font_family;
        ctx.fillStyle = fdata.buki_color;
        fdata.buki_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        var ary = multilineText(ctx, fdata.buki, 300);
        var line_height = 30;
        var buki_y = carddata[cardfile].buki.y;
        if(ary.length>1) buki_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].buki.x, buki_y+(i*line_height-0));
        }

        // skype
        var font = '';
        if(fdata.skype_bold) font+="bold ";
        if(fdata.skype_italic) font+="italic ";
        ctx.font = font+"20px "+fdata.font_family;
        ctx.fillStyle = fdata.skype_color;
        fdata.skype_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        var ary = multilineText(ctx, fdata.skype, 300);
        var line_height = 24;
        var skype_y = carddata[cardfile].skype.y;
        if(ary.length>1) skype_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].skype.x, skype_y+(i*line_height-0));
        }

        // playtime 
        var font = '';
        if(fdata.playtime_bold) font+="bold ";
        if(fdata.playtime_italic) font+="italic ";
        ctx.font = font+"20px "+fdata.font_family;
        ctx.fillStyle = fdata.playtime_color;
        fdata.playtime_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        var ary = multilineText(ctx, fdata.playtime, 280);
        var line_height = 24;
        var playtime_y = carddata[cardfile].playtime.y;
        if(ary.length>1) playtime_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].playtime.x, playtime_y+(i*line_height-0));
        }

        // nnid
        var font = '';
        if(fdata.nnid_bold) font+="bold ";
        if(fdata.nnid_italic) font+="italic ";
        ctx.font = font+"20px "+fdata.font_family;
        ctx.fillStyle = fdata.nnid_color;
        fdata.nnid_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillText(fdata.nnid, carddata[cardfile].nnid.x, carddata[cardfile].nnid.y);

        // free
        var font = '';
        if(fdata.free_bold) font+="bold ";
        if(fdata.free_italic) font+="italic ";
        ctx.font = font+fdata.free_size+"px "+fdata.font_family;
        ctx.fillStyle = fdata.free_color;
        fdata.free_shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
        var ary = multilineText(ctx, fdata.free, 420);
        var line_height = (fdata.free_size-0)+4;
        var free_y = carddata[cardfile].free.y-(12-(fdata.free_size-0));
        if(ary.length>1) free_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].free.x, free_y+(i*line_height-0));
        }

        // favrule
        ctx.shadowColor='rgba(0,0,0,0)';
        ctx.lineWidth = carddata[cardfile].favrule_linewidth;
        ctx.strokeStyle = fdata.favrule_color;
        ['nawabari','area','yagura','hoko','asari','salmon','league','private'].forEach((rule)=> {
          if(fdata[rule]) {
            ctx.beginPath();
            ctx.arc(carddata[cardfile].favrule[rule].x, carddata[cardfile].favrule[rule].y, carddata[cardfile].favrule_radius, 0, Math.PI*2, false);
            ctx.stroke();
          }
        })
      };
      saveFormData(fdata, 'splatoon2');
      saveTab('splatoon2');
    });
  }
  // end of Make card (Splatoon1)
}

const makeCardSplatoon3 = ()=> {
  // Make card (Splatoon3)
  const formElemSpl3 = document.querySelector('#form_splatoon3');
  if(formElemSpl3) {
    formElemSpl3.addEventListener('submit', (event) => {
      event.preventDefault();
      new FormData(formElemSpl3);
    });
    formElemSpl3.addEventListener('formdata', (event) => {
      let formDataSpl3 = event.formData;
      let fdata = {};
      for (let value of formDataSpl3.entries()) {
        fdata[value[0]] = value[1];
      }
      //console.log(fdata);

      let canvas = document.getElementById('card');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      img.src = '../images/splatoon3_card.png';
      var cardfile = img.src.split('/')[4];
      img.src = img.src.replace(new RegExp('\.png$'),'_'+fdata.cardtype+'.png');
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let dialog_width = window.innerWidth*0.83;
        if(canvas.width > dialog_width) document.querySelector('#card').style.width = dialog_width+'px';

        let format = '';
        if(fdata.font_bold) format+="bold ";
        if(fdata.font_italic) format+="italic ";
        ctx.fillStyle = fdata.font_color;
        if(fdata.font_family == "''") fdata.font_family = 'sans-serif';

        // name
        ctx.font = format+carddata[cardfile].name.fontsize+'px '+fdata.font_family;
        ctx.fillText(fdata.name, carddata[cardfile].name.x, carddata[cardfile].name.y);

        // rank
        ctx.textAlign = 'center';
        ctx.font = format+carddata[cardfile].rank.fontsize+'px '+fdata.font_family;
        ctx.fillText(fdata.rank, carddata[cardfile].rank.x, carddata[cardfile].rank.y);

        // udemae
        ctx.font = format+carddata[cardfile].udemae.fontsize+'px '+fdata.font_family;
        ctx.fillText(fdata.udemae, carddata[cardfile].udemae.x, carddata[cardfile].udemae.y);

        // buki
        ctx.textAlign = 'left';
        ctx.font = format+carddata[cardfile].buki.fontsize+'px '+fdata.font_family;
        var ary = multilineText(ctx, fdata.buki, 570);
        var line_height = 30;
        var buki_y = carddata[cardfile].buki.y;
        if(ary.length>1) buki_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].buki.x, buki_y+(i*line_height-0));
        }

        // voicechat
        ctx.font = format+carddata[cardfile].vc.fontsize+'px '+fdata.font_family;
        var ary = multilineText(ctx, fdata.vc, 570);
        var line_height = 30;
        var vc_y = carddata[cardfile].vc.y;
        if(ary.length>1) vc_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].vc.x, vc_y+(i*line_height-0));
        }

        // playtime 
        ctx.font = format+carddata[cardfile].playtime.fontsize+'px '+fdata.font_family;
        var ary = multilineText(ctx, fdata.playtime, 570);
        var line_height = 30;
        var playtime_y = carddata[cardfile].playtime.y;
        if(ary.length>1) playtime_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].playtime.x, playtime_y+(i*line_height-0));
        }

        // friendcode
        ctx.font = format+carddata[cardfile].friendcode.fontsize+'px '+fdata.font_family;
        ctx.fillText(fdata.friendcode, carddata[cardfile].friendcode.x, carddata[cardfile].friendcode.y);

        // free
        ctx.font = format+fdata.free_size+"px "+fdata.font_family;
        var ary = multilineText(ctx, fdata.free, 570);
        var line_height = (fdata.free_size-0)+4;
        var free_y = carddata[cardfile].free.y-(12-(fdata.free_size-0));
        if(ary.length>1) free_y -= line_height/2;
        for(var i=0; i<ary.length; i++) {
          ctx.fillText(ary[i], carddata[cardfile].free.x, free_y+(i*line_height-0));
        }

        // favrule
        let fillrule = [];
        ['nawabari','area','yagura','hoko','asari','salmon','league','private'].forEach((rule)=> { if(!fdata[rule]) fillrule.push(rule) })
        fillrule.forEach((rule)=> {
          ctx.beginPath();
          ctx.rect(carddata[cardfile].favrule[rule].x, carddata[cardfile].favrule[rule].y, 64, 64);
          ctx.fillStyle = 'rgba(35,24,21,0.8)';
          ctx.fill();
        })

        // created date
        let now = new Date();
        let cdate = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日';
        ctx.textAlign = 'right';
        ctx.font = 'bold 24px sans-serif';
        ctx.strokeStyle = '#ffffff';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 8;
        ctx.strokeText('作成日:'+cdate, 700, 40); 
        ctx.fillStyle = '#000000';
        ctx.fillText('作成日:'+cdate, 700, 40);

      };
      saveFormData(fdata, 'splatoon3');
      saveTab('splatoon3');
    });
  }
  // end of Make card (Splatoon1)
}

const downloadCard = ()=> {
  document.querySelector('#card-dialog #download').addEventListener('click', ()=> {
    let canvas = document.getElementById('card');
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    let now = new Date();
    let cdate = now.getFullYear()+'-'+('0'+(now.getMonth()+1)).slice(-2)+'-'+('0'+now.getDate()).slice(-2);
    link.download = 'スプラトゥーン自己紹介カード_'+cdate+'.png';
    link.click();
  });
}

const saveTab = (tab)=> {
  if(('localStorage' in window) && (window.localStorage !== null)) {
    window.localStorage.setItem('tab', tab);
  }
}

const saveFormData = (fdata, ver)=> {
  if(('localStorage' in window) && (window.localStorage !== null)) {
    let formData = JSON.parse(window.localStorage.getItem('formData'));

    if(ver == 'splatoon1') {
      var newData = {"splatoon1":{}};
      newData.splatoon1.name = fdata.name;
      newData.splatoon1.rank = fdata.rank;
      newData.splatoon1.udemae = fdata.udemae;
      newData.splatoon1.buki_inputmethod = document.querySelector('#nav-splatoon1 [name="buki"]').tagName;
      newData.splatoon1.buki = fdata.buki;
      newData.splatoon1.nnid = fdata.nnid;
      newData.splatoon1.skype = fdata.skype;
      newData.splatoon1.free = fdata.free;
      newData.splatoon1.free_size = fdata.free_size;
      newData.splatoon1.font_family = fdata.font_family;
    } else if(ver == 'splatoon2') {
      var newData = {"splatoon2":{}};
      newData.splatoon2.name = fdata.name;
      newData.splatoon2.name_color = fdata.name_color;
      newData.splatoon2.name_bold = fdata.name_bold;
      newData.splatoon2.name_italic = fdata.name_italic;
      newData.splatoon2.name_shadow = fdata.name_shadow;
      newData.splatoon2.rank = fdata.rank;
      newData.splatoon2.rank_color = fdata.rank_color;
      newData.splatoon2.rank_bold = fdata.rank_bold;
      newData.splatoon2.rank_italic = fdata.rank_italic;
      newData.splatoon2.rank_shadow = fdata.rank_shadow;
      newData.splatoon2.udemae_area = fdata.udemae_area;
      newData.splatoon2.udemae_yagura = fdata.udemae_yagura;
      newData.splatoon2.udemae_hoko = fdata.udemae_hoko;
      newData.splatoon2.udemae_asari = fdata.udemae_asari;
      newData.splatoon2.udemae_color = fdata.udemae_color;
      newData.splatoon2.udemae_bold = fdata.udemae_bold;
      newData.splatoon2.udemae_italic = fdata.udemae_italic;
      newData.splatoon2.udemae_shadow = fdata.udemae_shadow;
      newData.splatoon2.buki_inputmethod = document.querySelector('#nav-splatoon2 [name="buki"]').tagName;
      newData.splatoon2.buki = fdata.buki;
      newData.splatoon2.buki_color = fdata.buki_color;
      newData.splatoon2.buki_bold = fdata.buki_bold;
      newData.splatoon2.buki_italic = fdata.buki_italic;
      newData.splatoon2.buki_shadow = fdata.buki_shadow;
      newData.splatoon2.nnid = fdata.nnid;
      newData.splatoon2.nnid_color = fdata.nnid_color;
      newData.splatoon2.nnid_bold = fdata.nnid_bold;
      newData.splatoon2.nnid_italic = fdata.nnid_italic;
      newData.splatoon2.nnid_shadow = fdata.nnid_shadow;
      newData.splatoon2.skype = fdata.skype;
      newData.splatoon2.skype_color = fdata.skype_color;
      newData.splatoon2.skype_bold = fdata.skype_bold;
      newData.splatoon2.skype_italic = fdata.skype_italic;
      newData.splatoon2.skype_shadow = fdata.skype_shadow;
      newData.splatoon2.playtime = fdata.playtime;
      newData.splatoon2.playtime_color = fdata.playtime_color;
      newData.splatoon2.playtime_bold = fdata.playtime_bold;
      newData.splatoon2.playtime_italic = fdata.playtime_italic;
      newData.splatoon2.playtime_shadow = fdata.playtime_shadow;
      newData.splatoon2.free = fdata.free;
      newData.splatoon2.free_size = fdata.free_size;
      newData.splatoon2.free_color = fdata.free_color;
      newData.splatoon2.free_bold = fdata.free_bold;
      newData.splatoon2.free_italic = fdata.free_italic;
      newData.splatoon2.free_shadow = fdata.free_shadow;
      let favrule = [];
      ['nawabari','area','yagura','hoko','asari','salmon','league','private'].forEach((rule)=> {
        if(fdata[rule]) favrule.push(rule);
      });
      newData.splatoon2.favrule = favrule;
      newData.splatoon2.favrule_color = fdata.favrule_color;
      newData.splatoon2.cardcolor = fdata.cardcolor;
      newData.splatoon2.font_family = fdata.font_family;
    } else if(ver == 'splatoon3') {
      var newData = {"splatoon3":{}};
      newData.splatoon3.name = fdata.name;
      newData.splatoon3.rank = fdata.rank;
      newData.splatoon3.udemae = fdata.udemae;
      newData.splatoon3.buki_inputmethod = document.querySelector('#nav-splatoon3 [name="buki"]').tagName;
      newData.splatoon3.buki = fdata.buki;
      newData.splatoon3.friendcode = fdata.friendcode;
      newData.splatoon3.vc = fdata.vc;
      newData.splatoon3.playtime = fdata.playtime;
      newData.splatoon3.free = fdata.free;
      newData.splatoon3.free_size = fdata.free_size;
      let favrule = [];
      ['nawabari','area','yagura','hoko','asari','salmon','league','private'].forEach((rule)=> {
        if(fdata[rule]) favrule.push(rule);
      });
      newData.splatoon3.favrule = favrule;
      newData.splatoon3.cardtype = fdata.cardtype;
      newData.splatoon3.font_family = fdata.font_family;
      newData.splatoon3.font_color = fdata.font_color;
      newData.splatoon3.font_bold = fdata.font_bold;
      newData.splatoon3.font_italic = fdata.font_italic;
    }

    // Save
    if(formData) {
      window.localStorage.setItem('formData', JSON.stringify(Object.assign(formData, newData)));
    } else {
      window.localStorage.setItem('formData', JSON.stringify(newData));
    }
  }
}

const loadFormData = ()=> {
  if(('localStorage' in window) && (window.localStorage !== null)) {
    var formData = JSON.parse(window.localStorage.getItem('formData'));
    if(formData) {
      if('splatoon1' in formData) {
        var form = formData.splatoon1;
        form.name ? document.querySelector('#nav-splatoon1 input[name="name"]').value = form.name:0;
        form.rank ? document.querySelector('#nav-splatoon1 input[name="rank"]').value = form.rank:0;
        form.udemae ? document.querySelector('#nav-splatoon1 select[name="udemae"]').querySelector('option[value="'+form.udemae+'"]').setAttribute('selected', 'selected'):0;
        if(form.buki_inputmethod=='INPUT') {
          let buki_input = document.querySelector('#nav-splatoon1 [name="buki"]');
          document.querySelector('#nav-splatoon1 button[name="buki_inputmethod"]').innerHTML = '<i class="bi bi-list-ul"></i> リスト選択';
          let change = document.createElement('input');
          change.setAttribute('type', 'text');
          change.setAttribute('class', 'form-control');
          change.setAttribute('name', 'buki');
          change.setAttribute('value', '');
          buki_input.parentNode.replaceChild(change, buki_input);
          form.buki ? document.querySelector('#nav-splatoon1 input[name="buki"]').value = form.buki:0;
        } else {
          form.buki ? document.querySelector('#nav-splatoon1 select[name="buki"]').querySelector('option[value="'+form.buki+'"]').setAttribute('selected', 'selected'):0;
        }
        form.nnid ? document.querySelector('#nav-splatoon1 input[name="nnid"]').value = form.nnid:0;
        form.skype ? document.querySelector('#nav-splatoon1 input[name="skype"]').value = form.skype:0;
        form.free ? document.querySelector('#nav-splatoon1 textarea[name="free"]').value = form.free:0;
        form.free_size ? document.querySelector('#nav-splatoon1 select[name="free_size"]').querySelector('option[value="'+form.free_size+'"]').setAttribute('selected', 'selected'):0;
        form.font_family ? document.querySelector('#nav-splatoon1 select[name="font_family"]').querySelector('option[value="'+form.font_family+'"]').setAttribute('selected', 'selected'):0;
      }

      if('splatoon2' in formData) {
        var form = formData.splatoon2;
        form.name ? document.querySelector('#nav-splatoon2 input[name="name"]').value = form.name:0;
        form.name_color ? document.querySelector('#nav-splatoon2 input[name="name_color"]').value = form.name_color:0;
        form.name_bold ? document.querySelector('#nav-splatoon2 input[name="name_bold"]').checked = true:0;
        form.name_italic ? document.querySelector('#nav-splatoon2 input[name="name_italic"]').checked = true:0;
        form.name_shadow ? document.querySelector('#nav-splatoon2 input[name="name_shadow"]').checked = true:0;
        form.rank ? document.querySelector('#nav-splatoon2 input[name="rank"]').value = form.rank:0;
        form.rank_color ? document.querySelector('#nav-splatoon2 input[name="rank_color"]').value = form.rank_color:0;
        form.rank_bold ? document.querySelector('#nav-splatoon2 input[name="rank_bold"]').checked = true:0;
        form.rank_italic ? document.querySelector('#nav-splatoon2 input[name="rank_italic"]').checked = true:0;
        form.rank_shadow ? document.querySelector('#nav-splatoon2 input[name="rank_shadow"]').checked = true:0;
        form.udemae_area ? document.querySelector('#nav-splatoon2 select[name="udemae_area"]').querySelector('option[value="'+form.udemae_area+'"]').setAttribute('selected', 'selected'):0;
        form.udemae_yagura ? document.querySelector('#nav-splatoon2 select[name="udemae_yagura"]').querySelector('option[value="'+form.udemae_yagura+'"]').setAttribute('selected', 'selected'):0;
        form.udemae_hoko ? document.querySelector('#nav-splatoon2 select[name="udemae_hoko"]').querySelector('option[value="'+form.udemae_hoko+'"]').setAttribute('selected', 'selected'):0;
        form.udemae_asari ? document.querySelector('#nav-splatoon2 select[name="udemae_asari"]').querySelector('option[value="'+form.udemae_asari+'"]').setAttribute('selected', 'selected'):0;
        form.udemae_color ? document.querySelector('#nav-splatoon2 input[name="udemae_color"]').value = form.udemae_color:0;
        form.udemae_bold ? document.querySelector('#nav-splatoon2 input[name="udemae_bold"]').checked = true:0;
        form.udemae_italic ? document.querySelector('#nav-splatoon2 input[name="udemae_italic"]').checked = true:0;
        form.udemae_shadow ? document.querySelector('#nav-splatoon2 input[name="udemae_shadow"]').checked = true:0;

        if(form.buki_inputmethod=='INPUT') {
          let buki_input = document.querySelector('#nav-splatoon2 [name="buki"]');
          document.querySelector('#nav-splatoon2 button[name="buki_inputmethod"]').innerHTML = '<i class="bi bi-list-ul"></i> リスト選択';
          let change = document.createElement('input');
          change.setAttribute('type', 'text');
          change.setAttribute('class', 'form-control');
          change.setAttribute('name', 'buki');
          change.setAttribute('value', '');
          buki_input.parentNode.replaceChild(change, buki_input);
          form.buki ? document.querySelector('#nav-splatoon2 input[name="buki"]').value = form.buki:0;
        } else {
          form.buki ? document.querySelector('#nav-splatoon2 select[name="buki"]').querySelector('option[value="'+form.buki+'"]').setAttribute('selected', 'selected'):0;
        }
        form.buki_color ? document.querySelector('#nav-splatoon2 input[name="buki_color"]').value = form.buki_color:0;
        form.buki_bold ? document.querySelector('#nav-splatoon2 input[name="buki_bold"]').checked = true:0;
        form.buki_italic ? document.querySelector('#nav-splatoon2 input[name="buki_italic"]').checked = true:0;
        form.buki_shadow ? document.querySelector('#nav-splatoon2 input[name="buki_shadow"]').checked = true:0;
        form.skype ? document.querySelector('#nav-splatoon2 input[name="skype"]').value = form.skype:0;
        form.skype_color ? document.querySelector('#nav-splatoon2 input[name="skype_color"]').value = form.skype_color:0;
        form.skype_bold ? document.querySelector('#nav-splatoon2 input[name="skype_bold"]').checked = true:0;
        form.skype_italic ? document.querySelector('#nav-splatoon2 input[name="skype_italic"]').checked = true:0;
        form.skype_shadow ? document.querySelector('#nav-splatoon2 input[name="skype_shadow"]').checked = true:0;
        form.favrule.forEach((rule)=> document.querySelector('#nav-splatoon2 input[name="'+rule+'"]').checked = true );
        form.favrule_color ? document.querySelector('#nav-splatoon2 input[name="favrule_color"]').value = form.favrule_color:0;
        form.playtime ? document.querySelector('#nav-splatoon2 input[name="playtime"]').value = form.playtime:0;
        form.playtime_color ? document.querySelector('#nav-splatoon2 input[name="playtime_color"]').value = form.playtime_color:0;
        form.playtime_bold ? document.querySelector('#nav-splatoon2 input[name="playtime_bold"]').checked = true:0;
        form.playtime_italic ? document.querySelector('#nav-splatoon2 input[name="playtime_italic"]').checked = true:0;
        form.playtime_shadow ? document.querySelector('#nav-splatoon2 input[name="playtime_shadow"]').checked = true:0;
        form.nnid ? document.querySelector('#nav-splatoon2 input[name="nnid"]').value = form.nnid:0;
        form.nnid_color ? document.querySelector('#nav-splatoon2 input[name="nnid_color"]').value = form.nnid_color:0;
        form.nnid_bold ? document.querySelector('#nav-splatoon2 input[name="nnid_bold"]').checked = true:0;
        form.nnid_italic ? document.querySelector('#nav-splatoon2 input[name="nnid_italic"]').checked = true:0;
        form.nnid_shadow ? document.querySelector('#nav-splatoon2 input[name="nnid_shadow"]').checked = true:0;
        form.free ? document.querySelector('#nav-splatoon2 textarea[name="free"]').value = form.free:0;
        form.free_size ? document.querySelector('#nav-splatoon2 select[name="free_size"]').querySelector('option[value="'+form.free_size+'"]').setAttribute('selected', 'selected'):0;
        form.free_color ? document.querySelector('#nav-splatoon2 input[name="free_color"]').value = form.free_color:0;
        form.free_bold ? document.querySelector('#nav-splatoon2 input[name="free_bold"]').checked = true:0;
        form.free_italic ? document.querySelector('#nav-splatoon2 input[name="free_italic"]').checked = true:0;
        form.free_shadow ? document.querySelector('#nav-splatoon2 input[name="free_shadow"]').checked = true:0;
        form.cardcolor ? document.querySelector('#nav-splatoon2 select[name="cardcolor"]').querySelector('option[value="'+form.cardcolor+'"]').setAttribute('selected', 'selected'):0;
        form.font_family ? document.querySelector('#nav-splatoon2 select[name="font_family"]').querySelector('option[value="'+form.font_family+'"]').setAttribute('selected', 'selected'):0;
      }

      if('splatoon3' in formData) {
        var form = formData.splatoon3;
        form.name ? document.querySelector('#nav-splatoon3 input[name="name"]').value = form.name:0;
        form.rank ? document.querySelector('#nav-splatoon3 input[name="rank"]').value = form.rank:0;
        form.udemae ? document.querySelector('#nav-splatoon3 select[name="udemae"]').querySelector('option[value="'+form.udemae+'"]').setAttribute('selected', 'selected'):0;

        if(form.buki_inputmethod=='INPUT') {
          let buki_input = document.querySelector('#nav-splatoon3 [name="buki"]');
          document.querySelector('#nav-splatoon3 button[name="buki_inputmethod"]').innerHTML = '<i class="bi bi-list-ul"></i> リスト選択';
          let change = document.createElement('input');
          change.setAttribute('type', 'text');
          change.setAttribute('class', 'form-control');
          change.setAttribute('name', 'buki');
          change.setAttribute('value', '');
          buki_input.parentNode.replaceChild(change, buki_input);
          form.buki ? document.querySelector('#nav-splatoon3 input[name="buki"]').value = form.buki:0;
        } else {
          form.buki ? document.querySelector('#nav-splatoon3 select[name="buki"]').querySelector('option[value="'+form.buki+'"]').setAttribute('selected', 'selected'):0;
        }
        form.vc? document.querySelector('#nav-splatoon3 input[name="vc"]').value = form.vc:0;
        form.favrule.forEach((rule)=> document.querySelector('#nav-splatoon3 input[name="'+rule+'"]').checked = true );
        form.playtime ? document.querySelector('#nav-splatoon3 input[name="playtime"]').value = form.playtime:0;
        form.friendcode ? document.querySelector('#nav-splatoon3 input[name="friendcode"]').value = form.friendcode:0;
        form.free ? document.querySelector('#nav-splatoon3 textarea[name="free"]').value = form.free:0;
        form.free_size ? document.querySelector('#nav-splatoon3 select[name="free_size"]').querySelector('option[value="'+form.free_size+'"]').setAttribute('selected', 'selected'):0;
        form.cardtype? document.querySelector('#nav-splatoon3 select[name="cardtype"]').querySelector('option[value="'+form.cardtype+'"]').setAttribute('selected', 'selected'):0;
        form.font_family ? document.querySelector('#nav-splatoon3 select[name="font_family"]').querySelector('option[value="'+form.font_family+'"]').setAttribute('selected', 'selected'):0;
        form.font_color ? document.querySelector('#nav-splatoon3 input[name="font_color"]').value = form.font_color:0;
        form.font_bold ? document.querySelector('#nav-splatoon3 input[name="font_bold"]').checked = true:0;
        form.font_italic ? document.querySelector('#nav-splatoon3 input[name="font_italic"]').checked = true:0;
      }

    } else {
    }
  }
}

const putText = (ctx, data)=> {
  /*
  data.text;
  data.x;
  data.y;
  data.color;
  data.font_size;
  data.font_family;
  data.bold;
  data.italic;
  data.shadow;
  data.align
  */

  /*
  putText(ctx, { // name
    text: fdata.name,
    x: carddata[cardfile].name.x,
    y: carddata[cardfile].name.y,
    font_family: fdata.font_family,
    font_size:24,
    color: fdata.name_color,
    bold: fdata.name_bold,
    italic: fdata.name_italic,
    shadow: fdata.name_shadow
  });
  putText(ctx, { // rank
    text: fdata.rank, x: carddata[cardfile].rank.x, y: carddata[cardfile].rank.y,
    font_family: fdata.font_family, font_size:24,
    bold: fdata.rank_bold, italic: fdata.rank_italic, shadow: fdata.rank_shadow,
    color: fdata.rank_color
  })
  */
  
  let font = '';
  if(data.bold) font+="bold ";
  if(data.italic) font+="italic ";
  ctx.font = font+data.font_size+"px "+data.font_family;
  ctx.fillStyle = data.color;
  data.shadow ? ctx.shadowColor='rgba(0,0,0,0.5)':ctx.shadowColor='rgba(0,0,0,0)';
  ctx.textAlign = data.align;
  return ctx.fillText(data.text, data.x, data.y);
}

window.addEventListener('DOMContentLoaded', ()=> {
  initPopover();
  loadSplatoonData();
  loadTab();
  //loadFormData();

  changeBukiInputMethod();
  makeCardSplatoon1();
  makeCardSplatoon2();
  makeCardSplatoon3();
  downloadCard();
});
