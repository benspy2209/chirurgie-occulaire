
export type Language = 'fr' | 'en';

export interface PageContent {
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export interface SiteContent {
  nav: {
    home: string;
    surgeon: string;
    cataract: string;
    retina: string;
    myopia: string;
    exams: string;
    appointment: string;
    contact: string;
    legal: string;
    privacy: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      image: string;
    };
    intro: {
      title: string;
      text: string;
    };
  };
  surgeon: {
    title: string;
    diplomas: string[];
    specializations: string[];
    activities: string[];
    disclaimer: string; // New field for "what I don't do"
    positions: string[];
  };
  cataract: {
    title: string;
    intro: string;
    intro_secondary?: string;
    technique: {
      title: string;
      steps: string[];
      implant_details?: string;
    };
    cost?: {
      title: string;
      price: string;
      note: string;
    };
    note: string;
  };
  retina: {
    title: string;
    intro: string;
    details: string;
    procedure?: string;
    recovery?: string;
    cost?: {
      title: string;
      price: string;
      note: string;
    };
  };
  myopia: {
    title: string;
    intro: string;
    management_title?: string;
    management_text?: string;
    techniques_title?: string;
    techniques?: string[];
    note?: string;
  };
  exams: {
    title: string;
    intro: string;
    list: string[];
  };
  appointment: {
    title: string;
    intro: string;
    options: {
      wavre: {
        title: string;
        city: string;
        address: string;
        phone: string;
        mikronoLink: string;
        mikronoText: string;
      };
      messidor: {
        title: string;
        city: string;
        address: string;
        phone: string;
        mikronoLink: string;
        mikronoText: string;
      };
      referral: {
        title: string;
        subtitle: string;
        actionText: string;
        description: string;
      };
    };
  };
  contact: {
    title: string;
    consultation_title: string;
    surgery_title: string;
    consultation_locations: {
      name: string;
      address: string;
      phone: string;
      hours: string; // New field
      map_url: string; // New field for iframe embed
      mikrono_text: string;
      mikrono_link: string;
    }[];
    surgery_locations: {
      name: string;
      phone: string;
    }[];
  };
  referral: {
    title: string;
    intro: string;
    form: {
      name: string;
      birthDate: string;
      address: string;
      phone: string;
      email: string;
      message: string;
      file: string;
      file_help: string;
      submit: string;
      success: string;
    };
    note: string;
  };
  legal: {
    title: string;
    content: string;
  };
  privacy: {
    title: string;
    content: string;
  };
}