At Foresight Research, we collect household consumption data through thousands of field interviews every month.

Those interviews contain everything from household information and GPS coordinates to product purchases, photographs, and audio recordings.

Collecting the data is one thing. Getting it into a usable, reliable state is another.


I designed and built our first dedicated household panel database from scratch using SQL Server.

I also built the Python pipelines that connect ODK Central to SQL Server, replacing the manual export process.

Today, these systems handle approximately **9,000 interviews and 300,000 attachments every month**, with the main pipeline running every 15 minutes.
