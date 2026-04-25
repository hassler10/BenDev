import { useMemo, useState } from 'react';

type Step = 'coordonnees' | 'offre' | 'paiement' | 'confirmation';

type Offer = {
  id: string;
  title: string;
  mode: string;
  price: number;
  priceLabel: string;
  description: string;
  details: string[];
};

type RegistrationForm = {
  fullName: string;
  email: string;
  phone: string;
  learnerType: string;
  city: string;
  availabilityDate: string;
  offerId: string;
  paymentMethod: string;
  paymentPhone: string;
  payerName: string;
  paymentReference: string;
};

type EmailStatus = 'idle' | 'sending' | 'sent' | 'failed';

const offers: Offer[] = [
  {
    id: 'online-basic-ai',
    title: 'Informatique de base en ligne',
    mode: 'Cours en ligne',
    price: 20000,
    priceLabel: '20 000 F / mois',
    description: "Pour apprendre les bases de l'informatique et utiliser les outils IA à distance.",
    details: ['Groupe WhatsApp de suivi', 'Fiches de cours numériques', 'Exercices pratiques guidés'],
  },
  {
    id: 'home-basic-ai',
    title: 'Informatique de base en présentiel',
    mode: 'A domicile ou lieu convenu',
    price: 30000,
    priceLabel: '30 000 F / mois',
    description: 'Pour apprendre avec accompagnement direct, fiches de cours et pratique instantanée.',
    details: ['Hors frais de déplacement', 'Pratique instantanée', 'Accompagnement personnalisé'],
  },
];

const businessPhone = '0759581021';
const wavePhone = '0759581021';
const whatsappContact = '2250759581021';
const contactEmail = 'hasslerbenie10@gmail.com';

const initialForm: RegistrationForm = {
  fullName: '',
  email: '',
  phone: '',
  learnerType: '',
  city: '',
  availabilityDate: '',
  offerId: offers[0].id,
  paymentMethod: 'Wave',
  paymentPhone: '',
  payerName: '',
  paymentReference: '',
};

function formatCfa(value: number) {
  return `${value.toLocaleString('fr-FR')} F`;
}

function escapeCsv(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function buildRegistrationCsv(form: RegistrationForm, offer: Offer, transactionId: string) {
  const headers = [
    'transaction',
    'date',
    'nom',
    'email',
    'whatsapp',
    'profil',
    'ville',
    'date_disponibilite',
    'formule',
    'mode',
    'montant',
    'paiement',
    'numero_wave_reception',
    'numero_wave_payeur',
    'nom_payeur',
    'reference_wave',
  ];
  const row = [
    transactionId,
    new Date().toLocaleString('fr-FR'),
    form.fullName,
    form.email,
    form.phone,
    form.learnerType,
    form.city,
    form.availabilityDate,
    offer.title,
    offer.mode,
    formatCfa(offer.price),
    form.paymentMethod,
    wavePhone,
    form.paymentPhone,
    form.payerName,
    form.paymentReference,
  ];

  return `${headers.join(',')}\n${row.map(escapeCsv).join(',')}`;
}

function LogoMark() {
  return (
    <div className="flex items-center gap-4" aria-label="BenTech Solution">
      <svg className="h-14 w-14 shrink-0" viewBox="0 0 64 64" role="img" aria-hidden="true">
        <rect x="2" y="8" width="8" height="8" rx="1" fill="#1557d8" />
        <rect x="2" y="28" width="8" height="8" rx="1" fill="#1557d8" />
        <rect x="2" y="48" width="8" height="8" rx="1" fill="#1557d8" />
        <rect x="14" y="8" width="8" height="8" rx="1" fill="#1557d8" />
        <rect x="14" y="20" width="8" height="8" rx="1" fill="#1557d8" />
        <rect x="14" y="36" width="8" height="8" rx="1" fill="#1557d8" />
        <rect x="14" y="48" width="8" height="8" rx="1" fill="#1557d8" />
        <path
          d="M26 8h13c9 0 16 6 16 15 0 5-3 10-7 12 6 2 10 7 10 14 0 10-8 15-18 15H26V8Zm12 22c5 0 8-2 8-6s-3-6-8-6h-2v12h2Zm1 24c6 0 10-2 10-7 0-4-4-7-10-7h-3v14h3Z"
          fill="#061757"
        />
      </svg>
      <div className="leading-none">
        <p className="text-[2rem] font-black tracking-tight text-[#061757] sm:text-[2.7rem]">BenTech</p>
        <div className="mt-1 flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#f6b21a]" />
          <p className="text-sm font-black uppercase tracking-[0.45em] text-[#1557d8] sm:text-base">Solution</p>
          <span className="h-0.5 w-8 bg-[#f6b21a]" />
        </div>
      </div>
    </div>
  );
}

function InstructorVisual() {
  return (
    <div className="relative h-full min-h-[520px] overflow-hidden bg-[#0737a6] text-white">
      <div className="absolute -left-28 top-0 h-[760px] w-[760px] rounded-full border-[34px] border-white/95" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/20 to-transparent" />
      <svg className="absolute right-10 top-16 h-24 w-24 text-white/20" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <rect x="10" y="16" width="80" height="52" rx="4" stroke="currentColor" strokeWidth="6" />
        <path d="M24 82h52M40 68v14M60 68v14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <svg className="absolute right-12 top-48 h-24 w-24 text-white/20" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M50 14 92 35 50 56 8 35l42-21Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <path d="M26 45v20c14 10 34 10 48 0V45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <div className="absolute right-20 top-28 grid grid-cols-4 gap-3 opacity-40">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-white" />
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 h-[455px] w-[330px] -translate-x-1/2 animate-instructor">
        <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-[#7a4a2d] shadow-[inset_-14px_0_0_rgba(0,0,0,0.15)]" />
        <div className="absolute left-[118px] top-[118px] h-24 w-24 bg-white" style={{ clipPath: 'polygon(22% 0, 78% 0, 66% 100%, 34% 100%)' }} />
        <div className="absolute left-1/2 top-36 h-80 w-72 -translate-x-1/2 rounded-t-[60px] bg-[#082b75] shadow-2xl" />
        <div className="absolute left-1/2 top-40 h-72 w-24 -translate-x-1/2 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 72% 100%, 28% 100%)' }} />
        <div className="absolute left-[142px] top-40 h-64 w-12 bg-[#d8dce8]" style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 30% 100%)' }} />
        <div className="absolute left-8 top-44 h-72 w-36 origin-top-right -rotate-6 rounded-t-[50px] bg-[#0b3b9b]" />
        <div className="absolute right-8 top-44 h-72 w-36 origin-top-left rotate-6 rounded-t-[50px] bg-[#0b3b9b]" />
        <div className="absolute left-1/2 top-52 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-[#082b75] bg-[#d8dce8]" />
        <div className="absolute left-1/2 top-[275px] h-10 w-10 -translate-x-1/2 rounded-full border-4 border-[#082b75] bg-[#d8dce8]" />
        <div className="absolute right-14 top-56 h-20 w-20 rounded-br-[34px] rounded-tl-[34px] bg-[#c41055] rotate-12" />
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm font-semibold text-red-600">{message}</p>;
}

function App() {
  const [step, setStep] = useState<Step>('coordonnees');
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({});
  const [isPaying, setIsPaying] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [registeredCsv, setRegisteredCsv] = useState('');
  const [copiedWave, setCopiedWave] = useState(false);

  const selectedOffer = useMemo(
    () => offers.find((offer) => offer.id === form.offerId) ?? offers[0],
    [form.offerId],
  );

  const currentStepIndex = ['coordonnees', 'offre', 'paiement', 'confirmation'].indexOf(step);
  const todayDate = new Date().toISOString().slice(0, 10);
  const formattedAvailabilityDate = form.availabilityDate
    ? new Date(`${form.availabilityDate}T00:00:00`).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'Non renseignée';
  const csvDownloadHref = registeredCsv ? `data:text/csv;charset=utf-8,${encodeURIComponent(registeredCsv)}` : '#';

  const updateForm = (field: keyof RegistrationForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const copyWaveNumber = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(wavePhone);
    }
    setCopiedWave(true);
    window.setTimeout(() => setCopiedWave(false), 1800);
  };

  const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhoneValid = (value: string) => /^[+]?\d[\d\s.-]{7,}$/.test(value.trim());

  const validateIdentity = () => {
    const nextErrors: Partial<Record<keyof RegistrationForm, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Entrez le nom complet.';
    if (!isEmailValid(form.email)) nextErrors.email = 'Entrez une adresse email valide.';
    if (!isPhoneValid(form.phone)) nextErrors.phone = 'Entrez un numéro WhatsApp valide.';
    if (!form.learnerType) nextErrors.learnerType = "Sélectionnez le profil de l'apprenant.";
    if (!form.city.trim()) nextErrors.city = 'Indiquez votre ville ou commune.';
    if (!form.availabilityDate) nextErrors.availabilityDate = 'Choisissez une date de disponibilité.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateOffer = () => {
    if (!form.offerId) {
      setErrors({ offerId: 'Choisissez une formule.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePayment = () => {
    const nextErrors: Partial<Record<keyof RegistrationForm, string>> = {};
    if (!form.paymentMethod) nextErrors.paymentMethod = 'Sélectionnez un moyen de paiement.';
    if (!isPhoneValid(form.paymentPhone)) nextErrors.paymentPhone = 'Entrez le numéro utilisé pour le paiement.';
    if (!form.payerName.trim()) nextErrors.payerName = 'Entrez le nom du payeur.';
    if (!form.paymentReference.trim()) nextErrors.paymentReference = 'Entrez la référence Wave ou le numéro de transaction.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitRegistrationEmail = async (newTransactionId: string, csvContent: string) => {
    setEmailStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `Nouvelle inscription BenTech - ${form.fullName}`,
          _template: 'table',
          _captcha: 'false',
          transaction: newTransactionId,
          nom: form.fullName,
          email: form.email,
          whatsapp: form.phone,
          profil: form.learnerType,
          ville: form.city,
          date_disponibilite: formattedAvailabilityDate,
          formule: selectedOffer.title,
          montant: selectedOffer.priceLabel,
          paiement: 'Wave uniquement',
          numero_wave_reception: wavePhone,
          numero_wave_payeur: form.paymentPhone,
          nom_payeur: form.payerName,
          reference_wave: form.paymentReference,
          fichier_csv: csvContent,
        }),
      });

      if (!response.ok) throw new Error('Email submission failed');
      setEmailStatus('sent');
    } catch {
      setEmailStatus('failed');
    }
  };

  const handleNext = () => {
    if (step === 'coordonnees' && validateIdentity()) {
      setStep('offre');
      return;
    }

    if (step === 'offre' && validateOffer()) {
      setStep('paiement');
      return;
    }

    if (step === 'paiement' && validatePayment()) {
      setIsPaying(true);
      window.setTimeout(async () => {
        const newTransactionId = `BTS-${Date.now().toString(36).toUpperCase()}`;
        const csvContent = buildRegistrationCsv(form, selectedOffer, newTransactionId);
        const registration = {
          id: newTransactionId,
          ...form,
          offer: selectedOffer,
          paidAmount: selectedOffer.price,
          csv: csvContent,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem(`bentech_registration_${newTransactionId}`, JSON.stringify(registration));
        setRegisteredCsv(csvContent);
        await submitRegistrationEmail(newTransactionId, csvContent);
        setTransactionId(newTransactionId);
        setIsPaying(false);
        setStep('confirmation');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step === 'paiement') setStep('offre');
    if (step === 'offre') setStep('coordonnees');
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour BenTech Solution. Je viens de valider mon inscription à la formation ${selectedOffer.title}. Nom: ${form.fullName}. Transaction: ${transactionId || 'en cours'}. Paiement Wave effectué au ${wavePhone}. Merci de m'ajouter au groupe WhatsApp de la formation.`,
  );

  return (
    <div className="min-h-screen bg-white text-[#061757]">
      <section className="relative min-h-screen overflow-hidden bg-white">
        <div className="absolute inset-y-0 right-0 hidden w-[47%] lg:block">
          <InstructorVisual />
        </div>
        <div className="absolute -left-24 bottom-[-260px] h-[520px] w-[520px] rounded-full bg-[#eef4ff]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10">
          <div className="max-w-3xl animate-hero-copy">
            <LogoMark />
            <p className="mt-12 text-sm font-black uppercase tracking-[0.38em] text-[#1557d8]">Formation IA et informatique</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-[#061757] sm:text-7xl lg:text-8xl">
              Apprenez l'informatique à domicile ou en ligne
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-[#1c2b63] sm:text-2xl">
              Pour les enfants, les étudiants, les entrepreneurs et les grandes personnes qui veulent maîtriser les bases du digital et utiliser les IA au quotidien.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#inscription"
                className="group inline-flex items-center justify-center rounded-full bg-[#0737c9] px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(7,55,201,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#061757]"
              >
                Remplir le formulaire
                <span className="ml-3 transition duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </a>
              <a
                href={`https://wa.me/${whatsappContact}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#0737c9] px-8 py-4 text-base font-black uppercase tracking-wide text-[#0737c9] transition duration-300 hover:-translate-y-1 hover:bg-[#edf4ff]"
              >
                WhatsApp {businessPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="relative overflow-hidden bg-[#f4f7ff] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="animate-section-rise">
                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#1557d8]">Mes offres</p>
                <h2 className="mt-4 max-w-xl text-4xl font-black uppercase leading-tight tracking-[-0.04em] text-[#061757] sm:text-5xl">
                  Des compétences d'aujourd'hui pour réussir demain.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#31406d]">
                  La page reprend l'esprit de votre affiche BenTech Solution : apprentissage accessible, suivi WhatsApp, fiches de cours et pratique directe.
                </p>
                <div className="mt-10 space-y-6 border-l-4 border-[#f6b21a] pl-6">
                  <div>
                    <p className="text-xl font-black text-[#061757]">Pour qui ?</p>
                    <p className="mt-2 text-[#31406d]">Enfants, adolescents, étudiants, salariés, entrepreneurs et toute personne désirant apprendre.</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#061757]">Mode d'apprentissage</p>
                    <p className="mt-2 text-[#31406d]">En ligne, à domicile ou dans un lieu convenu selon la formule choisie.</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#061757]">Objectif</p>
                    <p className="mt-2 text-[#31406d]">Vous rendre autonome et prêt à saisir les opportunités du digital et de l'intelligence artificielle.</p>
                  </div>
                </div>
              </div>

              <div id="inscription" className="rounded-[2rem] border border-[#dce6ff] bg-white p-5 shadow-[0_30px_90px_rgba(6,23,87,0.12)] sm:p-8">
                <div className="mb-8">
                  <p className="text-sm font-black uppercase tracking-[0.32em] text-[#1557d8]">Inscription</p>
                  <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#061757]">Réservez votre place</h3>
                </div>

                {step !== 'confirmation' && (
                  <div className="mb-8 grid grid-cols-3 gap-2" aria-label="Progression du formulaire">
                    {['Coordonnées', 'Formule', 'Paiement'].map((label, index) => (
                      <div key={label}>
                        <div className={`h-2 rounded-full transition-all duration-500 ${index <= currentStepIndex ? 'bg-[#0737c9]' : 'bg-[#d9e4ff]'}`} />
                        <p className={`mt-2 text-xs font-black uppercase tracking-wide ${index <= currentStepIndex ? 'text-[#0737c9]' : 'text-[#7d8bb5]'}`}>{label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {step === 'coordonnees' && (
                  <div className="space-y-5 animate-form-step">
                    <div>
                      <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="fullName">Nom complet</label>
                      <input
                        id="fullName"
                        value={form.fullName}
                        onChange={(event) => updateForm('fullName', event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                        placeholder="Exemple : Hassler Benie"
                      />
                      <FieldError message={errors.fullName} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(event) => updateForm('email', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                          placeholder="votre@email.com"
                        />
                        <FieldError message={errors.email} />
                      </div>
                      <div>
                        <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="phone">WhatsApp</label>
                        <input
                          id="phone"
                          value={form.phone}
                          onChange={(event) => updateForm('phone', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                          placeholder="0759581021"
                        />
                        <FieldError message={errors.phone} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="learnerType">Profil</label>
                        <select
                          id="learnerType"
                          value={form.learnerType}
                          onChange={(event) => updateForm('learnerType', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                        >
                          <option value="">Sélectionner</option>
                          <option value="enfant">Enfant ou adolescent</option>
                          <option value="etudiant">Etudiant</option>
                          <option value="entrepreneur">Entrepreneur</option>
                          <option value="salarie">Salarié</option>
                          <option value="adulte">Grande personne</option>
                        </select>
                        <FieldError message={errors.learnerType} />
                      </div>
                      <div>
                        <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="city">Ville ou commune</label>
                        <input
                          id="city"
                          value={form.city}
                          onChange={(event) => updateForm('city', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                          placeholder="Exemple : Abidjan, Cocody"
                        />
                        <FieldError message={errors.city} />
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-[#dce6ff] bg-[#f8fbff] p-5">
                      <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="availabilityDate">Période de disponibilité</label>
                      <p className="mt-1 text-sm font-semibold text-[#607098]">Choisissez la date à laquelle vous souhaitez être disponible pour commencer ou organiser votre séance.</p>
                      <input
                        id="availabilityDate"
                        type="date"
                        min={todayDate}
                        value={form.availabilityDate}
                        onChange={(event) => updateForm('availabilityDate', event.target.value)}
                        className="mt-4 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                      />
                      <FieldError message={errors.availabilityDate} />
                    </div>
                  </div>
                )}

                {step === 'offre' && (
                  <div className="space-y-4 animate-form-step">
                    {offers.map((offer) => {
                      const isSelected = offer.id === form.offerId;
                      return (
                        <button
                          key={offer.id}
                          type="button"
                          onClick={() => updateForm('offerId', offer.id)}
                          className={`w-full rounded-[1.5rem] border-2 p-5 text-left transition duration-300 hover:-translate-y-1 ${isSelected ? 'border-[#0737c9] bg-[#eef4ff] shadow-[0_18px_45px_rgba(7,55,201,0.14)]' : 'border-[#dce6ff] bg-white hover:border-[#93b2ff]'}`}
                        >
                          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#1557d8]">{offer.mode}</p>
                              <h4 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#061757]">{offer.title}</h4>
                              <p className="mt-2 text-[#31406d]">{offer.description}</p>
                              <ul className="mt-4 space-y-2 text-sm font-semibold text-[#31406d]">
                                {offer.details.map((detail) => (
                                  <li key={detail} className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-[#f6b21a]" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="shrink-0 rounded-2xl bg-[#061757] px-5 py-4 text-center text-white">
                              <p className="text-2xl font-black">{offer.priceLabel}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    <FieldError message={errors.offerId} />
                  </div>
                )}

                {step === 'paiement' && (
                  <div className="space-y-5 animate-form-step">
                    <div className="rounded-[1.5rem] bg-[#061757] p-5 text-white">
                      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#9db9ff]">Récapitulatif</p>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h4 className="text-2xl font-black">{selectedOffer.title}</h4>
                          <p className="mt-1 text-white/70">{form.fullName || 'Apprenant'} · {selectedOffer.mode}</p>
                          <p className="mt-1 text-sm font-bold text-white/70">Disponibilité : {formattedAvailabilityDate}</p>
                        </div>
                        <p className="text-3xl font-black text-[#f6b21a]">{selectedOffer.priceLabel}</p>
                      </div>
                    </div>

                    <div>
                      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#08bdf2] p-5 text-[#061757] shadow-[0_20px_55px_rgba(8,189,242,0.22)]">
                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/25" />
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#061757]/70">Paiement Wave uniquement</p>
                        <div className="relative mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-3xl font-black tracking-[-0.04em]">Envoyez {selectedOffer.priceLabel}</p>
                            <p className="mt-1 text-lg font-black">Compte Wave : {wavePhone}</p>
                          </div>
                          <button
                            type="button"
                            onClick={copyWaveNumber}
                            className="inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#061757] transition hover:-translate-y-0.5"
                          >
                            {copiedWave ? 'Numéro copié' : 'Copier le numéro'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="paymentPhone">Numéro Wave du payeur</label>
                        <input
                          id="paymentPhone"
                          value={form.paymentPhone}
                          onChange={(event) => updateForm('paymentPhone', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                          placeholder="Numéro ayant payé via Wave"
                        />
                        <FieldError message={errors.paymentPhone} />
                      </div>
                      <div>
                        <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="payerName">Nom du payeur</label>
                        <input
                          id="payerName"
                          value={form.payerName}
                          onChange={(event) => updateForm('payerName', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                          placeholder="Nom inscrit sur le paiement"
                        />
                        <FieldError message={errors.payerName} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-black uppercase tracking-wide text-[#061757]" htmlFor="paymentReference">Référence Wave</label>
                      <input
                        id="paymentReference"
                        value={form.paymentReference}
                        onChange={(event) => updateForm('paymentReference', event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#cdd9f4] bg-white px-4 py-4 text-base font-semibold outline-none transition focus:border-[#0737c9] focus:ring-4 focus:ring-[#0737c9]/10"
                        placeholder="Exemple : WAVE-123456 ou ID de transaction"
                      />
                      <FieldError message={errors.paymentReference} />
                    </div>

                    <p className="rounded-2xl bg-[#fff7df] p-4 text-sm font-semibold leading-6 text-[#6b4b00]">
                      Le paiement se fait uniquement sur Wave au {wavePhone}. Cette page enregistre la déclaration de paiement et envoie la fiche d'inscription par email ; la vérification automatique Wave nécessite une API ou un backend sécurisé.
                    </p>
                  </div>
                )}

                {step === 'confirmation' && (
                  <div className="animate-form-step text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#ebfff4] text-[#05a85a] animate-success-pop">
                      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m5 12.5 4.2 4.2L19 6.8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#061757]">Inscription validée</h3>
                    <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-[#31406d]">
                      Votre inscription pour <strong>{selectedOffer.title}</strong> est enregistrée avec paiement Wave. Contactez le compte WhatsApp direct pour l'ajout au groupe de formation.
                    </p>
                    <div className="mx-auto mt-7 max-w-md rounded-[1.5rem] bg-[#f4f7ff] p-5 text-left">
                      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1557d8]">Transaction</p>
                      <p className="mt-2 font-mono text-xl font-black text-[#061757]">{transactionId}</p>
                      <p className="mt-3 text-sm font-semibold text-[#31406d]">Montant payé : {selectedOffer.priceLabel}</p>
                      <p className="mt-2 text-sm font-semibold text-[#31406d]">Disponibilité : {formattedAvailabilityDate}</p>
                    </div>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                      <a
                        href={`https://wa.me/${whatsappContact}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[#05a85a] px-7 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(5,168,90,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#048e4d]"
                      >
                        Contacter WhatsApp {businessPhone}
                      </a>
                      <a
                        href={`https://wa.me/${whatsappContact}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-2 border-[#0737c9] px-7 py-4 text-base font-black uppercase tracking-wide text-[#0737c9] transition duration-300 hover:-translate-y-1 hover:bg-[#eef4ff]"
                      >
                        Relancer l'ajout
                      </a>
                    </div>
                    <div className="mt-6 rounded-2xl bg-[#f4f7ff] p-4 text-sm font-bold text-[#31406d]">
                      {emailStatus === 'sent' && "La fiche d'inscription a été envoyée à l'adresse email BenTech."}
                      {emailStatus === 'failed' && "La fiche est sauvegardée dans le navigateur, mais l'envoi email n'a pas pu être confirmé. Utilisez le téléchargement CSV ci-dessous."}
                      {emailStatus === 'sending' && "Envoi de la fiche d'inscription par email en cours..."}
                      {emailStatus === 'idle' && "La fiche d'inscription est prête."}
                    </div>
                    <a
                      href={csvDownloadHref}
                      download={`inscription-bentech-${transactionId || 'formation'}.csv`}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-[#061757] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition duration-300 hover:-translate-y-1 hover:bg-[#0737c9]"
                    >
                      Télécharger la fiche CSV
                    </a>
                    <p className="mt-5 text-sm font-semibold text-[#607098]">
                       Important : WhatsApp ne permet pas à une simple page web d'ajouter automatiquement quelqu'un dans un groupe sans action de l'utilisateur. Le bouton ouvre le compte WhatsApp direct {businessPhone} avec le message d'ajout déjà préparé.
                    </p>
                  </div>
                )}

                {step !== 'confirmation' && (
                  <div className="mt-8 flex items-center justify-between border-t border-[#dce6ff] pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 'coordonnees'}
                      className="rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide text-[#607098] transition hover:text-[#061757] disabled:cursor-not-allowed disabled:opacity-0"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isPaying}
                      className="inline-flex min-w-44 items-center justify-center rounded-full bg-[#0737c9] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(7,55,201,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#061757] disabled:cursor-wait disabled:opacity-70"
                    >
                      {isPaying ? 'Enregistrement...' : step === 'paiement' ? `J'ai payé ${selectedOffer.priceLabel} via Wave` : 'Continuer'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#1557d8]">Programme</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[-0.04em] text-[#061757]">Informatique, IA et pratique utile.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {["Bases de l'ordinateur et du smartphone", 'Internet, email et sécurité', 'Utilisation pratique des outils IA', 'Création de documents et productivité'].map((item) => (
                <div key={item} className="border-l-4 border-[#f6b21a] py-2 pl-5">
                  <p className="text-lg font-black text-[#061757]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#061757] px-5 py-10 text-white sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#f6b21a]">Contactez-moi</p>
              <p className="mt-2 text-3xl font-black">{businessPhone}</p>
              <p className="text-white/70">WhatsApp disponible</p>
            </div>
            <a className="text-xl font-black text-white underline decoration-[#f6b21a] decoration-4 underline-offset-8" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes hero-copy {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes instructor {
          0% { transform: translateX(-50%) translateY(18px); }
          50% { transform: translateX(-50%) translateY(0); }
          100% { transform: translateX(-50%) translateY(18px); }
        }

        @keyframes form-step {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes section-rise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes success-pop {
          0% { transform: scale(0.65); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-hero-copy { animation: hero-copy 720ms cubic-bezier(.2,.8,.2,1) both; }
        .animate-instructor { animation: instructor 6s ease-in-out infinite; }
        .animate-form-step { animation: form-step 420ms ease-out both; }
        .animate-section-rise { animation: section-rise 700ms ease-out both; }
        .animate-success-pop { animation: success-pop 520ms cubic-bezier(.2,.9,.2,1) both; }
      `}</style>
    </div>
  );
}

export default App;