// Vercel accepteert verzoeken tot 4,5 MB; daarom max. 4 MB voor het cv.
export const MAX_CV_BYTES = 4 * 1024 * 1024;
export const CV_EXTENSIES = ["pdf", "doc", "docx"];
export const CV_ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
