import "@/modules/tags";
import { defineNeoteEditor } from "@/modules/editor/components/NeoteEditor";

export const EditorPIP = ({ customWindow = window }: { customWindow?: Window }) => {

  defineNeoteEditor(customWindow);

  return (
    <div className="flex h-[100vh]">
      <neote-editor
        extension-tag="enabled"
        placeholder="Type here ..."
        className="p-2 pe-8 h-full w-full rounded-sm border-1 border-stone-200 bg-white outline-0 focus-within:border-stone-400"
      // onFocus={handleTyping}
      // onBlur={handleBlur}
      // oneditor-submit={handleSubmit}
      ></neote-editor>
    </div>
  )
}