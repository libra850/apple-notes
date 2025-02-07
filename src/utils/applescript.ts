import { execSync } from 'child_process';
import type { AppleScriptResult } from '@/types.js';

export function runAppleScript(script: string): AppleScriptResult {
  try {
    const output = execSync(`osascript -e '${script}'`).toString();
    return {
      success: true,
      output: output.trim()
    };
  } catch (error) {
    console.error('AppleScript execution failed:', error);
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
