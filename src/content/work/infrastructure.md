### the problem

Our internal applications depend on SQL Server databases containing operational and research data.

Previously, database backups were taken manually, whenever someone remembered to do them.

There wasn't a consistent schedule. Sometimes several days would pass between backups, and the process depended entirely on someone deciding it was time to take another one.

That wasn't particularly reassuring for systems the company depended on every day.

We needed a process that didn't rely on anyone remembering to do it.

### what i built

**Making backups automatic.**

Instead of someone occasionally remembering to take a backup, the process now runs automatically at defined intervals.

**Keeping copies on another machine.**

**Making sure recovery actually works.**

Because creating backup files is only half the job. You also need to know they're usable.

### the interesting bits

**Removing the human reminder system.**

The original process wasn't particularly complicated. Someone just had to remember to take a backup.

But that's exactly the sort of task computers are better suited to handling.

Automating it removed an unnecessary dependency on human memory.

**A backup isn't a recovery plan.**

A successful backup job doesn't necessarily mean you can recover your data.

Testing the restoration process helped establish that the replicated backups could actually be used.

**Keeping things simple.**

The solution didn't require a complicated infrastructure platform.

SQL Server Agent, PowerShell, SFTP, and a separate Linux machine were enough to build a practical backup and recovery process for our requirements.

### where things stand

Database backups now run on a defined schedule, copies are maintained on a separate machine, and recovery from a replicated backup has been successfully tested.

It's a relatively small piece of infrastructure work compared with building an entire application.

But it's one I'm glad doesn't depend on someone remembering to do it anymore.
