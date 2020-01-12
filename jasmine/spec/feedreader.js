/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         /* This is test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined and not empty', function() {
            for(const feed of allFeeds){
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);}
        });

        /*This is test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name is defined and not empty', function() {
           for(const feed of allFeeds){
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);}
        });
    });

        /* This is a new test suite named "The menu" - This suite is all about the menu
          and menu icon and thier visibility in our application.
        */
    describe('The menu', function() {
        /* This is test ensures the menu element is
         * hidden by default.
         */
        it('The menu element is hidden', function() {

            expect(document.querySelector('body').classList).toContain('menu-hidden');
        });


        /* This is test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('The menu changes visibility', function() {
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList).not.toContain('menu-hidden');
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList).toContain('menu-hidden'); 

        });
          
    });

        /* This is a new test suite named "Initial Entries" - This suite is all about the feed
          after the loadFeed function is called and completes its work.
        */
    describe('Initial Entries', function() {
        /*This is test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        
        beforeEach(function(done){/* use beforeEach function to call the loadfeed() before run the test */

          loadFeed(0,function(){
            done();
          });

        });

        it('There is a feed', function(done) {//check if the length of feed is graater than 0 to ensure that it has at least a feed
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
          
    });
   
        /* This is a new test suite named "New Feed Selection" - This suite is all about the feed
          after it selected.
        */
    describe('New Feed Selection', function() {
       /*This is test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let feed1,feed2;
        beforeEach(function(done){/* use beforeEach function to call the loadfeed() before run the test */
          loadFeed(0, function() { 
             feed1= document.querySelector('.feed').innerHTML;
                loadFeed(2, done); // I use this way from https://github.com/aviaryan/ud-feed-reader-testing/blob/master/jasmine/spec/feedreader.js 
            });
        });

        it('The feed is changed', function(done) {
            //compare two feed before and after the selection
            feed2=document.querySelector('.feed').innerHTML;
            expect(feed2).not.toBe(feed1);
            done();
        });
          
    });

}());
