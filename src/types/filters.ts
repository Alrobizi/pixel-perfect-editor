export interface FilterPreset {
  id: string;
  name: string;
  filter: string;
  isPremium: boolean;
}

export const FREE_FILTERS: FilterPreset[] = [
  { id: "none", name: "أصلي", filter: "none", isPremium: false },
  { id: "grayscale", name: "رمادي", filter: "grayscale(100%)", isPremium: false },
  { id: "sepia", name: "سيبيا", filter: "sepia(80%)", isPremium: false },
  { id: "warm", name: "دافئ", filter: "sepia(20%) saturate(130%)", isPremium: false },
  { id: "cool", name: "بارد", filter: "saturate(80%) hue-rotate(180deg)", isPremium: false },
];

export const PREMIUM_FILTERS: FilterPreset[] = [
  { id: "vintage", name: "كلاسيك", filter: "sepia(30%) contrast(110%)", isPremium: true },
  { id: "dramatic", name: "درامي", filter: "contrast(150%) brightness(90%)", isPremium: true },
  { id: "fade", name: "باهت", filter: "contrast(80%) brightness(110%)", isPremium: true },
  { id: "vivid", name: "حيوي", filter: "saturate(150%) contrast(110%)", isPremium: true },
  { id: "noir", name: "نوار", filter: "grayscale(100%) contrast(130%)", isPremium: true },
  { id: "neon", name: "نيون", filter: "saturate(200%) contrast(130%) hue-rotate(30deg)", isPremium: true },
  { id: "cinema", name: "سينمائي", filter: "contrast(120%) saturate(90%) sepia(20%)", isPremium: true },
  { id: "sunset", name: "غروب", filter: "sepia(50%) saturate(150%) hue-rotate(-20deg)", isPremium: true },
];

export const ALL_FILTERS = [...FREE_FILTERS, ...PREMIUM_FILTERS];
