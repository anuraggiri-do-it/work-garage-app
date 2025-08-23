import Card from "./UI/Card";

export default function PageHeader({ title, icon: Icon, subtitle }) {
  return (
    <Card className="mb-8 p-4">
      <h2 className="text-3xl font-extrabold text-sky-700 mb-2 flex items-center gap-2">
        {Icon && <Icon size={28} className="text-sky-500" />}
        {title}
      </h2>
      {subtitle && <p className="text-sky-600">{subtitle}</p>}
    </Card>
  );
}