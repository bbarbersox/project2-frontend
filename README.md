# project2-frontend - Community Activities Full Stack Web App
Project Frontend files - index.html, app/app.js and assets/login.css and a couple of bootstrap files.

Overall theme of web site was to create a web app (front end and back end, utilizing api interfaces on
on front end and back end that allowed users (staff) to register, login and create, query, update and delete 
community activities for the residents of an adult residential property or properties.  As the web site
there would be other users (house manager) who would perform the same create, read, update, and delete the residential 
properties ofthe site.  Initially the web site was going to support the property (house) managers and staff and 
in future releases evolve to support other users (such a parents, caregivers, etc).  As the time to implement the
project shortened the scope was scaled back until was attempting just some basic activity management.  Even 
property management activities were only partially developed and deployed.

Users and User Models
for Community Activities full stack Web App

Users
House Manager
Staff
Parents, Guardians, other concerned caregivers
House residents

Use Cases (house manager)
Create a new Community Activity 
for the entire house, or
or for a subset of individuals

Modify/update a Community Activity

Display a list of all Community Activities 
for the House
for the day
for the week

Display a list of Community Activities 
for an individual
for a day
for a week
for a month

Display days without a Community Activity scheduled

Delete a community activity

Communicate to staff whenever 

Use Cases (staff)
Display a list of all Community Activities 
for the House
for the day
for the week

Display a list of Community Activities 
for an individual
for a day
for a week
for a month

Update a Community Activity
w/ status (complete), feedback on activity, provider staff, resident approval/disapproval, overall rating

Communicate to House Manager regarding new Community Activity (via email, chat, blog - ???)

Use Cases (parents, guardians, other care givers)
Display a list of all Community Activities  (only if their “child” ????)
for the House
for the day
for the week

Display a list of Community Activities 
for an individual
for a day
for a week
for a month

Communicate to House Manager regarding new Community Activity (via email, chat, blog - ???)
----  end of use cases section  -------

Three simple wire frames were developed to display registration, login, and property/community management functions.

The original data models were to consist of 3 tables: Community Activities, Residential Properties and a join
table called Booked Activities.  This was switched early on to have users as the join table & not implement the
booked activities untila future release.

The format of the 3 tables were:
  Community Activities (many of the fields below were removed for phase 1)
   id	title	provider	date_of_activity	length	status	provider_services	residents staisfaction	comments	overall rating
   
  Property Management Table
  id	name	no	street	city	state	zip code	property_mgmt_co	manager
  
  Booked Activities
  ID	attended	house_id	activty_id

The backend portion of the web site was to be built in ruby and rails and was to be hosted on Heroku. The front end 
was to be hosted on gh-pages.

Attempted to create a single webpage where different sections of the page were displayed or hidden 
based on what the user had done.  Initial page contents to display was login page.  If user had not yet 
registered, they clicked a button that would hide login & desplay registration section of page.  Once logged, 
depending on user authentication would determine the functions a user was allow access to perform.  Without 
additional authentication capability, this was slated to a future release and all logged in users would have access
to all property and community activity functionality.

Design of front end was to utilize bootstrap framework and handlebars, although both those components of the initial
implementation were very partial and incomplete (i.e. handlesbars was only impelmented list all properties functions 
and even that was not formatted properly.  Bootstrap implementation, other tham registration and login page, was not
standard and haphazard - more time was needed for using bootstrap on propoerty and community management pages.  The 
entire layout of property and activity was cobbled together at the end.  Struggled with getting the data out of json
format and structured to be displayed nicely on the page, via tables or forms.  Also getting data from forms and
packaged into json for the api calls was difficult.

The back end (consisiting of routes, controllers, and models) went well.  There were a number of migrations and
tweaks to get the initial data structure setup.  And adjustments were made as the project progressed.  Most of the
backend work was done early in the project and then the front end work began.  While this seemed a good approach it
left far too little for the front end work.  Also should have kept my tables much simpler for first phase of the
project and spent more time on understanding how better to utilize the join table for search & updates of 
property and activity management.  Did run into some issues with using parameters and future phases would be to utilize 
search functionality and the backend find parameters.  Was able to get the backend code onto Herouku for hosting.

The final result was a site that needs asthetic attention (certainly on property and community managementfunctions and
the better displaying of information onto the page.  Searcha nd querying of information onto the page needs serious
upgrades.  Basic create, read (all and single rows) and update functionality works most of the time.  Record delete
is not working at this time.






