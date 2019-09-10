# Khonvo Challenge

## Problem Statement
Create a simple web app with two types of users. Use OAuth so only Google-compliant users are approved.

The first user must be able to drag and drop a queue of job descriptions and ask them to be processed with a number of candidates asked for. Let’s call this user the “Querier”.

The second user must be able to send back a list of names, job titles, emails, linkedin profiles or github profiles. Let’s call this user the “Producer”. The “Producer”’s progress is measured in points.

The Querier must then approve which ones he or she liked based on the job description. For every profile that the Querier likes, the Producer must get “1 Point”.

**Bonus points:**
The Querier should be able to download the CSV of all the profiles he or she liked.
