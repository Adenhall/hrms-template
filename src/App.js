import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Button } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: `<p>Email subject line: <span class="companyName">[Company_Name]</span> Job Offer / Job Offer from <span class="companyName">[Company_Name]</span></p>
      <p>Dear <span class="candidateName">[Candidate_Name]</span>,</p>
      <p>We were all very excited to meet and get to know you over the past few days. We have been impressed with your background and would like to formally offer you the position of <span class="jobTitle">[Job_title]</span>. This is a full&nbsp;time position <span class="workingTime">[Working_Time]</span>. You will be reporting to the head of the <span class="departmentName">[Department]</span> department. [<em>If applicable: Please note that <span class="companyName">[Company_Name]</span> is an at-will employer. That means that either you or <span class="companyName">[Company_Name]</span> are free to end the employment relationship at any time, with or without notice or cause</em>.]</p>
      <p>We will be offering you an annual gross salary of <span class="salary">[$X]</span> and <span class="bonus">[Other_Bonus]</span> You will also have <span class="benefits">[Other_Benefits]</span> and <span class="vacationDays">[Vacation_Days]</span> days of paid vacation per year.<br />[<em>optional: I am attaching a letter with more details about your compensation plan</em>.]</p>
      <p>Your expected starting date is <span class="startingDate">[Starting_Date]</span>. You will be asked to sign a contract of <span class="contractDuration">[Contract_Duration]</span> and <span class="policies">[Policies]</span> at the beginning of your employment.</p>
      <p>We would like to have your response by <span class="responseDate">[date]</span>. In the meantime, please feel free to contact me or <span class="managerName">[Manager]</span> via email or phone on <span class="contactDetails">[Contact_Details]</span>, should you have any questions.</p>
      <p>We are all looking forward to having you on our team.</p>
      <p>Best regards,</p>
      <p><span class="fullname">[Candidate_Name]</span></p>`,
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
          value: new Date().toDateString(),
        },
        {
          key: "departmentName",
          description: "Department name",
          value: "Engineer",
        },
        {
          key: "salary",
          description: "Adjust salary",
          value: "$100000",
        },
        {
          key: "bonus",
          description: "Bonus programs, if applicable",
          value: "stock options",
        },
        {
          key: "benefits",
          description: "Include benefits",
          value: "lunch allowance, OT allowance",
        },
        {
          key: "vacationDays",
          description: "Number of paid vacation days",
          value: "6",
        },
        {
          key: "startingDate",
          description: "Starting date",
          value: "",
        },
        {
          key: "contractDuration",
          description: "Contract duration",
          value: "1 year",
        },
        {
          key: "policies",
          description:
            "Agreements, confidentiality, nondisclosure and noncompete",
          value: "copywrite laws",
        },
        {
          key: "responseDate",
          description: "Response date",
          value: "",
        },
        {
          key: "managerName",
          description: "ManagerName",
          value: "HR manager",
        },
        {
          key: "contactDetails",
          description: "Contact details",
          value: "admin-sa@terralogic.com",
        },
        {
          key: "fullname",
          description: "Candidate full name",
          value: "___________",
        },
        {
          key: "signature",
          description: "Candidate signature",
          value: "______________",
        },
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
    console.log(this.state);
    const res = await axios.post(
      "http://localhost:3000/api/template/add",
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
              editor.on("mouseup", function (e) {
                console.log(window.getSelection());
              });
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
