interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  description?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
}: StatCardProps) => {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">
          {icon}
        </div>

      </div>

      {description && (
        <small>{description}</small>
      )}

    </div>
  );
};

export default StatCard;