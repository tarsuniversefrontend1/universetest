import * as Yup from "yup";

const ProjectValidationSchema = Yup.object().shape({
  visibility: Yup.string()
    .oneOf(["public", "private"])
    .required("Visibility is required"),

  title: Yup.string().required("Title is required"),

  short_description: Yup.string().required("Short description is required"),

  thumb: Yup.string().required("Thumbnail is required"),

  video: Yup.string().required("Video is required"),

  category: Yup.string().required("Category is required"),

  status: Yup.string()
    .oneOf(["complete", "not-complete"]) // Add more statuses as needed
    .required("Status is required"),

  tools_and_technologies: Yup.array()
    .of(Yup.string().trim())
    .required("Tools and technologies are required")
    .min(1, "At least one tool or technology is required"),

  expected_outcomes: Yup.string().required("Expected outcomes are required"),

  challenges: Yup.string().required("Challenges are required"),

  team_members: Yup.array()
    .of(Yup.string().trim())
    .optional("Team members are required")
    .min(1, "At least one team member is required"),

  is_seeking_colab: Yup.boolean().optional("Collaboration status is required"),

  repository_link: Yup.string()
    .url("Repository link must be a valid URL")
    .optional(),

  doc_link: Yup.string()
    .url("Documentation link must be a valid URL")
    .optional(),

  official_website_link: Yup.string()
    .url("Official website link must be a valid URL")
    .optional(),

  comment_allowed: Yup.boolean().nullable(), // Optional and can be null

  keywords: Yup.array().of(Yup.string().trim()).optional(), // Optional, but can be an empty array

  price: Yup.string().required("Price is required"),
});

export default ProjectValidationSchema;
