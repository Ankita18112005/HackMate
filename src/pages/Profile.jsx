import { useState } from 'react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import { useAuth } from '../context/useAuth.js'

function Profile() {
  const { currentUser, updateProfile } = useAuth()
  const [formValues, setFormValues] = useState(() => ({
    name: currentUser.name,
    branch: currentUser.branch,
    year: currentUser.year,
    interests: currentUser.interests.join(', '),
  }))

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateProfile({
      ...formValues,
      interests: formValues.interests
        .split(',')
        .map((interest) => interest.trim())
        .filter(Boolean),
    })
  }

  const inputClasses =
    'w-full rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-all duration-200 placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/15'

  return (
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">Profile</h1>
      <p className="mt-2 text-sm text-body">
        Keep your details updated for better recommendations.
      </p>

      {/* Profile Header */}
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-primary/10 bg-card p-5 shadow-soft">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">
          {currentUser.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-heading">{currentUser.name}</h2>
          <p className="text-sm text-body">
            {currentUser.branch} · {currentUser.year}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {currentUser.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-medium text-purple-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Card className="mt-6 max-w-xl" title="Edit Profile">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label
              htmlFor="branch"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Branch
            </label>
            <input
              id="branch"
              name="branch"
              value={formValues.branch}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label
              htmlFor="year"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Year
            </label>
            <input
              id="year"
              name="year"
              value={formValues.year}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label
              htmlFor="interests"
              className="mb-1.5 block text-sm font-medium text-heading"
            >
              Interests
            </label>
            <input
              id="interests"
              name="interests"
              value={formValues.interests}
              onChange={handleChange}
              placeholder="Web Dev, Open Source, Hackathons"
              className={inputClasses}
              required
            />
          </div>

          <Button type="submit" className="w-full py-2.5">Save Profile</Button>
        </form>
      </Card>
    </div>
  )
}

export default Profile
