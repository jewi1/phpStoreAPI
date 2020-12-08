jQuery(function ($){
  $(document).on('click', '.update-product-button', function () {
    var id = $(this).attr('data-id');
    $.getJSON("http://phpstart/api/product/read_one.php?id=" + id, function (data) {
      var name = data.name;
      var price = data.price;
      var description = data.description;
      var category_id = data.category_id;
      var category_name = data.category_name;

      $.getJSON("http://phpstart/api/category/read.php", function (data) {
        var categories_options_html = `<select name="category_id" class="form-control">`;

        $.each(data.records, function (key, val) {
          if (val.id == category_id) {
            categories_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`;
          } else {
            categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
          }
        });
        categories_options_html += `</select>`;
        var update_product_html=`
          <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
              <span class='glyphicon glyphicon-list'></span> Все товары
          </div>
      
          <!-- построение формы для изменения товара -->
          <!-- мы используем свойство 'required' html5 для предотвращения пустых полей -->
          <form id='update-product-form' action='#' method='post' border='0'>
              <table class='table table-hover table-responsive table-bordered'>
      
                  <tr>
                      <td>Название</td>
                      <td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
                  </tr>
      
                  <tr>
                      <td>Цена</td>
                      <td><input value=\"` + price + `\" type='number' min='1' name='price' class='form-control' required /></td>
                  </tr>
      
                  <tr>
                      <td>Описание</td>
                      <td><textarea name='description' class='form-control' required>` + description + `</textarea></td>
                  </tr>
      
                  <tr>
                      <td>Категория</td>
                      <td>` + categories_options_html + `</td>
                  </tr>
      
                  <tr>
                      <!-- скрытый «идентификатор продукта», чтобы определить, какую запись удалить -->
                      <td><input value=\"` + id + `\" name='id' type='hidden' /></td>
      
                      <!-- кнопка отправки формы -->
                      <td>
                          <button type='submit' class='btn btn-info'>
                              <span class='glyphicon glyphicon-edit'></span> Обновить товар
                          </button>
                      </td>
                  </tr>
      
              </table>
          </form>`;
        $("#page-content").html(update_product_html);
        changePageTitle("Обновление товара");
      })
    })
  });
  $(document).on('submit', '#update-product-form', function () {
    var form_data = JSON.stringify($(this).serializeObject());

    $.ajax({
      url: "http://phpstart/api/product/update.php",
      type: "POST",
      contentType: "application/json",
      data: form_data,
      success: function (result) {
        showProducts();
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
      }
    });
    return false;
  });
});