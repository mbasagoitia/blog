import { Editor } from '@tinymce/tinymce-react';

function TextEditor ({ apiKey, editorRef, initialValue }) {
    return (
        <Editor apiKey={apiKey}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={initialValue}
            init={{
                height: 500,
                menubar: true,
                plugins:
                'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
                image_list: [
                {title: 'My image 1', value: 'https://www.example.com/my1.gif'},
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
        />
    )
}

export default TextEditor;