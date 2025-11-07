import projectsData from './projects.json'

// Transformar el JSON al formato esperado por la app
export const PROJECTS = projectsData.map(project => ({
  ...project,
  // Convertir strings separados por | a arrays
  industries: project.industries ? project.industries.split('|').filter(Boolean) : [],
  tech_stack: project.tech_stack ? project.tech_stack.split('|').filter(Boolean) : [],
  team: project.team ? project.team.split('|').filter(Boolean) : [],
  languages: project.languages ? project.languages.split('|').filter(Boolean) : [],
  awards: project.awards ? project.awards.split('|').filter(Boolean) : [],
  speakers: project.speakers ? project.speakers.split('|').filter(Boolean) : []
}))

// Generar sesiones desde los schedules de cada proyecto
export const SESSIONS = PROJECTS.flatMap(project => 
  (project.schedules || []).map(schedule => ({
    id: schedule.sub_id,
    title: `${project.title} - ${schedule.type}`,
    type: schedule.type,
    track: project.track,
    speakers: project.speakers,
    start: `${schedule.date} ${schedule.start}`,
    end: `${schedule.date} ${schedule.end}`,
    location: `Sala ${schedule.room}`,
    project_id: project.id,
    streaming_url: project.demo_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }))
)