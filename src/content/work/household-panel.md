### the problem

For a long time, household panel information was maintained across Excel spreadsheets, with different versions sitting on different people's computers.

There wasn't a central database to manage households, their assignments, or their histories.

Meanwhile, getting survey data out of ODK Central meant someone had to manually export it before it could be processed.

As the panel grew, this became increasingly difficult to manage. We needed a more structured way to store household information, process incoming interviews, and identify problems in the collected data.

### what i built

That meant translating the way our field operations actually work into a relational data model: households, form assignments, field officers, geographic locations, interview records, and the relationships between them.

The system retrieves new submissions, preserves the original responses, transforms nested questionnaire data into structured records, and runs automated quality checks.

A separate pipeline downloads and tracks photographs and audio recordings.

### the interesting bits

**Keeping household identities consistent.**

A household's form number isn't necessarily permanent. Households can leave the panel, and their form numbers can be reassigned.

That creates an interesting problem: how do you preserve the identity of the household that originally completed an interview, even after its form number has been assigned to someone else?

The database distinguishes household identities from form assignments and preserves their history, so older interviews remain associated with the correct household.

**Catching problems before they become someone else's problem.**

The pipeline checks interviews for issues such as missing recordings, invalid durations, duplicate submissions, and unexpected distances from registered household locations.

Instead of leaving someone to discover these problems manually, it identifies them and makes them available for operational review.

**Making the system understandable.**

I maintain documentation covering the database's schemas, relationships, dependencies, and data lineage.

The idea is simple: someone unfamiliar with the system should be able to understand where the data comes from, what happens to it, and where it ends up.

### where things stand

The main pipeline runs every 15 minutes, with attachment processing handled separately.

It's an actively maintained system, and there's still plenty to improve.

But it's taken a process involving substantial manual work and turned it into a repeatable, largely automated workflow that supports day-to-day field operations.
