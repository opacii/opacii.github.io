$(document).ready(function () {

  // Toggle book items
  $('.book_header').click(function(){
    $(this).parent().find('.book_biblio').not($('.selected')).toggle(100);
  });

  // Select book item
  $('.book_biblio').click(function(){
    $(this).toggleClass('selected');
  });

  // Toggle print view
  $('h2').click(function(){
    $('.book_header').toggle();
    $('.search_note').toggle();
    $('.cache').toggle();
    $('.book_biblio').not($('.selected')).hide(100);
    $('.book_biblio.selected').show();
    $('.book_biblio.selected').find('.colloc').toggle();
    $('.book_biblio.selected').find('a').toggle();
    $('#footer').toggle();
  });

  // Search - BEGIN
  // Extend jquery to support case insensitive contains selector
  // https://stackoverflow.com/a/4936066
  $.extend($.expr[':'], {
    'contains': function(elem, i, match, array)
    {
      return (elem.textContent || elem.innerText || '').toLowerCase()
      .indexOf((match[3] || '').toLowerCase()) >= 0;
    }
  });

  const search = function() {
    $('.book_biblio').removeClass('selected');
    const keyword = $("input[name='keyword']").val();
    if (keyword.length < 3) return;
    $('.book_biblio:contains("' + keyword + '")').toggleClass('selected');
  };

  $("input[name='keyword']").on('input', search);
  // Search - END
});
