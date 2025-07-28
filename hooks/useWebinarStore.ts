import { create } from "zustand";

import { ValidationState, WebinarFormState, type WebinarStore } from "@/types";
import {
  validateAdditionalInfo,
  validateBasicInfo,
  validateCTA,
  ValidationResult,
} from "@/lib/validation";

const initialState: WebinarFormState = {
  basicInfo: {
    webinarName: "",
    description: "",
    date: undefined,
    time: "",
    timeFormat: "AM",
  },
  cta: {
    ctaLabel: "",
    tags: [],
    ctaType: "BOOK_A_CALL",
    aiAgent: "",
    priceId: "",
  },
  additionalInfo: {
    lockChat: false,
    couponCode: "",
    couponEnabled: false,
  },
};

export const initialValidation: ValidationState = {
  basicInfo: {
    valid: false,
    errors: {},
  },
  cta: {
    valid: false,
    errors: {},
  },
  additionalInfo: {
    valid: false,
    errors: {},
  },
};

export const useWebinarStore = create<WebinarStore>((set, get) => ({
  isModalOpen: false,
  isComplete: false,
  isSubmitting: false,
  formData: initialState,
  validation: initialValidation,

  setModalOpen: (open: boolean) => set({ isModalOpen: open }),
  setComplete: (complete: boolean) => set({ isComplete: complete }),
  setSubmitting: (submitting: boolean) => set({ isSubmitting: submitting }),

  updateBasicInfoField: (field, value) => {
    set((state) => {
      const newBasicInfo = { ...state.formData.basicInfo, [field]: value };

      const validationResult = validateBasicInfo(newBasicInfo);

      return {
        formData: { ...state.formData, basicInfo: newBasicInfo },
        validation: {
          ...state.validation,
          basicInfo: validationResult,
        },
      };
    });
  },

  updateCTAField: (field, value) => {
    set((state) => {
      const newCTA = { ...state.formData.cta, [field]: value };

      const validationResult = validateCTA(newCTA);

      return {
        formData: { ...state.formData, cta: newCTA },
        validation: { ...state.validation, cta: validationResult },
      };
    });
  },

  updateAdditionalInfoField: (field, value) => {
    set((state) => {
      const newAdditionalInfo = {
        ...state.formData.additionalInfo,
        [field]: value,
      };

      const validationResult = validateAdditionalInfo(newAdditionalInfo);

      return {
        formData: {
          ...state.formData,
          additionalInfo: newAdditionalInfo,
        },
        validation: {
          ...state.validation,
          additionalInfo: validationResult,
        },
      };
    });
  },

  validateStep: (stepId: keyof WebinarFormState) => {
    const { formData } = get();
    let validationResult: ValidationResult;

    switch (stepId) {
      case "basicInfo":
        validationResult = validateBasicInfo(formData.basicInfo);
        break;

      case "cta":
        validationResult = validateCTA(formData.cta);
        break;

      case "additionalInfo":
        validationResult = validateAdditionalInfo(formData.additionalInfo);
        break;
    }
    set((state) => {
      return {
        validation: { ...state.validation, [stepId]: validationResult },
      };
    });

    return validationResult.valid;
  },

  getStepValidationErrors: (stepId: keyof WebinarFormState) => {
    return get().validation[stepId].errors;
  },

  resetForm: () => {
    set({
      isModalOpen: false,
      isComplete: false,
      isSubmitting: false,
      formData: initialState,
      validation: initialValidation,
    });
  },

  addTag: (tag: string) =>
    set((state) => {
      const newTags = [...(state.formData.cta.tags || []), tag];

      const newCTA = {
        ...state.formData.cta,
        tags: newTags,
      };

      return {
        formData: {
          ...state.formData,
          cta: newCTA,
        },
      };
    }),

  removeTag: (index: number) =>
    set((state) => {
      const newTags = (state.formData.cta.tags || []).filter(
        (_, i) => i !== index
      );

      const newCTA = {
        ...state.formData.cta,
        tags: newTags,
      };

      return {
        formData: {
          ...state.formData,
          cta: newCTA,
        },
      };
    }),
}));
