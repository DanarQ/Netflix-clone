export type HelpArticle = {
  title: string;
  text: string;
  to: string;
  action: string;
};

export type HelpTopic = {
  title: string;
  icon: string;
  articles: HelpArticle[];
};

export const helpTopics: HelpTopic[] = [
  {
    title: "Account & Profiles",
    icon: "M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 4a4 4 0 0 1 0 7M22 21v-3a4 4 0 0 0-3-4",
    articles: [
      {
        title: "How to create, edit, or delete profiles",
        text: "Open Profiles in your Account to manage the people watching. Choose a profile to edit its name or icon, or select Add Profile to create one. You can have up to 5 profiles. To delete a profile, open its editor and choose Delete Profile. The main profile cannot be deleted.",
        to: "/account/profiles",
        action: "Manage profiles",
      },
      {
        title: "How to switch profiles",
        text: "Open the profile menu at the top of the home page and select Switch Profiles. Choose a profile to return to the catalog. Your selected profile is remembered on this browser.",
        to: "/manage-profiles?mode=select",
        action: "Switch profiles",
      },
      {
        title: "Where are my account details saved?",
        text: "Myflix is a demo. Profiles and demo membership choices are saved in this browser, without an online account. They do not sync between devices. Clearing site data can reset these details.",
        to: "/account",
        action: "Go to Account",
      },
    ],
  },
  {
    title: "Membership & Payments",
    icon: "M3 5h18v14H3ZM3 9h18M6 15h4",
    articles: [
      {
        title: "How to change your plan",
        text: "Go to Membership, select Change plan, choose a demo plan, and confirm the change. Plan choices are for demonstration only; they do not change video quality or limit devices.",
        to: "/account/membership?view=plans",
        action: "Change demo plan",
      },
      {
        title: "How to cancel or restart membership",
        text: "Open Membership and select Cancel membership. Review the message and choose Finish cancellation. You can return and select Restart membership at any time. This only updates your demo status and keeps your profiles.",
        to: "/account/membership",
        action: "Manage membership",
      },
      {
        title: "Will I be charged for using Myflix?",
        text: "No. This project has no real subscription, payment processing, or billing. The payment information and history pages show an empty demo state. You do not need to enter card details.",
        to: "/account/membership?view=payment",
        action: "View payment information",
      },
    ],
  },
  {
    title: "Watching Myflix",
    icon: "M3 4h18v14H3ZM8 22h8M12 18v4M10 8l5 3-5 3Z",
    articles: [
      {
        title: "How to watch a movie",
        text: "Browse the home catalog and select a movie's play button. Myflix uses demonstration videos, so the video may differ from the title or artwork. Use the player controls to pause, seek, change volume, or enter full screen.",
        to: "/",
        action: "Browse movies",
      },
      {
        title: "Using the mini player",
        text: "Return to browsing with the player's minimize control to keep the video in a small player. Use the mini player's restore control to return to the full player, or its close control to dismiss it.",
        to: "/",
        action: "Back to browsing",
      },
      {
        title: "Keyboard controls for the player",
        text: "When the full player has keyboard focus, press Space or K to play or pause. Escape returns to browsing when you are not in full screen. You can also use Tab to move between controls and Enter to activate a button.",
        to: "/",
        action: "Find something to watch",
      },
    ],
  },
  {
    title: "Fix a Problem",
    icon: "M12 3 2 21h20ZM12 9v5M12 17v1",
    articles: [
      {
        title: "A video won't play or keeps buffering",
        text: "Check your internet connection and try playing the video again. Refresh the page if needed, and try a different title. Demo videos are loaded from external sources, so an unavailable source may prevent playback.",
        to: "/",
        action: "Return to movies",
      },
      {
        title: "My profile changes aren't saving",
        text: "Check that your browser allows this site to save data. If you see a save error, keep the editor open while you check browser settings, then try again. Private browsing may discard saved profiles when the session ends.",
        to: "/account/profiles",
        action: "Open Profiles",
      },
      {
        title: "My profiles disappeared",
        text: "Make sure you are using the same browser and site address as before. Clearing browser data or using another device can show the default profiles again. This demo has no server backup or profile recovery service.",
        to: "/account/profiles",
        action: "View profiles",
      },
    ],
  },
];

