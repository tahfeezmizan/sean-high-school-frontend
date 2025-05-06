// import React from "react";

// const NormalLoading = () => {
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
//         </div>
//     );
// };

// export default NormalLoading;


import React from "react";

const NormalLoading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative w-24 h-24"> {/* Increased container size */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            transform: `rotate(${i * 30}deg)`,
                            animation: `fade 1.2s linear infinite`,
                            animationDelay: `${(i * 0.1).toFixed(1)}s`,
                        }}
                    >
                        <div className="w-2 h-8 bg-gray-500 rounded-full mx-auto transform translate-x-4" />
                        {/* Added translate-x-4 for outward spacing */}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes fade {
                    0% { opacity: 1; }
                    100% { opacity: 0.1; }
                }
            `}</style>
        </div>
    //     <div className="flex items-center justify-center h-screen">
    //         <div className="relative w-24 h-24"> {/* Bigger container */}
    //             {[...Array(12)].map((_, i) => (
    //                 <div
    //                     key={i}
    //                     className="absolute top-0 left-0 w-full h-full"
    //                     style={{
    //                         transform: `rotate(${i * 30}deg)`,
    //                         animation: `fade 1.2s linear infinite`,
    //                         animationDelay: `${(i * 0.1).toFixed(1)}s`,
    //                     }}
    //                 >
    //                     <div className="w-2 h-8 bg-gray-500 rounded-full mx-auto" /> {/* Wider and longer bars */}
    //                 </div>
    //             ))}
    //         </div>

    //         <style jsx>{`
    //     @keyframes fade {
    //       0% { opacity: 1; }
    //       100% { opacity: 0.1; }
    //     }
    //   `}</style>
    //     </div>
    );
};

export default NormalLoading;
