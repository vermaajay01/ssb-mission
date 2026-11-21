
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BrainCircuit,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Target,
  ChevronRight,
} from 'lucide-react'

const questionBank = {
  Verbal: [
    {
      q: 'Choose the word which is different from the others.',
      options: ['Apple', 'Mango', 'Carrot', 'Banana'],
      answer: 2,
      explanation: 'Carrot is a vegetable; the others are fruits.',
    },
    {
      q: 'Book is related to Reading in the same way as Food is related to:',
      options: ['Cooking', 'Eating', 'Kitchen', 'Buying'],
      answer: 1,
      explanation: 'A book is read, while food is eaten.',
    },
    {
      q: 'Find the next number: 2, 4, 8, 16, 32, ?',
      options: ['48', '54', '64', '72'],
      answer: 2,
      explanation: 'Each number is multiplied by 2. 32 × 2 = 64.',
    },
    {
      q: 'If CAT is coded as DBU, how will DOG be coded?',
      options: ['EPH', 'EPG', 'FPI', 'EOG'],
      answer: 0,
      explanation: 'Each letter is replaced by the next letter in the alphabet.',
    },
    {
      q: 'Find the odd one out.',
      options: ['Square', 'Triangle', 'Circle', 'Cube'],
      answer: 3,
      explanation: 'Cube is three-dimensional; the others are two-dimensional.',
    },
    {
      q: 'Complete the series: 5, 10, 20, 40, ?',
      options: ['60', '70', '80', '90'],
      answer: 2,
      explanation: 'Every number is doubled. 40 × 2 = 80.',
    },
    {
      q: 'A person walks 5 km North and then 5 km South. Where is he?',
      options: ['North', 'South', 'Starting point', 'East'],
      answer: 2,
      explanation: 'Equal distances in opposite directions bring him back to the starting point.',
    },
    {
      q: 'Doctor is related to Hospital as Teacher is related to:',
      options: ['Market', 'School', 'Office', 'Court'],
      answer: 1,
      explanation: 'A doctor generally works in a hospital; a teacher generally works in a school.',
    },
    {
      q: 'Choose the correct opposite of GENEROUS.',
      options: ['Kind', 'Helpful', 'Selfish', 'Friendly'],
      answer: 2,
      explanation: 'Selfish is the opposite of generous.',
    },
    {
      q: 'If yesterday was Monday, what day will it be the day after tomorrow?',
      options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      answer: 2,
      explanation: 'Yesterday Monday means today Tuesday. The day after tomorrow is Thursday.',
    },
  ],

  'Non-Verbal': [
    {
      q: 'Complete the pattern: ▲, ■, ▲, ■, ▲, ?',
      options: ['▲', '■', '●', '◆'],
      answer: 1,
      explanation: 'The pattern alternates between triangle and square.',
    },
    {
      q: 'Find the missing number: 1, 4, 9, 16, 25, ?',
      options: ['30', '32', '36', '49'],
      answer: 2,
      explanation: 'These are consecutive squares: 1², 2², 3², 4², 5², 6².',
    },
    {
      q: 'Which shape has the greatest number of sides?',
      options: ['Triangle', 'Pentagon', 'Hexagon', 'Octagon'],
      answer: 3,
      explanation: 'An octagon has 8 sides.',
    },
    {
      q: 'Complete the sequence: ●, ●●, ●●●, ?',
      options: ['●', '●●', '●●●●', '●●●●●'],
      answer: 2,
      explanation: 'One circle is added at each step.',
    },
    {
      q: 'Which is the mirror image of the letter B?',
      options: ['B', 'Ƃ', 'D', 'P'],
      answer: 1,
      explanation: 'A horizontal mirror reverses the left-right orientation of B.',
    },
    {
      q: 'Find the odd shape.',
      options: ['▲', '■', '◆', '●'],
      answer: 3,
      explanation: 'Circle has no straight sides or corners.',
    },
    {
      q: 'Complete the sequence: 2, 6, 12, 20, 30, ?',
      options: ['36', '40', '42', '44'],
      answer: 2,
      explanation: 'The differences are 4, 6, 8, 10 and then 12. The answer is 42.',
    },
    {
      q: 'A cube has how many faces?',
      options: ['4', '6', '8', '12'],
      answer: 1,
      explanation: 'A cube has 6 square faces.',
    },
    {
      q: 'Which number completes the pattern? 3, 6, 12, 24, ?',
      options: ['36', '42', '48', '54'],
      answer: 2,
      explanation: 'Each number is doubled.',
    },
    {
      q: 'How many corners does a hexagon have?',
      options: ['4', '5', '6', '8'],
      answer: 2,
      explanation: 'A hexagon has six sides and six corners.',
    },
  ],
}

const QUESTION_TIME = 30

export default function OIRPractice() {
  const navigate = useNavigate()

  const [mode, setMode] = useState(null)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState({})
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME)

  const questions = mode ? questionBank[mode] : []
  const currentQuestion = questions[currentIndex]

  const score = questions.reduce((total, question, index) => {
    return total + (answers[index] === question.answer ? 1 : 0)
  }, 0)

  const startTest = (selectedMode) => {
    setMode(selectedMode)
    setStarted(true)
    setFinished(false)
    setCurrentIndex(0)
    setSelectedOption(null)
    setAnswers({})
    setSecondsLeft(QUESTION_TIME)
  }

  const nextQuestion = () => {
    setAnswers((previous) => ({
      ...previous,
      [currentIndex]: selectedOption,
    }))

    if (currentIndex === questions.length - 1) {
      setFinished(true)
      return
    }

    setCurrentIndex((previous) => previous + 1)
    setSelectedOption(null)
    setSecondsLeft(QUESTION_TIME)
  }

  // Automatic question progression when timer expires
  useEffect(() => {
    if (!started || finished) return

    if (secondsLeft <= 0) {
      setAnswers((previous) => ({
        ...previous,
        [currentIndex]: selectedOption,
      }))

      if (currentIndex === questions.length - 1) {
        setFinished(true)
      } else {
        setCurrentIndex((previous) => previous + 1)
        setSelectedOption(null)
        setSecondsLeft(QUESTION_TIME)
      }

      return
    }

    const timer = setTimeout(() => {
      setSecondsLeft((previous) => previous - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [
    started,
    finished,
    secondsLeft,
    currentIndex,
    selectedOption,
    questions.length,
  ])

  const restartTest = () => {
    setStarted(false)
    setFinished(false)
    setMode(null)
    setCurrentIndex(0)
    setSelectedOption(null)
    setAnswers({})
    setSecondsLeft(QUESTION_TIME)
  }

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-6 text-white sm:px-8">

      {/* HEADER */}
      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <div className="flex items-center gap-2 font-black tracking-wider">
          <BrainCircuit className="text-cyan-400" />
          OIR PRACTICE
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-4xl">

        {/* MODE SELECTION */}
        {!started && (
          <div>
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                <Target size={32} className="text-cyan-400" />
              </div>

              <h1 className="text-3xl font-black sm:text-4xl">
                Officer Intelligence Rating
              </h1>

              <p className="mt-3 text-slate-400">
                Select your practice category and test your reasoning ability.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {['Verbal', 'Non-Verbal'].map((item) => (
                <button
                  key={item}
                  onClick={() => startTest(item)}
                  className="rounded-2xl border border-white/10 bg-[#101f33] p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/50"
                >
                  <BrainCircuit className="mb-5 text-cyan-400" size={32} />

                  <h2 className="text-xl font-bold">
                    {item} Reasoning
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {item === 'Verbal'
                      ? 'Analogy, series, classification, coding-decoding and directions.'
                      : 'Patterns, shapes, sequences, spatial reasoning and visual logic.'}
                  </p>

                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-cyan-400">
                      10 Questions
                    </span>

                    <span className="flex items-center gap-1 text-slate-400">
                      Start Practice <ChevronRight size={16} />
                    </span>
                  </div>
                </button>
              ))}

            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#101f33]/60 p-5">
              <h3 className="font-bold">Test Instructions</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>• 10 questions in each practice set.</li>
                <li>• 30 seconds per question.</li>
                <li>• Unanswered questions receive zero marks.</li>
                <li>• One correct answer per question.</li>
                <li>• Review explanations after completing the test.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ACTIVE TEST */}
        {started && !finished && currentQuestion && (
          <div>

            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest text-cyan-400">
                  {mode.toUpperCase()} REASONING
                </p>

                <h1 className="mt-2 text-2xl font-bold">
                  Question {currentIndex + 1}
                  <span className="text-slate-500">
                    {' '}/ {questions.length}
                  </span>
                </h1>
              </div>

              <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
                secondsLeft <= 10
                  ? 'border-red-500/40 bg-red-500/10 text-red-400'
                  : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-400'
              }`}>
                <Clock size={18} />
                <span className="font-bold tabular-nums">
                  00:{String(secondsLeft).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#101f33] p-6 sm:p-9">

              <p className="mb-8 text-lg font-semibold leading-relaxed sm:text-xl">
                {currentQuestion.q}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={`rounded-xl border p-4 text-left transition ${
                      selectedOption === index
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-white/10 bg-[#07111f] hover:border-cyan-400/40'
                    }`}
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={nextQuestion}
                disabled={selectedOption === null}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {currentIndex === questions.length - 1
                  ? 'Submit Test'
                  : 'Next Question'}
                <ChevronRight size={19} />
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                Your answer will be recorded when you continue.
              </p>

            </div>
          </div>
        )}

        {/* RESULTS */}
        {finished && (
          <div>

            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-[#102b46] to-[#0c1b2e] p-7 text-center sm:p-10">

              <Trophy className="mx-auto mb-4 text-cyan-400" size={45} />

              <p className="text-xs font-bold tracking-widest text-cyan-400">
                PRACTICE COMPLETED
              </p>

              <h1 className="mt-3 text-3xl font-black">
                Your Results
              </h1>

              <div className="mt-8 text-6xl font-black text-cyan-400">
                {score}/{questions.length}
              </div>

              <p className="mt-2 text-slate-400">
                {percentage}% Accuracy
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">

                <div className="rounded-xl bg-[#07111f]/70 p-4">
                  <CheckCircle className="mx-auto mb-2 text-emerald-400" />
                  <p className="text-xl font-bold">{score}</p>
                  <p className="text-xs text-slate-500">Correct</p>
                </div>

                <div className="rounded-xl bg-[#07111f]/70 p-4">
                  <XCircle className="mx-auto mb-2 text-red-400" />
                  <p className="text-xl font-bold">
                    {questions.length - score}
                  </p>
                  <p className="text-xs text-slate-500">Incorrect / Skipped</p>
                </div>

                <div className="rounded-xl bg-[#07111f]/70 p-4">
                  <Target className="mx-auto mb-2 text-cyan-400" />
                  <p className="text-xl font-bold">{percentage}%</p>
                  <p className="text-xs text-slate-500">Accuracy</p>
                </div>

              </div>
            </div>

            {/* ANSWER REVIEW */}
            <h2 className="mb-5 mt-10 text-xl font-bold">
              Answer Review
            </h2>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const isCorrect = answers[index] === question.answer

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-[#101f33] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold">
                        {index + 1}. {question.q}
                      </p>

                      {isCorrect ? (
                        <CheckCircle className="shrink-0 text-emerald-400" />
                      ) : (
                        <XCircle className="shrink-0 text-red-400" />
                      )}
                    </div>

                    <p className="mt-3 text-sm text-slate-400">
                      Your answer:{' '}
                      <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                        {answers[index] === null || answers[index] === undefined
                          ? 'Not attempted'
                          : question.options[answers[index]]}
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-emerald-400">
                      Correct answer: {question.options[question.answer]}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      Explanation: {question.explanation}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={restartTest}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 py-4 font-bold text-slate-950 hover:bg-cyan-300"
              >
                <RotateCcw size={18} />
                Practice Again
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-4 font-bold hover:bg-white/5"
              >
                <ArrowLeft size={18} />
                Dashboard
              </button>
            </div>

          </div>
        )}

      </div>
    </main>
  )
}
