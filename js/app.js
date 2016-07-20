// siblings([expr])取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。


var codes = {
	"1": "#pending",
	"2": "#inProgress",
	"3": "#completed"
}

var Mytodolist = function() {
	var _this = this;

	$('#datepicker').datepicker();

	$('#addItem').click(function() {
		var title = $(this).siblings('.addTitle').val(),
			description = $(this).siblings('.addDescriptions').val(),
			date = $(this).siblings('.addDate').val(),
			id = Date.now() + '';
		_this.generateElement({
			id: id,
			code: '1',
			title: title,
			date: date,
			description: description
		});
		//清空表单
		$(this).siblings('.addTitle').val('');
		$(this).siblings('.addDescriptions').val('');
		$(this).siblings('.addDate').val('');
	});

	$('body').on('click', '.todo_remove', function() {
		var id = $(this).parent().attr('id');
		_this.removeElement({
			id: id
		})
	})
};

Mytodolist.prototype.generateElement = function(arg) {
	var parent = $(codes[arg.code]),
		wrapper;

	if (!parent) {
		return;
	};

	wrapper = $('<div />', {
		'class': 'todo_task',
		'id': arg.id,
		//data': arg.id
	});

	$('<div />', {
		'class': 'todo_remove',
		'html': '<img src="./delete-icon.png"></img>'
	}).appendTo(wrapper);

	$('<div />', {
		'class': 'todo_header',
		'text': arg.title
	}).appendTo(wrapper);

	$('<div />', {
		'class': 'todo_date',
		'text': arg.date
	}).appendTo(wrapper);

	$('<div />', {
		'class': 'todo_description',
		'text': arg.description
	}).appendTo(wrapper);

	wrapper.appendTo(parent);
}

Mytodolist.prototype.removeElement = function(arg) {
	$('#' + arg.id).remove();
}