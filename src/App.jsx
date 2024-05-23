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
            const filtered = data.leaderboard.find(entry => entry.territory_id === territoryIdParam);
            setFilteredEntry(filtered);
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
      <header className='font-googleSans h-12 flex justify-center items-center'>
        <h1 className='font-bold'>Main Leaderboard</h1>
      </header>
      <div className='w-full'>
        <img src="Google-Pay-banner 1.png" alt="Google Pay Banner" className='z-10' />
      </div>
      <main className='font-googleSans flex flex-col w-full -mt-2 z-10 bg-white rounded-xl overflow-hidden pb-16'>
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
              {tableData.map((entry, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {entry.ranking}
                      {entry.ranking === 1 ? 'st' : entry.ranking === 2 ? 'nd' : entry.ranking === 3 ? 'rd' : 'th'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{entry.territory_id}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap flex gap-1 justify-start items-center'>
                    <img src="icon 2.png" alt="" className='h-4 w-4' />
                    <div className='text-sm text-gray-900'>{entry.total_points}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filteredEntry ? (
          <div className='fixed w-[90%] mx-auto bottom-4 left-0 right-0 bg-[#4285F4] border-2 border-blue-500 rounded-full flex justify-between items-center px-4 py-2 shadow-xl'>
            <div className='text-white'>
              {filteredEntry.ranking}
              {filteredEntry.ranking === 1 ? 'st' : filteredEntry.ranking === 2 ? 'nd' : filteredEntry.ranking === 3 ? 'rd' : 'th'}
            </div>
            <div className='text-white'>
              {filteredEntry.territory_id}
            </div>
            <div className='text-white flex justify-center items-center gap-1.5'>
              <img src="icon 2.png" alt="" className='h-4 w-4' />
              {filteredEntry.total_points}
            </div>
          </div>
        ) : (
          <div className='fixed w-[90%] mx-auto bottom-4 left-0 right-0 bg-[#4285F4] border-2 border-gray-400 rounded-full flex justify-center items-center px-4 py-2 shadow-xl text-center'>
            Your Territory could not be found
          </div>
        )}
      </main>
    </>
  );
};

export default App;
