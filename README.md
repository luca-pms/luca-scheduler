# Luca Scheduler

A cron-like scheduler that runs every morning at 12:01 AM to check for expiring rental agreements.

This is a companion project for [Luca](https://github.com/danielsprohar/Luca).

## Getting Started

Created a `.env` file at the root of the project with the following keys:

```
PGHOST=localhost
PGDATABASE=luca
PGUSER=replace_this_with_your_username
PGPASSWORD=replace_this_with_your_password
```

Next, install the dependency modules:

```
npm install
```

Once the installation is complete, you can start the server.

```
node server.js
```

That's it.