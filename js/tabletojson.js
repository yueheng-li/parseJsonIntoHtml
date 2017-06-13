(function( $ ) {
  'use strict';

  $.fn.tableToJSON = function(opts) {

    var notNull = function(value) {
      return value !== undefined && value !== null;
    };

    var cellValues = function(cellIndex, cell) {
      var $cell = $(cell);
      return $.trim( $cell.text() );
    };

    var isTarget = function(id) {
      return (id == 'radio' || id == 'checkbox' || id == 'text' || id == 'number' || id == 'list' || id == 'link' )
    };

    var construct = function(table, headings) {
      var i, j = 0, len, len2, txt, $row, $cell, $input, $options,
        tmpArray = [], cellIndex = 0, result = [];
      table.children('tbody,*').children('tr').each(function(rowIndex, row) {
        if( rowIndex > 0) {
          $row = $(row);

          var isEmpty = ($row.find('td').length === $row.find('td:empty').length) ? true : false;

          if( !isEmpty) {
            cellIndex = 0;

            var itemArray = {};
            $row.children().each(function(){
              $cell = $(this);

              //txt = cellValues(cellIndex, $cell);
              //console.log(txt);
              if (notNull($cell.context) && $cell.context.id == 'itemname') {
                // item_name
                var itemname = cellValues(cellIndex, $cell);
                itemArray['item_name'] = itemname.replace(/※/g, '');;
                if (StringUtils.contains(itemname, "※")) {
                  itemArray['must_entered'] = '1';
                }
              } else 
              if (notNull($cell.context) && isTarget($cell.context.id)) {
                var labels = cellValues(cellIndex, $cell).split(/\s/);
                // item type
                itemArray['type'] = $cell.context.id;
                var propertys = {};
                var labelArray = [];
                $cell.children().each(function(i, input){
                  var field = {};
                  $input = $(input);
                  if ($cell.context.id == 'checkbox' || $cell.context.id == 'radio') {
                    // "name": "配送あり", "chk" : '1'
                    field.name = labels[i];
                    field.chk = $input.context.checked ? '1' : '0';
                    labelArray[i] = field;
                  } else if ($cell.context.id == 'list') {
                    var optionArray = [];
                    $input.children().each(function(i, options){
                      $options = $(options);
                      field = {};
                      field.name = $options.context.label;
                      field.chk = $options.context.selected ? '1' : '0';
                      labelArray[i] = field;
                    });
                  } else if ($cell.context.id == 'number' || $cell.context.id == 'text') {
                    
                    field = {};
                    // "maxlength": "10", "text" : "123456"
                    field.text = $cell.context.children[0].value;
                    field.maxLength = $cell.context.children[0].maxLength;
                    labelArray[i] = field;
                  } else if ($cell.context.id == 'link') {
                    //"text": "img.jpg",
                    //"href": "http://www.cnblogs.com/yuzhongwusan/archive/2008/12/15/1355378.html"
                    field = {};
                    $input.children('div').children('div').children('div').children('input').each(function(m, link){
                      if (m == 0) {
                        field.text = link.value;
                      } else {
                        field.href = link.value;
                      }
                    });
                    
                    labelArray[i] = field;
                  }
                  
                });

                propertys['label'] = labelArray;
                itemArray['property'] = propertys;
              } 
              cellIndex++;
            });
            tmpArray[j] = itemArray;
            tmpArray.template_name = '';
            j++;
          }
        }
      });
      console.log('>>>>>>>>>>>>>>>>' + JSON.stringify(tmpArray));
      console.log(JSON.parse(JSON.stringify(tmpArray)));


      return tmpArray;
    };
     // Run
    return construct(this);
  };
})( jQuery );
