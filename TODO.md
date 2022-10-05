Admin Page:
• XX Move gen-match-index logic to server side XX
• XX Translate IDs to names in client XX
• XX Function to parse and load CSV data (students/courses) XX
• XX Make data editable from Admin side (esp. CAPACITY) XX
• XX Add data paste option, connect to parse&load function XX
• XX Swap out APS logic for ECTS budget logic XX
• XX UPDATE display after url regen & getdemand XX
• XX ADD column to student sheet which sums rank order of allocation
• ADD to Allocation logic: (swap out i & j in one course when allocation fails, where i is causing the fail and j has a matchScore closest to 15)

- FIX: needs for reload
- FIX: notifications

++ Bill Gates on the timetable problem ++

MAYBE WE JUST RESTART TO ALLOCATION LOOP WHEN IT FAILS, AND RUN IT UNTIL IT CLEARS? (there's huge equity implications with this approach)

• diagnose why allocation is failing (even though market should clear)
o preferences seem to be exhausted while some courses must still have capacity
• Simulate rankings for all students for algorithm testing
• Add alerts and messages after actions are performed
• Add chat box for requesting new tokenized link
o Submit old tokenized link to verify

Student Page:
• Add static table of courses, with toast descriptions
• Reframe drag table
o random order if not submitted yet; color red
o submitted order if ranking has been submitted; color green
o add option to edit/change submitted ranking until deadline is reached

when algorithm fails for i in course x
i is already in x
and x is the only course with capacity
SO: find student j who:
[MAYBE INCLUDE Match Score to help identify appropriate j?]
isn't in x (but it is acceptable)
is in y, where i isn't in y (but it is acceptable)
THEN:
take student j out of y
put student i into y
put student j into x

> > Continue allocation

{
"courseData": [
{
"name": "steve",
"ects": 3,
"capacity": 12,
"demand": 0
},
{
"name": "cheese",
"ects": 2,
"capacity": 55,
"demand": 0
}
]
}

> > > > HOW TO DEPLOY TO HEROKU
> > > > ? what needs to be modified between local/heroku deployments ?

go to client App.js
lines 15 - 23
disable and enable appropriate block
