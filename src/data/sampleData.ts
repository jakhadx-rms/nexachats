export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
  online?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  senderName?: string;
  timestamp: string;
  isMemory?: boolean;
  memoryType?: "birthday" | "task" | "event" | "deadline";
}

export interface Memory {
  id: string;
  type: "birthday" | "task" | "event" | "deadline";
  title: string;
  date: string;
  person: string;
  context: string;
}

export const chats: Chat[] = [
  { id: "1", name: "Sarah Chen", avatar: "SC", lastMessage: "Hey! My birthday is on March 15th 🎂", timestamp: "2m ago", unread: 2, isGroup: false, online: true },
  { id: "2", name: "Study Group CS401", avatar: "SG", lastMessage: "Don't forget the assignment due Friday", timestamp: "15m ago", unread: 5, isGroup: true },
  { id: "3", name: "Alex Rivera", avatar: "AR", lastMessage: "Can you review my PR?", timestamp: "1h ago", unread: 0, isGroup: false, online: true },
  { id: "4", name: "Design Team", avatar: "DT", lastMessage: "Meeting moved to 3pm tomorrow", timestamp: "2h ago", unread: 0, isGroup: true },
  { id: "5", name: "Jamie Park", avatar: "JP", lastMessage: "Thanks for the notes! 🙏", timestamp: "5h ago", unread: 0, isGroup: false, online: false },
  { id: "6", name: "Prof. Williams", avatar: "PW", lastMessage: "Office hours changed to Tuesday", timestamp: "1d ago", unread: 1, isGroup: false, online: false },
  { id: "7", name: "Hackathon 2025", avatar: "H2", lastMessage: "Who's bringing the pizza?", timestamp: "1d ago", unread: 0, isGroup: true },
  { id: "8", name: "Maya Johnson", avatar: "MJ", lastMessage: "See you at the library at 4!", timestamp: "2d ago", unread: 0, isGroup: false, online: false },
];

export const messages: Message[] = [
  { id: "1", text: "Hey Sarah! How's the project going?", sender: "me", timestamp: "10:30 AM" },
  { id: "2", text: "It's going well! Almost done with the frontend 🚀", sender: "other", senderName: "Sarah", timestamp: "10:31 AM" },
  { id: "3", text: "That's awesome! When's the deadline again?", sender: "me", timestamp: "10:32 AM" },
  { id: "4", text: "The project deadline is next Friday, March 21st", sender: "other", senderName: "Sarah", timestamp: "10:33 AM", isMemory: true, memoryType: "deadline" },
  { id: "5", text: "Got it, thanks! By the way, do we have any celebration planned?", sender: "me", timestamp: "10:35 AM" },
  { id: "6", text: "Oh yes! My birthday is on March 15th 🎂 We should do something!", sender: "other", senderName: "Sarah", timestamp: "10:36 AM", isMemory: true, memoryType: "birthday" },
  { id: "7", text: "Happy early birthday! 🎉 I'll organize something with the team", sender: "me", timestamp: "10:37 AM" },
  { id: "8", text: "You're the best! Also can you remind me to submit the report by Wednesday?", sender: "other", senderName: "Sarah", timestamp: "10:38 AM", isMemory: true, memoryType: "task" },
  { id: "9", text: "Sure thing! I'll set a reminder for both of us 👍", sender: "me", timestamp: "10:39 AM" },
];

export const memories: Memory[] = [
  { id: "1", type: "birthday", title: "Sarah's Birthday", date: "March 15, 2025", person: "Sarah Chen", context: "She mentioned wanting to celebrate with the team" },
  { id: "2", type: "deadline", title: "Project Deadline", date: "March 21, 2025", person: "Sarah Chen", context: "Frontend project submission for CS401" },
  { id: "3", type: "task", title: "Submit Report", date: "Wednesday", person: "Sarah Chen", context: "Report needs to be submitted by Wednesday" },
  { id: "4", type: "event", title: "Design Meeting", date: "Tomorrow, 3pm", person: "Design Team", context: "Meeting time was changed from 2pm" },
];

export const smartReplies = [
  "Sure, I'll get that done! 👍",
  "Let me check and get back to you",
  "Sounds great, count me in! 🎉",
  "I'll add that to my task list",
];

export const chatSummary = "This conversation covered the CS401 frontend project progress, which is nearly complete. Key items: project deadline is March 21st, Sarah's birthday is March 15th (team celebration planned), and a report needs to be submitted by Wednesday.";
