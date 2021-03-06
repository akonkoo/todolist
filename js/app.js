// siblings([expr])取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。


var codes = {
	"1": "#pending",
	"2": "#inProgress",
	"3": "#completed"
};

data = {};

var Mytodolist = function() {
	var _this = this;

	_this.data = JSON.parse(localStorage.getItem('todolist')) || {};
	for (var property in _this.data) {
		if (_this.data.hasOwnProperty(property)) {
			_this.generateElement({
				id: property,
				code: _this.data[property].code,
				title: _this.data[property].title,
				date: _this.data[property].date,
				description: _this.data[property].description
			});
		}
	};

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

		_this.data[id] = {
			code: '1',
			title: title,
			date: date,
			description: description 
		};
		_this.saveData();
	});

	$('body').on('click', '.todo_remove', function() {
		var id = $(this).parent().attr('id');
		_this.removeElement({
			id: id
		});
		delete _this.data[id];
		_this.saveData();
	});

	$.each(codes, function(index, value) {
		$(value).droppable({
			drop: function(event, ui) {
				var element = ui.helper,
					id = element.attr('id'),
					// 获取draggable之后的Object
					item = _this.data[id];
				// 删除之前的Object
				_this.removeElement({
					id: id,
				});
				// 设置新的code
				item.code = index;
				// 在新的位置插入Object
				_this.generateElement({
					id: id,
					code: item.code,
					title: item.title,
					date: item.date,
					description: item.description
				});
				_this.saveData();
			}
		});
	});

	$('#delete-div').droppable({
		drop: function(event, ui) {
			var element = ui.helper,
				id = element.attr('id');
			_this.removeElement({
				id: id,
			});
			delete _this.data[id];
			_this.saveData();
		}
	});

	$('#deleteAll').click(function() {
		$('.todo_task').remove();
		_this.data = {};
		_this.saveData();	
	});

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

	wrapper.draggable({
		opacity: 0.5,
		start: function() {
			$('#delete-div').show('fast');
		},
		stop: function() {
			$('#delete-div').hide('fast');
		}
	});
};

Mytodolist.prototype.removeElement = function(arg) {
	$('#' + arg.id).remove();
};

Mytodolist.prototype.saveData = function() {
	localStorage.setItem('todolist', JSON.stringify(this.data));
};



$(document).ready(function(){
	new Mytodolist();
});

