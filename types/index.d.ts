import { Attendee, User } from "@prisma/client";

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
