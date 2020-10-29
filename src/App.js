import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Button } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "<p>This is the initial content of the editor</p>",
      title: "Template",
      default: true,
      fullname: "AAAAAAAAAAAAAA",
      signature: "",
      settings: [
        {
          key: "companyName",
          description: "Company name",
          value: "Terralogic",
        },
        {
          key: "candidateName",
          description: "Candidate name",
          value: "Lam Nguyen",
        },
        {
          key: "jobTitle",
          description: "Job title",
          value: "Software Engineer",
        },
        {
          key: "workingTime",
          description: "Mention working days and hours.",
          value: new Date().toDateString()
        },
        {
          key: "departmentName",
          description: "Department name",
          value: "Engineer"
        },
        {
          key: "salary",
          description: "Adjust salary",
          value: "$100000"
        },
        {
          key: "bonus",
          description: "Bonus programs, if applicable",
          value: "stock options"
        },
        {
          key: "benefits",
          description: "Include benefits",
          value: "lunch allowance, OT allowance"
        },
        {
          key: "vacationDays",
          description: "Number of paid vacation days",
          value: "6"
        },
        {
          key: "startingDate",
          description: "Starting date",
          value: new Date().toDateString()
        },
        {
          key: "contractDuration",
          description: "Contract duration",
          value: "1 year"
        },
        {
          key: "policies",
          description: "Agreements, confidentiality, nondisclosure and noncompete",
          value: "copywrite laws"
        },
        {
          Key: "responseDate",
          description: "Response date",
          value: new Date().toDateString()
        },
        {
          key: "managerName",
          description: "ManagerName",
          value: "HR manager"
        },
        {
          key: "contactDetails",
          description: "Contact details",
          value: "admin-sa@terralogic.com"
        },
        {
          key: "fullname",
          description: "Candidate full name",
          value: "___________"
        },
        {
          key: "signature" ,
          description: "Candidate signature",
          value: "______________"
        }
      ],
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
      'http://api-stghrms.paxanimi.ai/api/template/add',
      this.state,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          'Access-Control-Allow-Origin': '*'
        },
      }
    );
    console.log(res);
  };

  render() {
    return (
      <div
      >
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
            setup: function (editor) {
              editor.on('mouseup', function (e) {
                console.log(window.getSelection());
              });
            }
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
