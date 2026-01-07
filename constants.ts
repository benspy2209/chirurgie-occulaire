import { SiteContent } from './types';

export const CONTENT: Record<string, SiteContent> = {
  fr: {
    nav: {
      home: "Accueil",
      surgeon: "Présentation",
      cataract: "Cataracte",
      retina: "Vitréo-Rétinienne",
      myopia: "Myopie Forte",
      exams: "Consultations",
      appointment: "Prendre RDV",
      contact: "Contact & Lieux",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité"
    },
    home: {
      hero: {
        title: "Dr Rémi Dewispelaere",
        subtitle: "Chirurgie Ophtalmologique & Vitréo-Rétinienne",
        cta: "Prendre Rendez-vous"
      },
      intro: {
        title: "Expertise et Rigueur Médicale",
        text: "Spécialiste en chirurgie intra-oculaire, le Dr Dewispelaere vous accueille pour une prise en charge personnalisée de vos pathologies oculaires. Une approche fondée sur la maîtrise technique et l'écoute du patient."
      }
    },
    surgeon: {
      title: "Parcours et Expertise",
      diplomas: [
        "Spécialiste en ophtalmologie (ULB, Plus Grande Distinction)",
        "Fellow of the European Board of Ophthalmology (EBO, Paris – 2014)",
        "Plus de 10 ans d’expertise en chirurgie intra-oculaire",
        "Responsable du cours de chirurgie ophtalmologique à la faculté de médecine – ULB"
      ],
      specializations: [
        "Chirurgie de la cataracte",
        "Chirurgie vitréo-rétinienne (rétine et vitré)"
      ],
      activities: [
        "Chirurgien à fort volume (> 400 chirurgies de la cataracte/an)",
        "Pratique régulière de la chirurgie vitréo-rétinienne (vitrectomies 25G)"
      ],
      disclaimer: "Le docteur ne réalise pas de consultations de dépistage ni de consultations pour lunettes.",
      positions: [
        "Responsable du département de chirurgie ophtalmologique – CHU Saint-Pierre",
        "Consultant – Messidor Eye Center",
        "Consultant – Clinique Le Verseau"
      ]
    },
    cataract: {
      title: "Chirurgie de la Cataracte",
      intro: "La chirurgie de la cataracte est l'acte chirurgical le plus pratiqué en ophtalmologie. Elle consiste à remplacer le cristallin opacifié par un implant artificiel transparent.",
      intro_secondary: "Dans certains cas, une chirurgie de la cataracte ou du cristallin peut être réalisée afin de répondre à la volonté de ne plus porter de lunettes ou de prévenir un glaucome par fermeture de l’angle.",
      technique: {
        title: "Technique Opératoire",
        steps: [
          "Micro-incisions cornéennes auto-étanches ne nécessitant généralement pas de suture.",
          "Phacoémulsification : fragmentation et aspiration du cristallin par ultrasons.",
          "Implantation d'une lentille intra-oculaire pliable adaptée à l'œil du patient."
        ],
        implant_details: "L’intervention consiste en l’implantation d’une lentille dont les paramètres auront été calculés afin de limiter, voire d’abolir, la dépendance aux lunettes."
      },
      cost: {
        title: "Coût de l’intervention",
        price: "Entre 500 et 1 000 euros à la charge du patient",
        note: "Montant parfois inférieur en fonction du statut d’assurabilité"
      },
      note: "Les modalités précises de l'intervention et le choix de l'implant sont discutés lors de la consultation pré-opératoire afin de répondre aux besoins spécifiques de chaque patient."
    },
    retina: {
      title: "Chirurgie Vitréo-Rétinienne",
      intro: "Cette chirurgie spécialisée concerne les pathologies affectant le fond de l'œil, notamment la rétine et le vitré.",
      details: "Le Dr Dewispelaere pratique la vitrectomie, une intervention de microchirurgie permettant de traiter diverses affections rétiniennes. La prise en charge se fait au sein de plateaux techniques de pointe.",
      procedure: "La chirurgie vitréo-rétinienne est réalisée à l’aide d’instruments 25 gauges, sous microscope et sous anesthésie locale. C'est une intervention indolore.",
      recovery: "La récupération dépend de la pathologie sous-jacente.",
      cost: {
        title: "Coût de l’intervention",
        price: "Entre 800 et 1 500 euros selon la pathologie",
        note: "Montant parfois inférieur en fonction du statut d’assurabilité"
      }
    },
    myopia: {
      title: "Myopie Forte",
      intro: "La myopie forte nécessite un suivi particulier en raison des risques accrus de complications rétiniennes.",
      management_title: "Prise en charge chirurgicale",
      management_text: "La prise en charge chirurgicale de la myopie forte dépend fortement de l’âge du patient et des problèmes associés.",
      techniques_title: "Techniques pratiquées",
      techniques: [
        "Mise en place d’un implant phaque (ICL)",
        "Chirurgie de la cataracte (dans certains cas)",
        "Traitement de la présence de corps flottants (dans certains cas)"
      ],
      note: "Les particularités des patients myopes étant très nombreuses, chaque situation est discutée au cas par cas en consultation."
    },
    exams: {
      title: "Consultations & Examens",
      intro: "Les cabinets disposent de l'équipement nécessaire pour réaliser un bilan ophtalmologique complet.",
      list: [
        "Mesure de l'acuité visuelle et réfraction",
        "Examen à la lampe à fente (segment antérieur)",
        "OCT (Tomographie par Cohérence Optique)",
        "Biométrie pour calcul d'implant",
        "Topographie cornéenne"
      ]
    },
    appointment: {
      title: "Prise de Rendez-vous",
      intro: "Veuillez sélectionner l'une des options ci-dessous.",
      options: {
        wavre: {
          title: "Clinique Le Verseau",
          city: "Wavre",
          address: "Chaussée de Louvain 43/2, 1300 Wavre",
          phone: "+32 10 41 28 01",
          mikronoLink: "https://www.mikrono.com", 
          mikronoText: "Prendre RDV (Mikrono)"
        },
        messidor: {
          title: "Messidor Eye Center",
          city: "Uccle",
          address: "Avenue de Messidor 215, 1180 Uccle",
          phone: "+32 2 346 68 02",
          mikronoLink: "https://www.mikrono.com", 
          mikronoText: "Prendre RDV (Mikrono)"
        },
        referral: {
          title: "Rendez-vous Rapide",
          subtitle: "Votre ophtalmologue vous réfère et vous souhaitez un rendez-vous rapide.",
          actionText: "Formulaire de demande",
          description: "Un document PDF sera requis."
        }
      }
    },
    referral: {
      title: "Formulaire de Référence",
      intro: "Ce formulaire est réservé aux patients référés par un ophtalmologue. Le téléchargement d'un courrier médical (PDF) est obligatoire.",
      form: {
        name: "Nom complet",
        birthDate: "Date de naissance",
        address: "Adresse complète",
        phone: "Téléphone",
        email: "Email",
        message: "Message (optionnel)",
        file: "Courrier médical (PDF obligatoire)",
        file_help: "Document médical requis : lettre de référence de l’ophtalmologue traitant ou rapport médical pertinent (ex. OCT, fond d’œil, examen spécialisé).",
        submit: "Envoyer la demande",
        success: "Nous vous recontacterons endéans 5 jours ouvrables."
      },
      note: "Vos données et documents seront transmis de manière sécurisée."
    },
    contact: {
      title: "Lieux d'exercice",
      consultation_title: "Consultations",
      surgery_title: "Chirurgie",
      consultation_locations: [
        {
          name: "Clinique Le Verseau – Wavre",
          address: "Chaussée de Louvain 43/2, 1300 Wavre",
          phone: "+32 10 41 28 01",
          hours: "Mercredi : Toute la journée",
          map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2527.498664687665!2d4.5986873!3d50.6923483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c17d7b27563069%3A0xb35994262142750e!2sClinique%20Le%20Verseau!5e0!3m2!1sfr!2sbe",
          mikrono_text: "Prendre RDV (Mikrono)",
          mikrono_link: "https://www.mikrono.com"
        },
        {
          name: "Messidor Eye Center",
          address: "Avenue de Messidor 215, 1180 Uccle",
          phone: "+32 2 346 68 02",
          hours: "Mardi : Après-midi",
          map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.0371302868843!2d4.3499!3d50.8166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c45744390069%3A0x6676067006830706!2sMessidor%20Eye%20Center!5e0!3m2!1sfr!2sbe",
          mikrono_text: "Prendre RDV (Mikrono)",
          mikrono_link: "https://www.mikrono.com"
        }
      ],
      surgery_locations: [
        {
          name: "Solbosch Eye Clinic",
          phone: "+32 2 648 10 88"
        },
        {
          name: "CHU Saint-Pierre",
          phone: "+32 2 535 31 11"
        }
      ]
    },
    legal: {
      title: "Mentions Légales",
      content: "Ce site est un site d'information médicale destiné au grand public. Il respecte la charte de déontologie médicale belge. Responsable de la publication : Dr Rémi Dewispelaere. Numéro INAMI disponible sur demande. Hébergement sécurisé."
    },
    privacy: {
      title: "Politique de Confidentialité",
      content: "Les informations recueillies lors des consultations sont soumises au secret médical. Ce site n'utilise pas de cookies de traçage publicitaire. Aucune donnée médicale n'est stockée sur ce site vitrine."
    }
  },
  en: {
    nav: {
      home: "Home",
      surgeon: "Presentation",
      cataract: "Cataract",
      retina: "Vitreo-Retinal",
      myopia: "High Myopia",
      exams: "Consultations",
      appointment: "Appointments",
      contact: "Contact & Locations",
      legal: "Legal Notice",
      privacy: "Privacy Policy"
    },
    home: {
      hero: {
        title: "Dr Rémi Dewispelaere",
        subtitle: "Ophthalmological & Vitreo-Retinal Surgery",
        cta: "Book an Appointment"
      },
      intro: {
        title: "Expertise and Medical Rigor",
        text: "Specializing in intraocular surgery, Dr. Dewispelaere welcomes you for personalized care of your ocular conditions. An approach based on technical mastery and patient listening."
      }
    },
    surgeon: {
      title: "Profile and Expertise",
      diplomas: [
        "Specialist in Ophthalmology (ULB, Highest Distinction)",
        "Fellow of the European Board of Ophthalmology (EBO, Paris – 2014)",
        "Over 10 years of expertise in intraocular surgery",
        "Lecturer in Ophthalmic Surgery at the Faculty of Medicine – ULB"
      ],
      specializations: [
        "Cataract Surgery",
        "Vitreo-retinal Surgery (Retina and Vitreous)"
      ],
      activities: [
        "High-volume surgeon (> 400 cataract surgeries/year)",
        "Regular practice of vitreo-retinal surgery (25G vitrectomies)"
      ],
      disclaimer: "The doctor does not perform screening consultations or consultations for glasses.",
      positions: [
        "Head of Ophthalmic Surgery Department – CHU Saint-Pierre",
        "Consultant – Messidor Eye Center",
        "Consultant – Clinique Le Verseau"
      ]
    },
    cataract: {
      title: "Cataract Surgery",
      intro: "Cataract surgery is the most frequently performed surgical procedure in ophthalmology. It involves replacing the clouded lens with a transparent artificial implant.",
      intro_secondary: "In some cases, cataract or lens surgery can be performed to address the desire to be spectacle-free or to prevent angle-closure glaucoma.",
      technique: {
        title: "Surgical Technique",
        steps: [
          "Self-sealing corneal micro-incisions usually requiring no sutures.",
          "Phacoemulsification: fragmentation and aspiration of the lens using ultrasound.",
          "Implantation of a foldable intraocular lens adapted to the patient's eye."
        ],
        implant_details: "The procedure involves implanting a lens whose parameters have been calculated to limit, or even abolish, dependence on glasses."
      },
      cost: {
        title: "Cost of the Procedure",
        price: "Between 500 and 1,000 euros out-of-pocket",
        note: "Amount may be lower depending on insurance status"
      },
      note: "Specific intervention details and implant choices are discussed during the preoperative consultation to meet each patient's specific needs."
    },
    retina: {
      title: "Vitreo-Retinal Surgery",
      intro: "This specialized surgery concerns pathologies affecting the back of the eye, specifically the retina and vitreous.",
      details: "Dr. Dewispelaere performs vitrectomy, a microsurgical procedure to treat various retinal conditions. Care is provided within state-of-the-art technical facilities.",
      procedure: "Vitreo-retinal surgery is performed using 25-gauge instruments, under a microscope and local anesthesia. It is a painless procedure.",
      recovery: "Recovery depends on the underlying pathology.",
      cost: {
        title: "Cost of the Procedure",
        price: "Between 800 and 1,500 euros depending on pathology",
        note: "Amount may be lower depending on insurance status"
      }
    },
    myopia: {
      title: "High Myopia",
      intro: "High myopia requires special monitoring due to increased risks of retinal complications.",
      management_title: "Surgical Management",
      management_text: "Surgical management of high myopia strongly depends on the patient's age and associated problems.",
      techniques_title: "Techniques Performed",
      techniques: [
        "Implantation of a phakic lens (ICL)",
        "Cataract surgery (in some cases)",
        "Treatment of floaters (in some cases)"
      ],
      note: "As the specificities of myopic patients are numerous, each situation is discussed on a case-by-case basis during consultation."
    },
    exams: {
      title: "Consultations & Exams",
      intro: "The practices are equipped to perform a complete ophthalmological assessment.",
      list: [
        "Visual acuity measurement and refraction",
        "Slit lamp examination (anterior segment)",
        "OCT (Optical Coherence Tomography)",
        "Biometry for implant calculation",
        "Corneal topography"
      ]
    },
    appointment: {
      title: "Appointments",
      intro: "Please select one of the options below.",
      options: {
        wavre: {
          title: "Clinique Le Verseau",
          city: "Wavre",
          address: "Chaussée de Louvain 43/2, 1300 Wavre",
          phone: "+32 10 41 28 01",
          mikronoLink: "https://www.mikrono.com",
          mikronoText: "Book Online (Mikrono)"
        },
        messidor: {
          title: "Messidor Eye Center",
          city: "Uccle",
          address: "Avenue de Messidor 215, 1180 Uccle",
          phone: "+32 2 346 68 02",
          mikronoLink: "https://www.mikrono.com",
          mikronoText: "Book Online (Mikrono)"
        },
        referral: {
          title: "Fast-Track Appointment",
          subtitle: "Your ophthalmologist referred you and you need a quick appointment.",
          actionText: "Request Form",
          description: "A PDF document will be required."
        }
      }
    },
    referral: {
      title: "Referral Form",
      intro: "This form is reserved for patients referred by an ophthalmologist. Uploading a medical letter (PDF) is mandatory.",
      form: {
        name: "Full Name",
        birthDate: "Date of Birth",
        address: "Full Address",
        phone: "Phone",
        email: "Email",
        message: "Message (optional)",
        file: "Medical Letter (PDF required)",
        file_help: "Required medical document: referral letter from the treating ophthalmologist or relevant medical report (e.g., OCT, fundus, specialized exam).",
        submit: "Send Request",
        success: "We will contact you within 5 working days."
      },
      note: "Your data and documents will be transmitted securely."
    },
    contact: {
      title: "Locations",
      consultation_title: "Consultations",
      surgery_title: "Surgery",
      consultation_locations: [
        {
          name: "Clinique Le Verseau – Wavre",
          address: "Chaussée de Louvain 43/2, 1300 Wavre",
          phone: "+32 10 41 28 01",
          hours: "Wednesday: All day",
          map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2527.498664687665!2d4.5986873!3d50.6923483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c17d7b27563069%3A0xb35994262142750e!2sClinique%20Le%20Verseau!5e0!3m2!1sfr!2sbe",
          mikrono_text: "Book Online (Mikrono)",
          mikrono_link: "https://www.mikrono.com"
        },
        {
          name: "Messidor Eye Center",
          address: "Avenue de Messidor 215, 1180 Uccle",
          phone: "+32 2 346 68 02",
          hours: "Tuesday: Afternoon",
          map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.0371302868843!2d4.3499!3d50.8166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c45744390069%3A0x6676067006830706!2sMessidor%20Eye%20Center!5e0!3m2!1sfr!2sbe",
          mikrono_text: "Book Online (Mikrono)",
          mikrono_link: "https://www.mikrono.com"
        }
      ],
      surgery_locations: [
        {
          name: "Solbosch Eye Clinic",
          phone: "+32 2 648 10 88"
        },
        {
          name: "CHU Saint-Pierre",
          phone: "+32 2 535 31 11"
        }
      ]
    },
    legal: {
      title: "Legal Notice",
      content: "This site is a medical information site intended for the general public. It respects the Belgian medical code of ethics. Publisher: Dr. Rémi Dewispelaere. INAMI number available on request. Secure hosting."
    },
    privacy: {
      title: "Privacy Policy",
      content: "Information collected during consultations is subject to medical confidentiality. This site does not use advertising tracking cookies. No medical data is stored on this showcase site."
    }
  }
};