// Tipos de fila que devuelve Supabase (PostgREST) para las 3 tablas.
// Importante: los timestamptz llegan como string ISO (no Date), a diferencia
// de lo que devolvía Prisma. Por eso createdAt/updatedAt son `string`.

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarSeed: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  message: string;
  status: string; // nuevo | contactado | cerrado
  createdAt: string;
};
