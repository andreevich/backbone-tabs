var app = app || {};


(function () {
	'use strict';
	
/*
	модель таба
*/
	app.TabModel = Backbone.Model.extend({
		idAttribute: 'name',
		defaults: {
			name:'',							// связи таба и вкладки. быстрый доступ по имени
			text: 'Tab',						// наименование таба
			isblocked:false,  			// залоченый таб без вкладки
			content:"tab's content", 	// содержимое вкладки
			isactive:'' ,						// активный таб isactive:'active' )
		},
		validate:function(){
			if (this.isblocked){
				console.log(this)
				return "-"
			}
		},
		f:function(){}					//вызов пустой функции по клику на таб. Переопределяется в основном приложении
	});
/*
	колекция табов
*/	
	app.Tabs = Backbone.Collection.extend({
		model: app.TabModel,
		initialize: function(models) {},
		getDataByName: function(name){
			var temp = ""
			this.each(function(a){
				if (a.get('name')==name){
					temp = a;
					return;
				}
			})
			return temp
		}
	});

	/*
		Вьюха для таба
	*/
	app.TabitemView = Backbone.View.extend({
		template: _.template($('#tabitem-template').html()),
		events:{
			'click': 'click'
		},
		initialize: function () {
		 	this.render()
		},
		click:function(){
			if (!this.model.get("isblocked")){
				app.tabs.each(function(el){
					if (!el.get("isblocked"))
						el.set({isactive:''})
				})
				this.model.set({isactive:'active'})
			}
			this.model.f()
		},
		
		render: function () {
			this.setElement(this.template(this.model.toJSON()));
			return this;
		}
		});

	/*
		Вьюха для списка табов 
	*/
	
	app.TabsView = Backbone.View.extend({
		el: "#tabs",
		initialize: function(){
			this.render()
			this.listenTo(app.tabs, "change", this.render);
		},
		render: function(){
			$('#tabs, #tabs_').html('')
			app.tabs.each(function(item){
				var tabitemView = new app.TabitemView({ model: item });
				this.$el.append(tabitemView.el)
				
				var template = _.template($('#tabitem_-template_').html());
				$('#tabs_').append(template(item.toJSON()));
			},this);
		}
	});
	
	
})();
