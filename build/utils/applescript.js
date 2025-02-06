import { execSync } from 'child_process';
export function runAppleScript(script) {
    try {
        const output = execSync(`osascript -e '${script}'`).toString();
        return {
            success: true,
            output: output.trim()
        };
    }
    catch (error) {
        console.error('AppleScript execution failed:', error);
        return {
            success: false,
            output: '',
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
