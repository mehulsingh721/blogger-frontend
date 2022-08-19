import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react"

const BlogEditEditor = (props) => {
  const [title, setTitle] = useState(props.blog.title)
  const [excerpt, setExcerpt] = useState(props.blog.excerpt)
  const [content, setContent] = useState(props.blog.body)
  const edito = useRef(null);

  const handleEditorChange = (e) => {
    setContent(e.target.getContent())
  }

  const submit = () => {
    props.handleCallback(title, excerpt, content, props.blog.id)
  }

  return(
    <div className="editor">
      <div className="editor__modal">
        <div className="editor__modal--row-1">
          <h2 className="heading-1">Add Blog</h2>
          <button onClick={props.toggleEditor}>&times;</button>
        </div>

        <div className="editor__modal--row-2">
          <div>
            <p className="copy__para--medium">Title</p>
            <input id="subject" className="copy__para--medium" defaultValue={title} onChange={(e) => setTitle(e.target.value)} type="text"/>
          </div>
          <div>
            <p className="copy__para--medium">Excerpt</p>
            <input id="subject" className="copy__para--medium" defaultValue={excerpt} onChange={(e) => setExcerpt(e.target.value)} type="text"/>
          </div>
        </div>


        <div className="editor__modal--row-3">
          <Editor
            ref={edito}
            apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
            initialValue={content}
            init={{
              height: 800,
              menubar: false,
              plugins: [
                'advlist underline autolink lists link image tinydrive', 
                'charmap print preview anchor help forecolor',
                'searchreplace visualblocks code emoticons link',
                'insertdatetime media table paste wordcount table fontselect'
              ],
              toolbar_mode: "wrap",
              toolbar:
                "fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | table link image code | emoticons | placeholderBtn",
              image_title: true,
              automatic_uploads: true,
              paste_data_images: true,
              statusbar: false,
              theme_advanced_toolbar_location: "bottom",
            }}
            onChange={handleEditorChange}
          />
        </div>

        <div className="editor__modal--row-4">
          <button onClick={submit} className="btn">Add Blog</button>
        </div>
      </div>
    </div>
  )
}

export default BlogEditEditor
