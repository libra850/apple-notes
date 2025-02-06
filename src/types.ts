export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created: Date;
  modified: Date;
}

export interface AppleScriptResult {
  success: boolean;
  output: string;
  error?: string;
}
