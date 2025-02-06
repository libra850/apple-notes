import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { appleNotesManager } from "./services/appleNotesManager.js";

const server = new McpServer({
  name: "apple-notes",
  version: "1.0.0"
});

const notesManager = new appleNotesManager();

interface CreateNoteParams {
  title: string;
  content: string;
  tags?: string[];
}

interface SearchParams {
  query: string;
}

interface GetNoteParams {
  title: string;
}

server.tool(
  "create-note",
  {
    title: z.string(),
    content: z.string(),
    tags: z.array(z.string()).optional()
  },
  async ({ title, content, tags = [] }: CreateNoteParams) => {
    const note = notesManager.createNote(title, content, tags);
    if (!note) {
      return {
        content: [{
          type: "text",
          text: "Failed to create note"
        }],
        isError: true
      };
    }

    return {
      content: [{
        type: "text",
        text: `Note created: ${note.title}`
      }]
    };
  }
);

server.tool(
  "search-notes",
  {
    query: z.string()
  },
  async ({ query }: SearchParams) => {
    const notes = notesManager.searchNotes(query);
    return {
      content: [{
        type: "text",
        text: notes.length ? notes.map(note => note.title).join('\n') : "No notes found"
      }]
    };
  }
);

server.tool(
  "get-note-content",
  {
    title: z.string()
  },
  async ({ title }: GetNoteParams) => {
    const content = notesManager.getNoteContent(title);
    return {
      content: [{
        type: "text",
        text: content || "Note not found"
      }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
