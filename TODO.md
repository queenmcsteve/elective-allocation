Admin Page:
• XX Move gen-match-index logic to server side XX
• XX Translate IDs to names in client XX
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
