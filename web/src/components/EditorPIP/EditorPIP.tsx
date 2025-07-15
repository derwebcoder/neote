
export const EditorPIP = () => {

  return (
    <div className="flex h-[100vh]">
      <neote-editor
        extension-tag="enabled"
        placeholder="Type here ..."
        className="p-2 pe-8 h-full w-full border-0 bg-white outline-0 [.is-app_&]:pt-0"
      // onFocus={handleTyping}
      // onBlur={handleBlur}
      // oneditor-submit={handleSubmit}
      ></neote-editor>
    </div>
  )
}