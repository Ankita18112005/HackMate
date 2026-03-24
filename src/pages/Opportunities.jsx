import { CalendarDays, MapPin } from 'lucide-react'
import EventCard from '../components/ui/EventCard.jsx'
import Loader from '../components/ui/Loader.jsx'
import useFetch from '../hooks/useFetch.js'
import { getOpportunities } from '../services/opportunityService.js'

function Opportunities() {
  const { data: opportunities, loading } = useFetch(getOpportunities)

  if (loading) {
    return <Loader text="Loading events..." />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
        Events
      </h1>
      <p className="mt-2 text-sm text-body">
        Browse recommended events and apply quickly.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {opportunities.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Opportunities
