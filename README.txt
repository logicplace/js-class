This is a simple class definition framework that supports properties, methods,
statics, inheritance (works with instanceof), superclass addressing and method
overwriting, bubbling up, etc.

You can define a class by passing either an object or a function to Class.
In both forms, the idea is to define static variables in the top scope. All
functions can be used statically or non-statically. If called statically,
"this" will be null, otherwise it refers to the instance.

Note that if you pass a function it will only be executed when the class is
initialized, not when a new instance is created.

Reserved words within a class (ie. ones you can't use for method or propety
names) include: self, super, uber, inherits, this, and caller.
self refers to the instance, but is only used internally. Use "this" instead.
super and uber are indirect references to the inherited class. They are used
 to call the parent's version of a method (particularly if you overwrote it).
inherits is a direct reference to the inherited class. Just in case..
this (as in this.this) is a reference to what this was applied to the method.
 Note this.this is ONLY defined if a different this was applied.
caller is a reference to the function that called this method.

Other special words you may create include: init, name
init is executed when an instance is created. Its return value is disregarded
 here, but of course it will be returned if you call it directly.
_name is supposed to be the name of the class. If you use a function definition
 it uses the name of the function, otherwise you have to set it yourself. This
 is entirely optional though, and is not used internally.

See test.js for an example

