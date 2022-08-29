Admin Page:
• XX Move gen-match-index logic to server side XX
• XX Translate IDs to names in client XX
• XX Function to parse and load CSV data (students/courses) XX
• Make data editable from Admin side (esp. CAPACITY)
• Swap out APS logic for ECTS budget logic
• Add data paste option, connect to parse&load function
• ADD to Allocation logic: (swap out i & j in one course when allocation fails)
• ADD column to student sheet which sums rank order of allocation (min 15, max 40) => [1,2,3,4,5] = 15, [6,7,8,9,10] = 40...

MAYBE WE JUST RESTART TO ALLOCATION LOOP WHEN IT FAILS, AND RUN IT UNTIL IT CLEARS? (there's huge equity implications with this approach)

• diagnose why allocation is failing (even though market should clear)
o preferences seem to be exhausted while some courses must still have capacity
• Swap out ALLOCATION_PER_STUDENT logic for ECTS budget (in allocation.js)
• Simulate rankings for all students for algorithm testing
• Algorithm testing and refining for edge cases
• Ability to upload CSV of courses, students; (clear existing data?)
• Make DB editable from admin client: e.g., changing capacity
• Add alerts and messages after actions are performed
o After rank submit
o After an allocation is generated
• Add chat box for requesting new tokenized link
o Submit old tokenized link to verify
• (Later) come up with and add diagnostic measures for estimating fairness of a generated allocation
o simple sum of ranks of courses allocated for each student will give a unique integer between 15 and 40, where 15 represents best possible allocation (options 1-5 allocated), while 40 represents worst possible allocation (options 6-10 allocated). A rule could be postulated, e.g., all students should receive an allocation with ranksum <25

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

MAKING CAPACITY/COURSE DATA EDITABLE

- Having the functionality to update course details
<!-- ++ write an endpoint to send post request & retrieve the data (key value pairs)
++ get all updated values from the post request data
++ use these values to update the DB -->
- adding UI to invoke this functionality
  ++ on click of edit button, show popup with input fields
  ++ show current values in input fields
  ++ on click of submit, ask for confirm
  ++ on confirm, send post request
