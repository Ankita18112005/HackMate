import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Loader from '../components/ui/Loader.jsx'
import useFetch from '../hooks/useFetch.js'
import { getSuggestedPeers } from '../services/userService.js'

const avatarColors = [
  'bg-primary/15 text-primary',
  'bg-secondary/20 text-purple-600',
  'bg-accent/20 text-emerald-600',
  'bg-highlight/20 text-pink-600',
]

function Peers() {
  const { data: peers, loading } = useFetch(getSuggestedPeers)

  if (loading) {
    return <Loader text="Loading peers..." />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
        Peer Connect
      </h1>
      <p className="mt-2 text-sm text-body">
        Collaborate with students who share your interests.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {peers.map((peer, index) => (
          <Card
            key={peer.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold ${avatarColors[index % avatarColors.length]
                  }`}
              >
                {peer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-semibold text-heading">{peer.name}</h3>
                <p className="text-xs text-body">{peer.interests.join(' · ')}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-body">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {peer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Button className="mt-4 w-full">Connect</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Peers
