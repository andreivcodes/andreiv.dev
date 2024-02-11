import { format, parseISO } from 'date-fns'
import { allProjects } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'

export const generateMetadata = ({ params }) => {
  const project = allProjects.find((project) => project.slug === params.slug)
  return { title: project.name }
}

const ProjectLayout = ({ params }: { params: { slug: string } }) => {
  const project = allProjects.find((project) => project.slug === params.slug)

  const Content = getMDXComponent(project.body.code)

  return (
    <article className="py-8 max-w-xl w-full">
      <div className="mb-8">
        <time dateTime={project.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(project.date), 'LLLL d, yyyy')}
        </time>
        <h1 className='font-mono text-3xl'>{project.name}</h1>
      </div>
      <Content />
    </article>
  )
}

export default ProjectLayout
