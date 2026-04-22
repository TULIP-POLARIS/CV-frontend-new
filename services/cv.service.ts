import { CVData, GenerateCVResponse } from "../types/cv";

const API_BASE_URL = "https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/cv";

/**
 * Extract text from string or TextWithSource object
 */
function extractText(value: string | { text: string; source?: any } | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "text" in value) return value.text;
  return "";
}

/**
 * Transform API response to CVData format
 */
function transformGeneratedCVToCVData(response: GenerateCVResponse): CVData {
  const { generatedCv } = response;
  const { sections, metadata } = generatedCv;


  const cvData = {
    name: sections.profile?.fullName || `${sections.profile?.firstName || ""} ${sections.profile?.lastName || ""}`.trim() || "N/A",
    title: metadata.targetJobTitle,
    summary: extractText(sections.summary),
    skills: Array.isArray(sections.skills) ? sections.skills.map((skill: any) => skill.name || skill) : [],
    languages: Array.isArray(sections.languages) ? sections.languages : [],
    education: Array.isArray(sections.education) ? sections.education.map((edu: any) => ({
      degree: edu.degree || "",
      field: edu.fieldOfStudy,
      institution: edu.institution || "",
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
    })) : [],
    experience: Array.isArray(sections.workExperience) ? sections.workExperience.map((work: any) => ({
      title: work.jobTitle || "",
      company: work.company,
      duration: work.startDate && work.endDate
        ? `${work.startDate} - ${work.currentlyWorking ? "Present" : work.endDate}`
        : "",
      description: work.description || "",
    })) : [],
    contact: {
      phone: sections.profile?.phoneNumber || "",
      email: sections.profile?.email || "", 
      address: sections.profile?.address || "",
      linkedin: sections.profile?.linkedin || "",
    },
  };

  return cvData;
}

export interface GeneratedCvStats {
  totalGeneratedCvs: number;
  totalUsers: number;
}

export async function generateCv({
  token,
  jobTitle,
  jobDescription,
}: {
  token: string;
  jobTitle: string;
  jobDescription: string;
}): Promise<{ data: CVData; response: GenerateCVResponse }> {
  const res = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      jobTitle: jobTitle ?? "",
      jobDescription: jobDescription ?? "",
    }),
  });

  const data: GenerateCVResponse = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Error generating the CV.");
  }

  // Transform the response to CVData format
  const cvData = transformGeneratedCVToCVData(data);

  return {
    data: cvData,
    response: data,
  };
}

export async function fetchGeneratedCvStats(token: string): Promise<GeneratedCvStats> {
  const res = await fetch(`${API_BASE_URL}/generated/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to load usage metrics.');
  }

  return {
    totalGeneratedCvs: Number(data?.totalGeneratedCvs ?? 0),
    totalUsers: Number(data?.totalUsers ?? 0),
  };
}
