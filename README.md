### What tech stack or technologies was used in creating this project?
- This Project was created using vanilla JS for functionality (animation/retrieving data using api) as well as styling tools: Sass and Bootstrap.

### Talk about some of the features this app has and what is the main purpose of this app?
- User would load up the site asked permission to use their lcoation if accepted thier location would be dipslayed along side the current time.
  Added a little fun feature of displaying quotes from famous philophisors. New quotes are illustrated each time user reloads the page or clicks on refresh button.
  Arbitron will alter respective to period of the day from 'Morning', 'Afternoon', 'Evening' to 'Night'.
  Icon next to Arbitron will change from moon to sun icon depending on if its night or day.
  More button slides page up and box will appear with more details regarding day of week, day of year, week of year, etc. CDN GSAP used for animation.
  Background image will display light image during day and change to dark image at night.
  This app is also responsive for tablet and mobile usage.

### Did you come across any obstacles and how did you handle it?
- Had issue displaying users location after using their latitude and longitude.
  First attempt at a solution was using google maps api. Whilst i was successful in retrieving user location using this api 
  i was not able to follow through second time round.
  Luckily i came across another api called locationIQ which had a very easy to read and understand documentation.
  Using this new found api i was able to display the users location details.

### What is one take away from this project?
-  When working with api's if one api does not give you status of 200 in retrieving data there is always an alternative that will work.
   My abiity to style pages using framework such as bootstrap is improving and the time taken to styles these pages is descending.
   Becoming comfortable using external api, successfully retrieving data and displaying using the async/fetch approach.

### What is one way you could improve this project if you spend more time on it?
-  Need to learn and find way to improve site speed. Load up takes some time especially
   areas on the page which are awaiting data from external source.
   Have setting icon where if clicked on would pop up with modal where you can alter your location
   having chosen new location new fetch request would be made to api and new data would displayed.
