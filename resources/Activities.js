/*
* https://dev.fitbit.com/docs/activity/#get-daily-activity-summary
* @param {string | Date} [date = today] - The date in the format yyyy-MM-dd
* @param {string} [acceptLanguage = 'en-CA'] - The measurement unit system to use for response values.
*/
function getDailyActivitiesSummary(date, acceptLanguage){
	if (typeof date === 'undefined' || date === '') date = formatDate(new Date());
	else date = formatDate(date);

	if (typeof acceptLanguage === 'undefined' || acceptLanguage === '') acceptLanguage = 'en-CA';
	
	let gdas_URL = 'https://api.fitbit.com/1/user/-/activities/date/'+date+'.json';
	let gdas_Headers = {
		'Accept-Language': acceptLanguage
	}
	fetch(getRequest(gdas_URL,gdas_Headers)).then(function(data) {
		return data.text();
	}).then(function(data) {
		console.log(JSON.parse(data));
		return(JSON.parse(data));
	});
}

/*
* https://dev.fitbit.com/docs/activity/#get-activity-time-series
* @param {Object} [parameters] - An object of:
	* @param {string} [resourcePath = 'calories']  - The resource path of the desired data. 
	* @param {string | Date} [baseDate = today] - The range start date, in the format yyyy-MM-dd or today.
	* @param {string | Date} [endDate = today-7] - The end date of the range.
	* @param {string} [acceptLanguage = 'en-CA' - The language to use for response values. Language is used to determine the activity measurement units returned.
*/
function getActivityTimeSeries(parameters){
	var resourcePath, baseDate, endDate, acceptLanguage;
	console.log(parameters);
	if (typeof parameters === 'undefined' || typeof parameters.resourcePath === 'undefined' || parameters.resourcePath === '') resourcePath = 'calories';
	
	var d = new Date();
	if (typeof parameters === 'undefined' || typeof parameters.baseDate === 'undefined' || parameters.baseDate === '') baseDate = formatDate(d);
	if (typeof parameters === 'undefined' || typeof parameters.endDate === 'undefined' || parameters.endDate === '') endDate = formatDate(d.setDate(d.getDate() - 6));
	
	if (typeof parameters === 'undefined' || typeof parameters.acceptLanguage === 'undefined' || parameters.acceptLanguage === '') acceptLanguage = 'en-CA';

	let gdas_URL = 'https://api.fitbit.com/1/user/-/activities/'+resourcePath+'/date/'+baseDate+'/'+endDate+'.json';
	let gdas_Headers = {
		'Accept-Language': acceptLanguage
	}
	fetch(getRequest(gdas_URL,gdas_Headers)).then(function(data) {
		return data.text();
	}).then(function(data) {
		console.log(JSON.parse(data));
	});
}

function getActivityIntradayTimeSeries(parameters){
	var resourcePath, date, detailLevel, startTime, endTime, acceptLanguage;
	if (typeof parameters === 'undefined' || typeof parameters.resourcePath === 'undefined' || parameters.resourcePath === '') resourcePath = 'calories';
	
	if (typeof parameters === 'undefined' || typeof parameters.date === 'undefined' || parameters.date === '') date = formatDate(new Date());

	if (typeof parameters === 'undefined' || typeof parameters.detailLevel === 'undefined' || parameters.detailLevel === '') detailLevel = '15min';

	if (typeof parameters === 'undefined' || typeof parameters.startTime === 'undefined' || parameters.startTime === '') startTime = '00:00';
	if (typeof parameters === 'undefined' || typeof parameters.endTime === 'undefined' || parameters.endTime === '') endTime = '23:59';

	if (typeof parameters === 'undefined' || typeof parameters.acceptLanguage === 'undefined' || parameters.acceptLanguage === '') acceptLanguage = 'en-CA';

	let gdas_URL = 'https://api.fitbit.com/1/user/-/'+resourcePath+'/date/'+date+'/1d/'+detailLevel+'/time/'+startTime+'/'+endTime+'.json';
	let gdas_Headers = {
		'Accept-Language': acceptLanguage
	}
	fetch(getRequest(gdas_URL,gdas_Headers)).then(function(data) {
		return data.text();
	}).then(function(data) {
		console.log(JSON.parse(data));
	});
}
