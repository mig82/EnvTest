define(function(){

	//TODO: Allow the user to input something to test for.
	const tests = [
		//{subject: "", type:""},
		{subject: "this", type:"object"},
		{subject: "window", type:"object"},

		{subject: "Math", type:"object"},
		{subject: "Date", type:"function"},
		{subject: "Intl", type:"object", props: [
			{prop: "NumberFormat", type: "function"},
			{prop: "DateTimeFormat", type: "function"}
		]},

		{subject: "setTimeout", type:"function"},
		{subject: "setInterval", type:"function"},

		{subject: "parseInt", type:"function"},
		{subject: "parseFloat", type:"function"},

		{subject: "Promise", type:"function"},

		{subject: "define", type: "function"},
		{subject: "define.amd", type: "object"},
		{subject: "q", type: "function", amd: true, props: [
			{prop: "Promise", type: "function"}
		]}
	];

	return {
		preShow: function(){
			this.view.output.text = "";
		},

		postShow: function(){
			tests.forEach((t) => {
				var subject = t.subject;
				var evalType = "";
				try{
					if(t.amd){
						var x = require(subject);
						evalType = typeof x;
						if(evalType === "undefined") throw new Error(subject + "is undefined");
						this.postResult(subject, evalType, t.type);

						//Explore any additional properties of this test.
						if(t.props){
							t.props.forEach((p) => {
								this.postResult(subject + "." + p.prop, typeof x[p.prop], p.type);
							});
						}
					}
					else{
						var x = eval(subject);
						evalType = typeof x;
						if(evalType === "undefined") throw new Error(subject + "is undefined");
						this.postResult(subject, evalType, t.type);

						//Explore any additional properties of this test.
						if(t.props){
							t.props.forEach((p) => {
								this.postResult(subject + "." + p.prop, typeof x[p.prop], p.type);
							});
						}
					}
				}
				catch(e){
					//An error here means the subject is undefined.
					evalType = undefined;
					this.postResult(subject, evalType, t.type);
				}
			});
		},

		postResult: function(subject, evalType, expectedType){
			var info = `${subject}: ${evalType}`;
			var out;

			//TODO: Test against the expected type;
			if(evalType === undefined){
				out = `<label style="color:#cc0000">${info}</label><br>`;
			}
			else if (evalType === expectedType){
				out = `<label style="color:#00cc00">${info}</label><br>`;
			}
			else {//(evalType !== expectedType)
				out = `<label style="color:#ff9a00">${info}</label><br>`;
			}
			this.view.output.text += out;
		},

		onNavigate: function(){
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		}
	};
});
