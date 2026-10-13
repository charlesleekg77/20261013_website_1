import { create } from "zustand";

/* ============================================================================
   Story + Studio state
   A single Zustand store tracks the active scroll step (the "chapter" the
   reader is currently inside) plus the Studio inspector properties. Scroll
   components write progress here; the progress rail, timeline and inspector
   read from it — keeping every panel in sync without prop drilling.
   ========================================================================== */

export type EasingCurve = "linear" | "power2.out" | "power3.inOut" | "expo.out" | "back.out";

export interface StoryStep {
  id: string;
  title: string;
  /** Optional body copy rendered under the pinned headline. */
  body?: string;
  /** Optional monospaced tag shown above the headline. */
  tag?: string;
  /** Scroll offset where the step becomes active, 0–1 across the pinned track. */
  trigger: number;
  /** How long the scene stays pinned, in viewport heights. */
  pinDuration: number;
  easing: EasingCurve;
}

export interface InspectorState {
  cameraAngle: number;
  transitionEasing: EasingCurve;
  parallaxDepth: number;
  fontSize: number;
  fontWeight: number;
  showGrid: boolean;
  lightsEnabled: boolean;
}

export interface StoryState {
  /* ---- Reader / scrollytelling ---- */
  steps: StoryStep[];
  activeStepIndex: number;
  /** Global document scroll completion, 0–1. */
  globalProgress: number;
  /** Progress within the currently pinned section, 0–1. */
  sectionProgress: number;
  /** Index of the pinned feature section currently in view. */
  activeSection: number;

  setSteps: (steps: StoryStep[]) => void;
  setActiveStep: (index: number) => void;
  setGlobalProgress: (p: number) => void;
  setSectionProgress: (p: number) => void;
  setActiveSection: (i: number) => void;
  addStep: (step?: Partial<StoryStep>) => void;
  removeStep: (id: string) => void;
  updateStep: (id: string, patch: Partial<StoryStep>) => void;
  reorderSteps: (from: number, to: number) => void;

  /* ---- Studio inspector ---- */
  inspector: InspectorState;
  setInspector: (patch: Partial<InspectorState>) => void;

  /* ---- Studio chrome ---- */
  device: "desktop" | "tablet" | "mobile";
  setDevice: (d: StoryState["device"]) => void;
  previewing: boolean;
  togglePreview: () => void;
}

const DEFAULT_STEPS: StoryStep[] = [
  {
    id: "step-01",
    title: "The Hook",
    tag: "scene 01",
    body: "Open on the single image that frames the whole story.",
    trigger: 0.0,
    pinDuration: 1,
    easing: "power2.out",
  },
  {
    id: "step-02",
    title: "Rising Stakes",
    tag: "scene 02",
    body: "Layer the data behind the claim as the reader descends.",
    trigger: 0.25,
    pinDuration: 1,
    easing: "power3.inOut",
  },
  {
    id: "step-03",
    title: "The Reveal",
    tag: "scene 03",
    body: "Rotate the model and let the geometry carry the turn.",
    trigger: 0.55,
    pinDuration: 1.5,
    easing: "expo.out",
  },
  {
    id: "step-04",
    title: "Call to Action",
    tag: "scene 04",
    body: "Land the narrative on one unambiguous next step.",
    trigger: 0.8,
    pinDuration: 1,
    easing: "back.out",
  },
];

export const useStoryStore = create<StoryState>((set, get) => ({
  steps: DEFAULT_STEPS,
  activeStepIndex: 0,
  globalProgress: 0,
  sectionProgress: 0,
  activeSection: 0,

  setSteps: (steps) => set({ steps }),
  setActiveStep: (index) =>
    set({ activeStepIndex: Math.max(0, Math.min(index, get().steps.length - 1)) }),
  setGlobalProgress: (globalProgress) => set({ globalProgress }),
  setSectionProgress: (sectionProgress) => set({ sectionProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),

  addStep: (step) =>
    set((s) => ({
      steps: [
        ...s.steps,
        {
          id: `step-${String(s.steps.length + 1).padStart(2, "0")}`,
          title: "New Step",
          trigger: Math.min(0.99, s.steps.length * 0.2),
          pinDuration: 1,
          easing: "power2.out",
          ...step,
        },
      ],
    })),

  removeStep: (id) =>
    set((s) => ({ steps: s.steps.filter((step) => step.id !== id) })),

  updateStep: (id, patch) =>
    set((s) => ({
      steps: s.steps.map((step) => (step.id === id ? { ...step, ...patch } : step)),
    })),

  reorderSteps: (from, to) =>
    set((s) => {
      const next = [...s.steps];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { steps: next };
    }),

  inspector: {
    cameraAngle: 24,
    transitionEasing: "power2.out",
    parallaxDepth: 0.6,
    fontSize: 16,
    fontWeight: 600,
    showGrid: true,
    lightsEnabled: true,
  },
  setInspector: (patch) => set((s) => ({ inspector: { ...s.inspector, ...patch } })),

  device: "desktop",
  setDevice: (device) => set({ device }),
  previewing: false,
  togglePreview: () => set((s) => ({ previewing: !s.previewing })),
}));

/** Human-readable label for a step's trigger offset, e.g. "25%". */
export const formatTrigger = (t: number) => `${Math.round(t * 100)}%`;
