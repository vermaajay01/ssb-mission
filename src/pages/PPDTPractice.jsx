
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Eye,
  FileText,
  Users,
  Mic,
  CheckCircle,
  Trophy,
  RotateCcw,
  Target,
  Shield,
  Lightbulb,
} from 'lucide-react'

const OBSERVATION_TIME = 30
const STORY_TIME = 240

const instructions = [
  {
    icon: Eye,
    title: 'Picture Observation',
    time: '30 seconds (practice)',
    points: [
      'Observe the picture carefully.',
      'Identify the number of characters.',
      'Estimate their age, gender and mood.',
      'Notice the surroundings and situation.',
      'Identify the main activity taking place.',
    ],
  },
  {
    icon: FileText,
    title: 'Story Writing',
    time: '4 minutes (practice)',
    points: [
      'Create a realistic and meaningful story.',
      'Select one main character.',
      'Describe the situation or problem.',
      'Explain the actions taken by the character.',
      'End with a practical and positive outcome.',
    ],
  },
  {
    icon: Mic,
    title: 'Individual Narration',
    time: 'Practice',
    points: [
      'Narrate your story clearly and confidently.',
      'Maintain a logical sequence of events.',
      'Keep your narration concise.',
      'Speak naturally without memorising every sentence.',
    ],
  },
  {
    icon: Users,
    title: 'Group Discussion',
    time: 'Practice',
    points: [
      'Listen carefully to other candidates.',
      'Present your points logically.',
      'Respect different opinions.',
      'Avoid interrupting or arguing unnecessarily.',
      'Try to reach a common understanding.',
    ],
  },
]

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function PPDTPractice() {
  const navigate = useNavigate()

  const [phase, setPhase] = useState('instructions')
  const [confirmed, setConfirmed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(OBSERVATION_TIME)
  const [story, setStory] = useState('')
  const [narration, setNarration] = useState('')
  const [discussion, setDiscussion] = useState('')
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (phase !== 'observation' && phase !== 'writing') return

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer)

          if (phase === 'observation') {
            setPhase('writing')
            return STORY_TIME
          }

          setPhase('narration')
          return 0
        }

        return previous - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phase])

  const startTest = () => {
    setPhase('observation')
    setTimeLeft(OBSERVATION_TIME)
    setImageError(false)
  }

  const goToWriting = () => {
    setPhase('writing')
    setTimeLeft(STORY_TIME)
  }

  const goToNarration = () => {
    setPhase('narration')
    setTimeLeft(0)
  }

  const goToDiscussion = () => setPhase('discussion')
  const finishTest = () => setPhase('result')

  const restart = () => {
    setPhase('instructions')
    setConfirmed(false)
    setTimeLeft(OBSERVATION_TIME)
    setStory('')
    setNarration('')
    setDiscussion('')
    setImageError(false)
  }

  const wordCount = (value) =>
    value.trim() ? value.trim().split(/\s+/).length : 0

  const score = [
    story.trim().length > 0,
    narration.trim().length > 0,
    discussion.trim().length > 0,
  ].filter(Boolean).length

  const progress = {
    instructions: 0,
    observation: 20,
    writing: 40,
    narration: 60,
    discussion: 80,
    result: 100,
  }[phase]

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-700/60 bg-[#091525]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-300"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div className="flex items-center gap-2 font-bold tracking-wide">
            <Shield className="text-cyan-400" size={21} />
            <span>SSB MISSION</span>
          </div>

          <span className="text-sm font-semibold text-cyan-300">PPDT</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-3 flex justify-between text-xs text-slate-400">
            <span>PPDT Practice Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {phase === 'instructions' && (
          <section>
            <div className="mb-8 text-center">
              <span className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                Picture Perception and Discussion Test
              </span>

              <h1 className="mb-3 text-3xl font-bold md:text-4xl">
                PPDT <span className="text-cyan-400">Instructions</span>
              </h1>

              <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-400">
                Read the instructions carefully before beginning your
                practice. Understand each stage of the exercise.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {instructions.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-700 bg-[#101f33] p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h2 className="font-semibold">
                            {index + 1}. {item.title}
                          </h2>
                          <p className="text-xs text-cyan-300">{item.time}</p>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2 text-sm leading-6 text-slate-300"
                        >
                          <CheckCircle
                            size={15}
                            className="mt-1 shrink-0 text-cyan-400"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
              <div className="mb-2 flex items-center gap-2 font-semibold text-cyan-300">
                <Lightbulb size={19} />
                Important Practice Guidelines
              </div>
              <p className="text-sm leading-7 text-slate-300">
                The timings on this page are practice settings. Actual SSB
                instructions, timings and procedures may vary. Always follow
                the directions given by the assessment staff.
              </p>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-700 bg-[#101f33] p-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-cyan-400"
              />
              <span className="text-sm text-slate-300">
                I have read and understood all the PPDT instructions. I am
                ready to start the practice test.
              </span>
            </label>

            <button
              onClick={startTest}
              disabled={!confirmed}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-[#07111f] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Start PPDT Practice <ArrowRight size={19} />
            </button>
          </section>
        )}

        {phase === 'observation' && (
          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-cyan-300">Stage 1 of 4</p>
                <h1 className="text-2xl font-bold">Picture Observation</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Observe the picture and identify the situation.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-xl font-bold text-cyan-300">
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-[#101f33]">
              {!imageError ? (
                <img
                  src="/ppdt/picture-01.jpg"
                  alt="PPDT practice picture"
                  onError={() => setImageError(true)}
                  className="max-h-[480px] w-full object-contain"
                />
              ) : (
                <div className="p-8 text-center">
                  <Eye size={45} className="mx-auto mb-4 text-cyan-400" />
                  <h3 className="mb-2 text-lg font-semibold">
                    PPDT Picture Not Added
                  </h3>
                  <p className="max-w-md text-sm leading-6 text-slate-400">
                    Add your practice image at
                    <code className="mx-1 text-cyan-300">
                      public/ppdt/picture-01.jpg
                    </code>
                    to display it here.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-[#101f33] p-4">
              <p className="text-sm leading-6 text-slate-300">
                Observe the characters, their approximate age, mood,
                surroundings and the main activity. Prepare to develop a
                realistic story.
              </p>
            </div>

            <button
              onClick={goToWriting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-[#07111f] hover:bg-cyan-300"
            >
              Proceed to Story Writing <ArrowRight size={19} />
            </button>
          </section>
        )}

        {phase === 'writing' && (
          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-cyan-300">Stage 2 of 4</p>
                <h1 className="text-2xl font-bold">Story Writing</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Write a story based on the picture you observed.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-xl font-bold text-cyan-300">
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              {['Main character', 'Situation', 'Action and outcome'].map(
                (item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-700 bg-[#101f33] p-4"
                  >
                    <span className="text-xs text-cyan-300">
                      PART {index + 1}
                    </span>
                    <p className="mt-1 font-semibold">{item}</p>
                  </div>
                )
              )}
            </div>

            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Start writing your PPDT story here..."
              rows={12}
              className="w-full resize-y rounded-2xl border border-slate-700 bg-[#101f33] p-5 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>Word count: {wordCount(story)}</span>
              <span>Write naturally and logically</span>
            </div>

            <button
              onClick={goToNarration}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-[#07111f] hover:bg-cyan-300"
            >
              Continue to Narration <ArrowRight size={19} />
            </button>
          </section>
        )}

        {phase === 'narration' && (
          <section>
            <div className="mb-6">
              <p className="text-sm text-cyan-300">Stage 3 of 4</p>
              <h1 className="text-2xl font-bold">Individual Narration</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Practise how you would narrate your story to the group.
                Write your narration below or speak it aloud independently.
              </p>
            </div>

            <div className="mb-5 rounded-2xl border border-slate-700 bg-[#101f33] p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold text-cyan-300">
                <BookOpen size={19} /> Your Written Story
              </div>
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {story || 'No story was written.'}
              </p>
            </div>

            <textarea
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              rows={7}
              placeholder="Write your narration practice notes here..."
              className="w-full rounded-2xl border border-slate-700 bg-[#101f33] p-5 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />

            <button
              onClick={goToDiscussion}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-[#07111f] hover:bg-cyan-300"
            >
              Continue to Group Discussion <ArrowRight size={19} />
            </button>
          </section>
        )}

        {phase === 'discussion' && (
          <section>
            <div className="mb-6">
              <p className="text-sm text-cyan-300">Stage 4 of 4</p>
              <h1 className="text-2xl font-bold">Group Discussion</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Imagine that other candidates have presented different
                stories. Practise contributing constructively to the
                discussion.
              </p>
            </div>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-[#101f33] p-5">
                <Users className="mb-3 text-cyan-400" size={24} />
                <h3 className="mb-2 font-semibold">Participate</h3>
                <p className="text-sm leading-6 text-slate-400">
                  Present your interpretation and support your points with
                  logical reasoning.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-[#101f33] p-5">
                <Target className="mb-3 text-cyan-400" size={24} />
                <h3 className="mb-2 font-semibold">Reach a conclusion</h3>
                <p className="text-sm leading-6 text-slate-400">
                  Listen to others and try to develop a common understanding.
                </p>
              </div>
            </div>

            <textarea
              value={discussion}
              onChange={(e) => setDiscussion(e.target.value)}
              rows={8}
              placeholder="Write the points you would contribute during the group discussion..."
              className="w-full rounded-2xl border border-slate-700 bg-[#101f33] p-5 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />

            <button
              onClick={finishTest}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-[#07111f] hover:bg-cyan-300"
            >
              Complete PPDT Practice <CheckCircle size={19} />
            </button>
          </section>
        )}

        {phase === 'result' && (
          <section>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                <Trophy size={32} />
              </div>
              <h1 className="text-3xl font-bold">Practice Completed!</h1>
              <p className="mt-2 text-sm text-slate-400">
                Review your PPDT practice activity.
              </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-700 bg-[#101f33] p-5 text-center">
                <p className="text-3xl font-bold text-cyan-300">
                  {score}/3
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Stages with entries
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-[#101f33] p-5 text-center">
                <p className="text-3xl font-bold text-cyan-300">
                  {wordCount(story)}
                </p>
                <p className="mt-2 text-xs text-slate-400">Story words</p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-[#101f33] p-5 text-center">
                <p className="text-3xl font-bold text-cyan-300">
                  {wordCount(discussion)}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Discussion words
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-700 bg-[#101f33] p-5">
              <h2 className="mb-3 font-semibold">Your Practice Checklist</h2>
              {[
                ['Story writing', story],
                ['Narration notes', narration],
                ['Discussion points', discussion],
              ].map(([name, value]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border-b border-slate-700 py-3 last:border-0"
                >
                  <span className="text-sm text-slate-300">{name}</span>
                  <span
                    className={
                      value.trim()
                        ? 'text-sm text-emerald-400'
                        : 'text-sm text-amber-400'
                    }
                  >
                    {value.trim() ? 'Completed' : 'Not entered'}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-6 text-slate-300">
              This is an activity summary, not an official SSB assessment or
              recommendation. Review your story for clarity, realistic
              actions, logical sequence and a constructive conclusion.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={restart}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-4 font-semibold hover:bg-slate-800"
              >
                <RotateCcw size={18} /> Try Again
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-4 font-bold text-[#07111f] hover:bg-cyan-300"
              >
                Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
