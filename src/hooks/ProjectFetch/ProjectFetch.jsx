import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProjectValidationSchema from "@/schema/CreateProjectSchema/CreateProjectSchema";

const ProjectFetch = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      visibility: "public",
      title: "",
      short_description: "",
      detailed_description: "",
      thumb: "",
      video: "",
      category: "startup",
      status: "complete",
      tools_and_technologies: null,
      expected_outcomes: "",
      challenges: "",
      team_members: "",
      is_seeking_colab: false,
      repository_link: "",
      doc_link: "",
      official_website_link: "",
      comment_allowed: null,
      keywords: [],
      price: "",
    },
    validationSchema: ProjectValidationSchema,

    onSubmit: async () => {
      const formData = new FormData();
      formData.append("visibility", values.visibility);
      formData.append("title", values.title);
      formData.append("short_description", values.short_description);
      formData.append("detailed_description", values.detailed_description);
      formData.append("category", values.category);
      formData.append("status", values.status);
      formData.append(
        "tools_and_technologies",
        JSON.stringify(values.tools_and_technologies)
      );
      formData.append("expected_outcomes", values.expected_outcomes);
      formData.append("challenges", values.challenges);
      formData.append("team_members", values.team_members);
      formData.append("is_seeking_colab", values.is_seeking_colab);
      formData.append("repository_link", values.repository_link);
      formData.append("doc_link", values.doc_link);
      formData.append("official_website_link", values.official_website_link);
      formData.append("comment_allowed", values.comment_allowed);
      formData.append("keywords", JSON.stringify(values.keywords));
      formData.append("price", values.price);
      if (values.thumb) {
        formData.append("thumb", values.thumb);
      }
      if (values.video) {
        formData.append("video", values.video);
      }

      try {
        const response = await axios.post(
          "https://tarsuniverse.net:8443/createproject",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        router.push("/home");
      } catch (error) {
        console.log("error in create project");
      }
    },
  });
  return {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    touched,
    setFieldValue,
  };
};

export default ProjectFetch;
