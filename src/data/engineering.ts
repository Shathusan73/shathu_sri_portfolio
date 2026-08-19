export const engineeringPipeline = [
  { id: "data", label: "Data", detail: "Images, product records, and labelled datasets." },
  { id: "model", label: "AI Model", detail: "CNN and TensorFlow classification pipelines." },
  { id: "api", label: "API", detail: ".NET and Python services exposing model results." },
  { id: "application", label: "Application", detail: "Next.js products that turn inference into UX." },
  { id: "user", label: "User", detail: "Faster search, cleaner catalogues, better decisions." },
] as const;

export const engineeringTech = [
  "Python",
  "TensorFlow",
  "CNN",
  "Computer Vision",
  "AI APIs",
  "Image Classification",
] as const;
