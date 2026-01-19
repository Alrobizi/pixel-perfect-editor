export interface FilterPreset {
  id: string;
  name: string;
  filter: string;
}

export const FILTERS: FilterPreset[] = [
  { id: "none", name: "أصلي", filter: "none" },
  { id: "grayscale", name: "رمادي", filter: "grayscale(100%)" },
  { id: "sepia", name: "سيبيا", filter: "sepia(80%)" },
  { id: "warm", name: "دافئ", filter: "sepia(20%) saturate(130%)" },
  { id: "cool", name: "بارد", filter: "saturate(80%) hue-rotate(180deg)" },
  { id: "vintage", name: "كلاسيك", filter: "sepia(30%) contrast(110%)" },
  { id: "dramatic", name: "درامي", filter: "contrast(150%) brightness(90%)" },
  { id: "fade", name: "باهت", filter: "contrast(80%) brightness(110%)" },
  { id: "vivid", name: "حيوي", filter: "saturate(150%) contrast(110%)" },
  { id: "noir", name: "نوار", filter: "grayscale(100%) contrast(130%)" },
  { id: "neon", name: "نيون", filter: "saturate(200%) contrast(130%) hue-rotate(30deg)" },
  { id: "cinema", name: "سينمائي", filter: "contrast(120%) saturate(90%) sepia(20%)" },
  { id: "sunset", name: "غروب", filter: "sepia(50%) saturate(150%) hue-rotate(-20deg)" },
];

export const ALL_FILTERS = FILTERS;
