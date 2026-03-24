import { CheckCircle2, CircleDashed, CircleDot, Compass, Network, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import ProfileCard from '../components/ui/ProfileCard.jsx'
import EventCard from '../components/ui/EventCard.jsx'
import PeerCard from '../components/ui/PeerCard.jsx'
import Loader from '../components/ui/Loader.jsx'
import { useAuth } from '../context/useAuth.js'
import { getOpportunities } from '../services/opportunityService.js'
import { getRoadmap } from '../services/roadmapService.js'
import { getSuggestedPeers } from '../services/userService.js'

const statusStyles = {
  'Not Started': { icon: CircleDashed, color: 'text-body', bg: 'bg-section' },
  'In Progress': { icon: CircleDot, color: 'text-primary', bg: 'bg-primary/15' },
  Completed: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-accent/20' },
}

function Dashboard() {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [roadmap, setRoadmap] = useState([])
  const [events, setEvents] = useState([])
  const [peers, setPeers] = useState([])

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      const [roadmapData, eventsData, peersData] = await Promise.all([
        getRoadmap(),
        getOpportunities(),
        getSuggestedPeers(),
      ])
      setRoadmap(roadmapData)
      setEvents(eventsData)
      setPeers(peersData)
      setLoading(false)
    }
    loadDashboard()
  }, [])

  if (loading) {
    return <Loader text="Loading dashboard..." />
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
          Welcome back, {currentUser.name} 👋
        </h1>
        <p className="mt-2 text-sm text-body">
          Here's your growth snapshot for today.
        </p>
      </section>

      {/* 1. Profile Section */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-heading">Your Profile</h2>
        <ProfileCard user={currentUser} />
      </section>

      {/* 2. Skill Roadmap Checklist */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-heading">Skill Roadmap</h2>
        <div className="space-y-3">
          {roadmap.map((item) => {
            const config = statusStyles[item.status] || statusStyles['Not Started']
            const StatusIcon = config.icon
            const isCompleted = item.status === 'Completed'

            return (
              <div
                key={item.id}
                className={`flex items-center gap-4 rounded-2xl border border-primary/10 bg-card p-4 shadow-soft transition-all duration-200 ${isCompleted ? 'opacity-80' : ''
                  }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isCompleted ? 'line-through text-body' : 'text-heading'}`}>
                    {item.skill}
                  </p>
                  <p className="mt-0.5 text-xs text-body">{item.description}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>
                  {item.status}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Events Section */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-heading">Upcoming Events</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 4. Peer Connect */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-heading">Peer Connect</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {peers.slice(0, 4).map((peer, index) => (
            <PeerCard key={peer.id} peer={peer} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
