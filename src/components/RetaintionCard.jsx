import React from 'react'
import players from '../utils/players'

function RetaintionCard({ player1, player2, player3, player4 }) {
    const fulldetails1 = players.filter((data) => {
        return data.name === player1;
    })
    const fulldetails2 = players.filter((data) => {
        return data.name === player2;
    })
    const fulldetails3 = players.filter((data) => {
        return data.name === player3;
    })
    const fulldetails4 = players.filter((data) => {
        return data.name === player4;
    })

    return (
        <>
            {fulldetails1.length !== 0 &&
                <div
                    className={`block mt-4 mr-8 ml-8 cursor-pointer border rounded-lg ${fulldetails1[0].country !== "India" ?"bg-yellow-400":"bg-blue-600"} text-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`} style={{ width: "28rem" }}>
                    <div
                        className="border-b-2 border-yellow-100 px-6 py-3 text-2xl dark:border-neutral-600 dark:text-neutral-50">
                        {fulldetails1[0].name}
                    </div>
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight  dark:text-neutral-50">
                            {fulldetails1[0].country}
                        </h5>
                        <p className="mb-2 text-base dark:text-neutral-200">
                            {fulldetails1[0].type}
                        </p>
                        <p className="text-base dark:text-neutral-200">
                            {fulldetails1[0].iplTeam}
                        </p>
                    </div>
                </div>
            }
            {fulldetails2.length !== 0 &&
                <div
                    className={`block mt-4 mr-8 ml-8 cursor-pointer border rounded-lg ${fulldetails2[0].country !== "India" ? "bg-yellow-400" : "bg-blue-600"} text-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`} style={{ width: "28rem" }}>
                    <div
                        className="border-b-2 border-yellow-100 px-6 py-3 text-2xl dark:border-neutral-600 dark:text-neutral-50">
                        {fulldetails2[0].name}
                    </div>
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight  dark:text-neutral-50">
                            {fulldetails2[0].country}
                        </h5>
                        <p className="mb-2 text-base dark:text-neutral-200">
                            {fulldetails2[0].type}
                        </p>
                        <p className="text-base dark:text-neutral-200">
                            {fulldetails2[0].iplTeam}
                        </p>
                    </div>
                </div>
            }
            {fulldetails3.length !== 0 &&
                <div
                    className={`block mt-4 mr-8 ml-8 cursor-pointer border rounded-lg ${fulldetails3[0].country !== "India" ? "bg-yellow-400" : "bg-blue-600"} text-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`} style={{ width: "28rem" }}>
                    <div
                        className="border-b-2 border-yellow-100 px-6 py-3 text-2xl dark:border-neutral-600 dark:text-neutral-50">
                        {fulldetails3[0].name}
                    </div>
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight  dark:text-neutral-50">
                            {fulldetails3[0].country}
                        </h5>
                        <p className="mb-2 text-base dark:text-neutral-200">
                            {fulldetails3[0].type}
                        </p>
                        <p className="text-base dark:text-neutral-200">
                            {fulldetails3[0].iplTeam}
                        </p>
                    </div>
                </div>
            }
            {fulldetails4.length !== 0 &&
                <div
                    className={`block mt-4 mr-8 ml-8 cursor-pointer border rounded-lg ${fulldetails4[0].country !== "India" ? "bg-yellow-400" : "bg-blue-600"} text-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`} style={{ width: "28rem" }}>
                    <div
                        className="border-b-2 border-yellow-100 px-6 py-3 text-2xl dark:border-neutral-600 dark:text-neutral-50">
                        {fulldetails4[0].name}
                    </div>
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight  dark:text-neutral-50">
                            {fulldetails4[0].country}
                        </h5>
                        <p className="mb-2 text-base dark:text-neutral-200">
                            {fulldetails4[0].type}
                        </p>
                        <p className="text-base dark:text-neutral-200">
                            {fulldetails4[0].iplTeam}
                        </p>
                    </div>
                </div>
            }    
                
            {(fulldetails1.length === 0 && fulldetails2.length === 0 && fulldetails3.length === 0 && fulldetails4.length === 0) && 
                <div
                    className="block mt-4 mr-8 ml-8 cursor-pointer border rounded-lg bg-blue-600 text-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" style={{ width: "28rem" }}>
                    <div
                        className="border-b-2 border-yellow-100 px-6 py-3 text-2xl dark:border-neutral-600 dark:text-neutral-50">
                        -
                    </div>
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight  dark:text-neutral-50">
                            -
                        </h5>
                        <p className="mb-2 text-base dark:text-neutral-200">
                            -
                        </p>
                        <p className="text-base dark:text-neutral-200">
                            -
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default RetaintionCard
