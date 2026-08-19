export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactField = keyof ContactPayload;

export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > 80) {
    errors.name = "Name should be under 80 characters.";
  }

  if (!email) {
    errors.email = "An email address is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (subject.length < 3) {
    errors.subject = "Please add a short subject.";
  } else if (subject.length > 120) {
    errors.subject = "Subject should be under 120 characters.";
  }

  if (message.length < 10) {
    errors.message = "Tell me a little more about the project or role.";
  } else if (message.length > 2000) {
    errors.message = "Message should be under 2,000 characters.";
  }

  return errors;
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export type ProjectInquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  description: string;
  requirements: string[];
  timeline: string;
  budget: string;
  isComplete: boolean;
  nextQuestion: string;
};

export type InquiryField = keyof ProjectInquiry;

export type InquiryErrors = Partial<Record<InquiryField, string>>;

function clampText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function phoneDigitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return `94${digits.slice(1)}`;
  if (digits.length === 9 && (digits.startsWith("7") || digits.startsWith("6"))) return `94${digits}`;
  return digits;
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value);
}

export function extractEmail(value: string) {
  const match = value.toLowerCase().match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match?.[0] ?? "";
}

export function isValidPhone(value: string) {
  const digits = normalizePhone(value);
  return digits.length >= 8 && digits.length <= 15;
}

export function normalizeInquiry(input: unknown): ProjectInquiry {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const requirements = Array.isArray(source.requirements)
    ? source.requirements
        .map((item) => clampText(item, 120))
        .filter((item, index, list) => item.length >= 2 && list.indexOf(item) === index)
        .slice(0, 12)
    : [];

  return {
    name: clampText(source.name, 80),
    email: extractEmail(clampText(source.email, 120)) || clampText(source.email, 120).toLowerCase(),
    phone: normalizePhone(clampText(source.phone, 32)) || clampText(source.phone, 32),
    company: clampText(source.company, 80),
    projectType: clampText(source.projectType, 80),
    description: clampText(source.description, 2000),
    requirements,
    timeline: clampText(source.timeline, 80),
    budget: clampText(source.budget, 80),
    isComplete: Boolean(source.isComplete),
    nextQuestion: clampText(source.nextQuestion, 80),
  };
}

export function inquiryRequiredErrors(inquiry: ProjectInquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (inquiry.projectType.length < 2 && inquiry.description.length < 8) {
    errors.projectType = "Project is required.";
  }
  if (inquiry.name.length < 2) errors.name = "Name is required.";
  if (!inquiry.phone) errors.phone = "WhatsApp number is required.";
  else if (!isValidPhone(inquiry.phone)) errors.phone = "Enter a valid WhatsApp or phone number.";
  if (!inquiry.email) errors.email = "Email is required.";
  else if (!isValidEmail(inquiry.email)) errors.email = "Enter a valid email address.";

  return errors;
}

export function validateInquiryForSend(inquiry: ProjectInquiry, consent: boolean): InquiryErrors {
  const errors = inquiryRequiredErrors(inquiry);
  if (!consent) {
    errors.isComplete = "Consent is required before sending.";
  }
  return errors;
}
