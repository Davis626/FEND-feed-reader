/*
 * feedreader.js - This is the spec file that Jasmine will read and contains all of the tests
 */

/*
 * All of tests are placed within the $() function, to ensure they don't run until the DOM is ready
 */

$(function() {

    /*
     * Test suite about the RSS feeds definitions, the allFeeds variable in our application
     */

    describe('RSS Feeds', function() {

        /*
         * Test to make sure that the allFeeds variable has been defined and that it is not empty
         */

        it('allFeeds variable is defined and not empty', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * Test loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty
         */

         it('URL is defined and not empty', () => {
           allFeeds.forEach((feed) => {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });


        /*
         * Test loops through each feed in the allFeeds object and ensures it has a name defined and the name is not empty
         */

         it('feed name is defined and not empty', () => {
           allFeeds.forEach((feed) => {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /*
     * Test suite about the menu
     */

    describe('The Menu', () => {

         /*
          * Test ensures that the menu element is hidden by default
          */

         //Menu visibilty is determined by <body> class named 'menu-hidden'; test checks if the body contains the class 'menu-hidden'

         let body = document.body;

         it('menu element is hidden by default', () => {
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /*
          * Test checks if the visibilty of the menu changes when clicked
          */

          //Menu visibilty is determined by <body> class named 'menu-hidden'; test checks if the body contains the class 'menu-hidden' when clicked and when clicked again

          let menuIcon = document.querySelector('.menu-icon-link');

          it('menu is displayed when clicked and hidden when clicked again', () => {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
    });

    /*
     * Test suite about the initial entries
     */

    describe('Initial Entries', () => {

         /*
          * Test ensures that there is at least a single .entry element within the .feed container after loadFeed() is completed
          * IMPORTANT! loadFeed() is asynchronous, so test require the use of Jasmine's beforeEach and asynchronous done() function
          */

         // done is passed in as an argument to the beforeEach function; loadFeed() starts with "0", runs and completes working

         beforeEach((done) => {
           loadFeed(0, () => {
             done();
           });
         });

        // After loadFeed() is called and completed, the test checks if there is at least a single .entry element inside

        it('after loadFeed() is called there is at least a single .entry element within the .feed container', ((done) => {
          let lengthEntries = document.querySelector('.feed').getElementsByClassName('entry').length;
          expect(lengthEntries).toBeGreaterThan(0);
          done();
        }));
   });

   /*
    * Test suite about the new feed selection
    */

    describe('New Feed Selection', () => {


         /*
          * Test checks if the content actually changes when a new feed is loaded
          */

         // Tests loads 2 new feed sets and compare them, to see if the content has actually changed

         let oldFeeds;
         let newFeeds;

         beforeEach((done) => {
           loadFeed(0, () => { //load first feed set
             oldFeeds = document.querySelector(".feed").innerHTML;
             loadFeed(1, () => { //load second feed set
               newFeeds = document.querySelector(".feed").innerHTML;
               done();
           });
         });
       });

       // Expactation for comparing the feeds

       it('content changes when a new feed is loaded', ((done) => {
         expect(oldFeeds).not.toEqual(newFeeds);
         done();
       }));
     });

}());
