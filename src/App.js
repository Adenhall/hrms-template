import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Button } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html:
        `<p><span style="font-weight: 400;">EXIT INTERVIEW QUESTION</span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span><span style="font-weight: 400;"> </span></p>
        <p>1. <span class="q1" style="font-weight: 400;">Please describe your general feelings about working here. If possible, please tell us why you are leaving.</span></p>
        <p>2. <span class="q2" style="font-weight: 400;">What did you enjoy most about working here?</span></p>
        <p>3. <span class="q3" style="font-weight: 400;">If you could change three things, what would they be?</span></p>
        <p>4. <span class="q4" style="font-weight: 400;">How do you feel you were treated by your supervisor and your coworkers?&nbsp;</span></p>
        <p>5. <span class="q5" style="font-weight: 400;">How well do you believe your work was recognized and appreciated?</span></p>
        <p>6. <span class="q6" style="font-weight: 400;">Do you feel you were given adequate training and assistance?</span></p>
        <p>7. <span class="q7" style="font-weight: 400;">Are there things you wish you had known earlier?</span></p>
        <p>8. <span class="q8" style="font-weight: 400;">Do you think your work was aligned with your personal goals?</span></p>
        <p>9. <span class="q9" style="font-weight: 400;">What can we do to make this company a better place to work?</span></p>
        <p>10. <span class="q10" style="font-weight: 400;">What kind of tools, resources, or training would have helped you perform better?</span></p>
        <p>11. <span class="q11" style="font-weight: 400;">Would you recommend our company to friends of yours who&rsquo;re looking for a job? Why or why not?&nbsp;</span></p>
        <p>&nbsp;</p>`,
      title: "Exit Interview",
      default: true,
      type: "OFF_BOARDING-EXIT_PACKAGE",
      fullname: "",
      signature: "",
      thumbnail:
        "http://api-stghrms.paxanimi.ai/api/attachments/5fa37887edc16635fad0051c/NoPath%20-%20Copy%20(12)@3x.png",
      settings: [
        {
            isEdited: false,
            key: "q1",
            description: "Question 1",
            value: "Please describe your general feelings about working here. If possible, please tell us why you are leaving."
        },
        {
            isEdited: false,
            key: "q2",
            description: "Question 2",
            value: "What did you enjoy most about working here?"
        },
        {
            isEdited: false,
            key: "q3",
            description: "Question 3",
            value: "If you could change three things, what would they be?"
        },
        {
            isEdited: false,
            key: "q4",
            description: "Question 4",
            value: "How do you feel you were treated by your supervisor and your coworkers? "
        },
        {
            isEdited: false,
            key: "q5",
            description: "Question 5",
            value: "How well do you believe your work was recognized and appreciated?"
        },
        {
            isEdited: false,
            key: "q6",
            description: "Question 6",
            value: "Do you feel you were given adequate training and assistance?"
        },
        {
            isEdited: false,
            key: "q7",
            description: "Question 7",
            value: "Are there things you wish you had known earlier?"
        },
        {
            isEdited: false,
            key: "q8",
            description: "Question 8",
            value: "Do you think your work was aligned with your personal goals?"
        },
        {
            isEdited: false,
            key: "q9",
            description: "Question 9",
            value: "What can we do to make this company a better place to work?"
        },
        {
            isEdited: false,
            key: "q10",
            description: "Question 10",
            value: "What kind of tools, resources, or training would have helped you perform better?"
        },
        {
            isEdited: false,
            key: "q11",
            description: "Question 11",
            value: "Would you recommend our company to friends of yours who’re looking for a job? Why or why not? "
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
    console.log(this.state);
    const res = await axios.post(
      "http://api-stghrms.paxanimi.ai/api/template/add",
      this.state,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(res);
  };

  render() {
    return (
      <div>
        <Editor
          initialValue={this.state.html}
          apiKey={process.env.REACT_APP_TINYMCE_KEY}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "save advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo formatselect bold italic backcolor  alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help customPlugin",
            content_style: "body { margin: 1rem auto; max-width: 900px; }",
            setup: function (editor) {
              // console.log(editor);
            },
            external_plugins: {
              customPlugin: "./",
            },
          }}
          onEditorChange={this.handleEditorChange}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
        >
          Click me to save
        </Button>
      </div>
    );
  }
}

export default App;
