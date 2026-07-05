import { Chapter, Personality, Quote } from './types';

// Import images using ESModules to allow Vite to bundle, optimize, and resolve paths correctly in production
import kalamImg from './assets/images/portrait_kalam_1783266170181.jpg';
import jordanImg from './assets/images/portrait_jordan_1783266184284.jpg';
import edisonImg from './assets/images/portrait_edison_1783266196954.jpg';
import rowlingImg from './assets/images/portrait_rowling_1783266211321.jpg';
import jobsImg from './assets/images/portrait_jobs_1783266225735.jpg';
import storyImg from './assets/images/theme_story_illustration_1783266153321.jpg';

export const chapters: Chapter[] = [
  { id: 0, key: 'intro', title: 'Welcome', description: 'Class 11-B Assembly: Every Success Begins with a Mistake' },
  { id: 1, key: 'story', title: 'The Seed of Hope', description: 'Introducing the Assembly Topic with a short story.' },
  { id: 2, key: 'personalities', title: 'The Legends', description: 'Five icons who turned mistakes into grand success.' },
  { id: 3, key: 'quotes', title: 'Morning Affirmations', description: 'Key quotes on resilience and growth.' },
  { id: 4, key: 'finale', title: 'Gratitude & Special Wish', description: 'Thank you message and a special surprise!' }
];

export const assemblyStory = {
  title: "The Golden Lesson of the Cracked Pot",
  paragraphs: [
    "An old water bearer carried two large pots on a pole across his neck. One pot was perfect and always delivered a full portion of water, while the other had a deep crack in it. At the end of the long walk from the stream to the master's house, the cracked pot arrived only half-full.",
    "For two years, this went on daily. The perfect pot was proud of its perfection, but the poor cracked pot was deeply ashamed of its failure, feeling useless and miserable for only accomplishing half its job.",
    "One day, the cracked pot apologized to the water bearer: 'I am ashamed of myself. My crack leaks water all the way, making your hard work go to waste.'",
    "The water bearer smiled and said, 'As we walk back today, look at the side of the path.' The pot noticed beautiful, vibrant wild flowers blooming. The bearer explained: 'Did you notice they only grow on your side? I knew of your flaw, so I planted seeds on your side. Every day we walked, you watered them. Without your crack, we wouldn't have this beauty to grace the master's table.'"
  ],
  moral: "Every mistake, crack, and failure can water beautiful flowers along your life's path. We don't grow in spite of our cracks—we grow because of them!",
  imageUrl: storyImg
};

export const personalities: Personality[] = [
  {
    id: 1,
    name: 'Dr. A.P.J. Abdul Kalam',
    profession: "India's Missile Man & Former President",
    iconType: 'rocket',
    imageUrl: kalamImg,
    quote: 'Failure will never overtake me if my determination to succeed is strong enough.',
    timeline: [
      { title: 'The Plunge into the Sea (1979)', description: 'India’s first experimental SLV-3 rocket mission failed, crashing into the Bay of Bengal. Kalam was devastated.' },
      { title: 'The Leadership Shield', description: 'His leader, Satish Dhawan, took the entire blame on himself in front of the press, shielding Kalam and his team from public criticism.' },
      { title: 'Correction & Double Check', description: 'They analyzed thousands of parameters, fixed leakage in control valves, and worked day and night with renewed spirit.' },
      { title: 'Glorious Satellites (1980)', description: 'The next launch was a perfect success. Rohini was put in orbit. Dhawan stepped back and let Kalam lead the press conference!' }
    ],
    lesson: 'A failure is a blueprint of what to fix. When leaders absorb blame and share credit, teams build missiles!'
  },
  {
    id: 2,
    name: 'Michael Jordan',
    profession: 'Legendary NBA Athlete & Business Icon',
    iconType: 'basketball',
    imageUrl: jordanImg,
    quote: "I've failed over and over again in my life. And that is why I succeed.",
    timeline: [
      { title: 'Cut from High School Team', description: ' deemed too short (5\'11\") and raw, Jordan was rejected from his high school varsity team. He went home and cried.' },
      { title: 'Wake Up at 6:00 AM', description: 'Instead of quitting, he used the pain as fuel. He practiced shooting drills, defense, and layups every morning before classes.' },
      { title: 'The Shot of Persistence', description: 'Earned his spot next year, won championships at UNC, and went on to rule the NBA with Chicago Bulls.' },
      { title: 'Embracing the Misses', description: 'He missed over 9,000 shots, lost almost 300 games, and was trusted 26 times to take the winning shot and missed.' }
    ],
    lesson: 'Do not fear taking the shot. You miss 100% of the shots you never take!'
  },
  {
    id: 3,
    name: 'Thomas Edison',
    profession: 'Incorrigible Inventor & Pioneer of Power',
    iconType: 'bulb',
    imageUrl: edisonImg,
    quote: "I have not failed. I've just found 10,000 ways that won't work.",
    timeline: [
      { title: 'Thousands of Dead Filaments', description: 'Edison made over 1,000 (and up to 10,000) unsuccessful attempts to find a durable carbon filament for the light bulb.' },
      { title: 'The Positive Mindset', description: 'While others called them failures, Edison viewed them as positive eliminations: "We now know 1,000 materials that don\'t work!"' },
      { title: 'Carbonized Bamboo Break', description: 'He finally discovered that carbonized bamboo thread could glow for over 1,200 hours!' },
      { title: 'Lighting Up New York', description: 'Illuminated Manhattan with the world\'s first practical electrical grid system, proving mistakes lead directly to light.' }
    ],
    lesson: 'Setbacks are just diagnostic results. Every wrong try shows you the correct way forward!'
  },
  {
    id: 4,
    name: 'J.K. Rowling',
    profession: 'Global Author & Creator of Harry Potter',
    iconType: 'book',
    imageUrl: rowlingImg,
    quote: 'Some failure in life is inevitable. It is impossible to live without failing at something.',
    timeline: [
      { title: 'Hit Absolute Rock Bottom', description: 'Rowling was a jobless single mother, battling clinical depression, living in a cold apartment on government aid.' },
      { title: 'The 12 Rejections', description: 'She wrote Harry Potter on a manual typewriter. 12 major publishers rejected her manuscript, saying children\'s books wouldn\'t sell.' },
      { title: 'The Magic of Belief', description: 'Kept sending the manuscript. Bloomsbury finally accepted it because the chairman\'s 8-year-old daughter loved Chapter 1.' },
      { title: 'Global Phenomenon', description: 'The series sold over 500 million copies, translated to 80 languages, inspiring children everywhere to read.' }
    ],
    lesson: 'Rock bottom became the solid foundation upon which I rebuilt my life. Rejections cannot stop magic!'
  },
  {
    id: 5,
    name: 'Steve Jobs',
    profession: 'Co-founder of Apple & Visionary Designer',
    iconType: 'apple',
    imageUrl: jobsImg,
    quote: "You can't connect the dots looking forward; you can only connect them looking backward.",
    timeline: [
      { title: 'Fired from His Own Company', description: 'At age 30, Jobs was publicly dismissed from Apple—the company he built from a garage—after a dispute with the CEO.' },
      { title: 'The Creative Rebirth', description: 'He didn\'t give up. He founded NeXT Computers and bought Pixar, creating the world\'s first CGI film, Toy Story.' },
      { title: 'The Grand Return (1996)', description: 'Apple was weeks from bankruptcy and bought NeXT for its OS. Jobs returned as CEO, introducing the iMac, iPod, iPhone, and iPad.' },
      { title: 'Shaping the Future', description: 'Turned Apple into the most design-conscious and valuable technology company on Earth.' }
    ],
    lesson: 'Sometimes life hits you in the head with a brick. Don\'t lose faith. The heaviest blow can trigger your greatest renaissance.'
  }
];

export const quotes: Quote[] = [
  { id: 1, text: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
  { id: 2, text: 'Mistakes are the portals of discovery.', author: 'James Joyce' },
  { id: 3, text: 'Do not be embarrassed by your failures, learn from them and start again.', author: 'Richard Branson' },
  { id: 4, text: 'Only those who dare to fail greatly can ever achieve greatly.', author: 'Robert F. Kennedy' },
  { id: 5, text: 'The morning sun rises after the darkest night. Your setbacks are just preparation for your sunrise.', author: 'Class 11-B Assembly' }
];

export const morningQuotes = [
  "A beautiful morning is nature's way of saying: 'You have another chance to try, learn, and grow.'",
  "Mistakes are proof that you are actively trying. Let's make today a masterpiece of learning!",
  "Rise like the sun! Every shadow of yesterday's failure is wiped away by today's fresh light.",
  "We are Class 11-B, wishing you a day of curiosity, resilience, and beautiful breakthroughs!"
];

export const treeLeaves = [
  'Patience',
  'Hope',
  'Learning',
  'Courage',
  'Determination',
  'Hard Work',
  'Confidence',
  'Growth',
  'Resilience',
  'Dreams'
];
