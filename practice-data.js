/* VOA Let's Learn English Level 1 · 52-lesson conversation excerpts.
   Source: VOA Learning English, Let's Learn English Level 1 Lesson Plans (public domain VOA originals).
   https://learningenglish.voanews.com/a/6220041.html
   Scenario prompts marked adapted are learning exercises, not verbatim VOA dialogue.
   PDF #page fragments may be ignored by some mobile PDF viewers. */
const COURSE_PDF = "https://docs.voanews.eu/en-us-learn/2021/09/09/fccd8340-337b-4d24-a750-f90c6d2d5843.pdf";
const PRACTICE_DATA = [
  {
    "id": 1,
    "page": 7,
    "cloze": {
      "line": "Nice to meet you.",
      "word": "meet",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Are you Anna?",
      "speaker": "Pete",
      "replySpeaker": "Anna",
      "example": "Yes! Hi there!",
      "adapted": false
    }
  },
  {
    "id": 2,
    "page": 15,
    "cloze": {
      "line": "Remember to call Marsha at work.",
      "word": "call",
      "speaker": "Pete"
    },
    "scene": {
      "prompt": "Where are you from?",
      "speaker": "Jonathan",
      "replySpeaker": "Anna",
      "example": "I am from a small town.",
      "adapted": false
    }
  },
  {
    "id": 3,
    "page": 25,
    "cloze": {
      "line": "I want to find a supermarket.",
      "word": "supermarket",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Is this 555-8986?",
      "speaker": "Anna",
      "replySpeaker": "Man",
      "example": "No. This is 555-8689.",
      "adapted": false
    }
  },
  {
    "id": 4,
    "page": 37,
    "cloze": {
      "line": "The new apartment is great!",
      "word": "apartment",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Anna, do you have a pen?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "Yes. I have a pen in my bag.",
      "adapted": false
    }
  },
  {
    "id": 5,
    "page": 49,
    "cloze": {
      "line": "We relax in the living room.",
      "word": "living",
      "speaker": "Marsha"
    },
    "scene": {
      "prompt": "Where is Marsha?",
      "speaker": "학습 상황",
      "replySpeaker": "나",
      "example": "She is at her friend’s house.",
      "adapted": true
    }
  },
  {
    "id": 6,
    "page": 60,
    "cloze": {
      "line": "The gym is across from the lounge.",
      "word": "across",
      "speaker": "Pete"
    },
    "scene": {
      "prompt": "Where is the gym?",
      "speaker": "Anna",
      "replySpeaker": "Pete",
      "example": "The gym is across from the lounge.",
      "adapted": false
    }
  },
  {
    "id": 7,
    "page": 72,
    "cloze": {
      "line": "No, I’m reading for my show.",
      "word": "reading",
      "speaker": "Amelia"
    },
    "scene": {
      "prompt": "What are you doing?",
      "speaker": "Anna",
      "replySpeaker": "Jonathan",
      "example": "I am doing my show!",
      "adapted": false
    }
  },
  {
    "id": 8,
    "page": 82,
    "cloze": {
      "line": "Every day I do my morning show.",
      "word": "morning",
      "speaker": "Anne"
    },
    "scene": {
      "prompt": "Are you busy?",
      "speaker": "Anna",
      "replySpeaker": "Amelia",
      "example": "I’m a little busy.",
      "adapted": false
    }
  },
  {
    "id": 9,
    "page": 90,
    "cloze": {
      "line": "So, every day I check the forecast.",
      "word": "forecast",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Is it windy today?",
      "speaker": "Anna",
      "replySpeaker": "Phone",
      "example": "No, it is not windy today.",
      "adapted": false
    }
  },
  {
    "id": 10,
    "page": 100,
    "cloze": {
      "line": "Then at the bus station turn left.",
      "word": "left",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Where is your apartment?",
      "speaker": "Ashley",
      "replySpeaker": "Anna",
      "example": "My apartment is near the Columbia Heights Metro.",
      "adapted": false
    }
  },
  {
    "id": 11,
    "page": 110,
    "cloze": {
      "line": "It is on this street on the corner.",
      "word": "corner",
      "speaker": "Marsha"
    },
    "scene": {
      "prompt": "Where is the library?",
      "speaker": "Anna",
      "replySpeaker": "Marsha",
      "example": "It is on this street on the corner.",
      "adapted": false
    }
  },
  {
    "id": 12,
    "page": 120,
    "cloze": {
      "line": "This is my mother and this is my father.",
      "word": "mother",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Do you want to talk about it?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "Sure! I have some photos.",
      "adapted": false
    }
  },
  {
    "id": 13,
    "page": 130,
    "cloze": {
      "line": "It’s a big birthday party for the writer William Shakespeare.",
      "word": "birthday",
      "speaker": "Rebecca"
    },
    "scene": {
      "prompt": "What is going on here?",
      "speaker": "Anna",
      "replySpeaker": "Rebecca",
      "example": "It’s a big birthday party for the writer William Shakespeare.",
      "adapted": false
    }
  },
  {
    "id": 14,
    "page": 139,
    "cloze": {
      "line": "But I don’t know what clothes to wear.",
      "word": "clothes",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "How about jeans and a t-shirt?",
      "speaker": "Anna",
      "replySpeaker": "Genie",
      "example": "No! Jeans and a t-shirt are too casual.",
      "adapted": false
    }
  },
  {
    "id": 15,
    "page": 150,
    "cloze": {
      "line": "I like to watch people walking by.",
      "word": "watch",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Are you returning to work?",
      "speaker": "Ashley",
      "replySpeaker": "Anna",
      "example": "I still have time.",
      "adapted": false
    }
  },
  {
    "id": 16,
    "page": 161,
    "cloze": {
      "line": "Thank you for your time, Sabrina!",
      "word": "time",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Do you have time for an interview?",
      "speaker": "Anna",
      "replySpeaker": "Sabrina",
      "example": "Sure, I have time.",
      "adapted": false
    }
  },
  {
    "id": 17,
    "page": 174,
    "cloze": {
      "line": "Playing board games is fun, too!",
      "word": "games",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What’s going on?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "Not much. How about you?",
      "adapted": false
    }
  },
  {
    "id": 18,
    "page": 184,
    "cloze": {
      "line": "A new book is very popular with children and families.",
      "word": "popular",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What do we read in the news?",
      "speaker": "학습 상황",
      "replySpeaker": "나",
      "example": "We are always reading facts.",
      "adapted": true
    }
  },
  {
    "id": 19,
    "page": 198,
    "cloze": {
      "line": "I always ride the Metro to work.",
      "word": "always",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "When do I start?",
      "speaker": "Anna",
      "replySpeaker": "Caty",
      "example": "You start next month.",
      "adapted": false
    }
  },
  {
    "id": 20,
    "page": 213,
    "cloze": {
      "line": "You can make tons of money writing code.",
      "word": "code",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "So, what’s wrong?",
      "speaker": "Anna",
      "replySpeaker": "Pete",
      "example": "I don’t have a job.",
      "adapted": false
    }
  },
  {
    "id": 21,
    "page": 226,
    "cloze": {
      "line": "Sorry, I can’t come with you.",
      "word": "can’t",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Can you come with me?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "Sorry, I can’t come with you.",
      "adapted": false
    }
  },
  {
    "id": 22,
    "page": 239,
    "cloze": {
      "line": "My favorite season is summer because of summer vacation!",
      "word": "summer",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "So, what are we going to talk about on the first show?",
      "speaker": "Amelia",
      "replySpeaker": "Anna",
      "example": "I want to talk about summer vacation.",
      "adapted": false
    }
  },
  {
    "id": 23,
    "page": 253,
    "cloze": {
      "line": "Today I’m having lunch with my boss.",
      "word": "lunch",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "So, where is this world food restaurant?",
      "speaker": "Anna",
      "replySpeaker": "Caty",
      "example": "We’re not eating at a restaurant.",
      "adapted": false
    }
  },
  {
    "id": 24,
    "page": 264,
    "cloze": {
      "line": "It was a festival -- a big festival!",
      "word": "festival",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What are you writing?",
      "speaker": "학습 상황",
      "replySpeaker": "나",
      "example": "I am writing a letter to my friend.",
      "adapted": true
    }
  },
  {
    "id": 25,
    "page": 276,
    "cloze": {
      "line": "I know I should be more careful.",
      "word": "careful",
      "speaker": "Dan"
    },
    "scene": {
      "prompt": "What kind of game?",
      "speaker": "Anna",
      "replySpeaker": "Dan",
      "example": "You have to find things that aren’t really there.",
      "adapted": false
    }
  },
  {
    "id": 26,
    "page": 287,
    "cloze": {
      "line": "Abraham Lincoln was a great wrestler!",
      "word": "wrestler",
      "speaker": "Voice"
    },
    "scene": {
      "prompt": "Did you find any symbols?",
      "speaker": "Dan",
      "replySpeaker": "Anna",
      "example": "Yes, I found three and won 120 points!",
      "adapted": false
    }
  },
  {
    "id": 27,
    "page": 297,
    "cloze": {
      "line": "I can’t come to work today.",
      "word": "work",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Do you have a sore throat?",
      "speaker": "Dr. Bennett",
      "replySpeaker": "Anna",
      "example": "Yes. I have a sore throat.",
      "adapted": false
    }
  },
  {
    "id": 28,
    "page": 309,
    "cloze": {
      "line": "When I’m nervous, I talk to myself.",
      "word": "nervous",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Why are you talking to yourself?",
      "speaker": "John",
      "replySpeaker": "Anna",
      "example": "I am a little nervous.",
      "adapted": false
    }
  },
  {
    "id": 29,
    "page": 321,
    "cloze": {
      "line": "Today was a busy day at work.",
      "word": "busy",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "How are you these days?",
      "speaker": "Anna",
      "replySpeaker": "Marsha",
      "example": "I’m really busy too, Anna.",
      "adapted": false
    }
  },
  {
    "id": 30,
    "page": 333,
    "cloze": {
      "line": "I work outside by the river.",
      "word": "river",
      "speaker": "Pete"
    },
    "scene": {
      "prompt": "Can you help me?",
      "speaker": "Anna",
      "replySpeaker": "Pete",
      "example": "Sure! What do you need?",
      "adapted": false
    }
  },
  {
    "id": 31,
    "page": 345,
    "cloze": {
      "line": "A taxi is faster than a bus.",
      "word": "faster",
      "speaker": "Jonathan"
    },
    "scene": {
      "prompt": "Where are you going?",
      "speaker": "Jonathan",
      "replySpeaker": "Anna",
      "example": "I am taking a bus to a Nationals baseball game!",
      "adapted": false
    }
  },
  {
    "id": 32,
    "page": 357,
    "cloze": {
      "line": "That is a good place to learn how to ski.",
      "word": "learn",
      "speaker": "MINDY"
    },
    "scene": {
      "prompt": "What is the show about?",
      "speaker": "Coworker 2",
      "replySpeaker": "Anna",
      "example": "It’s a children’s show.",
      "adapted": false
    }
  },
  {
    "id": 33,
    "page": 370,
    "cloze": {
      "line": "She wants to learn about baseball.",
      "word": "baseball",
      "speaker": "Announcer"
    },
    "scene": {
      "prompt": "Hello, MINDY?",
      "speaker": "Anna",
      "replySpeaker": "MINDY",
      "example": "Hello, Anna.",
      "adapted": false
    }
  },
  {
    "id": 34,
    "page": 379,
    "cloze": {
      "line": "Children and adults wear costumes and go to parties!",
      "word": "costumes",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What do you need?",
      "speaker": "Genie",
      "replySpeaker": "Anna",
      "example": "Tonight, there is a Halloween party.",
      "adapted": false
    }
  },
  {
    "id": 35,
    "page": 390,
    "cloze": {
      "line": "In fact, tonight Marsha and I are cooking for friends.",
      "word": "cooking",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Do you have the shopping list?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "Yes, I told you: I have the shopping list.",
      "adapted": false
    }
  },
  {
    "id": 36,
    "page": 402,
    "cloze": {
      "line": "I put the flour inside the refrigerator.",
      "word": "flour",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Anna, where is the flour?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "I put the flour inside the refrigerator.",
      "adapted": false
    }
  },
  {
    "id": 37,
    "page": 412,
    "cloze": {
      "line": "I’m from a small town in the country.",
      "word": "country",
      "speaker": "Phil"
    },
    "scene": {
      "prompt": "So, do you like living in the country or in the city?",
      "speaker": "Phil",
      "replySpeaker": "Anna",
      "example": "I like to live in the city.",
      "adapted": false
    }
  },
  {
    "id": 38,
    "page": 423,
    "cloze": {
      "line": "I am really happy to see you!",
      "word": "happy",
      "speaker": "Penelope"
    },
    "scene": {
      "prompt": "Is your rent expensive?",
      "speaker": "Penelope",
      "replySpeaker": "Anna",
      "example": "Well, I have a roommate.",
      "adapted": false
    }
  },
  {
    "id": 39,
    "page": 434,
    "cloze": {
      "line": "I am tired of my untidy hair.",
      "word": "untidy",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Are you tired of your untidy hair?",
      "speaker": "Pete",
      "replySpeaker": "Anna",
      "example": "Yes. Yes, I am.",
      "adapted": false
    }
  },
  {
    "id": 40,
    "page": 448,
    "cloze": {
      "line": "I want to be an actor on the stage!",
      "word": "actor",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What is your name?",
      "speaker": "Director",
      "replySpeaker": "Anna",
      "example": "My name is Anna Matteo.",
      "adapted": false
    }
  },
  {
    "id": 41,
    "page": 460,
    "cloze": {
      "line": "If you look at this chart, you will see something good.",
      "word": "chart",
      "speaker": "Ms. Weaver"
    },
    "scene": {
      "prompt": "So, Anna, do you understand what I want?",
      "speaker": "Ms. Weaver",
      "replySpeaker": "Anna",
      "example": "Yes, Ms. Weaver.",
      "adapted": false
    }
  },
  {
    "id": 42,
    "page": 473,
    "cloze": {
      "line": "Guy, I was minding my own business.",
      "word": "business",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Anna, what did you see and what happened to your arm?",
      "speaker": "Guy",
      "replySpeaker": "Anna",
      "example": "Guy, I was minding my own business.",
      "adapted": false
    }
  },
  {
    "id": 43,
    "page": 487,
    "cloze": {
      "line": "I’m stuck downtown without any money.",
      "word": "downtown",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What’s up?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "I’m stuck downtown without any money.",
      "adapted": false
    }
  },
  {
    "id": 44,
    "page": 498,
    "cloze": {
      "line": "But I know I should eat healthy food.",
      "word": "healthy",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What was that?",
      "speaker": "Ashley",
      "replySpeaker": "Anna",
      "example": "I’m hungry.",
      "adapted": false
    }
  },
  {
    "id": 45,
    "page": 508,
    "cloze": {
      "line": "So, we are going on a road trip together!",
      "word": "trip",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Did you make a list of all the places you want to see?",
      "speaker": "Marsha",
      "replySpeaker": "Anna",
      "example": "I did. I want to see New York City and the Statue of Liberty!",
      "adapted": false
    }
  },
  {
    "id": 46,
    "page": 521,
    "cloze": {
      "line": "I’ll just have to borrow a couple of things.",
      "word": "borrow",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Can I borrow your scissors?",
      "speaker": "Anna",
      "replySpeaker": "Jonathan",
      "example": "Yes, I can lend them to you, but you must return them.",
      "adapted": false
    }
  },
  {
    "id": 47,
    "page": 532,
    "cloze": {
      "line": "Right now, I am fixing my car.",
      "word": "fixing",
      "speaker": "Pete"
    },
    "scene": {
      "prompt": "Pete, can you fix a car yourself?",
      "speaker": "Anna",
      "replySpeaker": "Pete",
      "example": "Well, Anna, last night I was watching the online video course, “You CAN Fix a Car Yourself!”",
      "adapted": false
    }
  },
  {
    "id": 48,
    "page": 546,
    "cloze": {
      "line": "I have lived in Washington, D.C.",
      "word": "lived",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Have you ever seen sculptures in a garden?",
      "speaker": "Anna",
      "replySpeaker": "Jean",
      "example": "I have never seen a garden of sculptures!",
      "adapted": false
    }
  },
  {
    "id": 49,
    "page": 558,
    "cloze": {
      "line": "The mission is safe with me.",
      "word": "mission",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Can you hear me?",
      "speaker": "Anna",
      "replySpeaker": "Ms. Weaver",
      "example": "You’re breaking up, Flamingo.",
      "adapted": false
    }
  },
  {
    "id": 50,
    "page": 569,
    "cloze": {
      "line": "I am going back to school!",
      "word": "school",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "Hey, are you finished with your report?",
      "speaker": "Sarah",
      "replySpeaker": "Taylor",
      "example": "Almost. I have been writing and re-writing since last night!",
      "adapted": false
    }
  },
  {
    "id": 51,
    "page": 580,
    "cloze": {
      "line": "A marathon is a good fitness goal too.",
      "word": "fitness",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "What do you know about running in a marathon?",
      "speaker": "Ashley",
      "replySpeaker": "Anna",
      "example": "I know that there’s a lot of running and sometimes you can win a medal.",
      "adapted": false
    }
  },
  {
    "id": 52,
    "page": 589,
    "cloze": {
      "line": "And I’ve taken a lot of chances.",
      "word": "chances",
      "speaker": "Anna"
    },
    "scene": {
      "prompt": "So, tell me, will you be moving to Hollywood for a career in movies?",
      "speaker": "Kelly",
      "replySpeaker": "Anna",
      "example": "No. I’ll make the movies and then come back.",
      "adapted": false
    }
  }
];
