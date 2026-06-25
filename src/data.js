export const profile = {
  name: "Throw",
  location: "Sweden",
  steamLevel: 250,
  description: ["C++ developer.", "CS2 enjoyer."],
  avatar: "/pfp.jpg",
  discord: "ThrowTop",
};

export const links = [
  {
    label: "Steam",
    icon: "steam",
    href: "https://steamcommunity.com/profiles/76561198952505877",
  },
  {
    label: "GitHub",
    icon: "github",
    href: "https://github.com/ThrowTop",
  },
  {
    label: "Main YouTube",
    icon: "youtube",
    href: "https://www.youtube.com/@ThrowTop",
  },
  {
    label: "Clips YouTube",
    icon: "youtube",
    href: "https://www.youtube.com/@ThrowClips",
  },
];

export const projects = [
  {
    name: "HyprWin",
    description: "C++ shortcut tool and window manager.",
    href: "https://github.com/ThrowTop/HyprWin",
  },
  {
    name: "YouTube Uploader",
    description: "Simple and efficient YouTube uploader.",
    href: "https://github.com/ThrowTop/auto_uploader",
  },
  {
    name: "Backup Scripts",
    command: "irm throwtop.dev/backup | iex",
  },
  {
    name: "Finalmouse CLI",
    description: "Simple Finalmouse polling rate changer CLI.",
    href: "https://github.com/ThrowTop/finalmouse",
  },
];

export const cs2Settings = [
  ["DPI", "800"],
  ["Sensitivity", "1.10"],
  ["Resolution", "1440x1080 @ 360Hz"],
  ["Aspect Ratio", "4:3 Stretch"],
];

export const setup = [
  {
    title: "Setup",
    items: [
      ["CPU", "Ryzen 7 7800X3D"],
      ["GPU", "RTX 4070 Super"],
      ["RAM", "DDR5 6000 MT/s"],
      ["Storage", "Samsung 990 Pro 2 TB NVMe"],
      ["Motherboard", "B650E Aorus Elite X AX ICE"],
      ["OS", "Windows 11 24H2"],
      ["Display", "Zowie XL2566K 360Hz"],
    ],
  },
  {
    title: "Audio & Peripherals",
    items: [
      ["Mic", "RODE XDM-100"],
      ["Headset/IEM", "HyperX Cloud II / KZ ZS10 Pro"],
      ["DAC", "FiiO JA11"],
      ["Mouse", "Finalmouse ULX Prophecy 8KHz"],
      ["Keyboard", "IROK MG75 Pro 8KHz"],
      ["Tools", "OBS, Equalizer APO, HyprWin"],
    ],
  },
];

export const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "ThrowTop",
  url: "https://throwtop.dev/",
  sameAs: [
    "https://github.com/ThrowTop",
    "https://steamcommunity.com/profiles/76561198952505877",
    "https://www.youtube.com/@ThrowTop",
    "https://www.youtube.com/@ThrowClips",
  ],
};
