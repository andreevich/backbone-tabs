var app = app || {}

$(function(){
	
	app.tabs = new app.Tabs([
		{name:"reload", text:'&nbsp;§&nbsp;',isblocked:true},
		{name:"insert", text:'Добавление',isactive:'active',content:'Добавление чего-то там'},
		{name:"report",text:"Отчёт",content:'Отчёты...'},
		{name:"help",text:"?",content:'Справка'},
		{name:"user", text:'Пользователь ',isblocked:true}
	])

	new app.TabsView();
	
	app.tabs.get('report').set({content:"Новый отчёт"})
	
	
	//app.tabs.get('insert').hide()
	//app.tabs.get('report').active()
	
	/*
		Добавляю функционала кнопке. Переопределяю функцию пустую f()
	*/
	app.tabs.get('reload').f=function(){
		location.reload()
	}

})