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

  // useEffect(() => {
  //   // Set a dummy filteredEntry for UI testing
  //   setFilteredEntry({
  //     territory_id: 'Dummy Territory',
  //     total_points: 12345,
  //     index: 4, // Change this index to see different suffixes like 1st, 2nd, 3rd, etc.
  //   });
  // }, []);

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='bg-white w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
      </div>
    );
  }

  const getOrdinalSuffix = (index) => {
    const j = index % 10;
    const k = index % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  };

  return (
    <>
      <div className='relative w-full'>
        <img src="Google-Pay-banner 1.png" alt="Google Pay Banner" className='w-full' />
        <div className="absolute inset-0 flex justify-center items-center mt-12 flex-wrap">
          {tableData.slice(0, 3).map((entry, index) => (
            <div
              key={index}
              className={`p-0 rounded-lg shadow-lg bg-white m-2 flex flex-col justify-between items-center`}
              style={{
                maxWidth: '214px',
                width: '190px',
                height: '220px',
                borderRadius: '50px',
                order: index === 0 ? 2 : index === 1 ? 1 : 3,
                transform: index === 0 ? 'translateY(-30px)' : ''
              }}
            >
              <div className="bg-green-500 text-white text-center py-4 rounded-t-lg w-full"
                style={{ borderRadius: '50px 50px 0 0' }}>
                <div className="text-4xl font-bold">
                  {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
                </div>
              </div>
              <div className="p-4 text-left w-full">
                <div className="text-black-600 text-center">{entry.territory_id}</div>
                <div className="flex items-center justify-center pt-2">
                  <img src="icon 2.png" alt="" className="h-4 w-4 mr-1" />
                  <div className="text-black-600" style={{ fontSize: '20px' }}>{entry.total_points}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredEntry ? (
  <div className="absolute px-4 bg-green-100 py-2 rounded-lg" style={{ borderRadius: '20px', margin: '0 20px', width: '740px', maxWidth: '800px', height: 'auto' }}>
    <div className="flex items-center justify-between">
      <div className="text-lg font-bold bg-dark-green-500 text-white px-3 py-1" style={{ backgroundColor: '#00AC4F', height: '50px', width: '70px', borderRadius: '20px', textAlign: 'center' }}>
        <div style={{ marginTop: '10px' }}>
          {filteredEntry.index + 1}
          {getOrdinalSuffix(filteredEntry.index + 1)}
        </div>
      </div>
      <div className="flex items-center justify-between w-full ml-4">
        <div style={{ fontSize: '18px', flex: '1',marginLeft:'160px'}}>{filteredEntry.territory_id}</div>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'flex-end' }}>
          <img src="icon 2.png" alt="Points Icon" className="w-4 h-4 mr-1" />
          <div style={{ fontSize: '18px' }}>{filteredEntry.total_points}</div>
        </div>
      </div>
    </div>
  </div>
) : (
  <div className='w-[90%] mx-auto bottom-4 left-0 right-0 bg-green-100 border-2 rounded-full flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 text-center text-xs sm:text-sm' style={{ height: '40px' }}>
    Your Territory could not be found
  </div>
)}

      </div>

      <main className='font-googleSans flex flex-col w-full mt-16 z-10 bg-white rounded-xl overflow-hidden pb-16'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-white'>
              <tr>
                <th className='px-14 py-3 text-left text-sm font-bold tracking-wider'>
                  Rank
                </th>
                <th className='px-14 py-3 text-left text-sm font-bold tracking-wider' style={{ paddingLeft: '50px' }}>
                  <div>Territory ID</div>
                </th>
                <th className='px-6 py-3 text-left text-sm font-bold tracking-wider'>
                  Points
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {tableData.map((entry, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    <div className='text-sm text-gray-900 px-12'>
                      {index + 1}
                      {getOrdinalSuffix(index + 1)}
                    </div>
                  </td>
                  <td className='px-6 py-3 whitespace-nowrap' style={{ paddingLeft: '50px' }}>
                    <div className='text-sm text-gray-900 text-left'>{entry.territory_id}</div>
                  </td>
                  <td className='px-6 py-3 whitespace-nowrap'>
                    <div className='flex items-center justify-start'>
                      <img src="icon 2.png" alt="" className='w-4 h-4 sm:w-5 sm:h-5 mr-1' />
                      <div className='text-sm text-gray-900 text-left'>{entry.total_points}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default App;








// import React, { useEffect, useState } from 'react';

// const App = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const territoryIdParam = urlParams.get('territory_id');

//   const [tableData, setTableData] = useState([]);
//   const [filteredEntry, setFilteredEntry] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAndFilterLeaderboardData = async () => {
//       try {
//         const res = await fetch('https://gcpprod.testexperience.site/fetchLeaderboard');
//         if (res.ok) {
//           const data = await res.json();
//           setTableData(data.leaderboard);

//           if (territoryIdParam) {
//             const filteredIndex = data.leaderboard.findIndex(entry => entry.territory_id === territoryIdParam);
//             const filtered = data.leaderboard[filteredIndex];
//             setFilteredEntry({ ...filtered, index: filteredIndex });
//           }
//         } else {
//           throw new Error('Failed to fetch leaderboard data');
//         }
//       } catch (error) {
//         console.error('Error fetching leaderboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAndFilterLeaderboardData();
//   }, [territoryIdParam]);

//   if (loading) {
//     return (
//       <div className='w-full h-screen flex justify-center items-center'>
//         <div className='bg-white w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <header className='font-googleSans flex justify-center items-center absolute' style={{
//         width: '394px',
//         height: '34px',
//         top: '32px',
//         left: 'calc(50% - 197px)',
//         gap: '0px',
//         zIndex: 10
//       }}>
//         <h1 className='text-center text-2xl sm:text-3xl'>Main Leaderboard</h1>
//       </header>
//       <div className='relative w-full'>
//         <img src="Google-Pay-banner 1.png" alt="Google Pay Banner" className='w-full' />
//         <div className="absolute inset-0 flex justify-center items-center mt-12">
//           <div className="relative flex justify-center items-center w-full h-full">
//             {tableData.slice(0, 3).map((entry, index) => (
//               <div
//                 key={index}
//                 className="p-0 rounded-lg shadow-lg absolute bg-white"
//                 style={{
//                   width: index === 0 ? '234px' : index === 1 ? '234.09px' : '231px',
//                   height: index === 0 ? '260.68px' : index === 1 ? '260.46px' : '260.46px',
//                   top: index === 0 ? '89px' : index === 1 ? '144px' : '174px',
//                   left: index === 0 ? '50%' : index === 1 ? 'calc(50% - 256.09px - 167px)' : 'calc(50% + 305.09px - 137px)',
//                   transform: index === 0 ? 'translateX(-50%)' : '',
//                   borderRadius: '50px',
//                   opacity: '1',
//                   zIndex: 5,
//                   fontSize: '23px'
//                 }}
//               >
//                 <div className="bg-green-500 text-white text-center py-4 rounded-t-lg"
//                   style={{ height: '30%', borderRadius: '50px 50px 0 0' }}>
//                   <div className="text-4xl font-bold" style={{ paddingTop: '13px' }}>
//                     {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
//                   </div>
//                 </div>
//                 <div className="p-4 text-left">

//                   <div className="text-black-600 pl-4 pt-2" style={{ marginTop: '30px' }}>{entry.territory_id}</div>
//                   <div className="flex items-center pl-4 pt-2">
//                     <img src="icon 2.png" alt="" className="h-4 w-4 mr-1" />
//                     <div className="text-black-600 pl-4" style={{ fontSize: '20px', marginLeft: '-10px' }}>{entry.total_points}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {filteredEntry ? (
//   <div className="absolute px-4 bg-green-100 py-3 rounded-lg" style={{ borderRadius: '20px', margin: '0 20px' }}>
//     <div className="flex items-center justify-between">
//       <div className="text-lg font-bold bg-dark-green-500 text-white px-3 py-1" style={{ backgroundColor: '#00AC4F', height: '60px', width: '80px', borderRadius: '20px', textAlign: 'center' }}>
//         <div style={{ marginTop: '12px' }}>
//           {filteredEntry.index}
//           {filteredEntry.index === 0 ? 'st' : filteredEntry.index === 1 ? 'nd' : filteredEntry.index === 2 ? 'rd' : 'th'}
//         </div>
//       </div>
//       <div className="flex items-center">
//         <div style={{ marginRight: '420px', fontSize: '22px' }}>{filteredEntry.territory_id}</div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img src="icon 2.png" alt="Points Icon" className="w-4 h-4" />
//           <div style={{ marginRight: '100px', fontSize: '22px' }}>{filteredEntry.total_points}</div>
//         </div>
//       </div>
//     </div>
//   </div>
// ) : (
// <div className='w-[90%] mx-auto bottom-4 left-0 right-0 bg-green-100 border-2 rounded-full flex justify-center items-center px-2 py-1 sm:px-4 sm:py-2 text-center text-xs sm:text-sm' style={{ height:'60px' }}>
//   Your Territory could not be found
// </div>


// )}



//       </div>

//       <main className='font-googleSans flex flex-col w-full mt-16 z-10 bg-white rounded-xl overflow-hidden pb-16'>
//         <div className='overflow-x-auto'>
//           <table className='min-w-full divide-y divide-gray-200'>
//             <thead className='bg-white'>
//               <tr>
//                 <th className='px-14 py-3 text-left text-sm font-bold tracking-wider'>
//                   Rank
//                 </th>
//                 <th className='text-sm font-bold'>
//                   <div style={{marginLeft:'-40px'}}>Territory ID</div>
//                 </th>
//                 <th className='px-6 py-3 text-center text-sm font-bold tracking-wider'>
//                   Points
//                 </th>
//               </tr>
//             </thead>
//             <tbody className='bg-white divide-y divide-gray-200'>
//               {tableData.map((entry, index) => (
//                 <tr key={index} className='hover:bg-gray-100'>
//                   <td className='px-4 py-3 whitespace-nowrap'>
//                     <div className='text-sm text-gray-900 px-12'>
//                       {index + 1}
//                       {index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
//                     </div>
//                   </td>
//                   <td className='px-6 py-3 whitespace-nowrap'>
//                     <div className='px-10 text-sm text-gray-900' style={{marginLeft:'400px'}}>{entry.territory_id}</div>
//                   </td>
//                   <td className='px-6 py-3 whitespace-nowrap'>
//                     <div className='flex items-center justify-center'>
//                       <img src="icon 2.png" alt="" className='w-4 h-4 sm:w-5 sm:h-5 mr-1' />
//                       <div className='text-sm text-gray-900'>{entry.total_points}</div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>

//     </>
//   );
// };

// export default App;



