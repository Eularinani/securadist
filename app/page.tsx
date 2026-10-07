"use client";

import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Palette,
  Phone,
  Radar,
  Repeat,
  RotateCcw,
  Route,
  Search,
  Send,
  Server,
  ShieldCheck,
  TriangleAlert,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Fotos: Pixabay Content License (uso livre)
   servers.jpg · datacenter.jpg · team.jpg · encryption.jpg */

const RAIL = [
  "Pentest",
  "SOC 24/7",
  "ISO 27001",
  "RGPD",
  "DevSecOps",
  "Cloud segura",
  "Formação",
  "Resposta em 24h",
];

const SERVICOS = [
  {
    title: "Cibersegurança",
    price: "Sob consulta",
    desc: "Testamos como um atacante, antes dele.",
    bullets: [
      "Pentest",
      "Análise de vulnerabilidades",
      "SIEM",
      "Plano de incidentes",
    ],
    Icon: ShieldCheck,
  },
  {
    title: "Sistemas",
    price: "Sob consulta",
    desc: "Infraestrutura que não cai.",
    bullets: [
      "Cloud AWS / Azure / GCP",
      "Alta disponibilidade",
      "DevSecOps",
      "Recuperação de desastres",
    ],
    Icon: Server,
  },
  {
    title: "Formação",
    price: "Desde €500",
    desc: "Pessoas que não clicam no errado.",
    bullets: [
      "Workshops",
      "Phishing simulado",
      "Equipas de TI",
      "Presencial ou online",
    ],
    Icon: GraduationCap,
  },
  {
    title: "SOC & Compliance",
    price: "Desde €300/mês",
    desc: "Olhos nos sistemas, papelada pronta.",
    bullets: ["SOC 24/7", "RGPD + DPO", "ISO 27001", "Relatórios"],
    Icon: Radar,
  },
  {
    title: "Branding Digital",
    price: "Desde €450",
    desc: "Imagem à altura do produto.",
    bullets: ["Logótipo", "Manual de marca", "Website + SEO", "Redes sociais"],
    Icon: Palette,
  },
];

const PROCESSO = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "30 minutos grátis. 3 riscos críticos.",
    Icon: Search,
  },
  {
    num: "02",
    title: "Relatório",
    desc: "Riscos por severidade. Sem jargão.",
    Icon: FileText,
  },
  {
    num: "03",
    title: "Remediação",
    desc: "Corrigimos e validamos.",
    Icon: Wrench,
  },
  {
    num: "04",
    title: "Acompanhamento",
    desc: "Monitorização contínua.",
    Icon: Repeat,
  },
];

const STATS = [
  { value: 5, suffix: "+", label: "Anos de experiência" },
  { value: 20, suffix: "+", label: "Clientes" },
  { value: 2, suffix: "", label: "Países" },
  { value: 100, suffix: "%", label: "No prazo" },
];

const FAQ = [
  {
    q: "Quanto custa?",
    a: "Formação desde €500, SOC desde €300/mês, branding desde €450. Pentest e cloud sob consulta.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Cronograma escrito, com datas e responsável. 100% no prazo.",
  },
  {
    q: "Presencial ou remoto?",
    a: "Ambos. Lisboa e Luanda.",
  },
  {
    q: "Assinam NDA?",
    a: "Sim. Sempre.",
  },
  {
    q: "Já fomos atacados?",
    a: "Contemos o dano, achamos a causa, fechamos a porta.",
  },
];

/* ── Base ─────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setN(value);
            return;
          }
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / 1400, 1);
            setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

function Head({
  eyebrow,
  title,
  sub,
  icon,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  icon?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-155 text-center lg:mb-20">
      <p className="mb-4 flex items-center justify-center gap-2 text-[13px] font-semibold tracking-wide text-white/45">
        {icon && <span className="text-teal-brand">{icon}</span>}
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-120 text-white/55">{sub}</p>}
    </Reveal>
  );
}

function Row({
  open,
  onToggle,
  index,
  title,
  meta,
  Icon,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  index: string;
  title: string;
  meta?: string;
  Icon?: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number | string;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`panel-${index}`}
        className="flex min-h-11 w-full cursor-pointer items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
      >
        <span className="font-mono text-xs text-white/30 tabular-nums">
          {index}
        </span>
        <span className="flex-1">
          <span
            className={`flex items-center gap-3 font-display text-xl font-bold tracking-tight transition-colors duration-200 sm:text-2xl ${
              open ? "text-teal-brand" : "text-white"
            }`}
          >
            {Icon && (
              <Icon
                size={22}
                strokeWidth={2}
                aria-hidden="true"
                className={`shrink-0 transition-colors duration-200 ${
                  open ? "text-teal-brand" : "text-white/35"
                }`}
              />
            )}
            {title}
          </span>
          {meta && (
            <span className="mt-1 block text-[13px] font-semibold text-gold/80">
              {meta}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className={`text-2xl leading-none font-light transition-all duration-300 ${
            open ? "rotate-45 text-teal-brand" : "text-white/40"
          }`}
        >
          +
        </span>
      </button>
      <div
        id={`panel-${index}`}
        role="region"
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-7">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Formulário de contacto ───────────────────────── */

const inputCls =
  "min-h-11 w-full border-b border-white/10 bg-transparent py-3 pr-1 pl-8 text-base text-white placeholder:text-white/30 transition-colors duration-200 hover:border-white/25 focus:border-teal-brand focus:outline-none sm:text-sm";
const inputErrorCls =
  "border-red-400/70 hover:border-red-400/70 focus:border-red-400";
const labelCls =
  "mb-1 block text-xs font-bold tracking-wider text-white/50 uppercase";
const fieldIconCls =
  "pointer-events-none absolute top-1/2 left-1 -translate-y-1/2 text-white/30";

type Fields = {
  nome: string;
  email: string;
  servico: string;
  data: string;
  hora: string;
  mensagem: string;
};

const EMPTY: Fields = {
  nome: "",
  email: "",
  servico: "",
  data: "",
  hora: "",
  mensagem: "",
};

function validateFields(v: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!v.nome.trim()) e.nome = "Diga-nos o seu nome.";
  if (!v.email.trim()) e.email = "Precisamos do seu email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Esse email parece inválido.";
  if (!v.servico) e.servico = "Escolha um serviço.";
  if (v.mensagem.trim().length < 10)
    e.mensagem = "Um pouco mais de detalhe ajuda (10+ caracteres).";
  return e;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-[13px] text-red-400"
    >
      <TriangleAlert size={13} aria-hidden="true" className="shrink-0" />
      {message}
    </p>
  );
}

/* Dropdown próprio — substitui o select nativo */
function CustomSelect({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  options,
  icon: Icon,
  invalid,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder: string;
  options: string[];
  icon: React.ElementType;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setHl(-1);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  function pick(v: string) {
    onChange(v);
    setOpen(false);
    setHl(-1);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      setHl(-1);
      return;
    }
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      setHl(Math.max(options.indexOf(value), 0));
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHl((h) => (h + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHl((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === "Enter" && hl >= 0) {
      e.preventDefault();
      pick(options[hl]);
    }
  }

  return (
    <div ref={ref} className="relative" onKeyDown={onKey}>
      <input type="hidden" name={name} value={value} />
      <Icon size={16} aria-hidden="true" className={fieldIconCls} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          setHl(Math.max(options.indexOf(value), 0));
        }}
        onBlur={onBlur}
        className={`${inputCls} flex cursor-pointer items-center justify-between gap-3 text-left ${!value ? "text-white/30" : ""} ${invalid ? inputErrorCls : ""}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="animate-pop absolute inset-x-0 z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-navy-deep p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {options.map((op, i) => {
            const sel = op === value;
            return (
              <li key={op} role="option" aria-selected={sel}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(op);
                  }}
                  onMouseEnter={() => setHl(i)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3.5 py-3 text-left text-sm transition-colors duration-150 ${
                    i === hl ? "bg-teal-brand/15 text-white" : "text-white/70"
                  } ${sel ? "font-bold text-teal-bright" : ""}`}
                >
                  {op}
                  {sel && (
                    <Check
                      size={15}
                      aria-hidden="true"
                      className="text-teal-brand"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* Calendário próprio — substitui o date picker nativo */
const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const DIAS_SEM = ["S", "T", "Q", "Q", "S", "S", "D"];

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function CustomDate({
  id,
  name,
  value,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const base = value ? new Date(`${value}T12:00:00`) : new Date();
  const [view, setView] = useState({
    y: base.getFullYear(),
    m: base.getMonth(),
  });

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sel = value ? new Date(`${value}T12:00:00`) : null;
  const first = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(first).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  function nav(dir: 1 | -1) {
    setView((v) => {
      const m = v.m + dir;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { y: v.y, m };
    });
  }

  const label = sel
    ? `${sel.getDate()} ${MESES[sel.getMonth()].slice(0, 3)} ${sel.getFullYear()}`
    : "Escolher data";

  return (
    <div
      ref={ref}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <input type="hidden" name={name} value={value} />
      <Calendar size={16} aria-hidden="true" className={fieldIconCls} />
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls} flex cursor-pointer items-center justify-between gap-3 text-left ${!value ? "text-white/30" : ""}`}
      >
        <span className="truncate">{label}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Escolher data"
          className="animate-pop absolute left-0 z-50 mt-2 w-[280px] rounded-xl border border-white/10 bg-navy-deep p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Mês anterior"
              onClick={() => nav(-1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <p className="text-sm font-bold text-white capitalize">
              {MESES[view.m]} {view.y}
            </p>
            <button
              type="button"
              aria-label="Próximo mês"
              onClick={() => nav(1)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="mb-1 grid grid-cols-7 gap-1 text-center">
            {DIAS_SEM.map((d, i) => (
              <span
                key={i}
                className="py-1 font-mono text-[10px] text-white/35"
              >
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={`e${i}`} />;
              const iso = toISO(view.y, view.m, d);
              const past = new Date(view.y, view.m, d) < today;
              const isSel = value === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={past}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  aria-label={`${d} de ${MESES[view.m]} de ${view.y}`}
                  aria-pressed={isSel}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] tabular-nums transition-colors duration-150 ${
                    isSel
                      ? "cursor-pointer bg-teal-brand font-bold text-navy"
                      : past
                        ? "cursor-not-allowed text-white/20"
                        : "cursor-pointer text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="mt-3 w-full cursor-pointer rounded-lg py-2 text-center text-[13px] font-bold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              Limpar data
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ContactForm({ onAnother }: { onAnother: () => void }) {
  const [state, handleSubmit] = useForm("mvkzgpop");
  const [values, setValues] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Fields, boolean>>
  >({});
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<keyof Fields, string>>
  >({});

  function set<K extends keyof Fields>(k: K, val: string) {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setClientErrors(validateFields(next));
  }

  function blur<K extends keyof Fields>(k: K) {
    setTouched((t) => ({ ...t, [k]: true }));
    setClientErrors(validateFields(values));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateFields(values);
    setClientErrors(errs);
    setTouched({ nome: true, email: true, servico: true, mensagem: true });
    const keys: (keyof Fields)[] = ["nome", "email", "servico", "mensagem"];
    const first = keys.find((k) => errs[k]);
    if (first) {
      document.getElementById(first === "nome" ? "nome" : first)?.focus();
      return;
    }
    handleSubmit(e);
  }

  if (state.succeeded) {
    return (
      <div className="animate-pop rounded-3xl border border-teal-brand/30 bg-teal-brand/[0.07] p-8 text-center sm:p-10">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-brand/15">
          <CircleCheck
            size={32}
            aria-hidden="true"
            className="text-teal-brand"
          />
        </span>
        <h3 className="font-display text-2xl font-bold text-white">
          Mensagem enviada
          {values.nome.trim() ? `, ${values.nome.trim().split(" ")[0]}` : ""}!
        </h3>
        <p className="mx-auto mt-2 max-w-85 text-[15px] text-white/60">
          Respondemos em 24h úteis com uma proposta personalizada.
        </p>
        <div className="mx-auto mt-6 flex max-w-85 flex-col gap-2 text-left">
          {["Resposta em 24h úteis", "Sem compromisso", "NDA disponível"].map(
            (t) => (
              <p
                key={t}
                className="flex items-center gap-2.5 text-sm text-white/65"
              >
                <CircleCheck
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-teal-brand"
                />
                {t}
              </p>
            ),
          )}
        </div>
        <button
          type="button"
          onClick={onAnother}
          className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-teal-brand/50 hover:text-teal-bright"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const serverErrors = (state.errors?.getFormErrors().length ?? 0) > 0;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={labelCls}>
            Nome *
          </label>
          <div className="relative">
            <User size={16} aria-hidden="true" className={fieldIconCls} />
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="O seu nome"
              autoComplete="name"
              value={values.nome}
              onChange={(e) => set("nome", e.target.value)}
              onBlur={() => blur("nome")}
              aria-invalid={!!clientErrors.nome}
              className={`${inputCls} ${clientErrors.nome ? inputErrorCls : ""}`}
            />
          </div>
          <FieldError message={clientErrors.nome} />
          <ValidationError
            prefix="Nome"
            field="nome"
            errors={state.errors}
            className="mt-1 text-[13px] text-red-400"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email *
          </label>
          <div className="relative">
            <Mail size={16} aria-hidden="true" className={fieldIconCls} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@empresa.com"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-invalid={!!clientErrors.email}
              className={`${inputCls} ${clientErrors.email ? inputErrorCls : ""}`}
            />
          </div>
          <FieldError message={clientErrors.email} />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="mt-1 text-[13px] text-red-400"
          />
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="servico" className={labelCls}>
          Preciso de *
        </label>
        <CustomSelect
          id="servico"
          name="servico"
          value={values.servico}
          onChange={(v) => set("servico", v)}
          onBlur={() => blur("servico")}
          placeholder="Escolher..."
          options={[
            "Cibersegurança",
            "Sistemas",
            "Formação",
            "SOC / Compliance",
            "Branding",
            "Outro",
          ]}
          icon={ShieldCheck}
          invalid={!!clientErrors.servico}
        />
        <FieldError message={clientErrors.servico} />
      </div>
      <div className="mb-5 grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="data" className={labelCls}>
            Data ideal
          </label>
          <CustomDate
            id="data"
            name="data_preferencial"
            value={values.data}
            onChange={(v) => set("data", v)}
          />
        </div>
        <div>
          <label htmlFor="hora" className={labelCls}>
            Horário
          </label>
          <CustomSelect
            id="hora"
            name="hora_preferencial"
            value={values.hora}
            onChange={(v) => set("hora", v)}
            onBlur={() => {}}
            placeholder="..."
            options={["Manhã", "Tarde", "Fim de tarde"]}
            icon={Clock}
          />
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="mensagem" className={labelCls}>
          Mensagem *
        </label>
        <div className="relative">
          <MessageSquare
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-1 text-white/30"
          />
          <textarea
            id="mensagem"
            name="mensagem"
            placeholder="O essencial do projeto."
            rows={3}
            maxLength={1000}
            value={values.mensagem}
            onChange={(e) => set("mensagem", e.target.value)}
            onBlur={() => blur("mensagem")}
            aria-invalid={!!clientErrors.mensagem}
            aria-describedby="mensagem-count"
            className={`${inputCls} resize-y ${clientErrors.mensagem ? inputErrorCls : ""}`}
          />
        </div>
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <FieldError message={clientErrors.mensagem} />
          <p
            id="mensagem-count"
            className="ml-auto shrink-0 font-mono text-[11px] text-white/30 tabular-nums"
          >
            {values.mensagem.length}/1000
          </p>
        </div>
        <ValidationError
          prefix="Mensagem"
          field="mensagem"
          errors={state.errors}
          className="mt-1 text-[13px] text-red-400"
        />
      </div>

      {serverErrors && (
        <div
          role="alert"
          className="animate-pop mb-5 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/[0.07] p-4"
        >
          <TriangleAlert
            size={18}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-red-400"
          />
          <div>
            <p className="text-sm font-bold text-white">
              Não foi possível enviar.
            </p>
            <p className="mt-0.5 text-[13px] text-white/60">
              Os seus dados estão guardados aqui. Verifique a ligação e tente de
              novo — ou escreva para geral@securadist.com.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-teal-brand p-4 font-sans text-[15px] font-extrabold text-navy transition-all duration-200 hover:bg-teal-bright active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
      >
        {state.submitting ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy"
            />
            A enviar...
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            {serverErrors ? "Tentar novamente" : "Enviar mensagem"}
          </>
        )}
      </button>
      <ValidationError errors={state.errors} className="mt-3 hidden" />
    </form>
  );
}

/* ── Página ────────────────────────────────────────── */

export default function Home() {
  const [openService, setOpenService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy text-white">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-1000 focus:rounded-lg focus:bg-teal-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-navy"
      >
        Saltar para o conteúdo
      </a>

      {/* Topo mínimo — sem menu, como a referência */}
      <header className="absolute inset-x-0 top-0 z-999">
        <div className="mx-auto flex h-19 max-w-275 items-center justify-between px-6">
          <a href="#inicio" className="flex items-center gap-2.5 no-underline">
            <svg
              viewBox="0 0 100 115"
              className="h-9 w-7.75"
              aria-hidden="true"
            >
              <polygon
                points="50,4 96,28 96,86 50,110 4,86 4,28"
                fill="none"
                stroke="#00AF91"
                strokeWidth="5"
              />
              <polygon
                points="50,20 82,38 82,78 50,96 18,78 18,38"
                fill="#12604E"
              />
              <polygon
                points="50,34 70,45 70,71 50,82 30,71 30,45"
                fill="#00AF91"
              />
              <text
                x="50"
                y="68"
                textAnchor="middle"
                fontFamily="Arial"
                fontWeight="900"
                fontSize="22"
                fill="#0B1F3A"
              >
                SD
              </text>
            </svg>
            <span className="text-[17px] font-extrabold">
              Secura<span className="text-teal-brand">Dist</span>
            </span>
          </a>
          <a
            href="#contacto"
            className="hidden rounded-full border border-white/25 px-5 py-2 text-sm font-bold text-white no-underline transition-colors hover:border-teal-brand hover:text-teal-bright sm:block"
          >
            Pedir proposta
          </a>
        </div>
      </header>

      <main id="conteudo">
        {/* HERO — ocupa a tela toda */}
        <section
          id="inicio"
          className="relative flex min-h-svh flex-col overflow-hidden"
        >
          <Image
            src="/images/servers.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-navy/60 via-navy/80 to-navy"
          />
          <div className="relative m-auto flex w-full max-w-225 flex-col items-center px-6 pt-32 pb-20 text-center sm:pt-36">
            <Reveal>
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-teal-brand" />
                Lisboa & Luanda
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-6xl leading-[1.02] font-bold tracking-tight text-balance sm:text-7xl lg:text-8xl">
                Segurança que
                <br />
                distribui valor
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-120 text-lg text-white/60 sm:text-xl">
                Cibersegurança e sistemas para empresas que não podem parar.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-brand px-10 py-4 font-bold text-navy no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-bright"
                >
                  Pedir proposta gratuita
                  <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RAIL — uma linha */}
        <div className="overflow-hidden border-y border-white/10 py-4">
          <div className="mask-fade-x overflow-hidden">
            <div className="flex w-max animate-marquee gap-10 pr-10">
              {[...RAIL, ...RAIL].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  aria-hidden={i >= RAIL.length}
                  className="text-[13px] font-bold tracking-wider whitespace-nowrap text-white/45 uppercase"
                >
                  {t}
                  <span className="ml-10 inline-block h-1 w-1 rounded-full bg-teal-brand/60" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SERVIÇOS — accordion full-width */}
        <section
          id="servicos"
          className="flex min-h-svh scroll-mt-16 flex-col justify-center px-6 py-24"
        >
          <div className="mx-auto max-w-200">
            <Head
              eyebrow="Serviços"
              title="Cinco pilares. Um parceiro."
              icon={<Layers size={15} aria-hidden="true" />}
            />
            <Reveal>
              <div className="border-t border-white/10">
                {SERVICOS.map((s, i) => {
                  const open = openService === i;
                  return (
                    <Row
                      key={s.title}
                      index={`0${i + 1}`}
                      title={s.title}
                      meta={s.price}
                      Icon={s.Icon}
                      open={open}
                      onToggle={() => setOpenService(open ? -1 : i)}
                    >
                      <p className="mb-3 font-medium text-white/80">{s.desc}</p>
                      <p className="text-[15px] text-white/50">
                        {s.bullets.join(" · ")}
                      </p>
                    </Row>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROCESSO — 4 passos */}
        <section
          id="processo"
          className="flex min-h-svh scroll-mt-16 flex-col justify-center border-y border-white/10 bg-navy-deep px-6 py-24"
        >
          <div className="mx-auto max-w-250">
            <Head
              eyebrow="Processo"
              title="Simples, do início ao fim."
              icon={<Route size={15} aria-hidden="true" />}
            />
            <ol className="grid list-none grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESSO.map((p, i) => (
                <Reveal key={p.num} delay={i * 70}>
                  <li className="border-t-2 border-teal-brand/40 pt-5">
                    <p className="mb-3 flex items-center justify-between font-mono text-xs text-white/35 tabular-nums">
                      {p.num}
                      <p.Icon
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="text-teal-brand/70"
                      />
                    </p>
                    <h3 className="mb-1 font-display text-lg font-bold">
                      {p.title}
                    </h3>
                    <p className="text-[15px] text-white/55">{p.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* EM CAMPO — fotos grandes, pouco texto */}
        <section className="flex min-h-svh flex-col justify-center px-6 py-24">
          <div className="mx-auto w-full max-w-250">
            <Head
              eyebrow="Em campo"
              title="O nosso terreno."
              icon={<Camera size={15} aria-hidden="true" />}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Reveal>
                <figure className="group relative h-80 overflow-hidden rounded-3xl sm:h-105">
                  <Image
                    src="/images/datacenter.jpg"
                    alt="Bastidores de servidores"
                    fill
                    sizes="(max-width: 640px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-navy/90 to-transparent"
                  />
                  <figcaption className="absolute bottom-5 left-5 font-display text-lg font-bold">
                    Infraestrutura
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={100}>
                <figure className="group relative h-80 overflow-hidden rounded-3xl sm:h-105">
                  <Image
                    src="/images/team.jpg"
                    alt="Equipa a colaborar"
                    fill
                    sizes="(max-width: 640px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-navy/90 to-transparent"
                  />
                  <figcaption className="absolute bottom-5 left-5 font-display text-lg font-bold">
                    Pessoas
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROVA — números */}
        <section
          id="sobre"
          className="flex min-h-svh scroll-mt-16 flex-col justify-center border-y border-white/10 bg-navy-deep px-6 py-24"
        >
          <div className="mx-auto max-w-225 text-center">
            <Head
              eyebrow="Prova"
              title="Números, não promessas."
              icon={<BadgeCheck size={15} aria-hidden="true" />}
            />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 70}>
                  <div>
                    <dd className="font-display text-5xl font-bold tabular-nums lg:text-6xl">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="mt-2 text-sm text-white/50">{s.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section className="flex min-h-svh flex-col justify-center px-6 py-24">
          <div className="mx-auto w-full max-w-180">
            <Head
              eyebrow="FAQ"
              title="Perguntas frequentes."
              icon={<LifeBuoy size={15} aria-hidden="true" />}
            />
            <Reveal>
              <div className="border-t border-white/10">
                {FAQ.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <Row
                      key={f.q}
                      index={`0${i + 1}`}
                      title={f.q}
                      open={open}
                      onToggle={() => setOpenFaq(open ? -1 : i)}
                    >
                      <p className="max-w-140 text-[15px] leading-relaxed text-white/60">
                        {f.a}
                      </p>
                    </Row>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <a
                href="https://wa.me/351965229072"
                target="_blank"
                rel="noopener"
                className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white no-underline transition-colors hover:border-teal-brand/50 hover:text-teal-bright"
              >
                Ainda com dúvidas? Fale connosco
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="flex min-h-svh scroll-mt-16 flex-col justify-center border-t border-white/10 bg-navy-deep px-6 py-24"
        >
          <div className="mx-auto grid max-w-225 grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <p className="mb-2 text-[13px] font-semibold tracking-wide text-white/45">
                Contacto
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold tracking-tight">
                Vamos conversar.
              </h2>
              <p className="mb-8 text-white/55">
                Proposta em 24h úteis. Sem compromisso.
              </p>
              <div className="border-t border-white/10">
                {[
                  {
                    l: "Email",
                    v: "geral@securadist.com",
                    h: "mailto:geral@securadist.com",
                    Icon: Mail,
                  },
                  {
                    l: "Telefone",
                    v: "+351 965 229 072",
                    h: "tel:+351965229072",
                    Icon: Phone,
                  },
                  {
                    l: "Onde",
                    v: "Lisboa · Luanda",
                    h: undefined,
                    Icon: MapPin,
                  },
                ].map((r) => (
                  <div
                    key={r.l}
                    className="flex items-center gap-4 border-b border-white/10 py-4"
                  >
                    <r.Icon
                      size={18}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="shrink-0 text-teal-brand/70"
                    />
                    <div>
                      <p className="mb-1 font-mono text-[11px] tracking-widest text-white/35 uppercase">
                        {r.l}
                      </p>
                      {r.h ? (
                        <a
                          href={r.h}
                          className="font-semibold text-teal-brand no-underline hover:underline"
                        >
                          {r.v}
                        </a>
                      ) : (
                        <p className="font-semibold">{r.v}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm
                key={formKey}
                onAnother={() => setFormKey((k) => k + 1)}
              />
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER + CTA fundidos */}
      <footer className="relative flex min-h-svh flex-col justify-center overflow-hidden border-t border-white/10 px-6 pt-24 pb-8">
        <Image
          src="/images/encryption.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-navy via-navy/85 to-navy"
        />
        <div className="relative mx-auto max-w-225 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Pronto para o próximo passo?
            </h2>
            <a
              href="#contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-brand px-9 py-4 font-bold text-navy no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-bright"
            >
              Pedir proposta gratuita
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </Reveal>
          <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:justify-between">
            <p>
              © 2026{" "}
              <span className="font-semibold text-teal-brand">SecuraDist</span>
            </p>
            <p className="flex gap-5">
              <a href="#servicos" className="no-underline hover:text-white">
                Serviços
              </a>
              <a href="#processo" className="no-underline hover:text-white">
                Processo
              </a>
              <a href="#contacto" className="no-underline hover:text-white">
                Contacto
              </a>
            </p>
            <p>Lisboa · Luanda</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href="https://wa.me/351965229072?text=Ol%C3%A1%20SecuraDist%2C%20quero%20uma%20proposta."
        target="_blank"
        rel="noopener"
        aria-label="Falar connosco no WhatsApp"
        className={`fixed bottom-5 left-5 z-997 flex h-12 w-12 items-center justify-center rounded-full bg-[#22C172] text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          showTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41" />
        </svg>
      </a>

      {/* Voltar ao topo */}
      <button
        type="button"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-5 bottom-5 z-997 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-navy/90 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.4} aria-hidden="true" />
      </button>
    </div>
  );
}
