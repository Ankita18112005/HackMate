import { CheckCircle2, CircleDashed, CircleDot } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import useFetch from '../hooks/useFetch.js'
import { getRoadmap } from '../services/roadmapService.js'

const statusStyles = {
  'Not Started': {
    icon: CircleDashed,
    badge: 'bg-section text-body',
  },
  'In Progress': {
    icon: CircleDot,
    badge: 'bg-primary/15 text-primary',
  },
  Completed: {
    icon: CheckCircle2,
    badge: 'bg-accent/20 text-emerald-700',
  },
}

function Roadmap() {
  const { data: roadmap, loading } = useFetch(getRoadmap)

  if (loading) {
    return <Loader text="Loading roadmap..." />
  }

  const completedCount = roadmap.filter((item) => item.status === 'Completed').length
  const progressPercent = Math.round((completedCount / roadmap.length) * 100)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
        Skill Roadmap
      </h1>
      <p className="mt-2 text-sm text-body">
        Track each skill with status-based milestones.
      </p>

      {/* Overall Progress */}
      <div className="mt-6 rounded-2xl border border-primary/10 bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-body">Overall Progress</p>
            <p className="mt-0.5 text-2xl font-bold text-heading">{progressPercent}%</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {completedCount}/{roadmap.length} skills
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {roadmap.map((item, index) => {
          const statusConfig = statusStyles[item.status] || statusStyles['Not Started']
          const StatusIcon = statusConfig.icon

          return (
            <Card
              key={item.id}
              title={item.skill}
              subtitle={item.description}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.badge}`}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {item.status}
              </span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Roadmap
