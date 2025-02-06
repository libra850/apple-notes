import type { Note } from '../types.js';
import { runAppleScript } from '../utils/applescript.js';

export class appleNotesManager {
  createNote(title: string, content: string, tags: string[] = []): Note | null {
    const script = `
      tell application "Notes"
        tell account "iCloud"
          make new note with properties {name:"${title}", body:"${content}"}
        end tell
      end tell
    `;

    const result = runAppleScript(script);
    if (!result.success) return null;

    return {
      id: Date.now().toString(),
      title,
      content,
      tags,
      created: new Date(),
      modified: new Date()
    };
  }

  searchNotes(query: string): Note[] {
    const script = `
      tell application "Notes"
        tell account "iCloud"
          get name of notes where name contains "${query}" or body contains "${query}"
        end tell
      end tell
    `;

    const result = runAppleScript(script);
    if (!result.success) return [];

    return result.output.split(',').map(title => ({
      id: Date.now().toString(),
      title: title.trim(),
      content: '',
      tags: [],
      created: new Date(),
      modified: new Date()
    }));
  }

  getNoteContent(title: string): string {
    const script = `
      tell application "Notes"
        tell account "iCloud"
          get body of note "${title}"
        end tell
      end tell
    `;

    const result = runAppleScript(script);
    return result.success ? result.output : '';
  }
}
