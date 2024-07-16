function list(e,html){
  let t = html
  ,   img = e[0]
  ,   name = e[1]
  ,   waitingTime = e[5]
  ,   tags = e[7];

  t.find('img').attr('src', img);
  t.find('.name').text(name);
  if(tags.length != 0){
    for (let j = 0; j < tags.length; j++) {
      if(tags[j]){
        t.find('.tags').append('<span>' + tags[j] + '</span>');
      }
    }
  }
  if(waitingTime){
    t.find('.waitingTime').html('<span>'+waitingTime+'分待ち</span>');
  }

  return html
}

function loading(){
  $('html').css('overflow', 'auto');
  $('#js-loading').fadeOut(500);
}


// リスト読み込み
let apiURL = 'https://script.google.com/macros/s/AKfycbwv9qZDlQQA7ZXxHdtvfD2U5cQUi6g_5QgVIqVUFCcvTbQI_1ZqZk5sqsYlYUm0-RT7/exec';

fetch(apiURL)
.then(function (fetch_data){
  return fetch_data.json();
})
.then(function(json){
  for(let i in json){
    let skeleton = $('#js-list_skeleton')
    ,   html = skeleton.children().clone();

    list(json[i], html);

    $('#js-list').append(html);
  }
  loading()
})