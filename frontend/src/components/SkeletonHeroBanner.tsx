const SkeletonHeroBanner = () => {
    return (
        <div className="grid grid-rows-1 grid-flow-col text-center bg-white">
            <div className="row-span-3 space-y-5 flex flex-col  border-r-2 border-primary justify-around items-center">
                <div className="h-56 w-56 bg-gray-500" />
                <div className="h-8 w-44 bg-gray-500" />
            </div>
            <div className="row-span-3 flex flex-col-reverse  border-r-2 border-primary justify-around items-center "></div>
            <div>
                <div className="row-span-2 flex justify-center items-center  border-b-2 border-primary"></div>
                <div className="row-span-2 flex justify-center items-center  border-b-2 border-primary"></div>
            </div>
        </div>
    )
}

export default SkeletonHeroBanner