**A cloud-based web app that tracks user habit goals and encourages positive habitual behavior**
ASP.NET backend w/ PostgreSQL, TypeScript + React frontend, hosted on AWS.

Users input desired habits and log adherence to those habits on the app, which shall store this data in a cloud SQL-based backend. A Single Page Application (SPA) served by the backend communicates with it to read and write this data, which it then uses to present insights to the user and motivate positive adherence via systems like push notifications and streaks.

Backend and frontend shall communicate via an HTTP RESTful API, ensuring abstraction of implementation details between backend and frontend.

AWS Lightsail shall serve as the backend host, handling business logic and hosting the PostgreSQL database.
