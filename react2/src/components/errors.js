/*
Elmagyarázása ennek a kódnak -> 

        if(currentTask.length === 0)
            setErrors(e=>[...e, "A feladat leírása nem lehet üres!"])
        if(currentImportance === 0)
            setErrors(e=>[...e, "Kötelező beállítani a fontosságot!"])

setErrors is a function used to update the state variable named errors in your component.

e => [...e, "A feladat leírása nem lehet üres!"] is an arrow function that takes the current state 
(e, which presumably represents the current array of errors) and returns a new array 
with an additional error message: "A feladat leírása nem lehet üres!".

e represents the current state (array of errors).
...e is the spread operator, which copies the existing elements from the current state array.
"A feladat leírása nem lehet üres!" is the new error message added to the end of the array.
The entire expression is used as the argument to setErrors.
 When this function is called, React will update the state variable errors with the new array.
 */