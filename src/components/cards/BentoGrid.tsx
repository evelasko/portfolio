import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import ArrowButton from "../buttons/ArrowButton";
import { CloudinaryImage } from "@/components/mdx/CloudinaryImage";

function BentoGrid({
  bentoClass,
  className,
  children,
}: {
  bentoClass: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        bentoClass,
        ...(className
          ? [className]
          : [
              "grid rounded-4xl border border-black-10 overflow-hidden w-full p-4 bg-black/[0.02]",
              "grid-cols-3 grid-rows-[200px_200px_200px_200px_200px] gap-4",
              "m:grid-cols-4 m:grid-rows-[200px_200px_200px] gap-4",
            ])
      )}
    >
      {children}
    </div>
  );
}

function BentoContentRow({
  heading,
  title,
  description,
  link,
  gridBox,
}: {
  heading: string;
  title: string;
  description?: string;
  link: string;
  gridBox?: string;
}) {
  return (
    <div
      style={{ gridArea: gridBox }}
      className="flex-1 bg-white rounded-4xl border border-black-20 p-8 flex flex-col justify-between"
    >
      <div
        className={clsx(
          TYPOGRAPHY.mono16,
          "tracking-tight uppercase text-black-50"
        )}
      >
        {heading}
      </div>

      <div
        className={clsx(
          TYPOGRAPHY.h7,
          "!mb-0 !pb-0 text-black-90 leading-[1.2] h-full"
        )}
      >
        {title}
      </div>

      <div className="flex flex-row items-end">
        <div
          className={clsx(
            TYPOGRAPHY.text14,
            "flex-1 pr-2 !mb-0 leading-[1.2] text-black-50 h-fit"
          )}
        >
          {description || <div />}
        </div>
        <div className="flex items-end">
          <ArrowButton href={link} />
        </div>
      </div>
    </div>
  );
}

function BentoImageRow({
  imagePath,
  imageAlt,
  gridBox,
}: {
  imagePath: string;
  imageAlt: string;
  gridBox: string;
}) {
  return (
    <div style={{ gridArea: gridBox }} className="rounded-4xl overflow-hidden relative">
      <CloudinaryImage
        src={imagePath}
        alt={imageAlt}
        fill
        crop="fill"
        gravity="auto:subject"
        quality="auto"
        className="object-cover transition-transform duration-300 ease-out hover:scale-110"
        sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

BentoGrid.ContentRow = BentoContentRow;
BentoGrid.ImageRow = BentoImageRow;

export default BentoGrid;
