/**
 * How to create a Javascript object and initialize its properties using dot notation (.)
 */
 
var codejobs = new Object();

codejobs.url = 'http://www.codejobs.biz';
codejobs.twitter = '@codejobs';
codejobs.getTwitter = function() { return codejobs.twitter; };

console.log(codejobs.getTwitter()); //Logs: '@codejobs'


/** 
 * How to create an object of type String
 */
 
var myObject = new Object(); // Produces an Object() object

myObject['0'] = 'c';
myObject['1'] = 'o';
myObject['2'] = 'd';
myObject['3'] = 'e';
myObject['4'] = 'j';
myObject['5'] = 'o';
myObject['6'] = 'b';
myObject['7'] = 's';

console.log(myObject); // Logs: Object {0="c", 1="o", 2="d", 3="e", 4="j", 5="o", 6="b", 7="s"}

var myString = new String('codejobs'); // Produces an String() object

console.log(myString); // Logs: codejobs {0="c", 1="o", 2="d", 3="e", 4="j", 5="o", 6="b", 7="s"}


/**
 * How to create a constructor
 */
 
// Define Person constructor function in order to create custom Person() objects later
var Person = function(living, age, gender) {
    this.living = living;
    this.age = age;
    this.gender = gender;
    this.getGender = function() { return this.gender; };
};

// Instantiate a Person object and store it in the Human variable
var human = new Person(true, 24, 'male');

console.log(human);

/* 
 * The String() constructor function below, having been defined by JavaScript, has the same
 * pattern. Because the string constructor is native to JavaScript, all we have to do to get a
 * string instance is instantiate it. But the pattern is the same whether we use native
 * constructors like String() or user-defined constructors like Person(). 
 */

// instantiate a String object stored in the myString variable
var myString = new String('codejobs');

console.log(myString);


/**
 * Two ways to create an object, using Object() constructor or a personalized constructor
 */
 
// Create a humanA object using the Object() constructor
var humanA = new Object();

humanA.living = true;
humanA.age = 24;
humanA.gender = 'male';
humanA.getGender = function() { return humanA.gender; };

console.log(humanA); // Logs: Object {living=true, age=24, gender="male", ...}

/* 
 * The same human object is created below, but instead of using the native Object()
 * constructor to create a one-off human, we first define our own Person() constructor that can
 * create a human object (and any other Person object we like) and then instantiate it with "new". 
 */
var Person = function(living, age, gender) {
    this.living = living;
    this.age = age;
    this.gender = gender;
    this.getGender = function() { return this.gender; };
};

var humanB = new Person(true, 33, 'female');

console.log(humanB); // Logs: Object {living=true, age=33, gender="female", ...}


/**
 * Array constructor
 */
// Instantiate an Array object named myArray
var myArray = new Array(); // myArray is an instance of Array

// myArray is an object and an instance of Array() constructor
console.log(typeof myArray); // Logs: object! What? Yes, arrays are type of object
console.log(myArray); // Logs: [ ]
console.log(myArray.constructor); // Logs: Array()


/**
 * Below, I list the 9 native object constructors that come pre-packaged with JavaScript:
 * -Number()
 * -String()
 * -Boolean()
 * -Object()
 * -Array()
 * -Function()
 * -Date()
 * -RegExp()
 * -Error()
 */
 
 
/** 
 * Instantiate an instance for each native constructor using the new keyword
 */
var myNumber   = new Number(23);
var myString   = new String('male');
var myBoolean  = new Boolean(false);
var myObject   = new Object();
var myArray    = new Array('foo','bar');
var myFunction = new Function("x", "y", "return x*y");
var myDate        = new Date();
var myRegExp   = new RegExp('bt[a-z]+b');
var myError    = new Error('Crap!');

// log/verify which constructor created the object
console.log(myNumber.constructor);      // logs Number()
console.log(myString.constructor);      // logs String()
console.log(myBoolean.constructor);  // logs Boolean()
console.log(myObject.constructor);      // logs Object()
console.log(myArray.constructor);      // logs Array(), in modern browsers
console.log(myFunction.constructor); // logs Function()
console.log(myDate.constructor);      // logs Date()
console.log(myRegExp.constructor);      // logs RegExp()
console.log(myError.constructor);      // logs Error()


/**
 * Creating shorthand/literal values from constructors
 */
var myNumber = new Number(23); // an object
var myNumberLiteral = 23; // primitive number value, not an object

var myString = new String('male'); // an object
var myStringLiteral = 'male'; // primitive string value, not an object

var myBoolean = new Boolean(false); // an object
var myBooleanLiteral = false; // primitive boolean value, not an object

var myObject = new Object();
var myObjectLiteral = {};

var myArray = new Array('foo', 'bar');
var myArrayLiteral = ['foo', 'bar'];

var myFunction = new Function("x", "y", "return x*y");
var myFunctionLiteral = function(x, y) {return x*y};

var myRegExp = new RegExp('bt[a-z]+b');
var myRegExpLiteral = /bt[a-z]+b/;

// verify that literals are created from same constructor
console.log(myNumber.constructor,myNumberLiteral.constructor);
console.log(myString.constructor,myStringLiteral.constructor);
console.log(myBoolean.constructor,myBooleanLiteral.constructor);
console.log(myObject.constructor,myObjectLiteral.constructor);
console.log(myArray.constructor,myArrayLiteral.constructor);
console.log(myFunction.constructor,myFunctionLiteral.constructor);
console.log(myRegExp.constructor,myRegExpLiteral.constructor);


/**
 * Primitive (aka simple) values
 */

var myString     = 'string'
var myNumber     = 10;
var myBoolean     = false; // could be true or false, but that is it
var myNull         = null;
var myUndefined = undefined;

console.log(myString, myNumber, myBoolean, myNull, myUndefined);

/* 
 * Consider that a complex object like array or object can be made up of multiple primitive
 * values, and thus becomes a complex set of multiple values. 
 */
var myObject = {
    myString: 'string',
    myNumber: 10,
    myBoolean: false,
    myNull: null,
    myUndefined: undefined
};

console.log(myObject);

var myArray = ['string', 10, false, null, undefined];

console.log(myArray);


/**
 * The primitive values null, undefined, "string", 10, true, and false are not objects
 */
 
// No object is created when producing primitive values, notice no use of the "new" keyword
var primitiveString1  = "foo";
var primitiveString2  = String('foo');
var primitiveNumber1  = 10;
var primitiveNumber2  = Number('10');
var primitiveBoolean1 = true;
var primitiveBoolean2 = Boolean('true');

// Confirm the typeof is not object
console.log(typeof primitiveString1, typeof primitiveString2); // logs 'string,string'
console.log(typeof primitiveNumber1, typeof primitiveNumber2); // logs 'number,number,
console.log(typeof primitiveBoolean1, typeof primitiveBoolean2); // logs 'boolean,boolean'

// versus the usage of a constructor and new keyword for creating objects
var myNumber     = new Number(23);
var myString     = new String('male');
var myBoolean     = new Boolean(false);
var myObject     = new Object();
var myArray     = new Array('foo', 'bar');
var myFunction     = new Function("x", "y", "return x * y");
var myDate         = new Date();
var myRegExp     = new RegExp('bt[a-z]+b');
var myError     = new Error('Crap!');

// logs 'object object object object object function object function object'
console.log(
    typeof myNumber,
    typeof myString,
    typeof myBoolean,
    typeof myObject,
    typeof myArray,
    typeof myFunction, // BE AWARE typeof returns function for all function objects
    typeof myDate,
    typeof myRegExp, // BE AWARE typeof returns function for RegExp()
    typeof myError
);


/**
 * How primitive values are stored/copied in JavaScript
 */
  
var myString = 'foo' // create a primitive string object
var myStringCopy = myString; // copy its value into a new variable
var myString = null; // manipulate the value stored in the myString variable

/*
 * The original value from myString was copied to myStringCopy. This is confirmed by updating
 * the value of myString then checking the value of myStringCopy
 */
 
console.log(myString, myStringCopy); // logs 'null foo'


/**
 * Primitive values are equal by value
 */

var price1 = 10;
var price2 = 10;
var price3 = new Number('10'); // a complex numeric object because new was used
var price4 = price3;

console.log(price1 === price2); // logs true

console.log(price1 === price3); // logs false because price3 contains a complex number object and price 1 is a primitive value 

console.log(price4 === price3); // logs true because complex values are equal by reference, not value

// what if we update the price4 variable to contain a primitive value?
price4 = 10;

console.log(price4 === price3); // logs false: price4 is now primitive rather than complex


/**
 * The string, number, and boolean primitive values act like objects when used like objects
 */
 
// Produce primitive values
var myNull = null;
var myUndefined = undefined;

var primitiveString1 = "foo";
var primitiveString2 = String('foo'); // did not use new, so we get primitive

var primitiveNumber1 = 10;
var primitiveNumber2 = Number('10'); // did not use new, so we get primitive

var primitiveBoolean1 = true;
var primitiveBoolean2 = Boolean('true'); // did not use new, so we get primitive

/* 
 * Access the toString() property method (inherited by objects from object.prototype) to
 * demonstrate that the primitive values are converted to objects when treated like objects. 
 */
 
console.log(primitiveString1.toString(), primitiveString2.toString()); // logs "string string"
console.log(primitiveNumber1.toString(), primitiveNumber2.toString()); // logs "number number"
console.log(primitiveBoolean1.toString(), primitiveBoolean2.toString()); // logs "boolean boolean"

/* 
 * This will throw an error and not show up in firebug lite, as null and undefined do not
 * convert to objects and do not have constructors. 
 */
console.log(myNull.toString());
console.log(myUndefined.toString());


/**
 * Complex (aka composite) values
 */

var object = {
    myString: 'string',
    myNumber: 10,
    myBoolean: false,
    myNull: null,
    myUndefined: undefined
};

var array = ['string', 10, false, null, undefined];

/* 
 * Contrast this to the simplicity of the primitive values below. In a primitive form, none
 * of the values below can be more complex than what you see while complex values can
 * encapsulate any of the JavaScript values (seen above). 
 */
 
var myString     = 'string';
var myNumber     = 10;
var myBoolean     = false;
var myNull         = null;
var myUndefined = undefined;
 
 
/**
 * How complex values are stored/copied in JavaScript
 */
 
var myObject = {};
var copyOfMyObject = myObject; // not copied by value, just the reference is copied

myObject.foo = 'bar'; // manipulate the value stored in myObject

/* 
 * Now if we log myObject & copyOfMyObject, they will have a foo property because they
 * reference the same object. 
 */
 
console.log(myObject, copyOfMyObject); // logs 'Object { foo="bar"} Object { foo="bar"}'


/**
 * Complex objects are equal by reference
 */
 
var objectFoo = {same: 'same'};
var objectBar = {same: 'same'};

console.log(objectFoo === objectBar); // logs false, JS does not care that they are identical and of the same object type

// How complex objects are measured for equality
var objectA = {foo: 'bar'};
var objectB = objectA;

console.log(objectA === objectB); // logs true because they reference the same object

 
/**
 * Complex objects have dynamic properties
 */

var objA = {property: 'value'};
var pointer1 = objA;
var pointer2 = pointer1;

// Update the objA.property, and all references (pointer1 & pointer2) are updated
objA.property = null;

// logs 'null null null' because objA, pointer1, and pointer2 all reference the same object
console.log(objA.property, pointer1.property, pointer2.property);
 
 
/**
 * The typeof operator used on primitive and complex values
 */

// Primitive values
var myNull               = null;
var myUndefined       = undefined;
var primitiveString1  = "string";
var primitiveString2  = String('string');
var primitiveNumber1  = 10;
var primitiveNumber2  = Number('10');
var primitiveBoolean1 = true;
var primitiveBoolean2 = Boolean('true');

console.log(typeof myNull);                      // logs object? WHAT? Be aware...
console.log(typeof myUndefined);                  // logs undefined
console.log(typeof primitiveString1, typeof primitiveString2);      // logs string string
console.log(typeof primitiveNumber1, typeof primitiveNumber2);      // logs number number
console.log(typeof primitiveBoolean1, typeof primitiveBoolean2); // logs boolean boolean

// Complex Values
var myNumber     = new Number(23);
var myString     = new String('male');
var myBoolean     = new Boolean(false);
var myObject     = new Object();
var myArray     = new Array('foo', 'bar');
var myFunction     = new Function("x", "y", "return x * y");
var myDate     = new Date();
var myRegExp     = new RegExp('bt[a-z]+b');
var myError     = new Error('Crap!');

console.log(typeof myNumber);     // logs object
console.log(typeof myString);     // logs object
console.log(typeof myBoolean);    // logs object
console.log(typeof myObject);     // logs object
console.log(typeof myArray);     // logs object
console.log(typeof myFunction); // logs function? WHAT? Be aware...
console.log(typeof myDate);     // logs object
console.log(typeof myRegExp);     // logs function? WHAT? Be aware...
console.log(typeof myError);     // logs object
 
 
/**
 * Dynamic Properties allow for mutable objects
 */
 
// Augment the built-in String constructor Function() with the augmentedProperties property
String.augmentedProperties = [];

// if the prototype does not have trimIT() add it
if(!String.prototype.trimIT) { 
    String.prototype.trimIT = function() {
        return this.replace(/^s+|s+$/g, '');
    }

    // now add trimIT string to the augmentedProperties array
    String.augmentedProperties.push('trimIT');
}

var myString = ' trim me ';

console.log(myString.trimIT()); // invoke our custom trimIT string method, logs 'trim me'
console.log(String.augmentedProperties.join()); // logs 'trimIT'
 

/**
 * All constructor instances have constructor properties that point to their constructor function
 */

var foo = {};

console.log(foo.constructor === Object) // logs true, because object() constructed foo
console.log(foo.constructor) // points to the Object() constructor function

var myNumber     = new Number('23');
var myNumberL    = 23; // literal shorthand

var myString     = new String('male');
var myStringL     = 'male'; // literal shorthand

var myBoolean     = new Boolean('true');
var myBooleanL    = true; // literal shorthand

var myObject     = new Object();
var myObjectL     = {}; // literal shorthand

var myArray     = new Array();
var myArrayL     = []; // literal shorthand

var myFunction     = new Function();
var myFunctionL = function() {}; // literal shorthand

var myDate     = new Date();

var myRegExp     = new RegExp('/./');
var myRegExpL     = /./; // literal shorthand

var myError     = new Error();

// all of these return true
console.log( 
    myNumber.constructor     === Number,
    myNumberL.constructor     === Number,
    myString.constructor     === String,
    myStringL.constructor     === String,
    myBoolean.constructor     === Boolean,
    myBooleanL.constructor     === Boolean,
    myObject.constructor    === Object,
    myObjectL.constructor     === Object,
    myArray.constructor    === Array,
    myArrayL.constructor     === Array,
    myFunction.constructor     === Function,
    myFunctionL.constructor === Function,
    myDate.constructor     === Date,
    myRegExp.constructor     === RegExp,
    myRegExpL.constructor     === RegExp,
    myError.constructor     === Error
);

var CustomConstructor = function CustomConstructor(){ return 'Wow!'; };
var instanceOfCustomObject = new CustomConstructor();

console.log(instanceOfCustomObject.constructor === CustomConstructor); // logs true

// returns a reference to CustomConstructor() function
// returns 'function() { return 'Wow!'; };'
console.log(instanceOfCustomObject.constructor);


/**
 * Verify that an object is an instance of a particular constructor function
 */

var CustomConstructor = function() {this.foo = 'bar';}; // user-defined object constructor
var instanceOfCustomObject = new CustomConstructor(); // instantiate an instance of CustomConstructor

console.log(instanceOfCustomObject instanceof CustomConstructor); // logs true

// works the same as a native object
console.log(new Array('foo') instanceof Array) // logs true 





/**
 * An instance created from a constructor can have its own independent properties (aka instance properties)
 */

var myArray = new Array();

myArray.prop = 'test';

console.log(myArray.prop) // logs 'test'

// this can be done with any of the native constructors that actual produce an object
var myString   = new String();
var myNumber   = new Number();
var myBoolean  = new Boolean(true);
var myObject   = new Object();
var myArray    = new Array();
var myFunction = new Function('return 2+2');
var myRegExp   = new RegExp('bt[a-z]+b');

myString.prop   = 'test';
myNumber.prop   = 'test';
myBoolean.prop  = 'test';
myObject.prop   = 'test';
myArray.prop    = 'test';
myFunction.prop = 'test';
myRegExp.prop   = 'test';

// logs 'test', 'test', 'test', 'test', 'test', 'test', 'test'
console.log(myString.prop, myNumber.prop, myBoolean.prop, myObject.prop, myArray.prop, myFunction.prop, myRegExp.prop);

// be aware: instance properties do not work with primitive/literal values
var myString = 'string';
var myNumber = 1;
var myBoolean = true;

myString.prop = true;
myNumber.prop = true;
myBoolean.prop = true;

// logs undefined, undefined, undefined
console.log(myString.prop, myNumber.prop, myBoolean.prop);


/**
 * Working with Objects and Properties
 *
 * Complex objects can contain most of the JavaScript values as properties
 */

var myObject = {};

// contain properties inside of myObject representing most of the native JavaScript values
myObject.myFunction  = function() {};
myObject.myArray      = [];
myObject.myString      = 'string';
myObject.myNumber      = 33;
myObject.myDate      = new Date();
myObject.myRegExp      = /a/;
myObject.myNull      = null;
myObject.myUndefined = undefined;
myObject.myObject      = {};
myObject.myMath_PI      = Math.PI;
myObject.myError      = new Error('Crap!');

console.log(
    myObject.myFunction,
    myObject.myArray,
    myObject.myString,
    myObject.myNumber,
    myObject.myDate,
    myObject.myRegExp,
    myObject.myNull,
    myObject.myNull,
    myObject.myUndefined,
    myObject.myObject,
    myObject.myMath_PI,
    myObject.myError
);

//works the same with any of the complex objects, for example a function 
var myFunction = function() {};

myFunction.myFunction  = function() {};
myFunction.myArray     = [];
myFunction.myString    = 'string';
myFunction.myNumber    = 33;
myFunction.myDate      = new Date();
myFunction.myRegExp    = /a/;
myFunction.myNull      = null;
myFunction.myUndefined = undefined;
myFunction.myObject    = {};
myFunction.myMath_PI   = Math.PI;
myFunction.myError     = new Error('Crap!');

console.log(
    myFunction.myFunction,
    myFunction.myArray,
    myFunction.myString,
    myFunction.myNumber,
    myFunction.myDate,
    myFunction.myRegExp,
    myFunction.myNull,
    myFunction.myNull,
    myFunction.myUndefined,
    myFunction.myObject,
    myFunction.myMath_PI,
    myFunction.myError
);


/**
 * Encapsulating complex objects in a programmatically beneficial way
 */

// encapsulation using objects, creates object chains
var object1 = {
    object1_1: {
        object1_1_1: {foo: 'bar'},
        object1_1_2: {},
    },

    object1_2: {
        object1_2_1: {},
        object1_2_2: {},
    }
};

console.log(object1.object1_1.object1_1_1.foo); // logs 'bar'
 
// encapsulation using arrays, creates multidimensional array chain
var myArray= [[[]]]; // an empty array, inside an empty array, inside an empty array

/* 
 * Here is an example of encapsulation using functions: an empty function inside an empty
 * function inside an empty function. 
 */
 
var myFunction = function() {
    // empty
    var myFunction = function() {
        // empty
        var myFunction = function() {
            // empty
        };
    };
};

// we can get crazy and mix and match too
var foo = [{foo: [{bar: {say: function() {return 'hi';}}}]}];

console.log(foo[0].foo[0].bar.say()); // logs 'hi'


/**
 * Getting/setting/updating an object's properties using dot notation or bracket notation
 */

// create person Object() object
var person = new Object();

// setting properties
person.living      = true;
person.age          = 33;
person.gender      = 'male';
person.getGender = function() {return person.gender;};

// getting properties
console.log(person.living, person.age, person.gender, person.getGender()); // logs 'true 33 male male'

// updating properties, exactly like setting
person.living    = false;
person.age             = 99;
person.gender    = 'female';
person.getGender = function() {return 'Gender = ' + person.gender;};

console.log(person);
 
// creating person Object() object
var person = new Object();

// setting properties
person['living']     = true;
person['age']         = 33;
person['gender']     = 'male';
person['getGender'] = function() {return person.gender;};

// getting properties
console.log(
    person['living'], 
    person['age'], 
    person['gender'], 
    person['getGender']() // just slap the function invocation on the end!
); // logs 'true 33 male male'

// updating properties, very similar to setting
person['living']     = false;
person['age']         = 99;
person['gender']     = 'female';
person['getGender'] = function() {return 'Gender = ' + person.gender;};

console.log(person);

var foobarObject = {foobar: 'Foobar is code for no code'};

var string1 = 'foo';
var string2 = 'bar';

console.log(foobarObject[string1 + string2]); // Let's see dot notation do this!

var myObject = {'123':'zero','class':'foo'};

// Let's see dot notation do this! Keep in mind 'class' is a keyword in JavaScript
console.log(myObject['123'], myObject['class']); //logs 'zero foo'

// it can't do what bracket notation can do, in fact it causes an error
// console.log(myObject.0, myObject.class);


/**
 * Deleting object properties
 */
 
var foo = {bar: 'bar'};

delete foo.bar;

console.log('bar' in foo); // logs false, because bar was deleted from foo

 
/**
 * How references to object properties are resolved
 */

var myArray = [];

console.log(myArray.foo); // logs undefined

/* 
 * JS will look at Array.prototype for Array.prototype.foo, but it is not there. Then it will
 * look for it at Object.prototype, but it is not there either, so undefined is returned! 
 */
 
// myArray is an Array object
var myArray = ['foo', 'bar'];

console.log(myArray.join()); // join() is actually defined at Array.prototype.join

var myArray = ['foo', 'bar'];

console.log(myArray.hasOwnProperty('join')); // logs false

// myArray & Array.prototype contains no toLocaleString() method
var myArray = ['foo', 'bar'];

// toLocaleString() is actually defined at Object.prototype.toLocaleString
console.log(myArray.toLocaleString()); // logs 'foo,bar'

var myObject = {foo: 'value'};

console.log(myObject.hasOwnProperty('foo')) // logs true

// vs. a property from the prototype chain
console.log(myObject.hasOwnProperty('toString'); // logs false


/**
 * Checking if an object contains a given property using the in operator
 */

var myObject = {foo: 'value'};

console.log('foo' in myObject); // logs true

var myObject = {foo: 'value'};

console.log('toString' in myObject); // logs true
 
 
/**
 * Enumerate (loop over) an object?s properties using the for in loop
 */

var person = {
    age : 23,
    gender : 'male'
};

// key is a variable used to represent each property name
for(var key in person) {
    // avoid properties inherited from the prototype chain
    if(person.hasOwnProperty(key)) {
        console.log(key);
    }
}


/**
 * Host objects vs. native objects
 */

for(x in window) {
    console.log(x); //logs all of the properties of the window/head object
}

for(x in window.document) {
    console.log();
}


/**
 * Enhancing & extending objects with Underscore.js
 *
 * These functions work on all objects and arrays:
 *  -each()
 *  -map()
 *  -reduce()
 *  -reduceRight()
 *  -detect()
 *  -select()
 *  -reject()
 *  -all()
 *  -any()
 *  -include()
 *  -invoke()
 *  -pluck()
 *  -max()
 *  -min()
 *  -sortBy()
 *  -sortIndex()
 *  -toArray()
 *  -size()
 *
 * These functions work on all objects:
 *  -keys()
 *  -values()
 *  -functions()
 *  -extend()
 *  -clone()
 *  -tap()
 *  -isEqual()
 *  -isEmpty()
 *  -isElement()
 *  -isArray()
 *  -isArguments
 *  -isFunction()
 *  -isString()
 *  -isNumber
 *  -isBoolean
 *  -isDate
 *  -isRegExp
 *  -isNaN
 *  -isNull
 *  -isUndefined
 */
 
 
/**
 * Conceptual overview of using Object() objects
 */

var myObject = new Object(); // create an empty object with no properties

// confirm that myObject is an empty generic object
for(key in myObject) {
    if(myObject.hasOwnProperty(key)) {
        console.log(key); // should not see any logs, because myObject itself has no properties
    }
}


/**
 * Object() parameters
 */
 
// create an empty object with no properties
var myObject1 = new Object();
var myObject2 = new Object(undefined);
var myObject3 = new Object(null);

console.log(typeof myObject1, typeof myObject2, typeof myObject3); // logs 'object object object'

/* 
 * Use Object() constructor to create a string, number, array, function, boolean, and regex object. 
 */
 
// logs below confirm object creation
console.log(new Object('foo'));
console.log(new Object(1));
console.log(new Object([]));
console.log(new Object(function() {}));
console.log(new Object(true));
console.log(new Object(/bt[a-z]+b/));

/* 
 * Creating a string, number, array, function, boolean, and regex object instance via the
 * Object() constructor is really never done. I am just demonstrating that it can be done. 
 */

 
/**
 * Creating Object() objects using "object literals"
 */
 
var myObject = new Object();

myObject.living    = true;
myObject.age        = 33;
myObject.gender    = 'male';
myObject.getGender = function() {return myObject.gender;};

console.log(myObject); // logs myObject object and properties

var myObject = {
    living: true,
    age: 23,
    gender: 'male',
    getGender: function() {return myObject.gender;}
};

// notice the last property has no comma after it
console.log(myObject); // logs myObject object and properties

var myObject = {
    'living': true,
    'age': 23,
    'gender': 'male',
    'getGender': function() {return myObject.gender;}
};

console.log(myObject); // logs carlos object and properties


/**
 * All objects inherit from Object.prototype
 */

Object.prototype.foo = 'foo';

var myString = 'bar';

console.log(myString.foo); // logs 'foo', being found at Object.prototype.foo via prototype chain


/**
 * Conceptual overview of using Function() objects
 */
 
var addNumbersA = new Function('num1', 'num2', 'return num1 + num2');

console.log(addNumbersA(2, 2)); // logs 4

// could also be written the literal way, which is much more common
var addNumbersB = function(num1, num2) { return num1 + num2; };

console.log(addNumbersB(2, 2)); // logs 4
 
 
/**
 * Function() parameters
 */
var addFunction = new Function('num1', 'num2', 'return num1 + num2');

/* 
 * Alternately, a single comma-separated string with arguments can be
 * the first parameter of the constructor, with the function body following. 
 */
 
var timesFunction = new Function('num1,num2', 'return num1 * num2');

console.log(addFunction(2,2),timesFunction(2,2)); // logs '4 4'

// versus the more common patterns for instantiating a function
var addFunction = function(num1, num2) {
    return num1 + num2;
}; // expression form

function addFunction(num1, num2) {
    return num1 + num2;
} // statement form


/**
 * Functions always return a value
 */
var sayHi = function() {
    return 'Hi';
};

console.log(sayHi()); // logs "Hi"

var yelp = function() {
    console.log('I am yelping!');
    //functions return undefined even if we don't
}

console.log(yelp() === undefined); // logs true because a value is always returned, even if we don't specifically return one


/**
 * Functions are first-class citizens (not just syntax, but values)
 */
 
// functions can be stored in variables (funcA), arrays (funcB), and objects (funcC)
var funcA = function(){};         // called like so: funcA()
var funcB = [function(){}];         // called like so: funcB[0]()
var funcC = {method: function(){}}; // too.method() or funcC['method']()

// functions can be sent to, and sent back from, functions
var funcD = function(func) {
    return func
};

var runFuncPassedToFuncD = funcD(function(){console.log('Hi');});

runFuncPassedToFuncD();

// functions are objects, which means they can have properties
var funcE = function(){};

funcE.answer = 'yup';         // instance property
console.log(funcE.answer);  // logs 'yup'


/**
 * Passing parameters to a function
 */
 
var addFunction = function(number1, number2) {
    var sum = number1 + number2;

    return sum;
}

console.log(addFunction(3, 3)); // logs 6


/**
 * this & arguments values available to all functions
 */
 
var add = function() {
    return arguments[0] + arguments[1];
};

console.log(add(4, 4)); // returns 8

var myObject1 = {
    name: 'myObject1',
    myMethod: function(){console.log(this);}
};

myObject1.myMethod(); // logs 'myObject1'

var myObject2 = function() {
    console.log(this);
};

myObject2(); // logs window

/**
 * The arguments.callee property
 */

var foo = function foo() {
    console.log(arguments.callee); // logs foo()
    // callee could be used to invoke recursively the foo function (e.g. arguments.callee())
}();


/**
 * The function instance length property & arguments.length
 */
 
var myFunction = function(z, s, d) {
    return arguments.length;
};

console.log(myFunction()); // logs 0 because no parameters were passed to the function

var myFunction = function(z, s, d, e, r, m, q) {
    return myFunction.length;
};

console.log(myFunction()); //logs 7


/**
 * Redefining function parameters
 */

var foo = false;
var bar = false;

var myFunction = function(foo, bar) {
    arguments[0] = true;
    bar = true;
    console.log(arguments[0], bar); // logs true true
}

myFunction();


/**
 * Return a function before it is done (i.e. cancel function execution)
 */

 var add = function(x, y) {
    // If the parameters are not numbers, return error.
    if(typeof x !== 'number' || typeof y !== 'number') {
        return 'pass in numbers';
    }

    return x + y;
}

console.log(add(3,3)); // logs 6
console.log(add('2','2')); // logs 'pass in numbers'

/**
 * Defining a function (statement, expression, or constructor)
 */

/* 
 * Function constructor: the last parameter is the function logic, 
 * everything before it is a parameter 
 */
 
var addConstructor = new Function('x', 'y', 'return x + y');

// function statement
function addStatement(x, y) {
    return x + y;
}

// function expression
var addExpression = function(x, y) {
    return x + y;
};

console.log(addConstructor(2,2), addStatement (2,2), addExpression (2,2)); // logs '4 4 4'

/**
 * Invoking a function (function, method, constructor, or call() & apply())
 */
 
// function pattern
var myFunction = function() {
    return 'foo'
};

console.log(myFunction()); // log 'foo'

// method pattern
var myObject = {myFunction: function(){ return 'bar'; }}

console.log(myObject.myFunction()); // log 'bar'

// constructor pattern
var Carlos = function() {
    this.living = true;
    this.age = 33;
    this.gender = 'male';
    this.getGender = function() { return this.gender; };
}

var carlos = new Carlos(); // invoke via Carlos constructor

console.log(carlos); // logs carlos object and properties

// apply() and call() pattern
var greet = {
    runGreet: function() {
        console.log(this.name,arguments[0],arguments[1]);
    }
}

var carlos = {name:'carlos'};
var lisa = {name:'lisa'};

// invoke the runGreet function as if it were inside of the carlos object
greet.runGreet.call(carlos, 'foo', 'bar'); // logs 'carlos foo bar'

// invoke the runGreet function as if it were inside of the lisa object
greet.runGreet.apply(lisa, ['foo', 'bar']); // logs 'lisa foo bar'

/*
 * Notice the difference between call() and apply() in how parameters are sent to the
 * function being invoked 
 */
 

/**
 * Anonymous functions
 */

// function(){ console.log('hi'); }; // anonymous function, but no way to invoke it

// create a function that can invoke our anonymous function
var sayHi = function(f) {
    f(); // invoke anonymous function
}

// pass an anonymous function as parameter
sayHi(function(){console.log('hi');}); // log 'hi'


/**
 * Self-invoking function expression
 */

var sayWord = function() {
    console.log('Word 2 yo mo!');
}(); // logs 'Word 2 yo mo!'


/**
 * Self-invoking anonymous function statements
 */

// most commonly used/seen in the wild
(function(msg) {
    console.log(msg);
})('Hi');

// slightly different but achieving the same thing:
(function(msg) {
    console.log(msg)
}('Hi'));

// the shortest possible solution
function sayHi(msg) {
    console.log(msg);
}('Hi');

// FYI, this does NOT work!
// function sayHi() { console.log('hi'); }(); 

