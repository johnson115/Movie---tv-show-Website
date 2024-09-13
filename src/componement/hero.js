import "../css/hero.css";
const Hero = ({ text, backDrop }) => {
    return (<>

        <div className="header-container">
            <header className=" text-3xl font-bold tracking-tight text-white sm:text-4xl p-5 hero-container0.">
                <h1 className="hero-text text-white text-center">{text}</h1>
                <div className="hero-backDrop" style={{ backgroundImage: `url(${backDrop})` }}>
                </div>

            </header>
        </div>

    </>
    )
}
export default Hero;