import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "<p>This is the initial content of the editor</p>",
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
    const { html } = this.state;
    console.log("Submitted", html);
    const res = await axios.post(
      "http://localhost:3000/api/template/add",
      {
        html,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
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
          }}
          onEditorChange={this.handleEditorChange}
        />
        <button onClick={this.handleSubmit}>Click me to save</button>
      </>
    );
  }
}

export default App;
