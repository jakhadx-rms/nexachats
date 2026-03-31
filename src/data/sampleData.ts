export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
  online?: boolean;
  lastSeen?: string;
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
  { id: "1", name: "Sarah Chen", avatar: "SC", lastMessage: "Hey! My birthday is on March 15th 🎂", timestamp: "2m ago", unread: 2, isGroup: false, online: true, lastSeen: "Online" },
  { id: "2", name: "Study Group CS401", avatar: "SG", lastMessage: "Don't forget the assignment due Friday", timestamp: "15m ago", unread: 5, isGroup: true },
  { id: "3", name: "Alex Rivera", avatar: "AR", lastMessage: "Can you review my PR?", timestamp: "1h ago", unread: 0, isGroup: false, online: true, lastSeen: "Online" },
  { id: "4", name: "Design Team", avatar: "DT", lastMessage: "Meeting moved to 3pm tomorrow", timestamp: "2h ago", unread: 0, isGroup: true },
  { id: "5", name: "Jamie Park", avatar: "JP", lastMessage: "Thanks for the notes! 🙏", timestamp: "5h ago", unread: 0, isGroup: false, online: false, lastSeen: "Last seen 2h ago" },
  { id: "6", name: "Prof. Williams", avatar: "PW", lastMessage: "Office hours changed to Tuesday", timestamp: "1d ago", unread: 1, isGroup: false, online: false, lastSeen: "Last seen yesterday" },
  { id: "7", name: "Hackathon 2025", avatar: "H2", lastMessage: "Who's bringing the pizza?", timestamp: "1d ago", unread: 0, isGroup: true },
  { id: "8", name: "Maya Johnson", avatar: "MJ", lastMessage: "See you at the library at 4!", timestamp: "2d ago", unread: 0, isGroup: false, online: false, lastSeen: "Last seen 3d ago" },
];

export const chatMessages: Record<string, Message[]> = {
  "1": [
    { id: "1-1", text: "Hey Sarah! How's the project going?", sender: "me", timestamp: "10:30 AM" },
    { id: "1-2", text: "It's going well! Almost done with the frontend 🚀", sender: "other", senderName: "Sarah", timestamp: "10:31 AM" },
    { id: "1-3", text: "That's awesome! When's the deadline again?", sender: "me", timestamp: "10:32 AM" },
    { id: "1-4", text: "The project deadline is next Friday, March 21st", sender: "other", senderName: "Sarah", timestamp: "10:33 AM", isMemory: true, memoryType: "deadline" },
    { id: "1-5", text: "Got it, thanks! By the way, do we have any celebration planned?", sender: "me", timestamp: "10:35 AM" },
    { id: "1-6", text: "Oh yes! My birthday is on March 15th 🎂 We should do something!", sender: "other", senderName: "Sarah", timestamp: "10:36 AM", isMemory: true, memoryType: "birthday" },
    { id: "1-7", text: "Happy early birthday! 🎉 I'll organize something with the team", sender: "me", timestamp: "10:37 AM" },
    { id: "1-8", text: "You're the best! Also can you remind me to submit the report by Wednesday?", sender: "other", senderName: "Sarah", timestamp: "10:38 AM", isMemory: true, memoryType: "task" },
    { id: "1-9", text: "Sure thing! I'll set a reminder for both of us 👍", sender: "me", timestamp: "10:39 AM" },
  ],
  "2": [
    { id: "2-1", text: "Hey everyone, anyone started on the CS401 assignment?", sender: "other", senderName: "Mike", timestamp: "9:00 AM" },
    { id: "2-2", text: "I'm about halfway through Problem 3", sender: "me", timestamp: "9:05 AM" },
    { id: "2-3", text: "Problem 3 is tricky. The edge case with negative inputs caught me off guard", sender: "other", senderName: "Lisa", timestamp: "9:10 AM" },
    { id: "2-4", text: "Don't forget the assignment is due Friday!", sender: "other", senderName: "Mike", timestamp: "9:15 AM", isMemory: true, memoryType: "deadline" },
    { id: "2-5", text: "Thanks for the reminder! Anyone want to meet at the library to work on it?", sender: "me", timestamp: "9:20 AM" },
  ],
  "3": [
    { id: "3-1", text: "Hey Alex! How's it going?", sender: "me", timestamp: "Yesterday 3:00 PM" },
    { id: "3-2", text: "Good! Just pushed the new feature branch. Can you review my PR?", sender: "other", senderName: "Alex", timestamp: "Yesterday 3:15 PM" },
    { id: "3-3", text: "Sure, I'll take a look this afternoon", sender: "me", timestamp: "Yesterday 3:20 PM" },
    { id: "3-4", text: "Great, no rush. The main changes are in the auth module", sender: "other", senderName: "Alex", timestamp: "Yesterday 3:22 PM" },
  ],
  "4": [
    { id: "4-1", text: "Quick update: tomorrow's design review is moved to 3pm", sender: "other", senderName: "Rachel", timestamp: "11:00 AM", isMemory: true, memoryType: "event" },
    { id: "4-2", text: "Got it, thanks for the heads up!", sender: "me", timestamp: "11:05 AM" },
    { id: "4-3", text: "I'll share the updated mockups before the meeting", sender: "other", senderName: "Tom", timestamp: "11:10 AM" },
    { id: "4-4", text: "Perfect, looking forward to seeing them 👍", sender: "me", timestamp: "11:12 AM" },
  ],
  "5": [
    { id: "5-1", text: "Hey Jamie, here are the notes from today's lecture", sender: "me", timestamp: "Yesterday 2:00 PM" },
    { id: "5-2", text: "You're a lifesaver! I missed class because of a doctor's appointment", sender: "other", senderName: "Jamie", timestamp: "Yesterday 4:30 PM" },
    { id: "5-3", text: "No worries! Let me know if anything is unclear", sender: "me", timestamp: "Yesterday 4:35 PM" },
    { id: "5-4", text: "Thanks for the notes! 🙏", sender: "other", senderName: "Jamie", timestamp: "Yesterday 4:40 PM" },
  ],
  "6": [
    { id: "6-1", text: "Professor, will there be a review session before the midterm?", sender: "me", timestamp: "Monday 10:00 AM" },
    { id: "6-2", text: "Yes, I've scheduled one for next Tuesday during office hours", sender: "other", senderName: "Prof. Williams", timestamp: "Monday 2:00 PM" },
    { id: "6-3", text: "Also, office hours are now changed to Tuesday 2-4pm", sender: "other", senderName: "Prof. Williams", timestamp: "Monday 2:01 PM", isMemory: true, memoryType: "event" },
    { id: "6-4", text: "Thank you, Professor! I'll be there", sender: "me", timestamp: "Monday 2:10 PM" },
  ],
  "7": [
    { id: "7-1", text: "Team, hackathon is this weekend! 🎉", sender: "other", senderName: "Organizer", timestamp: "2 days ago" },
    { id: "7-2", text: "I'm so excited! What's our project idea?", sender: "me", timestamp: "2 days ago" },
    { id: "7-3", text: "Let's do an AI-powered study buddy app", sender: "other", senderName: "Dev", timestamp: "2 days ago" },
    { id: "7-4", text: "Who's bringing the pizza? 🍕", sender: "other", senderName: "Foodie", timestamp: "1 day ago" },
    { id: "7-5", text: "I got it covered! 3 large pizzas incoming", sender: "me", timestamp: "1 day ago" },
  ],
  "8": [
    { id: "8-1", text: "Hey Maya! Want to study together later?", sender: "me", timestamp: "3 days ago" },
    { id: "8-2", text: "Sure! How about the library at 4?", sender: "other", senderName: "Maya", timestamp: "3 days ago" },
    { id: "8-3", text: "Sounds good, I'll grab us some coffee ☕", sender: "me", timestamp: "3 days ago" },
    { id: "8-4", text: "See you at the library at 4!", sender: "other", senderName: "Maya", timestamp: "2 days ago" },
  ],
};

// Auto-reply pools per chat
export const autoReplies: Record<string, string[]> = {
  "1": [
    "Sounds good! Let me check my schedule 📅",
    "Haha that's funny 😂",
    "I'll send you the files later today",
    "Oh wait, I just remembered something important!",
    "Can we discuss this after class?",
    "Sure, I'll be there! 🙌",
    "That makes sense. Let me think about it.",
    "Perfect, thanks for letting me know! 💯",
  ],
  "2": [
    "Has anyone checked Piazza for hints?",
    "I think the TA posted a clarification",
    "Let's set up a study session",
    "Good point! I hadn't thought of that",
    "The submission portal is open now",
  ],
  "3": [
    "Thanks for looking at it! Let me know your thoughts",
    "I also refactored the API layer, check that too",
    "The tests should all pass now",
    "Good catch! I'll fix that",
    "Want to pair program on the next feature?",
  ],
  "4": [
    "Updated the Figma link in the shared drive",
    "The client loved the last iteration!",
    "Can someone review the mobile designs?",
    "I'll prepare the presentation slides",
  ],
  "5": [
    "These notes are so helpful, thank you!",
    "Do you know what chapters the exam covers?",
    "I'll share my notes from last week too",
    "Want to form a study group?",
  ],
  "6": [
    "Please check the syllabus for updated reading list",
    "The midterm will cover chapters 1-8",
    "Don't forget to submit your lab report",
    "Good question, we'll discuss this in class",
  ],
  "7": [
    "Let's finalize the tech stack tonight",
    "I found a great API we can use!",
    "Who's handling the frontend?",
    "The judges list is out, check the website!",
    "Don't forget to register by midnight! ⏰",
  ],
  "8": [
    "The library closes at 9pm tonight",
    "I found a great study spot on the 3rd floor",
    "Want to grab dinner after?",
    "I brought extra highlighters if you need any 🖍️",
  ],
};

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
