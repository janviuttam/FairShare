import Link from "next/link";

export default function Breadcrumb({
  items,
}: {
  items: {
    label: string;
    href?: string;
  }[];
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-cyan-400"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white">
              {item.label}
            </span>
          )}

          {index <
            items.length - 1 && (
            <span>/</span>
          )}
        </div>
      ))}
    </div>
  );
}