# Backbone-tabs
быстрые табы на backbone  + IE8

![Alt-screenshot](https://github.com/andreevich/backbone-tabs/blob/master/2015-08-09_15-43-15.png "Screenshot")
- Активные табы
- Неактивные табы


[![MPCMetr](http://img.youtube.com/vi/Bs8Hdaof7bs/0.jpg)](https://www.youtube.com/watch?v=Bs8Hdaof7bs)

# Создание новых Табов
```javascript
app.tabs = new app.Tabs([
		{name:"reload", text:'&nbsp;§&nbsp;',isblocked:true},
		{name:"insert", text:'Добавление',isactive:'active',content:'Добавление чего-то там'},
		{name:"report",text:"Отчёт",content:'Отчёты...'},
		{name:"help",text:"?",content:'Справка'},
		{name:"user", text:'Пользователь ',isblocked:true}
	])
```	

# Манипуляции с Табами
```javascript
	app.tabs.get('insert').hide()  	// Скрыть таб. Сделать активным первый незаблокированный.
	app.tabs.get('insert').show()		// Отобразить таб.
	app.tabs.get('report').active()	// Сделать активным таб и вкладку.	
```	