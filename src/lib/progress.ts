export type ProgressState = {
  status: "unstarted" | "attempted" | "solved";
  notes?: string;
  flagRevision?: boolean;
};

export type ProgressMap = Record<string, boolean | ProgressState>;

export function isSolved(val: boolean | ProgressState | undefined): boolean {
  if (typeof val === "boolean") return val;
  return val?.status === "solved";
}

export function getStatus(val: boolean | ProgressState | undefined): "unstarted" | "attempted" | "solved" {
  if (typeof val === "boolean") return val ? "solved" : "unstarted";
  return val?.status || "unstarted";
}

export function getNotes(val: boolean | ProgressState | undefined): string {
  if (typeof val === "boolean") return "";
  return val?.notes || "";
}

export function isFlagged(val: boolean | ProgressState | undefined): boolean {
  if (typeof val === "boolean") return false;
  return val?.flagRevision || false;
}
