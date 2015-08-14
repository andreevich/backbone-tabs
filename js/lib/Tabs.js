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
			hidden:false					// прячем таб
		},
		validate:function(attrs, options){
			if(attrs.isblocked){			// для заблокированных табов ничего делать нельзя
					return "This tab is blocked"
			}
		},
		active:function(){				// делаем таб+вкладку активными
			if (!this.get('hidden') && !this.get('isblocked')){ 	// делаем активную только нескрытую вкладку!
				app.tabs.each(function(a){
					a.set({isactive:'' },{validate:true})
				})
				
				this.set({isactive:'active'},{validate:true})
			}
		},
		hide:function(){					//прячем таб
			this.set({hidden:true},{validate:true})
			var stop=false
			app.tabs.each(function(a){
				if (!a.get('hidden') && !a.get('isblocked') && !stop){
					a.active()
					stop=true
				}
			})
		},
		show:function(bool){			//показываем таб
			this.set({hidden:false},{validate:true})
		},
		f:function(){}					//вызов пустой функции по клику на таб. Переопределяется в основном приложении
	});
/*
	колекция табов
*/	
	app.Tabs = Backbone.Collection.extend({
		model: app.TabModel,
		initialize: function(models) {}
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
			//console.log(this.model.get('isblocked'))
			//if (!this.model.get('isblocked'))
				this.model.active()
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
			this.listenTo(app.tabs, "change add", this.render);
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
