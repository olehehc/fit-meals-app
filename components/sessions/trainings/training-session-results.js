import ChartsGrid from "../charts/charts-grid";
import {
  prepareSetsRepsChartData,
  prepareSetsRestsChartData,
  prepareStrengthSetsWeightsChartData,
} from "@/lib/utils";

function prepareAllCharts(data) {
  return [
    prepareSetsRepsChartData(
      "Repetition Performance",
      "Comparison of planned vs actual repetitions across sets",
      data
    ),

    prepareSetsRestsChartData(
      "Rest Time Performance",
      "Comparison of planned vs actual rest durations (in minutes) between sets",
      data
    ),

    prepareStrengthSetsWeightsChartData(
      "Strength Training Performance",
      "Comparison of planned vs actual weights (kg) across strength sets",
      data
    ),
  ];
}

export default function TrainingSessionResults({ trainingSessionData }) {
  const overallChartsData = prepareAllCharts(trainingSessionData.exercises);

  return (
    <>
      <div className="w-full p-6 space-y-4 ">
        <p className="text-lg font-semibold">Overall</p>
        <ChartsGrid chartsData={overallChartsData} />
      </div>
      <ul className="w-full ">
        {trainingSessionData.exercises.map((exercise) => {
          const exerciseChartsData = prepareAllCharts(exercise);

          return (
            <li key={exercise.id}>
              <div className="p-6 space-y-4">
                <p className="text-lg font-semibold">{exercise.title}</p>
                <ChartsGrid chartsData={exerciseChartsData} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
