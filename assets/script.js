$(document).ready(function () {

  // Toggle book items
  $('.book_header').click(function(){
    if($('body.selected').length > 0) return; // Don't toggle search results
    $(this).parent().find('.book_biblio').toggle(100);
  });

  // Select book biblio item
  $('.book_biblio').click(function(){
    $(this).toggleClass('selected');
    // Select parent when at least a child is selected
    let book_list = $(this).closest('.book_list');
    if($(book_list).find('.book_biblio.selected').length > 0) {
      book_list.addClass('selected');
    } else {
      book_list.removeClass('selected');
    }
  });

  // Select index view
  $('.filters .selected').click(function(){
    $('body').removeClass('expanded');
    $('body').removeClass('collapsed');
    $('body').addClass('selected');
    $('.book_biblio:not(.selected)').hide(100);
  });
  $('.filters .expanded').click(function(){
    $('body').removeClass('selected');
    $('body').removeClass('collapsed');
    $('body').addClass('expanded');
    $('.book_biblio').show(100);
  });
  $('.filters .collapsed').click(function(){
    $('body').removeClass('expanded');
    $('body').removeClass('selected');
    $('body').addClass('collapsed');
    $('.book_biblio').hide(100);
  });

  // Show book links and ID onmouseover
  $(".book_header").hover(function () {
    $(this).toggleClass("hoving");
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
    const keyword = $("input[name='keyword']").val();
    if (keyword.length < 3) return;

    // Clean views
    $('.book_list').removeClass('selected');
    $('.book_biblio').removeClass('selected');
    $('.book_biblio').hide();
    $('body').removeClass('expanded');
    $('body').removeClass('collapsed');
    $('body').addClass('selected');

    // Show results
    $('.book_biblio:contains("' + keyword + '")').each(function() {
      $(this).addClass('selected');
      $(this).show();

      // Select parent when at least a child is selected
      let book_list = $(this).closest('.book_list')
      if($(book_list).find('.book_biblio.selected').length > 0) {
        book_list.addClass('selected');
        book_list.show();
      } else {
        book_list.removeClass('selected');
        book_list.hide();
      }
    });
  };

  $("input[name='keyword']").on('input', search);
  // Search - END
});
