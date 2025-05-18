
export type Post = {
	title: string;
	slug: string;
	date: string;
	summary: string;
};

/**
 * All slugs
 */
const slugs: string[] = [
  "2022-11-20-multiplayer-tetris-game-part-4",
  "2022-11-11-multiplayer-tetris-game-part-3",
  "2021-01-24-multiplayer-tetris-game-part-2",
  "2020-12-13-multiplayer-tetris-game-part-1",
  "2019-02-05-creately-interview-question",
  "2018-09-05-debugging-rxjs-code",
  "2017-06-27-debugging-duplicate-click-events",
  "2017-05-17-fabricjs-performance-hack",
  "2017-01-25-getting-the-class-in-static-methods",
  "2017-01-09-running-async-tasks-sequentially",
  "2016-09-07-rant--javascript-import-syntax",
  "2016-07-13-transpiled-js-on-github",
  "2016-01-18-using-multiple-gopaths",
  "2016-01-03-masking-graphql-errors",
  "2015-10-17-github-repo-license-file",
  "2015-07-29-day-3--packages",
  "2015-07-28-day-2--built-in-features",
  "2015-07-27-day-1--getting-started",
  "2015-07-23-limit-go-benchmark-b-n",
  "2015-04-15-go-for-node-developers",
  "2014-10-11-errors-vs-bugs",
  "2014-09-08-isolated-testing",
  "2014-08-13-empty-function-shorthand",
  "2014-05-24-aggregation-for-firebase",
  "2014-05-02-organizing-files-in-meteor",
  "2014-05-02-another-hello-world-to-meteorjs",
  "2014-04-02-when-not-to-fork-on-github",
  "2014-03-29-elastic-iframes",
  "2014-03-28-setting-up-wingpanel-slim",
  "2014-03-27-create-an-empty-git-branch"
];

/**
 * All posts
 */
const posts: Post[] = [
  {
    "title": "Multiplayer Tetris Game (part 4)",
    "slug": "2022-11-20-multiplayer-tetris-game-part-4",
    "date": "2022-11-20",
    "summary": "This tutorial continues where we left off on part 3. We will add some tests to make sure the game is working as expected."
  },
  {
    "title": "Multiplayer Tetris Game (part 3)",
    "slug": "2022-11-11-multiplayer-tetris-game-part-3",
    "date": "2022-11-11",
    "summary": "This tutorial continues where we left off on part 2. We will split the code into multiple files to make it easier to maintain and implement a few more game rules."
  },
  {
    "title": "Multiplayer Tetris Game (part 2)",
    "slug": "2021-01-24-multiplayer-tetris-game-part-2",
    "date": "2021-01-24",
    "summary": "This tutorial validates the design we used to write code on part 1. We will try whether it's possible to fix bugs easily and whether we can add some new features to the game without major code/design changes."
  },
  {
    "title": "Multiplayer Tetris Game (part 1)",
    "slug": "2020-12-13-multiplayer-tetris-game-part-1",
    "date": "2020-12-13",
    "summary": "A tutorial about writing a multiplayer game from scratch. Starting from solidifying the requirements and continues all the way up to creating a working prototype with vanilla js."
  },
  {
    "title": "Solving Interview Problems",
    "slug": "2019-02-05-creately-interview-question",
    "date": "2019-02-05",
    "summary": "Sometimes, we get to solve programming questions on site during software engineering interviews. This is one of the questions I used to ask from candidates."
  },
  {
    "title": "Debugging RxJS code",
    "slug": "2018-09-05-debugging-rxjs-code",
    "date": "2018-09-05",
    "summary": "This are undocumented internal details of RxJS and it can break anytime. It probably would have changed by the time you're reading this blog post."
  },
  {
    "title": "Duplicate click events",
    "slug": "2017-06-27-debugging-duplicate-click-events",
    "date": "2017-06-27",
    "summary": "While trying to debug this issue, we found out a couple of interesting things about how Angular manages event handlers."
  },
  {
    "title": "FabricJS performance hack",
    "slug": "2017-05-17-fabricjs-performance-hack",
    "date": "2017-05-17",
    "summary": "The frame rate can be improved by only rendering inside a rAF callback."
  },
  {
    "title": "The class in static methods",
    "slug": "2017-01-25-getting-the-class-in-static-methods",
    "date": "2017-01-25",
    "summary": "This is useful when writing static methods which can be inherited by other classes. Here's an example."
  },
  {
    "title": "Async tasks sequentially",
    "slug": "2017-01-09-running-async-tasks-sequentially",
    "date": "2017-01-09",
    "summary": "Let's check this badly written example first. The sequence below will run each step asynchronously."
  },
  {
    "title": "Rant - JavaScript import syntax",
    "slug": "2016-09-07-rant--javascript-import-syntax",
    "date": "2016-09-07",
    "summary": "The import syntax on javascript looks damn ugly when many items from a module. Take this example piece of code form a typical GraphQL code."
  },
  {
    "title": "Transpiled JS on Github?",
    "slug": "2016-07-13-transpiled-js-on-github",
    "date": "2016-07-13",
    "summary": "If you're maintaining a javascript project on Github there's a good chance you're using a transpiler to convert it to a format usable be older platforms and to minify it."
  },
  {
    "title": "Using multiple GOPATHs",
    "slug": "2016-01-18-using-multiple-gopaths",
    "date": "2016-01-18",
    "summary": "Is it possible to use multiple directories as GOPATH and how does it behave when downloading packages or when importing go pacakges from code?"
  },
  {
    "title": "Masking GraphQL Errors",
    "slug": "2016-01-03-masking-graphql-errors",
    "date": "2016-01-03",
    "summary": "The way graphql-js and express-graphql handle errors is has some issues. Consider this example server which has a bug in a resolve function."
  },
  {
    "title": "Github repo license file",
    "slug": "2015-10-17-github-repo-license-file",
    "date": "2015-10-17",
    "summary": "I, like many other developers, always use Github to host my projects. And like most of them I thought all of  my public projects are by default open source."
  },
  {
    "title": "Day 3",
    "slug": "2015-07-29-day-3--packages",
    "date": "2015-07-29",
    "summary": "All go packages except packages from the standard library are placed inside the $GOPATH. A package consists of a set of go files in a directory."
  },
  {
    "title": "Day 2 - Built-in Features",
    "slug": "2015-07-28-day-2--built-in-features",
    "date": "2015-07-28",
    "summary": "This tutorial consists of a number of example go programs demonstrating each feature. It is recommended to try some of them on the Go playground or on your local machine."
  },
  {
    "title": "Day 1 - Getting Started",
    "slug": "2015-07-27-day-1--getting-started",
    "date": "2015-07-27",
    "summary": "The go playground is where go code can be run easily and fast therefore it makes an efficient place to try new go code. This also makes the playground useful when learning how to program with Go."
  },
  {
    "title": "Limit Go Benchmark b.N",
    "slug": "2015-07-23-limit-go-benchmark-b-n",
    "date": "2015-07-23",
    "summary": "Operations count (b.N) can be set inside the function to limit the number of operations Go benchmark does. But perhaps this is a sign there might be other issues."
  },
  {
    "title": "Go for Node developers",
    "slug": "2015-04-15-go-for-node-developers",
    "date": "2015-04-15",
    "summary": "I'm developing Node apps for years and started working with Go last month. So far, I like it as much as I like Node. So I hope to blog some quick tips about Go (aka Golang)."
  },
  {
    "title": "Errors vs. Bugs",
    "slug": "2014-10-11-errors-vs-bugs",
    "date": "2014-10-11",
    "summary": "One of the most important things I learned during past few months at  MeteorHacks is the difference between errors and bugs and how they  should be handled."
  },
  {
    "title": "Isolated Testing",
    "slug": "2014-09-08-isolated-testing",
    "date": "2014-09-08",
    "summary": "Just thought of sharing something about writing tests with JavaScript. Usually, it's best to keep tests simple and test just one thing per test."
  },
  {
    "title": "Empty Function Shorthand",
    "slug": "2014-08-13-empty-function-shorthand",
    "date": "2014-08-13",
    "summary": "JavaScript is an interesting language and so far my favorite. Maybe it's just me but I find stuff some people complain about javascript such as automatic semicolon insertion."
  },
  {
    "title": "Aggregation for Firebase",
    "slug": "2014-05-24-aggregation-for-firebase",
    "date": "2014-05-24",
    "summary": "Assume we need to create a realtime dashboard to show some summary values. Usually, with Firebase, we'll have to get all data to the client and process them there."
  },
  {
    "title": "Organizing files in Meteor",
    "slug": "2014-05-02-organizing-files-in-meteor",
    "date": "2014-05-02",
    "summary": "Starting hacking on a project with Meteor is lots of fun. But things can become a mess very easily. Meteor does not have too much restrictions on how to organize our project."
  },
  {
    "title": "‘Hello World' to MeteorJS",
    "slug": "2014-05-02-another-hello-world-to-meteorjs",
    "date": "2014-05-02",
    "summary": "In this tutorial, I'll try to walk you through building a simple realtime wall (like a guestbook) where anyone can post messages."
  },
  {
    "title": "When not to \"Fork\" on Github",
    "slug": "2014-04-02-when-not-to-fork-on-github",
    "date": "2014-04-02",
    "summary": "When I first started using Github, just like many others I simply  went ahead and forked each and every repository I liked on Github. But  this makes no sense at all."
  },
  {
    "title": "Elastic Iframes",
    "slug": "2014-03-29-elastic-iframes",
    "date": "2014-03-29",
    "summary": "Sometimes it become necessary to use iframes when building some web  applications. Often we have them hidden but sometimes iframes can be  useful visible too."
  },
  {
    "title": "Setting up wingpanel-slim",
    "slug": "2014-03-28-setting-up-wingpanel-slim",
    "date": "2014-03-28",
    "summary": "Elementary OS is one of the most beautiful operating systems I've  ever used. Usually I mod my OS extremely but for the first time, I left most of the OS defaults as is."
  },
  {
    "title": "Create an empty git branch",
    "slug": "2014-03-27-create-an-empty-git-branch",
    "date": "2014-03-27",
    "summary": "It's really easy to create a new empty git branch with no parents (AKA orphan branches). First create an orphan branch with this command."
  }
];

/**
 * Get post by slug
 */
export const getPost = (slug: string): Post | undefined => {
  return posts.find((post) => post.slug === slug);
};

/**
 * Get all posts
 */
export const getPosts = (): Post[] => {
  return posts;
};

/**
 * Get all slugs
 */
export const getSlugs = (): string[] => {
  return slugs;
};
