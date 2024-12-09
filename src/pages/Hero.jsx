const Hero = () => {
  return (
    <div className="hero-bg w-full h-[800px] py-20">
         <div className="container mx-auto flex justify-around h-full">
            <div className="flex flex-col justify-center">
                <div className="font-semibold flex items-center uppercase">
                    <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>
                    Hot Trend
                </div>
                <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">Fresh Fashion Finds
                    <br />
                    <span className="font-light">new collection</span>
                   
                </h1>
                <a href="/" className="self-start uppercase font-semibold border-b-2 border-primary">Discover More</a>
            </div>
        </div>      
    </div>
  )
}

export default Hero