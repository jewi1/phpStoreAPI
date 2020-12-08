jQuery(function ($) {
  $(document).on('click', '.read-one-product-button', function () {
    var id = $(this).attr('data-id');
    $.getJSON("http://phpstart/api/product/read_one.php?id=" + id, function(data) {
      var read_one_product_html = `
        <div id="read-products" class="btn btn-primary pull-right m-b-15px read-products-button">
           <span class="glyphicon glyphicon-list"></span> Все товары
        </div>
        <table class="table table-bordered table-hover">
          <tr>
            <td class="w-30-pct">Название</td>
            <td class="w-70-pct">` + data.name + `</td>
          </tr>
          <tr>
            <td>Цена</td>
            <td>` + data.price + `</td>
          </tr>
          <tr>
            <td>Описание</td>
            <td>` + data.description + `</td>
          </tr>
          <tr>
            <td>Категория</td>
            <td>` + data.category_name + `</td>
          </tr>
        </table>`;
      $("#page-content").html(read_one_product_html);
      changePageTitle("Просмотр товара");
    });
  });
});