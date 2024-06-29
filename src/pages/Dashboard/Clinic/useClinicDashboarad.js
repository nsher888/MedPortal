export const useClinicDashboard = (data) => {
  const statistics = data.data;

  const doctorsNumber = statistics.doctorsNumber;
  const resultsNumber = statistics.resultsNumber;
  const uniqueIds = statistics.uniqueIds;
  const resultsData = statistics.resultsData;

  const chartData = resultsData.reduce((acc, result) => {
    const date = new Date(result.created_at).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const sortedDates = Object.keys(chartData).sort(
    (a, b) => new Date(a) - new Date(b),
  );
  const sortedCounts = sortedDates.map((date) => chartData[date]);

  const dataForBarChart = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Number of Test Results per Day',
        data: sortedCounts,
        backgroundColor: 'rgba(66,0,255, 0.8)',
      },
    ],
  };

  const testTypeCounts = resultsData.reduce((acc, result) => {
    const testType = result.testType;
    acc[testType] = (acc[testType] || 0) + 1;
    return acc;
  }, {});

  const testTypeLabels = Object.keys(testTypeCounts);
  const testTypeData = Object.values(testTypeCounts);

  const dataForPieChart = {
    labels: testTypeLabels,
    datasets: [
      {
        label: 'Distribution of Test Types',
        data: testTypeData,
        backgroundColor: [
          'rgba(66, 135, 245, 0.8)',
          'rgba(245, 66, 101, 0.8)',
          'rgba(66, 245, 176, 0.8)',
          'rgba(245, 182, 66, 0.8)',
          'rgba(182, 66, 245, 0.8)',
          'rgba(66, 245, 66, 0.8)',
          'rgba(245, 66, 245, 0.8)',
          'rgba(66, 182, 245, 0.8)',
          'rgba(245, 66, 66, 0.8)',
          'rgba(66, 245, 245, 0.8)',
          'rgba(245, 245, 66, 0.8)',
          'rgba(66, 66, 245, 0.8)',
        ],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return {
    doctorsNumber,
    resultsNumber,
    uniqueIds,
    dataForBarChart,
    dataForPieChart,
    pieChartOptions,
  };
};
