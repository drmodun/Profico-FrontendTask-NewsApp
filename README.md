# Profico-FrontendTask-NewsApp
The profico frontend task given after the intial screening interview. Due to being unable to work as a high schooler it is just a demonstration of skill rather than a project for work. Feedback is greatly appreciated!
<h1>MyNews</h1>
<p>Here is some basic info about the project and instructions on how to use the app and its setup</p>
<h2>Setup</h2>
<p>To setup the project you need to type the following commands in the terminal upon opening the repo</p>
<pre>
<code>cd ./my-news</code>
<code>npm install</code>
<code>npm start</code>
</pre >
<p>After typing in theese commands the app should compile and soon it will open in your default browser. As far as I am aware there should not be any other actions required for the setup of the app</p>
<p>The app will run on most modern browsers, but I used chrome to test it so I can guareantee it works there (of course relatively recent versions)</p>
<p>In case you run into any problems setting up or running the app feel free to contact me at <b>jan.modun.st@gmail.com</b></p>
<h2>How to use the app</h2>
<p>This app is a small simulation of a news app, it uses the news feed of New York Times to get the most recent news. Then it groups the news into categories and sorts them by recency. There is also the option for the user to bookmark an article and have it appear under the <i>Favourites</i> category. The app consists of a menu where you can choose the category you want to see, an article feed of the most recent relevant articles and a latest news feed which shows news for that category chronologically ordered (there are a lot less articles than news and they have a different structure).
<h2>Technical info and decisions</h2>
<h3>Tecnology used</h3>
<p>The technology used to develop this app is React (create-react-app specifically) and coded in typescript. For defining styles SCSS was used.
<h3>Api and calls</h3>
<p>I decided to use the NYT Api since the other api that was at suggested in the task did not work (at the time of development every sign up attempt would result in a status code 500 error). While the Api is pretty decent in terms of content, it has the problem of requiering CORS, which means that all frontend requests would fail unless they were of the same origin as them. This required the use of third party cors proxies, and after experimenting with a few of them I decided to use <a href="https://corsproxy.io/">https://corsproxy.io/</a> since it was always up and free to use. However this means that the app may sometimes be unstable and may depend on third party software, so I gave an alternative cors in the comments of the code.
<h3>Performance</h3>
<p>As in terms of performance, I decided that for this app it was more than sufficient to just call the api four times (get all articles for the last 4 months) at startup rather than dynamically call the api when the app runs out of articles. While this may cause the app to get content a bit later, it performs great for the rest of its use</p>
<p>
<h3>Categories</h3>
The categories are just a bunch of buttons in a flexbox which change the filter setting of the articles, so nothing special, the only problem was making all icons change and actually finding the categories to use as the given categories were not all present in NYT.
</p>
<h3>Articles</h2>
<p>The articles themselves consist of a picture, which is the thumbnail of the article, title, category and author. Overall some style tricks had to be used to do it but nothing too difficult. It was a bit of a hurdle to make the article list behave the way that was required in the design, as the last colunmn of the first two rows of articles had to be the latest-news container. This (after a bit od trial and error) was done by some grid tricks. Also for performance sake I set up  limit of 40 for the article amount, but cycling quickly through large categories might cause the app to lag a bit</p>
<h3>Latest news</h3>
The latest news container was a very interesting part of the project. the news themselves are pretty simple, just small boxes with a divier, date and title. However they had to be in an infinite scrolling container, which is a new concept to me. I am pretty happy with how it turned out, but the performance and the <u>infinity</u> of the container slightly depends on the size of the catgegory, but for most of them it should seem infinite.
<h2>Design decisions and differences</h2>
<p>For this app we were actually given the full desktop and mobile design on figma which made the development noticably easier. I am happy to say that I believe that the large majority of my app is in accordance with the deisgn, and that the only real differences are most likely small innacurracies in some values (such as color or margins or a missing box shadow).
<h3>Bookmark design decision</h3>
As a part of the task we had to think of a way to implement a way to bookmark articles and for them to have its dedicated space. I decided to add a small bookmark icon on the right of the title of articles (only the featured articles, I decided to not put bookmarks on news because it would look too cramped). I also added the icon to the category selector and treated it like a normal category. I believe that this was an efficient way to implement bookmarking because it is not too in your face while still being pretty visible and recognisable. There may be a dillema wether to just put these articles at the homepage instead of treating it like a category, but I think that it makes more sense to treat it like a category as the user will see new news any time they start the app instead of seeing just their liked ones. Of course, the user can access the articles they bookmarked at any time they want, and the distincion between bookmarked and normal articles is pretty clear.
<h2>Closing note</h2>
<p>Overall I think that this was a pretty good project and a great task to estimate someones frontend skills. Considering that both SCSS and typescript are relatively new concepts for me (I only had javascript React projects until now), and my relaitve lack of experience, I am happy with the result. Of course, this does not mean that there are no mistakes. My code in undoubtedly not the tidiest, some things could have been done more simply, some implementations more efficiently and even the responsivity itself needs some work (the app should now break on most normal desktop and mobile resolutions, but it may look a bit weird). Any feedback is greatly appreciated and I must thank Profico for giving me a technical task and materials to learn even though it is not possible for me to work there. I am hoping to get into the Profico Academy course and suggest it to everyone trying to hone there backend or frontend skills.
