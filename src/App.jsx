import React, { useEffect, useState } from 'react';

const App = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const res = await fetch('https://gcptest.testexperience.site/fetchLeaderboard_testing');
        if (res.ok) {
          const data = await res.json();
          setTableData(data.LeaderBoard);
          console.log(data.LeaderBoard);
        } else {
          throw new Error('Failed to fetch leaderboard data');
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <>
      <header className='font-googleSans h-12 flex justify-center items-center'>
        <h1 className='font-bold'>Main Leaderboard</h1>
      </header>
      <div className='w-full'>
        <img src="Google-Pay-banner 1.png" alt="Google Pay Banner" className='z-10' />
      </div>
      <main className='font-googleSans flex flex-col w-full -mt-2 z-10 bg-white rounded-xl overflow-hidden'>
        {tableData && tableData.length > 0 && (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-white w-full'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-bold tracking-wider'>
                  Rank
                </th>
                <th className='px-6 py-3 text-left text-sm font-bold tracking-wider'>
                  Territory
                </th>
                <th className='px-6 py-3 text-left text-sm font-bold tracking-wider'>
                  Points
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {tableData && tableData.map((entry, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {entry.ranking}
                      {entry.ranking === 1 ? 'st' : entry.ranking == 2 ? 'nd' : entry.ranking == 3 ? 'rd': 'th'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{entry.territory_id}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap flex gap-1 justify-center items-center'>
                    <img src="icon 2.png" alt="" className='h-4 w-4' />
                    <div className='text-sm text-gray-900'>{entry.total_points}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default App;
