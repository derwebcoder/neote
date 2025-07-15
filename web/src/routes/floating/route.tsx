import { EditorPIP } from '@/components/EditorPIP/EditorPIP'
import { createFileRoute } from '@tanstack/react-router'
import '@/modules/tags'
import '@/modules/editor'


export const Route = createFileRoute('/floating')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div data-tag-style="token-gradient-light" className='flex flex-col'>
    {/* app-region:drag is used to make the window draggable, see https://www.electronjs.org/docs/latest/tutorial/custom-title-bar#create-a-custom-title-bar */}
    <div className="h-[20px] bg-white flex justify-end items-center [app-region:drag]"></div>
    <EditorPIP />
  </div>
}
