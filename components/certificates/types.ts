export type CertificateCategory =
  | "game-dev"
  | "ai"
  | "web-dev";

export type CertificateStatus =
  | "completed"
  | "in-progress";

export interface Certificate {
  id: string;

  title: string;

  issuer: string;

  year: string;

  category: CertificateCategory;

  status: CertificateStatus;

  description: string;

  skills: string[];

  image?: string;

  pdf?: string;

  credentialId?: string;

  progress?: number;

  expectedCompletion?: string;

  featured?: boolean;
}