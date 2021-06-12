import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from "react"

const Tiptap = (props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: props.content,
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap