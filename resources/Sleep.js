function getDailySleepLog(date){
	var date = document.querySelector('#gdsl_date').value;

	let gdsl_URL = "https://api.fitbit.com/1.2/user/-/sleep/date/"+date+".json";

	fetch(getRequest(gdsl_URL)).then(function(data) {
		return data.text();
	}).then(function(data) {
		
		var obj = JSON.parse(data);
		console.log(obj);
	});
}
