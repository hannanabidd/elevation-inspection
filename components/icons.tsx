/*
  Every icon on the site comes through this file, from Phosphor Icons (https://phosphoricons.com).

  - Bold weight by default: the chunky strokes match the extrabold Montserrat headings.
  - Decorative by default (aria-hidden); pass aria-hidden={false} plus a label if one carries meaning.
  - Size with Tailwind classes, e.g. className="size-5".
  - The /dist/ssr entry works in both server and client components.

  To change the weight site-wide, edit WEIGHT. To add an icon, import it below and export it.
*/
import type { ComponentType } from "react";
import type { Icon as PhosphorIcon, IconProps, IconWeight } from "@phosphor-icons/react";
import {
  ArrowRight as PArrowRight,
  CaretDown as PCaretDown,
  Buildings as PBuildings,
  CalendarCheck as PCalendarCheck,
  Camera as PCamera,
  Check as PCheck,
  CheckCircle as PCheckCircle,
  ClipboardText as PClipboardText,
  Drop as PDrop,
  EnvelopeSimple as PEnvelopeSimple,
  EyeSlash as PEyeSlash,
  FileText as PFileText,
  HardHat as PHardHat,
  HouseLine as PHouseLine,
  Lightning as PLightning,
  List as PList,
  MapPin as PMapPin,
  MapTrifold as PMapTrifold,
  Moon as PMoon,
  Phone as PPhone,
  PhoneCall as PPhoneCall,
  Sun as PSun,
  Tag as PTag,
  UsersThree as PUsersThree,
  WarningCircle as PWarningCircle,
  WarningDiamond as PWarningDiamond,
  Wrench as PWrench,
  X as PX,
} from "@phosphor-icons/react/dist/ssr";

const WEIGHT: IconWeight = "bold";

export type IconType = ComponentType<IconProps>;

function icon(Base: PhosphorIcon, name: string): IconType {
  const Icon = (props: IconProps) => <Base weight={WEIGHT} aria-hidden {...props} />;
  Icon.displayName = name;
  return Icon;
}

/* Interface */
export const ArrowRight = icon(PArrowRight, "ArrowRight");
export const CaretDown = icon(PCaretDown, "CaretDown");
export const Check = icon(PCheck, "Check");
export const CheckCircle = icon(PCheckCircle, "CheckCircle");
export const Close = icon(PX, "Close");
export const Menu = icon(PList, "Menu");
export const Sun = icon(PSun, "Sun");
export const Moon = icon(PMoon, "Moon");
export const WarningCircle = icon(PWarningCircle, "WarningCircle");

/* Contact */
export const Phone = icon(PPhone, "Phone");
export const PhoneCall = icon(PPhoneCall, "PhoneCall");
export const Mail = icon(PEnvelopeSimple, "Mail");
export const MapPin = icon(PMapPin, "MapPin");
export const MapIcon = icon(PMapTrifold, "MapIcon");

/* Membership features */
export const CalendarCheck = icon(PCalendarCheck, "CalendarCheck"); // two inspections a year
export const Report = icon(PFileText, "Report"); // digital reports
export const Camera = icon(PCamera, "Camera"); // photo history
export const HardHat = icon(PHardHat, "HardHat"); // engineering review
export const Lightning = icon(PLightning, "Lightning"); // priority scheduling
export const Tag = icon(PTag, "Tag"); // member pricing on repairs

/* People, places, work */
export const HouseLine = icon(PHouseLine, "HouseLine"); // rental owners
export const UsersThree = icon(PUsersThree, "UsersThree"); // property managers
export const Buildings = icon(PBuildings, "Buildings"); // several rentals
export const Wrench = icon(PWrench, "Wrench"); // maintenance
export const ClipboardText = icon(PClipboardText, "ClipboardText"); // inspection / form

/* The story (About timeline) */
export const Drop = icon(PDrop, "Drop"); // water: gutters, downspouts, drainage
export const EyeSlash = icon(PEyeSlash, "EyeSlash"); // nobody catches it
export const WarningDiamond = icon(PWarningDiamond, "WarningDiamond"); // something fails
