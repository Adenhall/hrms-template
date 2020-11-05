import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Button } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: `<p>Email subject line: <strong><span class="companyName">[Company_Name]</span></strong> Job Offer / Job Offer from <strong><span class="companyName">[Company_Name]</span></strong></p>
      <p>Dear <strong><span class="candidateName">[Candidate_Name]</span></strong>,</p>
      <p>We were all very excited to meet and get to know you over the past few days. We have been impressed with your background and would like to formally offer you the position of <strong><span class="jobTitle">[Job_title]</span></strong>. This is a <strong><span id="classification">[Full/ Part time]</span></strong> position <strong><span class="workingTime">[Working_Time]</span></strong>. You will be reporting to the head of the <strong><span class="departmentName">[Department]</span></strong> department. [<em>If applicable: Please note that <strong><span class="companyName">[Company_Name]</span></strong> is an at-will employer. That means that either you or <strong><span class="companyName">[Company_Name]</span></strong> are free to end the employment relationship at any time, with or without notice or cause</em>.]</p>
      <p>We will be offering you an annual gross salary of <strong><span class="salary">[$X]</span></strong> and <strong><span class="bonus">[Other_Bonus]</span></strong> You will also have <strong><span class="benefits">[Other_Benefits]</span></strong> and <strong><span class="vacationDays">[Vacation_Days]</span></strong> days of paid vacation per year.<br />[<em>optional: I am attaching a letter with more details about your compensation plan</em>.]</p>
      <p>Your expected starting date is <strong><span class="startingDate">[Starting_Date]</span></strong>. You will be asked to sign a contract of <strong><span class="contractDuration">[Contract_Duration]</span></strong> and <strong><span class="policies">[Policies]</span></strong> at the beginning of your employment.</p>
      <p>We would like to have your response by <strong><span class="responseDate">[date]</span></strong>. In the meantime, please feel free to contact me or <strong><span class="managerName">[Manager]</span></strong> via email or phone on <strong><span class="contactDetails">[Contact_Details]</span></strong>, should you have any questions.</p>
      <p>We are all looking forward to having you on our team.</p>
      <p>Best regards,</p>
      <p><strong><span class="fullname">[Candidate_Full_Name]</span></strong></p>
      <div class="signature">&nbsp;</div>`,
      title: "Offer letter",
      default: true,
      fullname: "",
      signature: "",
      thumbnail:
        "http://api-stghrms.paxanimi.ai/api/attachments/5fa37887edc16635fad0051c/NoPath%20-%20Copy%20(12)@3x.png",
      settings: [
        {
          key: "companyName",
          description: "Company name",
          value: "[Company_Name]",
          isEdited: false,
        },
        {
          key: "fullname",
          description: "Candidate name",
          value: "[Candidate_Name]",
          isEdited: false,
        },
        {
          key: "jobTitle",
          description: "Job title",
          value: "[Job_title]",
          isEdited: false,
        },
        {
          key: "classification",
          description: "Employment Type (Full/ Part time)",
          value: "[Employment_Type]",
          isEdited: false,
        },
        {
          key: "workingTime",
          description: "Mention working days and hours.",
          value: "[Working_Time]",
          isEdited: false,
        },
        {
          key: "department",
          description: "Department name",
          value: "[Department]",
          isEdited: false,
        },
        {
          key: "salary",
          description: "Adjust salary",
          value: "[$X]",
          isEdited: false,
        },
        {
          key: "bonus",
          description: "Bonus programs, if applicable",
          value: "[Other_Bonus]",
          isEdited: false,
        },
        {
          key: "benefits",
          description: "Include benefits",
          value: "[Other_Benefits]",
          isEdited: false,
        },
        {
          key: "vacationDays",
          description: "Number of paid vacation days",
          value: "[Vacation_Days]",
          isEdited: false,
        },
        {
          key: "startingDate",
          description: "Starting date",
          value: "[Starting_Date]",
          isEdited: false,
        },
        {
          key: "contractDuration",
          description: "Contract duration",
          value: "[Contract_Duration]",
          isEdited: false,
        },
        {
          key: "policies",
          description:
            "Agreements, confidentiality, nondisclosure and noncompete",
          value: "[Policies]",
          isEdited: false,
        },
        {
          key: "responseDate",
          description: "Response date",
          value: "[date]",
          isEdited: false,
        },
        {
          key: "reportManager",
          description: "Manager Name",
          value: "[Manager]",
          isEdited: false,
        },
        {
          key: "contactDetails",
          description: "Contact details",
          value: "[Contact_Details]",
          isEdited: false,
        },
        // {
        //   key: "fullname",
        //   description: "Candidate full name",
        //   value: "[Candidate_Full_Name]",
        //   isEdited: false,
        // },
        // {
        //   key: "signature",
        //   description: "Candidate signature",
        //   value: "______________",
        //   isEdited: false,
        // },
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
