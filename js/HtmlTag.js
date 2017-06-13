var MakeHtmlFactory =  (function($) {
 
  function getHtmlTag(type) {
  	if (type == 'checkbox') {
		return CheckboxHtmlTag.createNew();
  	} else if (type == 'radio') {
		return RadioButtonHtmlTag.createNew();

  	} else if (type == 'text') {
		return TextHtmlTag.createNew();

  	} else if (type == 'number') {
		return NumberHtmlTag.createNew();

  	} else if (type == 'list') {
		return PullDownHtmlTag.createNew();

  	} else if (type == 'link') {
		return LinkHtmlTag.createNew();
  	} 
  	return HtmlTag.createNew();
  };
  
  return {
    getHtmlTag: getHtmlTag
  };
 
})(jQuery);

/**
 * superのクラス
 */
var HtmlTag =  {
 
  createNew: function(){
  	  var tag = {};
	 
	  tag.makeJsonToHtml = function (data, rowCount) {
	  	var result = '';
	  	var json = JSON.stringify(data);
	  	result = this._apply(data, rowCount);
	  	return result;
	  };

	  tag.makeXmlToHtml = function (data) {
	  	console.log('makeJsonToHtml');
	  };

	  tag._apply = function(data, rowCount) {
	  	var html = '<tr id="'+data.type+'">';
		if(data) {
			// テンプレートでsearchに0を入力すると、画面で表示されていないこと。
			if (data.serch == '0') {
				return '';
			}
			var itemName = '';
			var required = '';
			if (data.must_entered == '1') {
				itemName += '※';
				required = 'required';
			}
			itemName += data.item_name;

			html += '<td id="itemname">' + itemName + '</td>';
			html += '<td id="'+data.type+'">' + this.createHtml(data.property, rowCount, required) + '</td>';
		}
		html += '<tr/>';
		return html;
	  };

	  /**
	   * create html interface
	   *
	   */
	  tag.createHtml = function(data, rowCount, required) {

	  	var tdTag = '<input type="'+data.type+'" id="'+data.type+rowCount+'" class="textStyle"/>';
	  	return tdTag;
	  };

	  return tag;
  }
};

/**
 * チェックボックスItemのElementを作成のクラス
 *
 */
var CheckboxHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();

	  /**
	   * checkbox作成
	   */
	  tag.createHtml = function(objs, rowCount, required) {
	  	var tdTag = '';
	  	objs = objs.label;
	  	if (objs && objs.length > 0) {
	  		for(var i = 0, n = objs.length; i < n; i++) {
	  			var checked = '';
	  			if (objs[i].chk == '1') {
					checked = 'checked';
	  			}
	  			tdTag += '<input type="checkbox" name="text'+rowCount+'" id="chk'+rowCount + i+'" class="'+required+'" '+ checked +' />' + objs[i].name +'&nbsp;' ;
	  		}
	  	}
	  	return tdTag;

	  };

	  return tag;
  }
 
};


/**
 * リックDivItemのElementを作成のクラス
 *
 */
var LinkHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();

	  /**
	   * リック用DIV作成
	   */
	  tag.createHtml = function(data, rowCount, required) {
	  	var field = data.label[0];
	  	var tdTag = '';
		tdTag += '<div class="wrapperDiv">';
		tdTag += '<div class="table">';
		tdTag += '<div class="Tablerow">';
		tdTag += '<div class="TablecellLeftBottom">';
		tdTag += 'text';
		tdTag += '</div>';
		tdTag += '<div class="TablecellRight">';
		tdTag += '<input type="text" id="text'+rowCount+'" name="text'+rowCount+'" value="'+field.text+'" class="textStyle '+required+'"/>';
		tdTag += '</div>';
		tdTag += '</div>';
		tdTag += '<div class="Tablerow">';
		tdTag += '<div class="TablecellLeftRight">';
		tdTag += 'link';
		tdTag += '</div>';
		tdTag += '<div class="TablecellRightLine">';
		tdTag += '<input type="text" id="link'+rowCount+'"  name="link'+rowCount+'" value="'+field.href+'"  class="textStyle '+required+'"/>';
		tdTag += '</div>';
		tdTag += '</div>';
		tdTag += '</div>';
		tdTag += '</div>';

	  	return tdTag;

	  };

	  return tag;
  }
 
};


/**
 * プルダウンItemのElementを作成のクラス
 *
 */
var PullDownHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();

	  /**
	   * items pull down作成
	   */
	  tag.createHtml = function(objs, rowCount, required) {
	  	var tdTag = '';
	  	tdTag += '<select >';
	  	objs = objs.label;
	  	if (objs && objs.length > 0) {
	  		for(var i = 0, n = objs.length; i < n; i++) {
	  			var checked = '';
	  			if (objs[i].chk == '1') {
					checked = 'selected';
	  			}
	  			tdTag += '<option '+checked+'>' + objs[i].name +'</option>' ;
	  		}
	  	}
		tdTag += '</select>';
	  	return tdTag;

	  };

	  /**
	   * templates pull down作成
	   */
	  tag.createPullDwon = function(objs, rowCount, callback) {
	  	var tdTag = 'Template：<select id="templatepulldown">';
	  	var template_name = '';
	  	var templateArray = {};
	  	if (objs && objs.length > 0) {
	  		for(var i = 0, n = objs.length; i < n; i++) {
	  			if (i == 0) {
	  				template_name = objs[i].template_name;
	  			}
	  			tdTag += '<option>' + objs[i].template_name +'</option>' ;
	  			templateArray[objs[i].template_name] = {'items' : []};
	  		}
	  	}
		tdTag += '</select>';
		callback(template_name, templateArray);
	  	return tdTag;

	  };

	  return tag;
  }
 
};


/**
 * ラジオボタンItemのElementを作成のクラス
 *
 */
var RadioButtonHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();

	  /**
	   * radio button作成
	   */
	  tag.createHtml = function(objs, rowCount, required) {
	  	var tdTag = '';
	  	objs = objs.label;
	  	if (objs && objs.length > 0) {
	  		for(var i = 0, n = objs.length; i < n; i++) {
	  			var checked = '';
	  			if (objs[i].chk == '1') {
					checked = 'checked';
	  			}
	  			tdTag += '<input type="radio" id="radio'+rowCount+'" name="radio'+rowCount+'" class="'+required+'" '+checked+'/>' + objs[i].name +'&nbsp;' ;
	  			
	  		}
	  	}
	  	return tdTag;

	  };

	  return tag;
  }
 
};


/**
 * テーブルItemのElementを作成のクラス
 *
 */
var TableHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();
	  return tag;
  }
 
};


/**
 * テキストItemのElementを作成のクラス
 *
 */
var TextHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();
	 
	  /**
	   * create html interface
	   *
	   */
	  tag.createHtml = function(data, rowCount, required) {
	  	var field = data.label[0];
	  	var tdTag = '';
	  	tdTag += '<input type="text" id="text'+rowCount+'" name="text'+rowCount+'" maxlength="'+field.maxlength+'" value="'+field.text+'"  class="textStyle '+required+'"/>';
	  	return tdTag;
	  };

	  return tag;
  }
 
};


/**
 * テキストItemのElementを作成のクラス（Number）
 *
 */
var NumberHtmlTag =  {
 
  createNew: function(){
  	  var tag = HtmlTag.createNew();

	  /**
	   * create html interface
	   *
	   */
	  tag.createHtml = function(data, rowCount, required) {
	  	var field = data.label[0];
	  	var tdTag = '';

	  	tdTag += '<input type="number" id="number'+rowCount+'" maxlength="'+field.maxlength+'"  value="'+field.text+'"   class="textStyle '+required+'"/>';
	  	return tdTag;
	  };

	  return tag;
  }
 
};