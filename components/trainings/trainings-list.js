import TrainingItem from "./training-item";

export default function TrainingsList({ trainings, onDelete }) {
  return (
    <ul className="space-y-4">
      {trainings.map((training) => (
        <li key={training.id}>
          <TrainingItem
            trainingId={training.id}
            onDelete={onDelete}
            title={training.title}
            trainingDate={training.training_date}
          />
        </li>
      ))}
    </ul>
  );
}
