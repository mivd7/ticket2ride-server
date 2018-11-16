README for Ticket 2 Ride server:

This is the backend side of my tickets app, build with Typescript
and PostgreSQL. It uses KOA as web framework. This backend was designed for a ticket resale app, 
where users can buy and sell tickets for events & shows.

The DB contains four tables: each for a different feature in the app. These are:
events, tickets, comments, users. It uses restful API endpoints to create, update and
retrieve data inside the database. In addition to this, the users table in this db
is handled through Websockets, to monitor and authenticate currently logged in users.

The frontend side of this app was build with React/Redux and can be found seperately via this link:
http://github.com/mivd7/ticket2ride-client
