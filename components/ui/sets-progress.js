import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SetsProgress({ done, total }) {
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="w-12 h-12">
      <CircularProgressbar
        value={percentage}
        text={done === total ? "🏆" : `${done}`}
        styles={buildStyles({
          textSize: "32px",
          pathColor: "#016630",
          textColor: "#111",
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  );
}
