$().ready(function() {
	// 画面のValidateをこっちで作成
    $("#form").validate({
    	// エラーメッセージ表示の場所を設定
		errorPlacement:function(error,element) {
			if (element.attr("type") == "radio" || element.attr("type") == "checkbox")  {
				error.appendTo(element.parent("td"));
			} else {
				error.insertAfter(element);
			}
		}
	});

	// JsonからTable　Htmlを作成
	var table = ConvertJsonToHtml.makeIntoHtml(myjson);

	  // 新しく作成したテーブルを画面に追加する
	$(table).appendTo("#currentTemplate");

	// 比較して、不一致の場合、修正前のテンプレートを表示
	$('#previousTemplateSpan').hide();
	if (!JSONUtils.compare(myjson1, myjson)) {
		var table1 = ConvertJsonToHtml.makeIntoHtml(myjson1);
		$(table1).appendTo("#previousTemplate");
		$('#previousTemplateSpan').show();
	}

	// 画面のテンプレートのプルダウン取得
	var pulldown = ConvertJsonToHtml.makePullDwon(myjson);
	$("#pulldownTemplate").html(pulldown);

	// テンプレートのプルダウンの内容変更の場合、呼び出す（Change事件）
	$("#pulldownTemplate").change(function() {
	  // テンプレート名前取得
	  var templateIndex = $('#templateName').text();
	  // 保存したいテンプレートArray作成
	  var templates = ConvertJsonToHtml.getTemplates();
	  // 画面のテーブルの内容をJsonをする
	  var itemsJson = $('#items').tableToJSON(); // Convert the table into a javascript object
	  // 保存
	  templates[templateIndex]['items'] = itemsJson;
	  
	  // 選択Option取得
	  var templateName = $("#pulldownTemplate").find("option:selected").text();
	  // プルダウンの内容を変更にしたがって、テンプレート名前を変更する
	  $('#templateName').html(templateName);

	  // 保存の値がある場合、保存の値をテーブルに表示
	  var templateObj = templates[templateName];

	  // 保存の値がない場合、元の値をテーブルに表示
	  if (templates[templateName]['items'].length == 0) {
	  	templateObj = ConvertJsonToHtml.getTemplateObj(myjson, templateName);
	  } 
	  // JsonからTable　Htmlを作成
	  var table = ConvertJsonToHtml.makeIntoHtml(templateObj);

	  // 元のテーブルを削除
	  $("#items").remove();

	  // 新しく作成したテーブルを画面に追加する
	  $(table).appendTo("#currentTemplate");
	});

	// TODO buttonのBind事件
	$('#back').click(function(){
		
	});
	// TODO buttonのBind事件
	$('#goto').click(function(){
		var templates = ConvertJsonToHtml.getTemplates();
	});
});

