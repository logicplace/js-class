Class = require("./class.js"); //If using Node.JS

P1 = Class({ //Object style definition
	_name: "P1",
	tmp: function(){ return "herp"; },
	tmp2: function(){ return "herp2"; },
	test: function(x){ return (this.eep = x); },
	whoami: function(){ return this.nom; }
});

P2 = Class(function P2(){ //Function style definition
	this.tmp = function(){ return "derp"; }
	this.test = function(x){ return (this.aap = x); }
},P1) //inherits P1

P3 = Class({
	_name: "P3",
	tmp: function(){ return "perp"; }
},P2) //inherits P2

var a = new P1(),
    b = new P2(),
    c = new P3();

function is(cl,val){
	if("eep" in cl && cl.eep == val)return "eep";
	else if("aap" in cl && cl.aap == val)return "aap";
	else return "none";
}

function test(code,out,extra){
	var tt = eval(code);
	if(!(2 in arguments))extra = false;
	console.log(code+"; '"+tt+"' "+(extra||(tt==out?"Success":"Failed, expected: '"+out+"'")));
}

function testw(code,ob,val,eap){
	var tt = eval(code), t2 = is(ob,val);
	console.log(code+"; '"+tt+"' "+(t2==eap?"Success":"Failed, expected to find it in '"+eap+"' but found in '"+t2+"'"));
}

console.log("let a = new P1(); b = new P2(); c = new P3();");

console.log("==== *.tmp() - Overrides ====");
test("a.tmp()","herp");
test("b.tmp()","derp");
test("c.tmp()","perp");

console.log("\n==== *.tmp2() - Bubbling up ====");
test("a.tmp2()","herp2");
test("b.tmp2()","herp2");
test("c.tmp2()","herp2");

console.log("\n==== *.whoami() - Bubbling up with property read ====");
test("a.whoami()","P1");
test("b.whoami()","P2");
test("c.whoami()","P3");

console.log("\n==== *.test(x) - Bubbling up/overrides with property set ====");
testw("a.test(1)",a,1,"eep");
testw("b.test(2)",b,2,"aap");
testw("c.test(3)",c,3,"aap");

console.log("\n==== b.uber*.tmp() - Calling superclass's method instead ====");
test("b.tmp()","derp");
test("b.uber.tmp()","herp");

console.log("\n==== c.uber*.tmp() - Calling superclass's method instead ====");
test("c.tmp()","perp");
test("c.uber.tmp()","derp");
test("c.uber.uber.tmp()","herp");

console.log("\n==== *.uber*.test(x) - Calling superclass's method with variable set ====");
testw("b.uber.test(4)",b,4,"eep");
testw("c.uber.test(5)",c,5,"aap");
testw("c.uber.uber.test(6)",c,6,"eep");

console.log("\n==== Static calls: ====")
console.log("Name: "+P1._name);
test("P1.tmp()","herp");
test("P1.tmp2()","herp2");
console.log("Name: "+P2._name);
test("P2.tmp()","derp");
//test("P2.tmp2()","herp2"); //No static inheritence!
console.log("Name: "+P3._name);
test("P3.tmp()","perp");
//test("P3.tmp2()","herp2"); //No static inheritence!
