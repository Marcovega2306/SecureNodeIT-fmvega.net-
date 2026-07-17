import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { type TestimonialRecord } from "@/lib/data";

export function QuoteCard({ item }: { item: TestimonialRecord }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
      <Quotes className="h-6 w-6 text-accent" weight="fill" aria-hidden />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <Image
          src={`https://picsum.photos/seed/${item.avatarSeed}/80/80`}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover grayscale"
          unoptimized
        />
        <div>
          <p className="text-sm font-semibold text-fg">{item.author}</p>
          <p className="text-xs text-muted">
            {item.role}, {item.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
