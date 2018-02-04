$(document).ready(function(){

  function getQuote(){
    
    var quotes = ["\"The difference between successful people and others is how long they spend time feeling sorry for themselves.\"", "\"Don’t be intimidated by what you don’t know. That can be your greatest strength and ensure that you do things differently from everyone else.\"", "\"Option A is not available. So let’s kick the sh** out of option B.\"", "\"Dear optimist, pessimist, and realist -- while you guys were busy arguing about the glass of wine, I drank it! Sincerely, the opportunist!\"", "\"If we can learn to deal with our discomfort and just relax into it we'll have a better life.\"", "\"Aerodynamically the bumblebee shouldn’t be able to fly, but the bumblebee doesn’t know that so it goes on flying anyway.\"", "\"Life-fulfilling work is never about the money -- when you feel true passion for something, you instinctively find ways to nurture it.\"", "\"If you are successful, it is because somewhere, sometime, someone gave you a life or an idea that started you in the right direction. Remember also that you are indebted to life until you help some less fortunate person, just as you were helped.\"", "\"My parents ingrained in me early on that the perfect score is always something to strive for. I want to win and I want to succeed no matter what.\"", "\"We need to accept that we won’t always make the right decisions, that we’ll screw up royally sometimes -- understanding that failure is not the opposite of success, it’s part of success.\"", "\"People respond well to those that are sure of what they want.\"", "\"Whatever it is that you think you want to do, and whatever it is that you think stands between you and that, stop making excuses. You can do anything.\"", "\"Leadership is the ability to guide others without force into a direction or decision that leaves them still feeling empowered and accomplished.\"", "\"As a leader, it's a major responsibility on your shoulders to practice the behavior you want others to follow.\"", "\"I never dreamed about success. I worked for it.\"", "\"One of the most important things I have learned is that businesses don't fail, entrepreneurs give up. Now sometimes, giving up is the right decision. But usually you just need to dig in and figure out how to make things better. Remember: Every day is a new opportunity to get up and do it better than yesterday!\"", "\"Your job as leader is to stay as close in touch as possible with those closest to the action.\"", "\"Find the smartest people you can and surround yourself with them.\"", "\"It was a risk. I had my husband and I was pregnant with my oldest son. But I don't look at risk the way other people do. When you're an entrepreneur, you have to go in feeling like you're going to be successful.\"" ];
    
    var author = ["- Barbara Corcoran, 'Shark Tank' investor", "- Sara Blakely, Founder of Spanx", "- Sheryl Sandberg, COO of Facebook", "- Lori Greiner, 'Shark Tank' investor", "- Melody Hobson, President of Ariel Investments", "- Mary Kay Ash, Founder of Mary Kay Cosmetics", "- Eileen Fisher, fashion designer", "- Melinda Gates, Co-founder of the Bill & Melinda Gates Foundation", "- Andrea Jung, former CEO of AVON and President of Grameen America", "- Arianna Huffington, Editor-in-chief of the Huffington Post", "- Anna Wintour, Editor-in-chief of American Vogue", "- Katia Beauchamp, Co-founder and CEO of Birchbox", "- Lisa Cash Hanson, Snuggwugg CEO", "- Himanshu Bhatia, Founder and CEO of Rose International", "- Estee Lauder", "- Adda Birnir, Founder and instructor of Skillcrush", "- Kat Cole, President of Focus Brands", "- Marissa Meyer, CEO of Yahoo!", "- Lillian Vernon, Founder of Lillian Vernon Corporation"];
    
    var randomNum = Math.floor((Math.random()*quotes.length));
    var randomQuote = quotes[randomNum];
    var randomAuthor = author[randomNum];
    
    $(".quote").hide().fadeIn(1000).html(randomQuote);
    $(".author").html(randomAuthor);
    
        }
  
    $("#newquote").on("click", function() {
      getQuote();
    });
     $("#tweet").on("click", function(){
      var tweetQuote = $(".quote").text() + $(".author").text();   window.open("https://twitter.com/intent/tweet?text=" + tweetQuote); 
  });
     
 });