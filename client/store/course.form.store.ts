import { CourseRequest } from "@/types/payload/request/course.request";
import { create } from "zustand";

type CourseFormStore = {
  data: Partial<CourseRequest> | null;
  setData: (data: Partial<CourseRequest> | null) => void;
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  reset: () => void;

  resetSubscribers: (() => void)[];
  subscribeReset: (callback: () => void) => void;
};

const STORAGE = {
  FORM_DATA: "course_form_data",
  FORM_CURRENT_TAB: "course_form_current_tab",
} as const;

function getStoredData(): Partial<CourseRequest> | null {
  if (typeof window === "undefined") return null;

  const currentData = localStorage.getItem(STORAGE.FORM_DATA);
  return currentData
    ? (JSON.parse(currentData) as Partial<CourseRequest>)
    : null;
}

function setStoredData(data: Partial<CourseRequest> | null) {
  if (data === null) {
    localStorage.removeItem(STORAGE.FORM_DATA);
  } else {
    localStorage.setItem(STORAGE.FORM_DATA, JSON.stringify(data));
  }
}

function getCurrentTab(): number {
  if (typeof window === "undefined") return 1;

  const storedData = localStorage.getItem(STORAGE.FORM_CURRENT_TAB);
  return storedData ? Number(JSON.parse(storedData)) : 1;
}

export const useCourseFormStore = create<CourseFormStore>((set, get) => ({
  data: getStoredData(),
  currentTab: getCurrentTab(),
  resetSubscribers: [],

  setData: (data) => {
    if (data === null) {
      setStoredData(null);
      set({ data: null, currentTab: 1 });
    } else {
      const merged = { ...get().data, ...data };
      setStoredData(merged);
      set({ data: merged });
    }
  },

  setCurrentTab: (tab) => set({ currentTab: tab }),

  subscribeReset: (callback) => {
    set((state) => ({
      resetSubscribers: [...state.resetSubscribers, callback],
    }));
  },

  reset: () => {
    localStorage.removeItem(STORAGE.FORM_DATA);
    localStorage.removeItem(STORAGE.FORM_CURRENT_TAB);

    set({ data: null, currentTab: 1 });

    get().resetSubscribers.forEach((cb) => cb());
  },
}));
