'use client'

import type { CSSProperties } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Cog, ArrowLeft, Home } from 'lucide-react'

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  image?: string; // Make the image property optional
};

type GameType = 'animals' | 'math' | 'words' | 'space' | 'history' | 'science' | 'geography' | 'music' | 'sports' | 'movies' | 'food' | 'art'

const quizData = {
  animals: [
    { question: 'What is the largest land animal?', options: ['Elephant', 'Rhino', 'Hippo', 'Giraffe'], answer: 'Elephant', image: './images/animal/1animal.png' },
    { question: 'Which animal is known as the King of the Jungle?', options: ['Tiger', 'Lion', 'Leopard', 'Cheetah'], answer: 'Lion', image: './images/animal/2animal.png' },
    { question: 'What is the fastest land animal?', options: ['Cheetah', 'Lion', 'Gazelle', 'Ostrich'], answer: 'Cheetah', image: './images/animal/3animal.png' },
    { question: 'Which bird cant fly?', options: ['Eagle', 'Penguin', 'Sparrow', 'Hawk'], answer: 'Penguin', image: './images/animal/4animal.png' },
    { question: 'What is the largest species of bear?', options: ['Grizzly Bear', 'Black Bear', 'Polar Bear', 'Kodiak Bear'], answer: 'Polar Bear', image: './images/animal/5animal.png' },
    { question: 'Which animal has black and white stripes?', options: ['Giraffe', 'Zebra', 'Tiger', 'Panda'], answer: 'Zebra', image: './images/animal/6animal.png' },
    { question: 'What is the national animal of Australia?', options: ['Koala', 'Kangaroo', 'Emu', 'Dingo'], answer: 'Kangaroo', image: './images/animal/7animal.png' },
    { question: 'Which animal has the longest neck?', options: ['Ostrich', 'Giraffe', 'Camel', 'Llama'], answer: 'Giraffe', image: './images/animal/8animal.png' },
    { question: 'What is the largest species of big cat?', options: ['Lion', 'Tiger', 'Jaguar', 'Leopard'], answer: 'Tiger', image: './images/animal/9animal.png' },
  ],
  math: [
    { question: 'What is 7 x 8?', options: ['54', '56', '58', '60'], answer: '56' },
    { question: 'What is 15 + 27?', options: ['40', '41', '42', '43'], answer: '42' },
    { question: 'What is 100 - 35?', options: ['55', '60', '65', '70'], answer: '65' },
    { question: 'What is 12 x 12?', options: ['122', '132', '142', '144'], answer: '144' },
    { question: 'What is 81 ÷ 9?', options: ['7', '8', '9', '10'], answer: '9' },
    { question: 'What is 5² + 3²?', options: ['28', '32', '34', '36'], answer: '34' },
    { question: 'What is 17 + 24 - 13?', options: ['26', '27', '28', '29'], answer: '28' },
    { question: 'What is 40% of 80?', options: ['28', '30', '32', '34'], answer: '32' },
    { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], answer: '12' },
  ],
 words: [
    { question: 'Unscramble: AAEPPL', options: ['Apple', 'Pear', 'Peach', 'Plum'], answer: 'Apple' },
    { question: 'Unscramble: EBLTA', options: ['Table', 'Belt', 'Blade', 'Bleat'], answer: 'Table' },
    { question: 'Unscramble: OOHDCILHD', options: ['Adulthood', 'Childhood', 'Parenthood', 'Brotherhood'], answer: 'Childhood' },
    { question: 'Unscramble: TCEA', options: ['Tace', 'Cate', 'Acte', 'Eat'], answer: 'Cate' },
    { question: 'Unscramble: EAOCN', options: ['Canoe', 'Ocean', 'Cane', 'Cone'], answer: 'Ocean' },
    { question: 'Unscramble: EIRFDN', options: ['Finder', 'Fried', 'Friend', 'Fiend'], answer: 'Friend' },
    { question: 'Unscramble: EOUHS', options: ['House', 'Hose', 'Horse', 'Hues'], answer: 'House' },
    { question: 'Unscramble: OEPHN', options: ['Hope', 'Hone', 'Phone', 'Phony'], answer: 'Phone' },
    { question: 'Unscramble: ETRWA', options: ['Water', 'Waiter', 'Waster', 'Wetter'], answer: 'Water' },
  ],
  space: [
    { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], answer: 'Mars', image: './images/space/1space.png' },
    { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], answer: 'Jupiter', image: './images/space/2space.png' },
    { question: 'What is the name of Earths natural satellite?', options: ['Sun', 'Moon', 'Mars', 'Venus'], answer: 'Moon', image: './images/space/3space.png' },
    { question: 'Which planet is known for its beautiful rings?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], answer: 'Saturn', image: './images/space/4space.png' },
    { question: 'What is the hottest planet in our solar system?', options: ['Mercury', 'Venus', 'Mars', 'Jupiter'], answer: 'Venus', image: './images/space/5space.png' },
    { question: 'What is the name of the galaxy we live in?', options: ['Andromeda', 'Milky Way', 'Sombrero', 'Whirlpool'], answer: 'Milky Way', image: './images/space/6space.png' },
    { question: 'Which planet is known as the Blue Planet?', options: ['Earth', 'Neptune', 'Uranus', 'Mars'], answer: 'Earth', image: './images/space/7space.png' },
    { question: 'What is the largest star in our solar system?', options: ['Sirius', 'Betelgeuse', 'Sun', 'Polaris'], answer: 'Sun', image: './images/space/8space.png' },
    { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mars', 'Mercury'], answer: 'Mercury', image: './images/space/9space.png' },
  ],
  history: [
    { question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], answer: 'George Washington', image: './images/history/1history.png' },
    { question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], answer: '1945', image: './images/history/2history.png' },
    { question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], answer: 'Leonardo da Vinci', image: './images/history/3history.png' },
    { question: 'What ancient wonder was located in Alexandria, Egypt?', options: ['The Colossus of Rhodes', 'The Hanging Gardens of Babylon', 'The Lighthouse of Alexandria', 'The Great Pyramid of Giza'], answer: 'The Lighthouse of Alexandria', image: './images/history/4history.png' },
    { question: 'Who was the first woman to fly solo across the Atlantic Ocean?', options: ['Amelia Earhart', 'Bessie Coleman', 'Harriet Quimby', 'Jacqueline Cochran'], answer: 'Amelia Earhart', image: './images/history/5history.png' },
    { question: 'In which year did the Berlin Wall fall?', options: ['1987', '1989', '1991', '1993'], answer: '1989', image: '/images/history/6history.png' },
    { question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?', options: ['Joseph Stalin', 'Vladimir Lenin', 'Nikita Khrushchev', 'Leonid Brezhnev'], answer: 'Nikita Khrushchev', image: './images/history/7history.png' },
    { question: 'Which empire was ruled by Genghis Khan?', options: ['Roman Empire', 'Ottoman Empire', 'Mongol Empire', 'Persian Empire'], answer: 'Mongol Empire', image: './images/history/8history.png' },
    { question: 'Who wrote the Declaration of Independence?', options: ['George Washington', 'Benjamin Franklin', 'John Adams', 'Thomas Jefferson'], answer: 'Thomas Jefferson', image: './images/history/9history.png' },
  ],
  science: [
    { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], answer: 'Au', image: './images/science/1science.png' },
    { question: 'What is the largest organ in the human body?', options: ['Heart', 'Brain', 'Liver', 'Skin'], answer: 'Skin', image: './images/science/2science.png' },
    { question: 'What is the speed of light?', options: ['299,792 km/s', '300,000 km/s', '301,000 km/s', '298,000 km/s'], answer: '299,792 km/s', image: './images/science/3science.png' },
    { question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], answer: 'Diamond', image: './images/science/4science.png' },
    { question: 'Which planet has the Great Red Spot?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], answer: 'Jupiter', image: './images/science/5science.png' },
    { question: 'What is the smallest unit of matter?', options: ['Atom', 'Molecule', 'Cell', 'Electron'], answer: 'Atom', image: './images/science/6science.png' },
    { question: 'What is the process by which plants make their food?', options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Germination'], answer: 'Photosynthesis', image: './images/science/7science.png' },
    { question: 'What is the study of fossils called?', options: ['Archaeology', 'Paleontology', 'Geology', 'Biology'], answer: 'Paleontology', image: './images/science/8science.png' },
    { question: 'What is the largest known living organism on Earth?', options: ['Blue Whale', 'Colossal Squid', 'Giant Sequoia', 'Honey Fungus'], answer: 'Honey Fungus', image: './images/science/9science.png' },
  ],
  geography: [
    { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], answer: 'Paris', image: './images/geography/1geography.png' },
    { question: 'Which is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 'Pacific Ocean', image: './images/geography/2geography.png' },
    { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], answer: 'Nile', image: './images/geography/3geography.png' },
    { question: 'Which country is home to the Great Barrier Reef?', options: ['Brazil', 'Australia', 'Indonesia', 'Thailand'], answer: 'Australia', image: './images/geography/4geography.png' },
    { question: 'What is the highest mountain in the world?', options: ['K2', 'Kilimanjaro', 'Mount Everest',   'Matterhorn'], answer: 'Mount Everest', image: './images/geography/5geography.png' },
    { question: 'Which desert is the largest  in the world?', options: ['Gobi', 'Kalahari', 'Sahara', 'Arabian'], answer: 'Sahara', image: './images/geography/6geography.png' },
    { question: 'What is the smallest country in the world?', options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'], answer: 'Vatican City', image: './images/geography/7geography.png' },
    { question: 'Which continent is the least populated?', options: ['Australia', 'Europe', 'South America', 'Antarctica'], answer: 'Antarctica', image: './images/geography/8geography.png' },
    { question: 'Through which capital city does the Prime Meridian pass?', options: ['Paris', 'London', 'New York', 'Tokyo'], answer: 'London', image: './images/geography/9geography.png' },
  ],
  music: [
    { question: 'Who is known as the "King of Pop"?', options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'David Bowie'], answer: 'Michael Jackson', image: './images/music/1music.png' },
    { question: 'Which band performed the hit song "Bohemian Rhapsody"?', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'], answer: 'Queen', image: './images/music/2music.png' },
    { question: 'What instrument does a pianist play?', options: ['Guitar', 'Drums', 'Violin', 'Piano'], answer: 'Piano', image: './images/music/3music.png' },
    { question: 'Who wrote the opera "The Magic Flute"?', options: ['Ludwig van Beethoven', 'Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Richard Wagner'], answer: 'Wolfgang Amadeus Mozart', image: './images/music/4music.png' },
    { question: 'Which of these is not a type of guitar?', options: ['Bass', 'Electric', 'Acoustic', 'Trumpet'], answer: 'Trumpet', image: './images/music/5music.png' },
    { question: 'What is the national anthem of the United States?', options: ['God Save the Queen', 'La Marseillaise', 'The Star-Spangled Banner', 'O Canada'], answer: 'The Star-Spangled Banner', image: './images/music/6music.png' },
    { question: 'Which music genre originated in Jamaica in the late 1960s?', options: ['Hip Hop', 'Reggae', 'Salsa', 'Jazz'], answer: 'Reggae', image: './images/music/7music.png' },
    { question: 'Who composed the Four Seasons?', options: ['Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven', 'Antonio Vivaldi'], answer: 'Antonio Vivaldi', image: './images/music/8music.png' },
    { question: 'What is the most common instrument in a symphony orchestra?', options: ['Violin', 'Flute', 'Clarinet', 'Trumpet'], answer: 'Violin', image: './images/music/9music.png' },
  ],
  sports: [
    { question: 'In which sport would you perform a slam dunk?', options: ['Tennis', 'Basketball', 'Soccer', 'Golf'], answer: 'Basketball', image: './images/sports/1sports.png' },
    { question: 'How many players are there in a soccer team on the field?', options: ['9', '10', '11', '12'], answer: '11', image: './images/sports/2sports.png' },
    { question: 'Which country won the FIFA World Cup in 2018?', options: ['Brazil', 'Germany', 'Argentina', 'France'], answer: 'France', image: './images/sports/3sports.png' },
    { question: 'In which sport is the term "love" used to mean zero?', options: ['Badminton', 'Table Tennis', 'Tennis', 'Volleyball'], answer: 'Tennis', image: './images/sports/4sports.png' },
    { question: 'How many Olympic rings are there?', options: ['4', '5', '6', '7'], answer: '5', image: './images/sports/5sports.png' },
    { question: 'Which sport is played at Wimbledon?', options: ['Cricket', 'Tennis', 'Golf', 'Rugby'], answer: 'Tennis', image: './images/sports/6sports.png' },
    { question: 'In which sport would you use a driver?', options: ['Cricket', 'Baseball', 'Golf', 'Hockey'], answer: 'Golf', image: '/images/sports/7sports.png' },
    { question: 'How long is a marathon in kilometers?', options: ['21.1 km', '30 km', '42.2 km', '50 km'], answer: '42.2 km', image: './images/sports/8sports.png' },
    { question: 'Which country invented table tennis?', options: ['China', 'Japan', 'England', 'USA'], answer: 'England', image: './images/sports/9sports.png' },
  ],
  movies: [
    { question: 'Who directed the movie "Jurassic Park"?', options: ['James Cameron', 'Steven Spielberg', 'George Lucas', 'Christopher Nolan'], answer: 'Steven Spielberg', image: './images/movies/1movies.png' },
    { question: 'Which actor played Jack Dawson in the movie "Titanic"?', options: ['Brad Pitt', 'Tom Cruise', 'Leonardo DiCaprio', 'Johnny Depp'], answer: 'Leonardo DiCaprio', image: './images/movies/2movies.png' },
    { question: 'What is the name of the fictional country in the movie "Black Panther"?', options: ['Zamunda', 'Wakanda', 'Genovia', 'Latveria'], answer: 'Wakanda', image: './images/movies/3movies.png' },
    { question: 'Which movie features the character Forrest Gump?', options: ['Saving Private Ryan', 'Cast Away', 'The Green Mile', 'Forrest Gump'], answer: 'Forrest Gump', image: './images/movies/4movies.png' },
    { question: 'Who played Hermione Granger in the Harry Potter film series?', options: ['Emma Watson', 'Emma Stone', 'Emma Roberts', 'Emily Blunt'], answer: 'Emma Watson', image: './images/movies/5movies.png' },
    { question: 'Which animated movie features a character named Buzz Lightyear?', options: ['Shrek', 'Finding Nemo', 'Toy Story', 'The Lion King'], answer: 'Toy Story', image: './images/movies/6movies.png' },
    { question: 'What is the name of the fictional hotel in "The Shining"?', options: ['Bates Motel', 'Overlook Hotel', 'Hotel California', 'Heartbreak Hotel'], answer: 'Overlook Hotel', image: './images/movies/7movies.png' },
    { question: 'Which movie won the Academy Award for Best Picture in 2020?', options: ['1917', 'Joker', 'Parasite', 'Once Upon a Time in Hollywood'], answer: 'Parasite', image: './images/movies/8movies.png' },
    { question: 'Who played the character of Tony Stark in the Marvel Cinematic Universe?', options: ['Chris Evans', 'Chris Hemsworth', 'Robert Downey Jr.', 'Mark Ruffalo'], answer: 'Robert Downey Jr.', image: './images/movies/9movies.png' },
  ],
  food: [
    { question: 'What is the main ingredient in guacamole?', options: ['Tomato', 'Avocado', 'Onion', 'Lime'], answer: 'Avocado', image: './images/food/1food.png' },
    { question: 'Which country is credited with inventing pizza?', options: ['Greece', 'Spain', 'Italy', 'France'], answer: 'Italy', image: './images/food/2food.png' },
    { question: 'What is sushi traditionally wrapped in?', options: ['Seaweed', 'Rice paper', 'Lettuce', 'Tortilla'], answer: 'Seaweed', image: './images/food/3food.png' },
    { question: 'Which fruit is known as the "king of fruits"?', options: ['Mango', 'Durian', 'Pineapple', 'Banana'], answer: 'Durian', image: './images/food/4food.png' },
    { question: 'What is the primary ingredient in hummus?', options: ['Lentils', 'Chickpeas', 'Black beans', 'Soybeans'], answer: 'Chickpeas', image: './images/food/5food.png' },
    { question: 'Which nut is used to make marzipan?', options: ['Walnut', 'Peanut', 'Almond', 'Cashew'], answer: 'Almond', image: './images/food/6food.png' },
    { question: 'What is the main ingredient in traditional Japanese miso soup?', options: ['Tofu', 'Seaweed', 'Fermented soybean paste', 'Fish'], answer: 'Fermented soybean paste', image: './images/food/7food.png' },
    { question: 'Which cheese is traditionally used in a Greek salad?', options: ['Mozzarella', 'Cheddar', 'Feta', 'Parmesan'], answer: 'Feta', image: './images/food/8food.png' },
    { question: 'What is the primary ingredient in a traditional Spanish paella?', options: ['Pasta', 'Potatoes', 'Rice', 'Bread'], answer: 'Rice', image: './images/food/9food.png' },
  ],
  art: [
    { question: 'Who painted "The Starry Night"?', options: ['Pablo Picasso', 'Claude Monet', 'Vincent van Gogh', 'Leonardo da Vinci'], answer: 'Vincent van Gogh', image: './images/art/1art.png' },
    { question: 'Which art movement is Salvador Dalí associated with?', options: ['Impressionism', 'Cubism', 'Surrealism', 'Pop Art'], answer: 'Surrealism', image: './images/art/2art.png' },
    { question: 'Who sculpted "David"?', options: ['Donatello', 'Michelangelo', 'Leonardo da Vinci', 'Raphael'], answer: 'Michelangelo', image: './images/art/3art.png' },
    { question: 'Which famous Spanish artist is known for co-founding Cubism?', options: ['Diego Velázquez', 'Francisco Goya', 'Pablo Picasso', 'Salvador Dalí'], answer: 'Pablo Picasso', image: './images/art/4art.png' },
    { question: 'Who painted "The Persistence of Memory" with melting clocks?', options: ['René Magritte', 'Salvador Dalí', 'Frida Kahlo', 'Andy Warhol'], answer: 'Salvador Dalí', image: './images/art/5art.png' },
    { question: 'Which Dutch post-impressionist painter cut off a portion of his own ear?', options: ['Rembrandt', 'Johannes Vermeer', 'Vincent van Gogh', 'Piet Mondrian'], answer: 'Vincent van Gogh', image: './images/art/6art.png' },
    { question: 'Who painted the ceiling of the Sistine Chapel?', options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Sandro Botticelli'], answer: 'Michelangelo', image: './images/art/7art.png' },
    { question: 'Which American artist is famous for his paintings of Campbell\'s Soup Cans?', options: ['Jackson Pollock', 'Mark Rothko', 'Andy Warhol', 'Roy Lichtenstein'], answer: 'Andy Warhol', image: './images/art/8art.png' },
    { question: 'Who painted "The Scream"?', options: ['Edvard Munch', 'Gustav Klimt', 'Claude Monet', 'Henri Matisse'], answer: 'Edvard Munch', image: './images/art/9art.png' },
  ],
}

const gameIcons: Record<GameType, string> = {
  animals: './images/icon/1game.png',
  math: './images/icon/2game.png',
  words: './images/icon/3game.png',
  space: './images/icon/4game.png',
  history: './images/icon/5game.png',
  science: './images/icon/6game.png',
  geography: './images/icon/7game.png',
  music: './images/icon/8game.png',
  sports: './images/icon/9game.png',
  movies: './images/icon/10game.png',
  food: './images/icon/11game.png',
  art: './images/icon/12game.png',
}

const SOUNDS = {
  correct: './sounds/correct.mp3',
  incorrect: './sounds/incorrect.mp3',
  background: './music/background.mp3'
}

export default function QuizGame() {
  const [gameState, setGameState] = useState<'opening' | 'selection' | 'game'>('opening')
  const [gameType, setGameType] = useState<GameType | null>(null)
  const [settings, setSettings] = useState({
    music: true,
    sound: true,
  })
  const [showSettings, setShowSettings] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [canPlayAudio, setCanPlayAudio] = useState(false)

  useEffect(() => {
    const audio = new Audio(SOUNDS.background)
    audio.loop = true
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (canPlayAudio && settings.music && audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error))
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [settings.music, canPlayAudio])

  const playSound = (soundName: 'correct' | 'incorrect') => {
    if (settings.sound && canPlayAudio) {
      const audio = new Audio(SOUNDS[soundName])
      audio.play().catch(error => console.error("Audio play failed:", error))
    }
  }

  const handleUserInteraction = () => {
    setCanPlayAudio(true)
  }

  const startGame = (type: GameType) => {
    handleUserInteraction()
    setGameType(type)
    setGameState('game')
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsAnswerCorrect(null)
  }

  const handleAnswer = (answer: string) => {
    if (gameType && quizData[gameType][currentQuestion]) {
      const isCorrect = answer === quizData[gameType][currentQuestion].answer
      setSelectedAnswer(answer)
      setIsAnswerCorrect(isCorrect)
      if (isCorrect) {
        setScore(score + 1)
        playSound('correct')
      } else {
        playSound('incorrect')
      }
      setTimeout(() => {
        handleNextQuestion()
      }, 2000)
    }
  }

  const handleNextQuestion = () => {
    if (gameType && currentQuestion < quizData[gameType].length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    } else {
      setShowResult(true)
    }
  }

  const OpeningInterface = () => (
    <motion.div
      className="text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4 text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(to right, #f1ffff 100%, #f4f4f4 50%)',
          textShadow: '2px 2px 4px rgba(1,0,0,0.1)',
          fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", sans-serif',
          WebkitTextStroke: '1px #f1ffff',
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Quiz Master
      </motion.h1>
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="./images/logo.png"
          alt="Quiz Master Logo"
          width={96}
          height={96}
          className="mx-auto mb-4"
        />
      </motion.div>
      <Button 
        onClick={() => {
          handleUserInteraction()
          setGameState('selection')
        }} 
        size="lg" 
        className="font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        style={{
          fontFamily: '"Comic Sans MS", "Chalkboard SE", "Arial Rounded MT Bold", sans-serif',
          fontSize: '1.5rem',
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        Start Game
      </Button>
    </motion.div>
  )

  const GameSelection = () => {
    const games: { type: GameType; name: string }[] = [
      { type: 'animals', name: 'Animal Quiz' },
      { type: 'math', name: 'Math Challenge' },
      { type: 'words', name: 'Word Finder' },
      { type: 'space', name: 'Space Explorer' },
      { type: 'history', name: 'History Quest' },
      { type: 'science', name: 'Science Lab' },
      { type: 'geography', name: 'Globe Trotter' },
      { type: 'music', name: 'Music Maestro' },
      { type: 'sports', name: 'Sports Arena' },
      { type: 'movies', name: 'Movie Buff' },
      { type: 'food', name: 'Foodie' },
      { type: 'art', name: 'Art Gallery' },
    ]

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
        {games.map((game, index) => (
          <motion.div
            key={game.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              onClick={() => startGame(game.type)}
              className="w-full h-32 text-lg font-semibold flex flex-col items-center justify-center bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Image 
                  src={gameIcons[game.type]}
                  alt={game.name}
                  width={48}
                  height={48}
                  className="mb-2"
                />
              </motion.div>
              {game.name}
            </motion.button>
          </motion.div>
        ))}
      </div>
    )
  }

  const QuizInterface = () => {
    if (!gameType || !quizData[gameType] || !quizData[gameType][currentQuestion]) {
      return null
    }

    const currentQuizData = quizData[gameType][currentQuestion]

    return (
      <div className="w-full max-w-2xl">
        <Button onClick={() => setGameState('selection')} className="mb-4 rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">{gameType.charAt(0).toUpperCase() + gameType.slice(1)} Quiz</h2>
          {!showResult && (
            <>
              {'image' in currentQuizData && currentQuizData.image && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={currentQuizData.image}
                    alt={`Question ${currentQuestion + 1}`}
                    width={256}
                    height={256}
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <p className="mb-4 text-lg">{currentQuizData.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {currentQuizData.options.map((option) => (
                  <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => handleAnswer(option)} 
                      variant="outline"
                      className={`w-full py-4 text-lg transition-all duration-200 ${
                        selectedAnswer === option
                          ? isAnswerCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white'
                      }`}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center"
                >
                  <p className={`text-lg font-bold ${isAnswerCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                  </p>
                  {!isAnswerCorrect && (
                    <p className="text-gray-600">
                      The correct answer is: {currentQuizData.answer}
                    </p>
                  )}
                </motion.div>
              )}
            </>
          )}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                {score >= quizData[gameType].length / 2 ? 'Congratulations!' : 'Better luck next time!'}
              </h3>
              <p className="text-lg mb-4">
                You got {score} out of {quizData[gameType].length} questions correct.
              </p>
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-6xl mb-4"
              >
                {score >= quizData[gameType].length / 2 ? '😃' : '😢'}
              </motion.div>
              <div className="space-x-4">
                <Button onClick={() => startGame(gameType)} className="bg-green-500 hover:bg-green-600">Retry</Button>
                <Button onClick={() => setGameState('selection')} variant="outline">Back to Selection</Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    )
  }

  const Settings = () => (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="music">Music</Label>
            <Switch
              id="music"
              checked={settings.music}
              onCheckedChange={(checked) => setSettings({ ...settings, music: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Sound Effects</Label>
            <Switch
              id="sound"
              checked={settings.sound}
              onCheckedChange={(checked) => setSettings({ ...settings, sound: checked })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-red-600 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('./images/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 rounded-full"
        onClick={() => {
          handleUserInteraction()
          setGameState('opening')
        }}
      >
        <Home className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 rounded-full"
        onClick={() => {
          handleUserInteraction()
          setShowSettings(true)
        }}
      >
        <Cog className="h-4 w-4" />
      </Button>
      <AnimatePresence mode="wait">
        {gameState === 'opening' && <OpeningInterface />}
        {gameState === 'selection' && <GameSelection />}
        {gameState === 'game' && <QuizInterface />}
      </AnimatePresence>
      <Settings />
    </div>
  )
}