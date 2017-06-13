var ConvertJsonToHtml = (function($) {
	var templateArray = {};

	/**
	 * public
	 * jsonからHmtlを作成
	 */
	function makeIntoHtml(data) {
		var items = scan(data, 'items');
		//var items = [{"item_name":"Function","type":"radio","property":{"label":[{"name":"取り付け工事あり","chk":"1"},{"name":"取り付け工事なし","chk":"0"}]}},{"item_name":"Function111","type":"radio","property":{"label":[{"name":"配送あり","chk":"1"},{"name":"配送なし","chk":"0"}]}},{"item_name":"※Additional Service","type":"checkbox","property":{"label":[{"name":"除湿","chk":"0"},{"name":"空気清浄","chk":"1"},{"name":"ウイルス対策","chk":"0"}]}},{"item_name":"※Maker Name","type":"list","property":{"label":[{"name":"ダイキン","chk":"0"},{"name":"東芝","chk":"0"},{"name":"日立","chk":"1"}]}},{"item_name":"※Weight(Kg)","type":"number","property":{"label":[{"text":"123456","maxLength":10}]}},{"item_name":"※notes","type":"text","property":{"label":[{"text":"text","maxLength":10}]}},{"item_name":"※Dimension image","type":"link","property":{"label":[{"text":"img.jpg","href":"http://www.cnblogs.com/yuzhongwusan/archive/2008/12/15/1355378.html"}]}}];
		var table = createTable();
	    if (items && items.length > 0) {
	        for (var i = 0, n = items.length; i < n; i++) {
	            var item = items[i];
	            //console.log(item.type);
				var htmlTagObj = MakeHtmlFactory.getHtmlTag(item.type);
				var TableRow = htmlTagObj.makeJsonToHtml(item, i);
				if (TableRow) {
	            	table.append(TableRow);
				}
	        }
	    }
	    return table;
	}

	/**
	 * public
	 * 画面のテンプレート用のプルダウン作成
	 */
	function makePullDwon(data) {
		var templates = scan(data, 'templates');
		var htmlTagObj = MakeHtmlFactory.getHtmlTag("list");
		var pulldown = htmlTagObj.createPullDwon(templates, 0, function(templateName, templateA) {
			// callback　createPullDwonを実行した後、呼び出される
			templateArray = templateA;
  			$('#previousTemplateName').html(templateName);
  			$('#templateName').html(templateName);
		});
	    return pulldown;
	}

	function getTemplates() {
		return templateArray;
	}

	/**
	 * private
	 * テーブルのElementを作成
	 */
	function createTable() {
	    var table = $('<table id="items" class="table table-bordered-black table-hover table-condensed table-striped">');
	    var tblHeader = "<thead><tr>";
	    tblHeader += '<th width="30%" class="gray">Item Name</th>';
	    tblHeader += '<th class="blue">Value</th>';
	    tblHeader += "</tr></thead>";
	    $(tblHeader).appendTo(table);

	    return $(table);
	}

	/**
	 * public
	 * テンプレート名により、JSONからテンプレートのJSONデータを取得
	 */
	function getTemplateObj(data, templateName) {
		var templates = scan(data, 'templates');
	    if (templates && templates.length > 0) {
	        for (var i = 0, n = templates.length; i < n; i++) {
	        	if (templates[i].template_name == templateName) {
	        		return templates[i];
	        	}
	        }
	    }
	    return ;

	}
	
	/**
	　* private
	 * JSONからNodeのデータ取得
	 */
	function scan(obj, node)
	{
	    var k, result;
	    if (obj instanceof Object) {
	        for (k in obj){
	            if (obj.hasOwnProperty(k)){
	                if (k == node) {
	                	return obj[k];
	                }
	                result = scan( obj[k] , node);  
	                if (result !== false) {
	                	return result;
	                }
	            }                
	        }
	    }
	    return false;
	};

	return {
	    makeIntoHtml: makeIntoHtml,
	    makePullDwon: makePullDwon,
	    getTemplateObj: getTemplateObj,
	    getTemplates: getTemplates
	};

})(jQuery);


/**
 * String関しての操作のメソッド
 *
 */
var StringUtils = (function($) {

		function isEmpty (strObj) {
			return !strObj || strObj.length == 0;

		};

		function contains (str, searchChars) {

			return str.indexOf(searchChars) !== -1;
		};
	

	return {
	    contains: contains
	};

})(jQuery);


/**
 * JSON内容が一致するかどうか比較Util
 *
 */
var JSONUtils = (function($) {

	function compare(obj1, obj2) {
		var result = true;
		for (var i in obj2) {
			if (typeof obj2[i] === 'object') {
				result = compare(obj1[i], obj2[i]);
				if (result == false) {
					return result;
				}
			} else {
				if (!obj1 || !obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
					return false;
				}
			}
		}
		return result;
	};
	

	return {
	    compare: compare
	};

})(jQuery);



