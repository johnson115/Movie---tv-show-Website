
const Hero = ({ text, backDrop }) => {
    return (<>

        <div className="header-container">
            <header className="bg-warning  text-white p-5 hero-container0.">
                <h1 className="hero-text text-center">{text}</h1>
                <div className="hero-backDrop" style={{ backgroundImage: `url(${backDrop})` }}>
                </div>

            </header>
        </div>

    </>
    )
}
export default Hero;