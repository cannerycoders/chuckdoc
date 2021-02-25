// class with function taking class as argument

class Other
{ 
    10 => int x;
    11 => int y;
}

class X
{ 
    5 => int x;
    6 => int y;

    public void set( Other a )
    { 
        a.x => x;
        a.y => y;
    }
} 

// instantiate
Other a;
X x;

// call the function
x.set(a);

// test
if( a.x == 10 ) <<<"success">>>;
