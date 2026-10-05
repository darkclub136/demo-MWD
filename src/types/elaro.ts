/** Content shapes for the elaro.framer.website home-page clone. */

export interface NavLink {
  label: string;
  href: string;
}

export interface TickerPhrase {
  text: string;
}

export interface StoryEntry {
  year: string;
  title: string;
  description: string;
  image: string;
  /** Which side the photo sits on at desktop width. */
  imageSide: "left" | "right";
}

export interface VenueDetail {
  label: string;
  value: string;
}

export interface ScheduleEntry {
  time: string;
  title: string;
  description: string;
  image: string;
}

export interface HotelEntry {
  name: string;
  description: string;
  image: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface DressCodePanel {
  image: string;
  imageWidth: number;
  imageHeight: number;
  caption: string;
  /** Horizontal placement inside the 1345px content column at desktop. */
  align: "left" | "right" | "center";
}
