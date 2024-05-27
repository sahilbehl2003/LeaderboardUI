import React, { useEffect, useState } from 'react';

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const territoryIdParam = urlParams.get('territory_id');

  const [tableData, setTableData] = useState([]);
  const [filteredEntry, setFilteredEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterLeaderboardData = async () => {
      try {
        const res = await fetch('https://gcpprod.testexperience.site/fetchLeaderboard');
        if (res.ok) {
          const data = await res.json();
          setTableData(data.leaderboard);

          if (territoryIdParam) {
            const filteredIndex = data.leaderboard.findIndex(entry => entry.territory_id === territoryIdParam);
            const filtered = data.leaderboard[filteredIndex];
            setFilteredEntry({ ...filtered, index: filteredIndex });
          }
        } else {
          throw new Error('Failed to fetch leaderboard data');
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterLeaderboardData();
  }, [territoryIdParam]);

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='bg-white w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <>
      <header class='font-googleSans h-12 flex justify-center items-center'>
        <h1 class='font-bold text-center text-lg sm:text-xl'>Main Leaderboard</h1>
      </header>
      <div class='w-full'>
        <img src="Google-Pay-banner 1.png" alt="Google Pay Banner" class='w-full' />
      </div>
      <main class='font-googleSans flex flex-col w-full -mt-2 z-10 bg-white rounded-xl overflow-hidden pb-16'>
        <div class='overflow-x-auto'>
          <table class='min-w-full divide-y divide-gray-200'>
            <thead class='bg-white'>
              <tr>
                <th class='px-2 sm:px-6 py-3 text-left text-xs sm:text-sm font-bold tracking-wider'>
                  Rank
                </th>
                <th class='px-2 py-1 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-bold tracking-wider'>
                  Territory
                </th>
                <th class='px-2 py-1 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-bold tracking-wider'>
                  Points
                </th>
              </tr>
            </thead>
            <tbody class='bg-white divide-y divide-gray-200'>
              {tableData.map((entry, index) => (
                <tr key={index} class='hover:bg-gray-100'>
                  <td class='pl-4 sm:px-6 py-4 whitespace-nowrap'>
                    <div class='text-xs sm:text-sm text-gray-900'>
                      {index + 1}
                      {index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                    </div>
                  </td>
                  <td class='px-2 py-1 sm:px-6 sm:py-4 whitespace-nowrap'>
                    <div class='text-xs sm:text-sm text-gray-900'>{entry.territory_id}</div>
                  </td>
                  <td class='pr-4 py-1 sm:px-6 sm:py-4 whitespace-nowrap flex justify-center items-center h-full gap-1 pt-3'>
                    <img src="icon 2.png" alt="" class='h-3 w-3 sm:h-4 sm:w-4' />
                    <div class='text-xs sm:text-sm text-gray-900'>{entry.total_points}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEntry ? (
          <div class='fixed w-[90%] max-w-xl mx-auto bottom-4 left-0 right-0 bg-[#4285F4] border-2 border-blue-500 rounded-full flex justify-between items-center px-2 py-1 sm:px-4 sm:py-2 shadow-xl'>
            <div class='text-xs sm:text-sm text-white'>
              {filteredEntry.index}
              {filteredEntry.index === 0 ? 'st' : filteredEntry.index === 1 ? 'nd' : filteredEntry.index === 2 ? 'rd' : 'th'}
            </div>
            <div class='text-xs sm:text-sm text-white'>
              {filteredEntry.territory_id}
            </div>
            <div class='text-xs sm:text-sm text-white flex justify-center items-center gap-1'>
              <img src="icon 2.png" alt="" class='h-3 w-3 sm:h-4 sm:w-4' />
              {filteredEntry.total_points}
            </div>
          </div>
        ) : (
          <div class='fixed w-[90%] mx-auto bottom-4 left-0 right-0 bg-[#4285F4] border-2 border-gray-400 rounded-full flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 shadow-xl text-center text-xs sm:text-sm'>
            Your Territory could not be found
          </div>
        )}
      </main>
    </>
  );
};

export default App;
