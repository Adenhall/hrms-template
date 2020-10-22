import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "<p>This is the initial content of the editor</p>",
      title: "Template",
      default: true,
      settings: [
        {
          key: 'yo',
          name: 'yo',
          value: 'This is a YO Comment'
        },
        {
          key: 'hey',
          name: 'hey',
          value: 'This is a HEY HEY HEYEAYAYAYAYA'
        },
        {
          key: 'hiiiiii',
          name: 'hi',
          value: "HEYYYYYY What's up!"
        }
      ]
    };
  }

  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    console.log(typeof content);
    this.setState({
      html: content,
    });
  };

  handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/template/add",
      this.state,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    console.log(res);
  };

  render() {
    return (
      <>
        <Editor
          initialValue={this.state.html}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "save advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo formatselect bold italic backcolor  alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help",
            content_style: "body { margin: 1rem auto; max-width: 900px; }",
          }}
          onEditorChange={this.handleEditorChange}
        />
        <button onClick={this.handleSubmit}>Click me to save</button>
      </>
    );
  }
}

export default App;
