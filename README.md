# ratmap

## About
This is a hackathon project whose prototype I built over the course of about four days. I've done a bit of maintenance since then, too.

## Technologies
#### Front-End
This started off in jQuery but I refactored to React-Redux for more feature scalability. I've found that my biggest technical challenge is dealing with such a huge dataset - I've crashed my browser more than once during development because I was trying to load too many table instances onto the page.

#### Back-End
The rat infestation inspection data comes from Open Data NYC, which is accessible via the Socrata Web API. Due to some still unknown reasons, certain API methods were not functioning properly for this dataset, so I had to write them instead as `.soql`, which essentially removes the abscraction from raw SQL.
It was great to review how those queries work. My Node server's primary function is to fetch data from the Socrata Web API, which eventually populates the Redux store.

## Future Direction
I'm working on incorporating more refined data visualization beyond just colored map markers. A heat map (and perhaps some graphs) seem fitting.
