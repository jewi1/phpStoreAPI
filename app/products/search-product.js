jQuery(function ($) {
  $(document).on('submit', '#search-product-form', function () {
    var keywords = $(this).find(":input[name='keywords']").val();
    $.getJSON("http://phpstart/api/product/search.php?s=" + keywords, function (data) {
      readProductsTemplate(data, keywords);
      changePageTitle("Посик товаров: " + keywords);
    });
    return false;
  });
});