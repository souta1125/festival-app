function list(e,html){
  let t = html
  ,   img = e[0]
  ,   name = e[1]
  ,   sponsor = e[2]
  ,   description = e[3]
  ,   operation = e[4]
  ,   waitingTime = e[5]
  ,   operationTime = e[6]
  ,   tags = e[7];

  t.find('img').attr('src', img);
  t.find('.name').text(name);
  t.find('.sponsor').text(sponsor);
  t.find('.description').text(description);
  t.find('.operation').text(operation);
  for (let j = 0; j < operationTime.length; j++){
    if(operationTime[j]){
      t.find('.operationTime').append('<span>' + operationTime[j] + '</span>');
    };
  };
  if(tags.length != 0){
    for (let j = 0; j < tags.length; j++){
      if(tags[j]){
        t.find('.tags').append('<span>' + tags[j] + '</span>');
      };
    };
  }
  if(waitingTime){
    t.find('.waitingTime').html('<span>'+waitingTime+'</span>分待ち');
  } else{
    t.find('.waitingTime').html('<span>'+operation+'</span>');
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
  for (let i = 0; i < json.length; i++) {
    let html = $('#js-list_skeleton').find('.list_item').clone(true);

    list(json[i], html);

    $('#js-list').append(html)
  }
  loading();
})

// app-list_detail
$('.list_item').click(function(){
  let t = $(this)
  ,   name = t.find('.name').text()
  ,   img = t.find('img').attr('src')
  ,   sponsor = t.find('.sponsor').text()
  ,   waitingTime = t.find('.waitingTime > span').text()
  ,   description = t.find('.description').text()
  ,   operation = t.find('.operation').text()
  ,   operationTime = t.find('.operationTime').html()
  ,   u = $('#js-list_detail')
  ,   html = $('#js-list_detail_skeleton').children().clone();

  html.find('img').attr('src', img);
  html.find('.name').text(name);
  if(sponsor){
    html.find('.sponsor').text('提供：' + sponsor);
  }
  if($.isNumeric(waitingTime)){
    html.find('.waitingTime').html('<span>'+ waitingTime +'</span>分待ち');
  }
  html.find('.description').text(description);
  html.find('.operation').text(operation);

  u.fadeIn(200);

  u.find('#js-detail_wrapper').empty()
  u.find('#js-detail_wrapper').append(html)
})

// closeBtn
$('.closeBtn').click(function(){
  let status = $(this).attr('aria-disabled');

  if(status == "false"){
    let t = $(this)
    ,   u = t.parents('.wrapper');

    u.fadeOut(200)
  }
})
