import { Attendee, CtaTypeEnum, User, Webinar } from "@prisma/client";
import { ValidationErrors } from "@/lib/validation";

interface Header {
  user: User;
}

interface PurpleIcon {
  className?: string;
  children?: React.ReactNode;
}

interface FeatureCard {
  Icon: React.ReactNode;
  heading: string;
  link: string;
}

interface FeatureSectionLayout {
  children: React.ReactNode;
  heading: string;
  link: string;
  className?: string;
}

interface UserInfoCard {
  customer: Attendee;
  tags: string[];
  className?: string;
}

interface WebinarStore {
  isModalOpen: boolean;
  isComplete: boolean;
  isSubmitting: boolean;
  formData: WebinarFormState;
  validation: ValidationState;

  setModalOpen: (open: boolean) => void;
  setComplete: (complete: boolean) => void;
  setSubmitting: (submitting: boolean) => void;

  updateBasicInfoField: <K extends keyof WebinarFormState["basicInfo"]>(
    field: K,
    value: WebinarFormState["basicInfo"][K]
  ) => void;

  updateCTAField: <K extends keyof WebinarFormState["cta"]>(
    field: K,
    value: WebinarFormState["cta"][K]
  ) => void;

  updateAdditionalInfoField: <
    K extends keyof WebinarFormState["additionalInfo"]
  >(
    field: K,
    value: WebinarFormState["additionalInfo"][K]
  ) => void;

  validateStep: (stepId: keyof WebinarFormState) => boolean;

  addTag: (tag: string) => void;
  removeTag: (index: number) => void;

  getStepValidationErrors: (stepId: keyof WebinarFormState) => ValidationErrors;

  resetForm: () => void;
}

interface ValidationState {
  basicInfo: {
    valid: boolean;
    errors: ValidationErrors;
  };
  cta: {
    valid: boolean;
    errors: ValidationErrors;
  };
  additionalInfo: {
    valid: boolean;
    errors: ValidationErrors;
  };
}

export type ValidationResult = {
  valid: boolean;
  errors: ValidationErrors;
};

interface WebinarFormState {
  basicInfo: {
    webinarName?: string;
    description?: string;
    date?: Date;
    time?: string;
    timeFormat?: "AM" | "PM";
  };
  cta: {
    ctaLabel?: string;
    tags?: string[];
    ctaType: CtaTypeEnum;
    aiAgent?: string;
    priceId?: string;
  };
  additionalInfo: {
    lockChat?: boolean;
    couponCode?: string;
    couponEnabled?: boolean;
  };
}

interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (id: string) => void;
}

interface CTAStep {}

interface PageHeader {
  heading?: string;
  mainIcon: React.ReactNode;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  children?: React.ReactNode;
  placeholder?: string;
}

interface WebinarCard {
  webinar: Webinar;
}

interface PipelineIdPage {
  params: Promise<{
    webinarId: string;
  }>;
}

interface AttendanceData {
  count: number;
  users: Attendee[];
}

interface PipelineLayout {
  title: string;
  count: number;
  users: Attendee[];
  tags: string[];
}
